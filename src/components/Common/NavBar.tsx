import Link from "next/link";
import { navBar as defaultNavBar } from "@/lib/NavBar";
import { MdAccountCircle } from "react-icons/md";
import { RiLoginCircleFill } from "react-icons/ri";


type NavItem = {
  label: string;
  href?: string;
  icon?: any; 
  subitems?: { label: string; href?: string }[];
};

type NavBarProps = {
  items?: NavItem[];
};

export default function NavBar({ items = defaultNavBar }: NavBarProps) {
  const isLoggedIn = true;

  return (
    <nav className="bg-black text-white p-3 mb-1.5 mr-1 ml-1 pr-6 pl-6 flex justify-center items-center gap-4 rounded-b-md">
      {items.map((item, index) => {
        const label = item.label ?? "";
        const default_value = defaultNavBar.find((i) => i.label === label) ?? {label: "",href: "#",icon: null,subitems: [],};
        const href = item.href ?? default_value.href;
        const Icon = item.icon ?? default_value.icon;
        const subitems = item.subitems ?? default_value.subitems ?? [];

        const isImage = typeof Icon === "string";

        return (
          <div key={index} className="relative group">
            <Link href={href} className="flex items-center gap-3 hover:text-gray-300">
              {Icon &&
                (isImage ? (
                  <img src={Icon} alt={label} className="w-4 h-4" />
                ) : (
                  <Icon className="w-4 h-4" />
                ))}
              {label}
              {subitems.length > 0 && <span className="ml-1">▾</span>}
            </Link>

            {/* Submenu */}
            {subitems.length > 0 && (
              <div className=" absolute left-0 mt-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200 z-10 min-w-max">
                {subitems.map((subitem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subitem.href ?? "#"}
                    className="block px-7 py-2.5 hover:bg-black hover:text-white rounded"
                  >
                    {subitem.label ?? "Untitled"}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="ml-auto flex justify-center items-center">
        <>
          {isLoggedIn ? (
            <Link href={"/dashboard"} className="flex items-center gap-1 hover:text-gray-300">
              <MdAccountCircle className="w-8 h-8" />
              Dashboard
            </Link>
          ) : (
            <Link href={"/authentication"} className="flex items-center gap-1 hover:text-gray-300">
              <RiLoginCircleFill className="w-8 h-8" />
              Login
            </Link>
          )}
        </>
      </div>
    </nav>
  );
}
