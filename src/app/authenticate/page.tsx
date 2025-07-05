"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

import { Supabase } from '@/utils/supabase/client';

import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Button,
  ToastProvider,
  addToast,
} from '@heroui/react';

import { CardTitle, CardDescription } from '@/components/ui/card';

import {
  SignUpUser,
  SignInUser,
  ForgotPassword,
  SetNewPassword,
} from './components/auth';

import {
  SignUpForm,
  SignInForm,
  ForgotPasswordForm,
} from './components/forms';

import { VerificationContainer } from './components/verification';


const AuthenticatePage = () => {  
  const [IsVerified, setIsVerified] = useState(false);
  const SearchParams = useSearchParams();
  const router = useRouter();
  const [FormType, SetForm] = useState<'sign-in' | 'sign-up' | 'forgot-password'>(
    (SearchParams.get('type') as 'sign-in' | 'sign-up' | 'forgot-password') || 'sign-in'
  );
  const [verificationType, setVerificationType] = useState<'phone' | 'email' | '2fa' | null>(null);
  const [verificationSteps, setVerificationSteps] = useState<('phone' | 'email' | '2fa' )[]>([]);
  const [NewPass,setNewPass] = useState(false);
  
  // // Update URL without page reload
  const updateFormType = useCallback(
    (newView: 'sign-in' | 'sign-up' | 'forgot-password') => {
      SetForm(newView);
    },
    []
  );
  useEffect(
    () => {
      const params = new URLSearchParams(SearchParams.toString());
      params.set('type', FormType);
      router.replace(`?${params.toString()}`);
    },
    [FormType,SearchParams, router]
  );

  useEffect(() => {
    const redirectTo = SearchParams.get('redirect_url') || '/'; 

    const handleSession = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token');

      if (access_token && refresh_token) {
        const { error } = await Supabase().auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          addToast({
            title: 'Access Token Error!',
            description: `Access Token Error! Error:${error}`,
            color: 'danger',
          });
        } else {
          addToast({
            title: 'Authentication Successful!',
            description: 'Redirecting...',
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            color: 'success',
          });
          router.push(redirectTo);
        }
      }

      const code = SearchParams.get('code');
      if (code) {
        const { error } = await Supabase().auth.exchangeCodeForSession(code);
        if (error) {
          addToast({
            title: 'Access Code Error!',
            description: `Access Code Error! Error:${error}`,
            color: 'danger',
          });
        } else {
          addToast({
            title: 'Authentication Successful!',
            description: 'Redirecting...',
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            color: 'success',
          });
          router.push(redirectTo);
        }
      }

      // Fallback: check if session exists
      const { data } = await Supabase().auth.getSession();
      const session = data?.session;

      if (session) {
        const { data: userData, error } = await Supabase().auth.getUser(session.access_token);
        if (userData?.user && !error) {
          if ((SearchParams.get('type') == "forgot-password")) {
            setNewPass(true)
            addToast({
              title: 'Authentication Successful!',
              description: 'Authentication Successful! Set You New Password...',
              promise: new Promise((resolve) => setTimeout(resolve, 3000)),
              color: 'success',
            });
          }else{
            addToast({
              title: 'Authentication Successful!',
              description: 'Redirecting...',
              promise: new Promise((resolve) => setTimeout(resolve, 3000)),
              color: 'success',
            });
            router.push(redirectTo);
          }
        } else {
          await Supabase().auth.signOut();
          addToast({
            title: 'Session Invalid',
            description: 'Your session has expired. Please log in again.',
            timeout: 3000,
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            color: 'danger',
          });
        }
      }
    };
    handleSession();
  }, [IsVerified, SearchParams, router]);

  const handleVerificationComplete = useCallback(() => {
    if (verificationType === 'phone') {
      setVerificationType('email'); 
    } else if (verificationType === 'email') {
      setVerificationType('2fa');
    } else {
      setVerificationType(null); 
    }
  }, [verificationType]);

 
  const AuthenticationForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [EmailAddress, setEmailAddress] = useState('');
    const [PhoneNo, setPhoneNo] = useState('');
    const [Email_Phone, setEmail_Phone] = useState('');
    
    const [Password, setPassword] = useState('');
    const [ReferralCode,setReferralCode] = useState('');
    const [ReferralDisable,setReferralDisable] = useState(false);

    const [AcceptedTerms, setAcceptedTerms] = useState(true);
    const [DynamicType, setDynamicType] = useState("text");

    useEffect(() => {
        const hasAlphabet = /[a-zA-Z]/.test(Email_Phone);

        if (!hasAlphabet && Email_Phone.length > 0) {
          setDynamicType("phone");
        }else if (Email_Phone.length > 0){
          setDynamicType("email");
        }else{
          setDynamicType("text");
        }
    }, [Email_Phone]);

    useEffect(
      () => {
        const ref_code = SearchParams.get('referral_code');
        if (ref_code){
          setReferralDisable(true);
          setReferralCode(ref_code);
        }
      },
      []
    );

    const isFormValid = () => {
      const validatePassword = (pwd: string) => {
        return {
          length: pwd.length >= 6,
          upper: /[A-Z]/.test(pwd),
          lower: /[a-z]/.test(pwd),
          number: /[0-9]/.test(pwd),
          special: /[^A-Za-z0-9]/.test(pwd),
        };
      };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?[\d\-.\s]{6,14}$/;

      const valid_password = Object.values(validatePassword(Password)).every(Boolean);
      const valid_FirstName = FirstName != "";
      const confirm_term_condition = AcceptedTerms;

      if (FormType === 'sign-in') {
        let valid_e_p = false;
        valid_e_p = DynamicType === "email" ? emailRegex.test(Email_Phone) : DynamicType === "phone"? phoneRegex.test(Email_Phone): false;
        return valid_e_p && valid_password && confirm_term_condition
      }else if (FormType === 'sign-up') {
        let valid_email = false;
        valid_email = emailRegex.test(EmailAddress);
        let valid_phone = false;
        valid_phone = phoneRegex.test(PhoneNo);
        return valid_email && valid_password && valid_phone && valid_FirstName && confirm_term_condition
      }else if (FormType === 'forgot-password'){
        if (NewPass){
          return valid_password && confirm_term_condition
        }
        let valid_email = false;
        valid_email = emailRegex.test(EmailAddress);
        return valid_email && confirm_term_condition
      }  
      return false;
    };

    const SubmitForm = (action: string) => {
      const AuthProps = {
        FirstName: FirstName,
        LastName: LastName,
        EmailAddress: EmailAddress,
        Email_Phone: Email_Phone,
        PhoneNo: PhoneNo,
        Password: Password,
        ReferralCode: ReferralCode
      }
      if (action === 'sign-up') {
        SignUpUser( {...AuthProps},setIsLoading, setIsVerified);
        // setVerificationType('2fa');
      } else if (action === 'sign-in') {
        SignInUser( {...AuthProps},setIsLoading, setIsVerified);
      } else if (action === 'forgot-password') {
        ForgotPassword( {...AuthProps},setIsLoading, setIsVerified);
        // setVerificationType('email');
      } else if (action === 'forgot-password-set-new') {
        SetNewPassword({ ...AuthProps }, setIsLoading, setIsVerified, router, SearchParams);
        // setVerificationType('email');
      }
    };

    const FormProps = {
      FirstName: FirstName,
      LastName: LastName,
      EmailAddress: EmailAddress,
      PhoneNo: PhoneNo,
      Email_Phone: Email_Phone,
      Password: Password,
      ReferralCode:ReferralCode,
      ReferralDisable: ReferralDisable,
      AcceptedTerms: AcceptedTerms,
      setFirstName: setFirstName,
      setLastName: setLastName,
      setEmailAddress: setEmailAddress,
      setEmail_Phone: setEmail_Phone,
      setPhoneNo: setPhoneNo,
      setPassword: setPassword,
      setReferralCode: setReferralCode,
      setAcceptedTerms: setAcceptedTerms,
      isLoading: isLoading,
      SubmitForm: SubmitForm,
      isFormValid: isFormValid,
      updateFormType: updateFormType,
      DynamicType: DynamicType,
    }

    switch (FormType) {
      case 'sign-up':
        return (
          <SignUpForm {...FormProps} />
        );
      case 'sign-in':
        return (
          <SignInForm {...FormProps} />
        );
      case 'forgot-password':
        return (
          <>
          <ForgotPasswordForm
            {...(FormProps as Parameters<typeof ForgotPasswordForm>[0])}
            NewPass={NewPass}
          />
          </>
        );
      default:
        return null;
    }
  };

  const VerificationProps ={
    verificationType: verificationType,
    handleVerificationComplete: handleVerificationComplete,
    setVerificationType: setVerificationType,
    verificationSteps: verificationSteps,
    setVerificationSteps: setVerificationSteps,
  };

  return (
    <>
    <ToastProvider placement={"top-center"} maxVisibleToasts={1} toastOffset={40} regionProps={{ className: "z-[9999] fixed" }} />
    <div className="h-screen w-screen flex items-center justify-center">
      <Card  radius="none" className="h-full w-full lg:h-[90vh] lg:w-[75vw] sm:rounded-[10px]">
        <VerificationContainer {...VerificationProps} />
        <CardBody className="flex flex-col justify-center md:flex-row overflow-hidden">
          
          {/* Left Section */}
          <div className="hidden md:block w-full md:w-1/2 relative">
            <div className="absolute inset-0 m-2 rounded-[10px] bg-[url('/Assets/Authenticate/Authenticate_BG.png')] bg-cover bg-center"></div>
            <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8">
              <Button 
                radius="sm"
                size="lg"
                className="ml-auto w-[40%] bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:bg-white"
                endContent={<ArrowRight className="h-4 w-4 ml-1" />}
              >
                Back to website
              </Button>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-center bg-white text-transparent bg-clip-text leading-snug">
                Empowering Your Trades,<br /> Elevating Your Profits
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex flex-col p-[20px] pt-[15px] pr-[40px] justify-center">
            {/* Header */}
            <div className="flex flex-col items-center pb-5 text-center">
              <CardTitle className="text-4xl font-semibold text-black dark:text-white mb-2">
                {FormType === 'sign-in' && 'Welcome back'}
                {FormType === 'sign-up' && 'Create an account'}
                {FormType === 'forgot-password' && 'Reset your password'}
              </CardTitle>
              <CardDescription className="text-sm text-gray-700 dark:text-gray-100">
                {FormType === 'sign-in' && 'Sign in to your account'}
                {FormType === 'sign-up' && 'Enter your info to sign up'}
                {FormType === 'forgot-password' && "We'll email you a reset link"}
              </CardDescription>
            </div>
            {/* Form */}
            <Tabs fullWidth  selectedKey={FormType} size="lg" radius="sm"
                onSelectionChange={(key) => {
                  if (
                    key === 'sign-in' ||
                    key === 'sign-up' ||
                    key === 'forgot-password' 
                  ) {
                    SetForm(key);
                  }
                }}
              >
                <Tab key="sign-in" title="Sign In"/>
                <Tab key="sign-up" title="Sign Up"/>
                <Tab key="forgot-password" title="Forgot Password"/>
            </Tabs>
            <div className='h-[65%]'>
              {AuthenticationForm()}
            </div>

            {/* Social Login */}
            <div className="p-4 pb-0 border-t border-gray-500">
              <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                <Button 
                  radius="sm"
                  variant="shadow"
                  fullWidth size="lg"
                  className="bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:bg-white"
                  startContent={<FcGoogle/>}
                >
                  Google
                </Button>
                <Button
                  radius="sm"
                  variant="shadow"
                  fullWidth size="lg"
                  className="bg-black text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:bg-white" 
                  startContent={<FaApple/>}>
                  Apple
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
    </>
  );
};

export default AuthenticatePage;