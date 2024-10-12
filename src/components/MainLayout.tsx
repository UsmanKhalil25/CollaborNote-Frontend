import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="h-screen w-full bg-black">{children}</div>;
};

export default MainLayout;
