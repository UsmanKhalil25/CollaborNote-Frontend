import { Outlet } from "react-router-dom";

export default function SettingsLayout() {
  return (
    <div className="dark h-screen w-full bg-black">
      <Outlet />
    </div>
  );
}
