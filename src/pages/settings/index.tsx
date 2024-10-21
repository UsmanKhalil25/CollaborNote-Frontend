import React from "react";
import SidebarSettings from "@/components/SidebarSettings";
import InputForm from "@/components/ProfileSettings";
import AccountForm from "@/components/AccountSettings";
import GPTForm from "@/components/ChatGPTSettings";

const SettingsPage:React.FC = () => {

  return (
    <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <SidebarSettings />
    <div className="w-2/3 justify-between items-center p-4">
      <AccountForm />
    </div>
  </div>
  )
};

export default SettingsPage;
