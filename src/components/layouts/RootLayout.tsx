import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="dark bg-background text-foreground min-h-screen w-full font-geist">
      <Outlet />
    </div>
  );
}
