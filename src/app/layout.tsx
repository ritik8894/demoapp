// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="light"  style={{colorScheme : "light"}} >
      <body>
          {children}
      </body>
    </html>
  );
}
