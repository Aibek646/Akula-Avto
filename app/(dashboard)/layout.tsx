import { getLoggedUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  const user = await getLoggedUser();
  if (!user) redirect("/");
  return (
    <div className="flex flex-col w-full h-auto">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
