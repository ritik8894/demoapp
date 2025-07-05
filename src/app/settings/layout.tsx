"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter, usePathname, notFound } from "next/navigation";

import Profile from "./components/profile";
import EmailTrading from "./components/email-trading";
import ApiManagement from "./components/api-management";
import Notifications from "./components/notifications";

import { User, Mail, Webhook, Bell, LogOut } from "lucide-react"; 
import {Button, Tabs, Tab} from "@heroui/react";


const settingsMap = {
  "profile": {
    "label": "Profile",
    "slug":"profile",
    "icon":User,
    "component": Profile,
  },
  "email-trading": {
    "label": "Email Trading",
    "slug":"email-trading",
    "icon":Mail,
    "component": EmailTrading,
  },
  "api-management": {
    "label": "API Management",
    "slug":"api-management",
    "icon":Webhook,
    "component": ApiManagement,
  },
  "notifications": {
    "label": "Notifications",
    "slug":"notifications",
    "icon":Bell,
    "component": Notifications,
  },
};

export default function SettingsLayout({ children }: { children: ReactNode }) {

  const pathname = usePathname();
  const router = useRouter();
  const slug = settingsMap[pathname.split("/")[2] as keyof typeof settingsMap] ? pathname.split("/")[2] : "profile";

  const [selectedIndex, setSelectedIndex] = useState(slug);
  const Component = settingsMap[selectedIndex as keyof typeof settingsMap]?.component;
  useEffect(() => {
    const newUrl = `/settings/${selectedIndex}`;
    if (pathname !== newUrl) {
      router.replace(newUrl); 
    }
  }, [selectedIndex,pathname,router]);

  return (
  <div className="flex h-screen w-screen">
    <aside className="flex flex-col w-[17.5%] h-full">
      <h2 className="font-semibold p-5 text-center cursor-default">
        User Settings
      </h2>
      <Tabs fullWidth isVertical variant="light" classNames={{tab: "h-12"}} selectedKey={selectedIndex} onSelectionChange={(key) => setSelectedIndex(key.toString())}>
        {Object.entries(settingsMap).map(([key, { label, icon: Icon }]) => (
          <Tab key={key} title={ <div className="flex items-center space-x-2"> <Icon size={22} /> <span>{label}</span></div>}/>
        ))}
      </Tabs>
 
      <Button radius="full" variant="shadow" className="m-5 mt-auto bg-black text-white dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Sign Out <LogOut className="w-3 h-3" />
      </Button>
    </aside>

    <main className="z-1 flex-1 p-5 border m-1.5 rounded-4xl overflow-y-auto">
      {Component? <Component/> : notFound()}
      {children}
    </main>
  </div>
  );
}
