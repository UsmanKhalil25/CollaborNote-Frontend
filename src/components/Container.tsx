import { Outlet } from "react-router-dom";

export default function Container() {
  return (
    <div className="dark bg-background min-h-screen w-full bg-black">
      <Outlet />
    </div>
  );
}
