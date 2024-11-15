import { Outlet } from "react-router-dom";
import MainSidebar from "@/components/sidebars/MainSIdebar";
import UserNav from "@/components/UserNav.tsx";

export default function DashboardLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainSidebar />
        <div className="px-8 py-4 flex flex-col gap-6">
            <div className="flex justify-end">
                <UserNav/>
            </div>
            <Outlet />
        </div>
    </div>
  );
}
