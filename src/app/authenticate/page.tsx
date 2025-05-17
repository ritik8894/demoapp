'use client';
import { useState, useEffect, useCallback } from 'react';
import React from 'react';
import { FaApple, FaGalacticSenate } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import {TextField  ,sxfuncTextField} from "@/components/ui/custom-ui";
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Supabase } from '@/utils/supabase/client';
import {theme,styles , Links } from './styles';


const AuthenticatePage = () => {

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

    const type = SearchParams.get('type');
    if (type && ['sign-in', 'sign-up', 'forgot-password'].includes(type)) {
      FormType(type as 'sign-in' | 'sign-up' | 'forgot-password');
    } else {
      // Remove type parameter if it's not valid
      const params = new URLSearchParams(SearchParams.toString());
      // params.delete('type');
      params.set('type', "sign-in");
      router.push(`?${params.toString()}`, { scroll: false });
    }
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
        <span className="absolute inset-0 z-1 flex items-center justify-center space-x-2 bg-black backdrop-blur-sm pointer-events-none">
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.1s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.2s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.3s]" />
          <span className="h-2 w-2 rounded-full bg-white animate-[bounce_0.7s_infinite_0.4s]" />
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
    const [EmailAddress, setEmailAddress] = useState('');
    const [PhoneNo, setPhoneNo] = useState('');
    const [Password, setPassword] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [AcceptedTerms, setAcceptedTerms] = useState(true);
    const [SPassword, setSPassword] = useState(false);




    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };



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
      var valid_email = emailRegex.test(EmailAddress);
      var valid_password = Password.length > 6;
      var valid_FirstName = FirstName != "";
      var confirm_term_condition = AcceptedTerms;

      if (Form === 'sign-in') {
        if (!valid_email){
          var valid_email = phoneRegex.test(EmailAddress);
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
          var valid_email = phoneRegex.test(EmailAddress);
        };
        return valid_email && confirm_term_condition
        };
      return false;
    };

    const SubmitForm = (action: string) => {

      setIsLoading(true);

      // if (Form === 'sign-up') {
      //   SignUp(Email, Password, FirstName, LastName, PhoneNo);
      // } else if (Form === 'sign-in') {
      //   SignIn(Email, Password);
      // } else if (Form === 'forgot-password') {
      //   ForgotPassword(Email);
      // }
  
      // setTimeout(() => {
      //   setIsLoading(false);
      //   // setVerificationType('phone'); // Open verification container
      // }, 1000);
    };

    switch (Form) {
      case 'sign-in':
        return (
          <div className={styles.FormContainer}>
            <TextField type="text" label="Email Address/Phone No" sx={sxfuncTextField({input:EmailAddress,er:false})} value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>    
            <TextField type="password" verify={false} label="Password" sx={sxfuncTextField({input:Password,er:false})} value={Password} onChange={(e) => setPassword(e.target.value)}/>
            
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
              <TextField label="First Name"  sx={sxfuncTextField({input:FirstName})} value={FirstName} onChange={(e) => setFirstName(e.target.value)} />
              <TextField label="Last Name" sx={sxfuncTextField({input:LastName})} value={LastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <TextField type="email" label="Email Address" sx={sxfuncTextField({input:EmailAddress})} value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
            <TextField type={PhoneNo? "phone":"text"} label="Phone No" sx={sxfuncTextField({input:PhoneNo,er:false})} value={PhoneNo} onChange={(e) => setPhoneNo(e.target.value)}/>
            <TextField type="password"  verify={false} label="Password" sx={sxfuncTextField({input:Password,er:false})} value={Password} onChange={(e) => setPassword(e.target.value)}/>
            {/* <TextField placeholder="Password" label="Password" type={showPassword ? 'text' : 'password'}  sx={sxfuncTextField(Password)} value={Password} onChange={(e) => setPassword(e.target.value)} /> */}
            
            
            {/* <FormControl sx={{...sxfuncTextField(Password)}} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'hide the password' : 'display the password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl> */}
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
            <TextField type="email" label="Email Address/Phone No" sx={sxfuncTextField({input:EmailAddress})} value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
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