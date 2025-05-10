// src/lib/navBar.ts

import { FaHome, FaUser } from "react-icons/fa";

export const navBar = [
  {
    label: "Home",
    href: "/profile",
    icon: FaHome,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: FaUser,
    subitems: [
      {
        label: "View Profile",
        href: "/profile/view",
      },
      {
        label: "Edit Profile",
        href: "/profile/edit",
      },
    ],
  },
  {
    label: "Logo Link",
    href: "/branding",
    icon: "/logo.png", // Image URL
  },
];

