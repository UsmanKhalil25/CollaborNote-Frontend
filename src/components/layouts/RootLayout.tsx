import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="dark bg-background min-h-screen w-full bg-black font-geist">
      <Outlet />
    </div>
  );
}
