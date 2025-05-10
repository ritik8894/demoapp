// src/app/page.tsx or src/app/home/page.tsx depending on your route
import React from 'react';
import Link from 'next/link';
// import { createClient } from '@/utils/supabase/server';
// import { Supabase} from '@/utils/supabase/client';

const Home =() => {
  // const Supabase = Supabase();

  const session  =  true;//Supabase.auth.getSession();

  return (
    <>
      <nav>
        <Link href="/">Home</Link> |{' '}
        {session ? (
          <span>Welcome!</span>
        ) : (
          <Link href="/authenticate?type=sign-in">you are not Login</Link>
        )}
      </nav>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of the app.</p>
      </div>
    </>
  );
};

export default Home;
