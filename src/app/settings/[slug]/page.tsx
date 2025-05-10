import { notFound } from "next/navigation";
import { menuItems } from "@/lib/SettingMenuItems";

type Params = {
  params: { slug: string };
};

export default async function SettingsPage({ params }: Params) {
  const { slug } = await params;

  const matchedItem = Object.values(menuItems).find(
    (item) => item.slug === slug
  );

  if (!matchedItem) {
    notFound();
  }

  const Component = matchedItem.component;

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">{matchedItem.label}</h1>
      <p className="mb-4 text-gray-400">Settings page for "{slug}".</p>
      <div className="bg-zinc-900 p-4 rounded">
        <Component />
      </div>
    </div>
  );
}
