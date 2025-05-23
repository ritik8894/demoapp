'use client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { FaApple} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useSearchParams, useRouter } from 'next/navigation';
import { Supabase } from '@/utils/supabase/client';
import {ToastProvider, addToast} from "@heroui/react";
import {styles} from './components/styles';


import { SignUpUser, SignInUser, ForgotPassword, SetNewPassword } from "./components/auth";
import { SignUpForm, SignInForm, ForgotPasswordForm } from "./components/forms";
import { VerificationContainer } from "./components/verification";


const AuthenticatePage = () => {  
  const [Email_Phone, setEmail_Phone] = useState('');
  const [IsVerified, setIsVerified] = useState(false);
  const SearchParams = useSearchParams();
  const router = useRouter();
  const [Form, FormType] = useState<'sign-in' | 'sign-up' | 'forgot-password'>(
    (SearchParams.get('type') as 'sign-in' | 'sign-up' | 'forgot-password') || 'sign-in'
  );
  const [verificationType, setVerificationType] = useState<'phone' | 'email' | '2fa' | null>(null);
  const [verificationSteps, setVerificationSteps] = useState<('phone' | 'email' | '2fa' )[]>([]);
  
  // // Update URL without page reload
  const updateFormType = useCallback(
    (newView: 'sign-in' | 'sign-up' | 'forgot-password') => {
      FormType(newView);
      const params = new URLSearchParams(SearchParams.toString());
      params.set('type', newView);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [SearchParams, router]
  );

  useEffect(() => {
    const redirectUrlParam = SearchParams.get('redirect_url');
    const redirectTo = redirectUrlParam || '/'; // fallback

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
            title: 'Access Token Expired!',
            description: 'Your Access Token Expired! Please Re-Authenticate.',
            color: 'danger',
          });
        } else {
          addToast({
            title: 'Authentication Successful!',
            description: 'Redirecting...',
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            color: 'success',
          });
          // router.replace(redirectTo);
        }
        return;
      }

      const code = SearchParams.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          addToast({
            title: 'Access Token Expired!',
            description: 'Your Access Token Expired! Please Re-Authenticate.',
            color: 'danger',
          });
        } else {
          addToast({
            title: 'Authentication Successful!',
            description: 'Redirecting...',
            promise: new Promise((resolve) => setTimeout(resolve, 3000)),
            color: 'success',
          });
          // router.replace(redirectTo);
        }
        return;
      }

      // Fallback: check if session exists
      const { data } = await Supabase().auth.getSession();
      const session = data?.session;

      if (session) {
        const { data: userData, error } = await Supabase().auth.getUser(session.access_token);
        if (userData?.user && !error) {
          if (!(SearchParams.get('forgot-password') == "newpass")) {
            addToast({
              title: 'Authentication Successful!',
              description: 'Redirecting...',
              promise: new Promise((resolve) => setTimeout(resolve, 3000)),
              color: 'success',
            });
            setTimeout(() => router.replace(redirectTo), 2000);
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
  }, [IsVerified]);

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
    
    const [Password, setPassword] = useState('');
    const [ReferralCode,setReferralCode] = useState('');

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
      var valid_email = emailRegex.test(EmailAddress);
      var valid_phone = phoneRegex.test(PhoneNo);
      var valid_password = Object.values(validatePassword(Password)).every(Boolean);
      var valid_FirstName = FirstName != "";
      var confirm_term_condition = AcceptedTerms;

      if (Form === 'sign-in') {
        valid_email = emailRegex.test(Email_Phone);
        if (!valid_email){
          var valid_email = phoneRegex.test(Email_Phone);
        };
        return valid_email && valid_password && confirm_term_condition
      }else if (Form === 'sign-up') {
        return valid_email && valid_password && valid_phone && valid_FirstName && confirm_term_condition
      }else if (Form === 'forgot-password'){
        if (SearchParams.get('forgot-password') == "newpass"){
          return valid_password && confirm_term_condition
        }
        valid_email = emailRegex.test(Email_Phone);
        if (!valid_email){
          var valid_email = phoneRegex.test(Email_Phone);
        };
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
      AcceptedTerms: AcceptedTerms,
      setFirstName: setFirstName,
      setLastName: setLastName,
      setEmailAddress: setEmailAddress,
      setEmail_Phone: setEmail_Phone,
      setPhoneNo: setPhoneNo,
      setPassword: setPassword,
      setAcceptedTerms: setAcceptedTerms,
      isLoading: isLoading,
      SubmitForm: SubmitForm,
      isFormValid: isFormValid,
      updateFormType: updateFormType,
      DynamicType: DynamicType,
    }

    switch (Form) {
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
            {ForgotPasswordForm(
              FormProps as Parameters<typeof ForgotPasswordForm>[0],
              SearchParams.get('forgot-password') == "newpass" ? true : false
            )}
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
    <ToastProvider placement={"top-center"} toastOffset={10} />
    <div className={styles.MainContainer}>
      <VerificationContainer {...VerificationProps} />
      <div className={styles.AuthContainer}>
        {/* Left Section */}
        <div className={styles.AuthContainer_LeftSection_Container}>
          <div className={styles.AuthContainer_LeftSection_Container_Image_Container}></div>
          <div className={styles.AuthContainer_LeftSection_Container_Image_Container_Image}></div>
          <div className={styles.AuthContainer_LeftSection_Container_Image_Container_Header_Footer_Container}>
            <div className={styles.AuthContainer_LeftSection_Container_Image_Container_Header}>
              <Button
                variant="outline"
                className={+"w-1/2"+styles.Button}
                onClick={() => router.push('/')}
              >
                Back to website <span className="text-base sm:text-lg ml-1 transition-all duration-500 ease-in-out">→</span>
              </Button>
            </div>
            <div className={styles.AuthContainer_LeftSection_Container_Image_Container_Footer}>
              <p className={styles.AuthContainer_LeftSection_Container_Image_Container_Footer_Description}>
                Empowering Your Trades,<br /> Elevating Your Profits
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.AuthContainer_RightSection_Container}>
          {/* Header */}
          <div className={styles.AuthContainer_RightSection_Container_Header}>
            <CardTitle className={styles.AuthContainer_RightSection_Container_Title}>
              {Form === 'sign-in' && 'Welcome back'}
              {Form === 'sign-up' && 'Create an account'}
              {Form === 'forgot-password' && 'Reset your password'}
            </CardTitle>
            <CardDescription className={styles.AuthContainer_RightSection_Container_Description}>
              {Form === 'sign-in' && 'Sign in to your account'}
              {Form === 'sign-up' && 'Enter your info to sign up'}
              {Form === 'forgot-password' && "We'll email you a reset link"}
            </CardDescription>
          </div>

          {/* Authentication Form */}
          <div className={styles.AuthContainer_RightSection_Container_AuthForm}>
            <Card className={styles.AuthContainer_RightSection_Container_AuthForm_Card}>
              <CardHeader className={styles.AuthContainer_RightSection_Container_AuthForm_CardHeader}>
                {AuthenticationForm()}
              </CardHeader>
            </Card>
          </div>

          {/* Social Login */}
          <div className={styles.socialSection}>
            <div className={styles.socialSection_Buttons}>
              <Button className={styles.socialSection_Button}>
                <FcGoogle className={styles.socialSection_ButtonStyle} />
                Google
              </Button>
              <Button className={styles.socialSection_Button}>
                <FaApple className={styles.socialSection_ButtonStyle} />
                Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AuthenticatePage;