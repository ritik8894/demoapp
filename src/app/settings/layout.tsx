import NavBar from '@/components/Common/NavBar'
import Link from "next/link";
import { menuItems } from "@/lib/SettingMenuItems";
import { FaSignOutAlt } from "react-icons/fa";

const navBar = [
  {
    label: "Home",
    icon:FaSignOutAlt,
    // 
  },
  {
    label: "Profile",
    icon:"/Assets/Brokers/Coinbase_Logo.png",
    // 
  },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar items={navBar} />
      <div className="flex mr-4 ml-4 min-h-screen bg-white text-white">
        <aside className="flex flex-col w-64 bg-gradient-to-r from-gray-200 to-white p-5 rounded-3xl">
          <div>
            <h2 className="text-xl font-semibold mb-5 m-1 text-black cursor-default hover:text-white">
              Settings
            </h2>
            <ul className="space-y-2">
              {Object.entries(menuItems).map(([key, item]) => {
                const Icon = item.icon;
                return (
                  <li key={key}>
                    <Link
                      href={`/settings/${item.slug}`}
                      role="button"
                      draggable={false}
                      className="group flex items-center gap-3 px-4 py-2 rounded hover:bg-zinc-900"
                    >
                      {Icon && (
                        <Icon className="w-5 h-5 text-black group-hover:text-white transition duration-200" />
                      )}
                      <span className="text-black group-hover:text-white transition duration-200">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Button aligned bottom left */}
          <div className="mt-auto pt-5">
            <button
              className="justify-self-end w-10 h-10 rounded-full bg-black text-white flex items-center justify-center
              hover:bg-white hover:text-black transition duration-300 shadow-md"
            >
              <FaSignOutAlt className="w-4 h-4" />
            </button>
          </div>
        </aside>

        <main className="flex-1 bg-white p-5 border ml-1 rounded-4xl">{children}</main>
      </div>
      </>
  );
}
