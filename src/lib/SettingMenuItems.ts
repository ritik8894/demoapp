// src/lib/menuItems.ts

// importing incons
import { AiFillApi } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";


//Importing Page Components
import Profile from "@/app/settings/Profile";
import EmailTrading from "@/app/settings/Profile";
import APIManagement from "@/app/settings/Profile";
import Notification from "@/app/settings/Profile";

export const menuItems = {
  profile: {
    label: "Profile",
    slug: "profile",
    icon: MdAccountCircle,
    component: Profile,
  },
  EmailTrading: {
    label: "Email Trading",
    slug: "email-trading",
    icon: MdEmail,
    component: EmailTrading,
  },
  APIManagment: {
    label: "API Managment",
    slug: "api-managment",
    icon: AiFillApi,
    component: APIManagement,
  },
  Notification: {
    label: "Notification",
    slug: "notification",
    icon: IoNotifications,
    component: Notification,
  },
};
