"use client";
import {HeroUIProvider} from '@heroui/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { ReactNode } from 'react';
import { ThemeSwitch } from "@/components/Common/ThemeSwitch";

function ThemeProvider({children}: { children: ReactNode }) {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  )
}

export {ThemeProvider , ThemeSwitch };