import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthUser();
  if (!auth) redirect("/login");

  let isAdmin = auth.role === "admin";
  try {
    await connectDB();
    const user = await User.findById(auth.userId).lean();
    if (user) isAdmin = user.role === "admin";
  } catch {
    /* mongo optional at build */
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardSidebar isAdmin={isAdmin} />
      <main
        className={cn(
          "min-h-screen transition-all duration-300 pt-16 md:pt-0 md:pl-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
