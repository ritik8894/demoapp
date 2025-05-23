'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from "@heroui/react";
import { Supabase } from '@/utils/supabase/client';
import { Spinner } from "@heroui/react";

interface AutheticatedRedirectButtonProps {
  label?: string;
  redirect_url?: string;
}

function useAuthSession() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    Supabase().auth.getSession().then(({ data }) => {
      setSession(data?.session);
    });

    const { data: listener } = Supabase().auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return session;
}


export const SignOutButton: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = encodeURIComponent(pathname);
  const session = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await Supabase().auth.signOut();
    setIsLoading(false);
    router.refresh(); 
  };
  const handleAuthenticate =  () => {
    setIsLoading(true);
    router.push(`/authenticate?type=sign-in&redirect_url=${redirectUrl}`, { scroll: false });
  };
  return ( 
    <Button isLoading={isLoading} color="primary" variant="shadow" onPress={session ? handleSignOut: handleAuthenticate}>
      {session ? "Sign Out" : "Login"}
    </Button>
  );
}

export const AutheticatedButton: React.FC<AutheticatedRedirectButtonProps> = ({ label, redirect_url }) => {
  const router = useRouter();
  const pathname = usePathname();
  const redirectUrl = encodeURIComponent(pathname);
  const session = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthenticate =  () => {
    setIsLoading(true);
    router.push(`/authenticate?type=sign-in&redirect_url=${redirectUrl}`, { scroll: false });
  };
  const handleRedirect = (redirect_url?: string) => {
    setIsLoading(true);
    router.push( redirect_url? redirect_url: label ? `/${label.toLocaleLowerCase()}`: "/dashboard", { scroll: false });
  };
  return (   
    <Button isLoading={isLoading} color="primary" variant="shadow" onPress={session ? () => handleRedirect(redirect_url) : handleAuthenticate}>
      {session ? label? label :"Dashboard": "Login"}
    </Button>
  );
}

