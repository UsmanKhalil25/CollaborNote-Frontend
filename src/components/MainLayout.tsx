import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return <div className="dark h-screen w-full bg-black">{children}</div>;
}
