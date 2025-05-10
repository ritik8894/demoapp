'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaApple } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button'; // Ensure this import is correct and matches your project structure
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// Import the client
import { Supabase } from '@/utils/supabase/client';




// // Sign up
// const handleSignUp = async (email: string, password: string) => {
//   const { error } = await supabase.auth.signUp({ email, password });
//   if (error) {
//     // handle error
//   } else {
//     // success
//   }
// };

// // Sign in
// const handleSignIn = async (email: string, password: string) => {
//   const { error } = await supabase.auth.signInWithPassword({ email, password });
//   if (error) {
//     // handle error
//   } else {
//     // success
//   }
// };

// // Reset password
// const handleResetPassword = async (email: string) => {
//   const { error } = await supabase.auth.resetPasswordForEmail(email);
//   if (error) {
//     // handle error
//   } else {
//     // success
//   }
// };




const AuthenticatePage = () => {
  const theme = {
    BaseColor: "bg-[#f0f2f5]",
    
   };
  
  const styles = {

    // MainPage
    MainContainer:`h-[100vh] flex items-center justify-center ${theme.BaseColor} backdrop-blur-md transition-all duration-500 ease-in-out `,
    

    //Authentication Container
    AuthContainer: 'h-full w-full lg:h-[95vh] lg:w-[75vw] flex flex-col justify-center md:flex-row sm:rounded-2xl overflow-hidden w-full bg-[#f0f2f5] transition-all duration-500 ease-in-out shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff]',
  

    //Authentication Container Left Side
    AuthContainer_LeftSection_Container:"hidden md:block w-full md:w-1/2 relative transition-all duration-500 ease-in-out",
    AuthContainer_LeftSection_Container_Image_Container:"absolute inset-0  transition-all duration-500 ease-in-out",
    AuthContainer_LeftSection_Container_Image_Container_Image:"absolute m-2 sm:m-3 md:m-4 rounded-2xl inset-0 bg-[url('/Assets/Authenticate/Authenticate_BG.png')] bg-cover bg-center transition-all duration-500 ease-in-out",
    AuthContainer_LeftSection_Container_Image_Container_Header_Footer_Container:"relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 transition-all duration-500 ease-in-out",
    AuthContainer_LeftSection_Container_Image_Container_Header:"flex justify-end transition-all duration-500 ease-in-out", 
    AuthContainer_LeftSection_Container_Image_Container_Footer:"flex justify-center transition-all duration-500 ease-in-out",
    AuthContainer_LeftSection_Container_Image_Container_Footer_Description:"text-xl sm:text-2xl md:text-3xl font-bold text-center bg-white text-transparent bg-clip-text leading-snug transition-all duration-500 ease-in-out",
    

    //Authentication Container Right Side
    AuthContainer_RightSection_Container: 'w-full md:w-1/2 flex flex-col bg-[#f0f2f5] pb-4 pt-4 justify-center transition-all duration-500 ease-in-out overflow-hidden',
    AuthContainer_RightSection_Container_Header: 'flex flex-col justify-center items-center mt-4 mb-2 transition-all duration-500 ease-in-out',
    AuthContainer_RightSection_Container_Title: 'text-4xl font-semibold text-black text-center mb-2 transition-all duration-500 ease-in-out',
    AuthContainer_RightSection_Container_Description: 'text-sm text-gray-700 text-center transition-all duration-500 ease-in-out',
    AuthContainer_RightSection_Container_AuthForm:"flex-1 flex items-center transition-all duration-500 ease-in-out",
    AuthContainer_RightSection_Container_AuthForm_Card:"bg-transparent border-none shadow-none w-full transition-all duration-500 ease-in-out",
    AuthContainer_RightSection_Container_AuthForm_CardHeader:"space-y-3 transition-all duration-500 ease-in-out",

        //Authentication Form
    FormContainer: 'flex-1 flex flex-col justify-center space-y-5 pt-2 pb-2 px-6 max-h-[60vh] transition-all duration-500 ease-in-out overflow-y-auto',
    

    //Social Section
    socialSection: 'mt-4 p-4 border-t border-gray-200 transition-all duration-500 ease-in-out',
    socialSection_Buttons: 'flex flex-col md:flex-row items-center justify-center gap-3 transition-all duration-500 ease-in-out pt-4',
    socialSection_Button: 'w-full md:w-[45%] h-11 rounded-xl text-base bg-[#f0f2f5] text-gray-700 shadow-[6px_6px_12px_#c8ccd1,_-6px_-6px_12px_#ffffff] hover:bg-[#f0f2f5] hover:shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] active:shadow-[inset_6px_6px_12px_#c8ccd1,_inset_-6px_-6px_12px_#ffffff] transition-all flex items-center justify-center',
    socialSection_ButtonStyle:"mr-2 text-base transition-all duration-500 ease-in-out",


    //Verification Container
    VerificationContainer_MainContainer:"absolute top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50",
    VerificationContainer:"bg-[#f0f2f5] p-6 rounded-xl shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff] w-96 max-w-[90vw]",
    VerificationContainer_Child:"flex items-center mb-4",
    VerificationContainer_Header:"text-xl font-bold text-gray-700",
    VerificationContainer_Status_div:"ml-auto flex items-center space-x-2",
    VerificationContainer_Status_Idicator:"w-2 h-2 rounded-full",
    VerificationContainer_Description : "mb-5 text-gray-600",
    VerificationContainer_Input_Container: "flex justify-between mb-6",
    VerificationContainer_Input: "w-12 h-12 text-center text-xl bg-[#f0f2f5] text-gray-700 rounded-lg border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200",
    VerificationContainer_Success_Div: "absolute inset-0 flex items-center justify-center",
    VerificationContainer_Success_Div_Div: "bg-[#f0f2f5] p-6 rounded-xl shadow-[12px_12px_24px_#c8ccd1,_-12px_-12px_24px_#ffffff] text-center transition-transform duration-500 scale-110",
    VerificationContainer_Success_Div_Message: "text-2xl font-bold text-green-600",

    //Common
    Link: 'text-gray hover:text-black transition-all duration-500 ease-in-out cursor-pointer text-xs',
    Text:"text-xs text-center text-gray-600",
    CheckBox: 'flex items-center gap-2 text-gray-500 text-xs transition-all duration-500 ease-in-out',
    CheckBoxLabel: 'text-xs text-gray-500 hover:text-gray-900 transition-all duration-500 ease-in-out underline cursor-pointer',
    InputRow: 'flex flex-col sm:flex-row gap-3 w-full transition-all duration-500 ease-in-out',
    Input: 'h-12 w-full px-4 text-base bg-[#f0f2f5] text-gray-700 rounded-xl border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all',
    InputSmall: 'h-12 w-full px-4 text-base bg-[#f0f2f5] text-gray-700 rounded-xl border-none shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all',
    Button: 'w-full h-11 rounded-xl text-base bg-[#f0f2f5] text-gray-700 shadow-[6px_6px_12px_#c8ccd1,_-6px_-6px_12px_#ffffff] hover:bg-[#f0f2f5] hover:shadow-[inset_4px_4px_8px_#c8ccd1,_inset_-4px_-4px_8px_#ffffff] active:shadow-[inset_6px_6px_12px_#c8ccd1,_inset_-6px_-6px_12px_#ffffff] transition-all duration-200',


  };

  const Links = {
    Terms: '/legal/term&conndtions',
    Privacy: '/legal/privacy',
    Contact: '/contact',
  };

  const SearchParams = useSearchParams();
  const router = useRouter();
  const [Form, FormType] = useState<'sign-in' | 'sign-up' | 'forgot-password'>(
    'sign-in'
  );
  const [verificationType, setVerificationType] = useState<'phone' | 'email' | '2fa' | null>(null);

  // Update URL without page reload
  const updateFormType = useCallback(
    (newView: 'sign-in' | 'sign-up' | 'forgot-password') => {
      FormType(newView);
      const params = new URLSearchParams(SearchParams.toString());
      params.set('type', newView);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [SearchParams, router]
  );

  



  // Handle URL parameters
  useEffect(() => {

    
    // Handle magic link or password reset (access_token in hash)
    if (window.location.hash && window.location.hash.includes('access_token')) {
      // Parse the hash into search params
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const access_token = hashParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token');
      if (access_token && refresh_token) {
        Supabase().auth.setSession({
          access_token,
          refresh_token,
        }).then(() => {
          router.replace('/dashboard');
        });
      }
    }

    // const type = SearchParams.get('type');
    // if (type && ['sign-in', 'sign-up', 'forgot-password'].includes(type)) {
    //   FormType(type as 'sign-in' | 'sign-up' | 'forgot-password');
    // } else {
    //   // Remove type parameter if it's not valid
    //   const params = new URLSearchParams(SearchParams.toString());
    //   // params.delete('type');
    //   params.set('type', "sign-in");
    //   router.push(`?${params.toString()}`, { scroll: false });
    // }
  }, [SearchParams, router]);

  // Function to handle verification completion
  const handleVerificationComplete = useCallback(() => {
    // Logic to proceed to the next verification or complete the process
    if (verificationType === 'phone') {
      setVerificationType('email'); // Example: move to email verification next
    } else if (verificationType === 'email') {
      setVerificationType('2fa'); // Example: move to 2FA next
    } else {
      setVerificationType(null); // All verifications complete
    }
  }, [verificationType]);

  // Define VerificationComponent as an inline component
  const VerificationContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [verificationSteps, setVerificationSteps] = useState(['email', 'phone', '2fa']);
    const [verificationStepsStatus, setVerificationStepsStatus] = useState<number[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Determine the current step
    const currentStep = verificationSteps[currentStepIndex] || (verificationType || '');

    // Handle OTP change
    const HandleOTPChange = (index: number, value: string) => {
      if (value.length > 1) return; // Only allow single digit

      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      } else if (!newOtpValues[index] && index > 0) {
        // Auto focus previous input only if current input is empty
        const prevInput = document.getElementById(`otp-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }
    };

    // Handle verification
    const handleVerify = () => {
      setIsLoading(true);
      setVerificationStepsStatus(prev => {
        const updated = [...prev];
        updated[currentStepIndex] = 2; 
        return updated;
      });

      // Simulate verification process
      setTimeout(() => {
        const otpCode = otpValues.join('');
        // Dummy verification - consider 123456 as valid OTP
        const isValid = otpCode === '123456';

        if (isValid) {
          setVerificationStepsStatus(prev => {
            const updated = [...prev];
            updated[currentStepIndex] = 1; 
            return updated;
          });
          setShowSuccess(true);

          // Wait for 1 second before moving to next step
          setTimeout(() => {
            setShowSuccess(false);
            if (currentStepIndex < verificationSteps.length - 1) {
              setCurrentStepIndex(currentStepIndex + 1);
              setOtpValues(['', '', '', '', '', '']);
            } else {
              handleVerificationComplete();
            }
          }, 1000);
        } else {
          setVerificationStepsStatus(prev => {
            const updated = [...prev];
            updated[currentStepIndex] = 0; 
            return updated;
          });
        }

        setIsLoading(false);
      }, 2000);
    };

    // Handle resend OTP
    const ResendOTP = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setVerificationStepsStatus(prev => {
        const updated = [...prev];
        updated[currentStepIndex] = 3; 
        return updated;
      });
      // setVerificationStatus('New OTP sent successfully!');
      setResendTimer(10);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setVerificationStepsStatus(prev => {
              const updated = [...prev];
              updated[currentStepIndex] = 2; 
              return updated;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    // Render only if verificationType is set
    if (!verificationType) return null;

    const handleCloseVerification = () => {
      setVerificationType(null);
    };

    
    return (
      <div className={styles.VerificationContainer_MainContainer}>
        <div className={styles.VerificationContainer}>
          <div className={styles.VerificationContainer_Child}>
            <h2 className={styles.VerificationContainer_Header}>
              {currentStep === 'phone' && 'Phone Verification'}
              {currentStep === 'email' && 'Email Verification'}
              {currentStep === '2fa' && '2FA Verification'}
            </h2>

            {verificationSteps.length > 1 && (
              <div className={styles.VerificationContainer_Status_div}>
                {verificationSteps.map((step, index) => (
                  <div 
                    key={step}
                    className={`${styles.VerificationContainer_Status_Idicator} ${
                      verificationStepsStatus[index] === 1 ? 'bg-green-500' : verificationStepsStatus[index] === 0  ? 'bg-red-500' : verificationStepsStatus[index] === 3  ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                
                ))}
              </div>
            )}
          <span>
            <Button
              variant="outline"
              className= {`ml-4 p-4 ${styles.Button}  w-auto rounded-full`}
              onClick={handleCloseVerification}
            >
              X
            </Button>
          </span>

          </div>

          <p className={styles.VerificationContainer_Description}>
            {currentStep === 'phone' && (
              <>
                Please enter the 6-digit OTP sent to your phone. <br />
                We have sent a verification code to your phone.
              </>
            )}
            {currentStep === 'email' && (
              <>
                Please enter the 6-digit code sent to your email. <br />
                We have sent a verification code to your email.
              </>
            )}
            {currentStep === '2fa' && (
              <>
                Please enter your 6-digit 2FA code. <br />
                Please enter the 2FA code from your authenticator app.
              </>
            )}
          </p>

          <div className={styles.VerificationContainer_Input_Container}>
            {otpValues.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => HandleOTPChange(index, e.target.value)}
                onKeyDown={(e) => {
                  // if (e.key === "Backspace") {
                  //   if (index > 0) {
                  //     const prevInput = document.getElementById(`otp-input-${index - 1}`);
                  //     if (prevInput) prevInput.focus();
                  //   }
                  // }
                  if (e.key === "ArrowLeft") {
                    if (index > 0) {
                      const prevInput = document.getElementById(`otp-input-${index - 1}`);
                      if (prevInput) prevInput.focus();
                    }
                  }
                  if (e.key === "ArrowRight") {
                    if (index < otpValues.length - 1) {
                      const nextInput = document.getElementById(`otp-input-${index + 1}`);
                      if (nextInput) nextInput.focus();
                    }
                  }
                }}
                className={styles.VerificationContainer_Input}
              />
            ))}
          </div>

          {true && (
            <div className={`mb-4 text-sm ${verificationStepsStatus[currentStepIndex] === 0 ? 'text-red-500' : verificationStepsStatus[currentStepIndex] === 1 ? 'text-green-500' : verificationStepsStatus[currentStepIndex] === 3 ? 'text-blue-500' : 'text-red-500'}`}>
              {verificationStepsStatus[currentStepIndex] === 0 && 'Verification Failed Try Again !' }
              {verificationStepsStatus[currentStepIndex] === 1 && 'Verification Successful !' }
              {verificationStepsStatus[currentStepIndex] === 3 && 'OTP Sent Successfully !' }
              {resendTimer > 0 && ` Resend OTP in ${resendTimer} seconds`}
            </div>
          )}
          <FormButton className={styles.Button} isLoading={isLoading} onClick={handleVerify} disabled={isLoading || otpValues.some(v => v === '')}>
              {isLoading ? 'Verifying...' : (`Verify ${currentStep === 'phone' ? 'Phone' : currentStep === 'email' ? 'Email' : '2FA'}`) }
          </FormButton>

          {resendTimer === 0 && (
            <a 
              href="#" 
              onClick={ResendOTP} 
              className="mb-2 mt-3 text-sm text-green-600 cursor-pointer text-right block"
            >
              {['phone', 'email'].includes(currentStep) && 'Resend OTP'}
            </a>
          )}
        </div>

        {showSuccess && (
          <div className={styles.VerificationContainer_Success_Div}>
            <div className={styles.VerificationContainer_Success_Div_Div}>
              <h2 className={styles.VerificationContainer_Success_Div_Message}>Verification Successful!</h2>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Add loading indicator to other buttons
  const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {isLoading?: boolean; disabled?: boolean;}> = ({ children, isLoading = false, disabled, ...props }) => (
    <Button
      {...props}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading || disabled}
      className={`relative overflow-hidden ${props.className ?? ''}`}
    >
      {isLoading && (
        <span className="absolute inset-0 z-1 flex items-center justify-center space-x-2 bg-black/4 backdrop-blur-sm pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-gray-600 animate-[bounce_0.7s_infinite_0.1s]" />
          <span className="h-2 w-2 rounded-full bg-gray-800 animate-[bounce_0.7s_infinite_0.2s]" />
          <span className="h-2 w-2 rounded-full bg-gray-600 animate-[bounce_0.7s_infinite_0.3s]" />
          <span className="h-2 w-2 rounded-full bg-gray-800 animate-[bounce_0.7s_infinite_0.4s]" />
        </span>
      )}
      <span className={isLoading ? "relative z-20 opacity-50" : "relative z-2"}>
        {children}
      </span>
    </Button>
  );

  // Use LoadingButton in AuthenticationForm
  const AuthenticationForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNo, setPhone] = useState('');
    const [AcceptedTerms, setAcceptedTerms] = useState(true);

    const SignUp = async (Email:string,Password:string,FirstName:string,LastName:string,PhoneNo:string) => {
      try {
        const { data, error } = await Supabase().auth.signUp({
          email: Email,
          password: Password,
          options: {
            data: {
              first_name: FirstName,
              last_name: LastName,
              phone: PhoneNo,
            },
          },
        });
        if (error) {
          alert(error.message);
        } else {
          
          alert("Sign up successful! Please verify your email or phone.");
          // setVerificationType('phone');
        }
      } catch (err) {
        alert("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    
    
    
    
    const SignIn = async (Email:string,Password:string) => {
    //   // setIsLoading(true);
      try {
        const { data, error } = await Supabase().auth.signInWithPassword({
          email: Email,
          password: Password,
        });
        if (error) {
          alert(error.message);
        } else {
          alert("Sign in successful!");
          // Optionally: redirect or setVerificationType('2fa') if you want 2FA
        }
      } catch (err) {
        alert("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };
    
    const ForgotPassword = async (Email:string) => {
      // setIsLoading(true);
      try {
        const { data, error } = await Supabase().auth.resetPasswordForEmail(Email);
        if (error) {
          alert(error.message);
        } else {
          alert("Password reset email sent! Please check your inbox.");
        }
      } catch (err) {
        alert("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    const isFormValid = () => {
        return true;


      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3,5}\)?[-.\s]?)?[\d\-.\s]{6,14}$/;
      var valid_email = emailRegex.test(Email);
      var valid_password = Password.length > 6;
      var valid_FirstName = FirstName != "";
      var confirm_term_condition = AcceptedTerms;

      if (Form === 'sign-in') {
        if (!valid_email){
          var valid_email = phoneRegex.test(Email);
        };
        return valid_email && valid_password && confirm_term_condition
      };
      if (Form === 'sign-up') {
        if (PhoneNo != "" && valid_email ){
          var valid_email = phoneRegex.test(PhoneNo);
        };
        return valid_email && valid_password && valid_FirstName && confirm_term_condition
      };
      if (Form === 'forgot-password'){
        if (!valid_email){
          var valid_email = phoneRegex.test(Email);
        };
        return valid_email && confirm_term_condition
        };
      return false;
    };

    const SubmitForm = (action: string) => {

      setIsLoading(true);

      if (Form === 'sign-up') {
        SignUp(Email, Password, FirstName, LastName, PhoneNo);
      } else if (Form === 'sign-in') {
        SignIn(Email, Password);
      } else if (Form === 'forgot-password') {
        ForgotPassword(Email);
      }
  
      setTimeout(() => {
        setIsLoading(false);
        // setVerificationType('phone'); // Open verification container
      }, 1000);
    };

    switch (Form) {
      case 'sign-in':
        return (
          <div className={styles.FormContainer}>
            <Input placeholder="Email or Phone No" className={styles.Input} value={Email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" className={styles.Input} value={Password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.CheckBox}>
              <Checkbox id="terms"  checked={AcceptedTerms} onCheckedChange={checked => setAcceptedTerms(checked === true)}  />
              <label htmlFor="terms" className={styles.Link}>
                I agree to the
              </label>
              <Link href={Links.Terms} target="_blank">
                <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
                  Terms & Conditions
                </span>
              </Link>
            </div>
            <FormButton className={styles.Button} isLoading={isLoading} onClick={() => SubmitForm('Sign in')} disabled={!isFormValid()}>
              {isLoading ? 'Signing In...' : 'Sign in'}
            </FormButton>
            <p className={styles.Text}>
              Forgot your password?{' '}
              <span className={styles.Link} onClick={() => updateFormType('forgot-password')}>
                Reset
              </span>
            </p>
            <p className={styles.Text}>
              Don't have an account?{' '}
              <span className={styles.Link} onClick={() => updateFormType('sign-up')}>
                Sign up
              </span>
            </p>
          </div>
        );

      case 'sign-up':
        return (
          <div className={styles.FormContainer}>
            <div className={styles.InputRow}>
              <Input placeholder="First Name" className={styles.InputSmall} value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
              <Input placeholder="Last Name" className={styles.InputSmall} value={LastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <Input placeholder="Email" className={styles.Input} value={Email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Phone No (With Country Code *Optional)" className={styles.InputSmall} value={PhoneNo} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="Password" type="password" className={styles.Input} value={Password} onChange={(e) => setPassword(e.target.value)} />
            <div className={styles.CheckBox}>
              <Checkbox id="terms"  checked={AcceptedTerms} onCheckedChange={checked => setAcceptedTerms(checked === true)}  />
              <label htmlFor="terms" className={styles.Link}>
                I agree to the
              </label>
              <Link href={Links.Terms} target="_blank">
                <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
                  Terms & Conditions
                </span>
              </Link>
            </div>
            <FormButton className={styles.Button} isLoading={isLoading} onClick={() => SubmitForm('Sign in')} disabled={!isFormValid()}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </FormButton>
            
            <p className={styles.Text}>
              Already have an account?{' '}
              <span className={styles.Link} onClick={() => updateFormType('sign-in')}>
                Log in
              </span>
            </p>
          </div>
        );

      case 'forgot-password':
        return (
          <div className={styles.FormContainer}>
            <Input placeholder="Email or Phone No" className={styles.Input} value={Email} onChange={(e) => setEmail(e.target.value)} />
            <div className={styles.CheckBox}>
              <Checkbox id="terms"  checked={AcceptedTerms} onCheckedChange={checked => setAcceptedTerms(checked === true)} />
              <label htmlFor="terms" className={styles.Link}>
                I agree to the
              </label>
              <Link href={Links.Terms} target="_blank">
                <span className={styles.CheckBoxLabel} style={{ marginLeft: 4 }}>
                  Terms & Conditions
                </span>
              </Link>
            </div>
            <FormButton className={styles.Button} isLoading={isLoading} onClick={() => SubmitForm('Send reset link')} disabled={!isFormValid()}>
              {isLoading ? 'Sending Email...' : 'Send reset link'}
            </FormButton>
            <p className={styles.Text}>
              Remembered it?{' '}
              <span className={styles.Link} onClick={() => updateFormType('sign-in')}>
                Log in
              </span>
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={styles.MainContainer}>
      {VerificationContainer()}
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
  );
};

export default AuthenticatePage;
