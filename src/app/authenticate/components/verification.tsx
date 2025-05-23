"use client";

import { useState } from 'react';
import {styles } from './styles';
import {sxfuncTextField} from "@/components/ui/custom-ui";
import { Button } from '@/components/ui/button';
import { FormButton } from './forms';
import { MuiOtpInput } from 'mui-one-time-password-input';

export interface VerificationProps {
  verificationType: ('phone' | 'email' | '2fa' | null);
  handleVerificationComplete: () => void;
  setVerificationType: (type: 'phone' | 'email' | '2fa' | null) => void;
  verificationSteps: ('phone' | 'email' | '2fa')[];
  setVerificationSteps: (steps: ('phone' | 'email' | '2fa')[]) => void;
}

export const VerificationContainer = (props: VerificationProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [OtpValue, setOtpValue] = useState("");
    // const [verificationSteps, setVerificationSteps] = useState(['email', '2fa']);
    const [verificationStepsStatus, setVerificationStepsStatus] = useState<number[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [resendTimer, setResendTimer] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Determine the current step
    const currentStep = props.verificationSteps[currentStepIndex] || (props.verificationType || '');

   
    
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
        const otpCode = OtpValue;
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
            if (currentStepIndex < props.verificationSteps.length - 1) {
              setCurrentStepIndex(currentStepIndex + 1);
              setOtpValue("");
            } else {
              props.handleVerificationComplete();
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
    if (!props.verificationType) return null;

    const handleCloseVerification = () => {
      props.setVerificationType(null);
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

            {props.verificationSteps.length > 1 && (
              <div className={styles.VerificationContainer_Status_div}>
                {props.verificationSteps.map((step, index) => (
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
              className= {`ml-4 p-4 ${styles.Button}  w-5 h-5 rounded-full`}
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
          <div className="flex flex-col w-100 items-start">
            <MuiOtpInput length={6} autoFocus value={OtpValue} onChange={setOtpValue} TextFieldsProps={{sx:sxfuncTextField({input:"",er:false})}} />
          </div>
          {/* <div className={styles.VerificationContainer_Input_Container}>
            
          </div> */}

          {true && (
            <div className={`mb-4 text-sm ${verificationStepsStatus[currentStepIndex] === 0 ? 'text-red-500' : verificationStepsStatus[currentStepIndex] === 1 ? 'text-green-500' : verificationStepsStatus[currentStepIndex] === 3 ? 'text-blue-500' : 'text-red-500'}`}>
              {verificationStepsStatus[currentStepIndex] === 0 && 'Verification Failed Try Again !' }
              {verificationStepsStatus[currentStepIndex] === 1 && 'Verification Successful !' }
              {verificationStepsStatus[currentStepIndex] === 3 && 'OTP Sent Successfully !' }
              {resendTimer > 0 && ` Resend OTP in ${resendTimer} seconds`}
            </div>
          )}
          <FormButton className={styles.Button} isLoading={isLoading} onClick={handleVerify} disabled={isLoading || OtpValue.length < 6}>
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

