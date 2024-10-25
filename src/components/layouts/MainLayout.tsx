import MainSidebar from "@/components/sidebars/MainSIdebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <MainSidebar />
      <Outlet />
    </div>
  );
}
