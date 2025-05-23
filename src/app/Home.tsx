'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Supabase } from '@/utils/supabase/client';
import { SignOutButton, AutheticatedButton } from '@/components/Common/AuthButtons';

export default function ClientHome() {
  const [session, setSession] = useState(false);

  useEffect(() => {
    Supabase().auth.getSession().then(({ data }) => {
      setSession(data?.session ? true : false);
    });
  }, []);

  return (
    <>
      <nav>
        <Link href="/">Home</Link> |{' '}
        {session ? (
          <>
            <span>Welcome!</span>
            <SignOutButton/>
            <AutheticatedButton label="Home"/>
          </>
        ) : (
          <>
            <SignOutButton/>
            <AutheticatedButton/>
          </>
        )}
      </nav>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of the app.</p>
      </div>
    </>
  );
}
