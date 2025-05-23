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
  setIsLoading(true);

  try {

    const userMetadata: Record<string, string> = {
      first_name: credentials.FirstName,
      last_name: credentials.LastName,
      phone: credentials.PhoneNo,
    };

    if (credentials.ReferralCode) {
      userMetadata.referral_code = credentials.ReferralCode;
    }

    const { data, error: signUpError } = await Supabase().auth.signUp({
      email: credentials.EmailAddress,
      password:credentials.Password,
      options: {
        data: userMetadata,
      },
    });

    if (signUpError) {
      addToast({
        title: "Sign Up Error",
        description: signUpError.message,
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: "bordered",
        color: "danger",
      });
      return false;
    }

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
        title: "Phone Update Error",
        description: phoneUpdateData.error,
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: "bordered",
        color: "danger",
      });
    }
    addToast({
      title: "Sign Up Successful!",
      description: "Sign up successful! Please verify your email and phone otp sent.",
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: "bordered",
      color: "success",
    });
    return true;
  } catch (err: unknown) {
    addToast({
      title: "Unexpected Sign Up Error",
      description: String(err),
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: "bordered",
      color: "danger",
    });
    return false;
  } finally {
    setIsLoading(false);
  }
}

export async function SignInUser(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void
): Promise<boolean> {
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
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: "bordered",
        color: "danger",
      });
      return false;
    }

    addToast({
        title: "Sign in successful!",
        description: "Sign in successful!",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        variant: "bordered",
        color: "success",
    });
    
    setIsVerified(true)
    return true;
  } catch (err: unknown) {
    addToast({
        title: "Unexpected Sign In Error",
        description: String(err),
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: "bordered",
        color: "danger",
      });
    return false;
  } finally {
    setIsLoading(false);
  }
}

export async function ForgotPassword(
  credentials: CredentialProps,
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void
): Promise<'email' | null> {
  setIsLoading(true);
  try {
    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(credentials.Email_Phone);

    if (!isEmail) {
      addToast({
        title: 'Invalid Input',
        description: 'Please enter a valid email address for password reset.',
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: 'bordered',
        color: 'danger',
      });
      return null;
    }

    const { data, error } = await Supabase().auth.resetPasswordForEmail(credentials.Email_Phone);

    if (error) {
      addToast({
        title: 'Reset Link Send Error',
        description: error.message,
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: 'bordered',
        color: 'danger',
      });
      return null;
    }

    addToast({
      title: 'Reset Link Sent',
      description: 'A password reset link has been sent to your email!',
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: 'bordered',
      color: 'success',
    });
    setIsVerified(true);
    return 'email';
  } catch (err) {
    addToast({
      title: 'Unexpected Error',
      description: `Unexpected error during password reset: ${err}`,
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: 'bordered',
      color: 'danger',
    });
    return null;
  } finally {
    setIsLoading(false);
  }
}

export async function SetNewPassword(
  credentials: CredentialProps, // No OTP needed
  setIsLoading: (state: boolean) => void,
  setIsVerified: (state: boolean) => void,
  router: ReturnType<typeof useRouter>,
  searchParams: ReturnType<typeof useSearchParams>
): Promise<boolean> {
  setIsLoading(true);
  try {
    // User is already authenticated via magic link/session
    const { error } = await Supabase().auth.updateUser({
      password: credentials.Password,
    });

    if (error) {
      addToast({
        title: 'Password Update Error',
        description: error.message,
        timeout: 10000,
        shouldShowTimeoutProgress: true,
        variant: 'bordered',
        color: 'danger',
      });
      return false;
    }

    addToast({
      title: 'Password Reset Successful!',
      description: 'Your password has been updated. Redirecting...',
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: 'bordered',
      color: 'success',
    });
    
    const params = new URLSearchParams(searchParams.toString());
    params.delete('forgot-password');
    router.replace(`?${params.toString()}`);
    setTimeout(() => setIsVerified(true), 1000);
    setIsVerified(true);

    return true;
  } catch (err) {
    addToast({
      title: 'Unexpected Error',
      description: `Unexpected error during password reset: ${err}`,
      timeout: 10000,
      shouldShowTimeoutProgress: true,
      variant: 'bordered',
      color: 'danger',
    });
    return false;
  } finally {
    setIsLoading(false);
  }
}