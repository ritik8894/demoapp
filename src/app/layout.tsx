// src/app/layout.tsx

import './globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'
import { Provider } from "@/components/ui/provider";
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server' // adjust path if needed
// import { ThemeProvider } from "@material-tailwind/react";
 

export default async function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
        {/* <ThemeProvider> */}
          {children}
      {/* </ThemeProvider> */}
        </Provider> 
      </body>
    </html>
  )
}

