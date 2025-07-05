import { Supabase } from '@/utils/supabase/client';
import {addToast} from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';

export interface CredentialProps {
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Email_Phone: string;
  PhoneNo: string;
  Password: string;
  ReferralCode: string | null;
}

export async function SignUpUser(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void
): Promise<boolean> {
  let resstatus = false;
  setIsLoading(true);

  try {
    const userMetadata: Record<string, string> = {
      first_name: credentials.FirstName,
      last_name: credentials.LastName,
      full_name: credentials.FirstName+" "+credentials.LastName,
      phone_no: credentials.PhoneNo
    };

    if (credentials.ReferralCode) {
      userMetadata.referral_code = credentials.ReferralCode;
    }

    // 1. Create account
    const { data, error: signUpError } = await Supabase().auth.signUp({
      email: credentials.EmailAddress,
      password: credentials.Password,
      options: {
        data: userMetadata,
      },
    });

    if (signUpError || !data.user) {
      addToast({
        title: "Account Creation Failed",
        description: signUpError?.message || "Unable to create account.",
        timeout: 3000,
        variant: "solid",
        color: "danger",
      });
    } else {
      const isExistingUser = Array.isArray(data.user.identities) && data.user.identities.length === 0;

      if (isExistingUser) {
        // 2. Account Already Found,
        addToast({
          title: "Account Already Found",
          description: "Account Already Found With This Email.",
          timeout: 3000,
          variant: "solid",
          color: "danger",
        });
      } else {
        // Account created.
        addToast({
          title: "Account Created!",
          description: "Account Created Successfully! Verification Email Send Please Verify. Adding Phone Number...",
          promise: new Promise((resolve) => setTimeout(resolve, 5000)),
          variant: "solid",
          color: "primary",
        });
      
        // 3. Call Supabase function to add phone
        const phoneUpdateResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/supabase-user-phone-update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ email: credentials.EmailAddress }),
          }
        );
        const phoneUpdateData = await phoneUpdateResponse.json();

        if (!phoneUpdateResponse.ok) {
          addToast({
            title: "Phone Number Update Failed",
            description: phoneUpdateData.error || "Could not update phone number.",
            timeout: 3000,
            // shouldShowTimeoutProgress: true,
            variant: "solid",
            color: "danger",
          });
        } else {
          addToast({
            title: "Phone Number Updated",
            description: "Verification instructions sent to your email and phone.",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            variant: "solid",
            color: "success",
          });
          resstatus = true;
        }
      }
    }
  } catch (err: unknown) {
    addToast({
      title: "Unexpected Error",
      description: String(err),
      timeout: 3000,
      variant: "solid",
      color: "danger",
    });
  } finally {
    setIsLoading(false);
    setIsVerified(resstatus);
    return resstatus;
  }
}

export async function SignInUser(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void
): Promise<boolean> {
  let resstatus = false;
  setIsLoading(true);

  try {
    const { data, error } = await Supabase().auth.signInWithPassword({
      email:credentials.Email_Phone,
      password:credentials.Password,
    });

    if (error) {
      addToast({
        title: "Sign In Error",
        description: error.message,
        timeout: 3000,
        variant: "solid",
        color: "danger",
      });
    }else{
      addToast({
          title: "Sign in successful!",
          description: "Sign in successful!",
          timeout: 3000,
          variant: "bordered",
          color: "success",
      });
      resstatus = true;
    }
  } catch (err: unknown) {
    addToast({
        title: "Unexpected Sign In Error",
        description: String(err),
        timeout: 3000,
        variant: "solid",
        color: "danger",
      });
  } finally {
    setIsLoading(false);
    setIsVerified(resstatus);
    return resstatus;
  }
}

export async function ForgotPassword(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void
): Promise<boolean> {
  let resstatus = false;
  setIsLoading(true);
  try {
    const { data, error } = await Supabase().auth.resetPasswordForEmail(credentials.EmailAddress);
    if (error) {
      addToast({
        title: 'Password Forgot Error',
        description: error.message,
        timeout: 3000,
        variant: 'solid',
        color: 'danger',
      });
    }else{
      addToast({
        title: 'Reset Link Sent',
        description: 'A Password Reset Link Has Been Sent To Your Email!',
        timeout: 3000,
        variant: 'solid',
        color: 'success',
      });
      resstatus = true;
    }
  } catch (err) {
    addToast({
      title: 'Unexpected Error',
      description: `Unexpected error during password reset: ${err}`,
      timeout: 3000,
      shouldShowTimeoutProgress: true,
      variant: 'solid',
      color: 'danger',
    });
  } finally {
    setIsLoading(false);
    setIsVerified(resstatus);
    return resstatus;
  }
}

export async function SetNewPassword(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void,
  router: ReturnType<typeof useRouter>,
  searchParams: ReturnType<typeof useSearchParams>
): Promise<boolean> {
  let resstatus = false;
  setIsLoading(true);
  try {
    const { error } = await Supabase().auth.updateUser({
      password: credentials.Password,
    });
    if (error) {
      addToast({
        title: 'Password Update Error',
        description: error.message,
        timeout: 3000,
        variant: 'solid',
        color: 'danger',
      });
    }else{
      addToast({
        title: 'Password Reset Successful!',
        description: 'Your password has been updated. Redirecting...',
        timeout: 3000,
        variant: 'solid',
        color: 'success',
      });
      resstatus = true;
      const redirecturl = new URLSearchParams(searchParams.toString()).get('redirect_url') || '/';
      router.push(redirecturl);
      setTimeout(() => setIsVerified(resstatus), 1000);
    }
  } catch (err) {
    addToast({
      title: 'Unexpected Error',
      description: `Unexpected error during password reset: ${err}`,
      timeout: 3000,
      variant: 'solid',
      color: 'danger',
    });
  } finally {
    setIsLoading(false);
    setIsVerified(resstatus);
    return resstatus;
  }
}