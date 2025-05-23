import './globals.css';
import * as React from "react";

// import { cookies } from 'next/headers';
// import { createClient } from '@/utils/supabase/server';
import { ThemeProvider , ThemeSwitch } from "../components/Common/providers";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ThemeSwitch />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
