import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";

import Home from "@/app/home";
import Explore from "@/app/explore";
import Friends from "@/app/friends";
import Login from "@/app/login";
import NotFound from "@/app/not-found";
import Register from "@/app/register";

import SettingsAccount from "@/app/settings/account";
import SettingsProfile from "@/app/settings/profile";
import SettingsOpenAI from "@/app/settings/open-ai";

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Explore />} />
            <Route path="friends" element={<Friends />} />
          </Route>
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="account" element={<SettingsAccount />} />
            <Route path="profile" element={<SettingsProfile />} />
            <Route path="open-ai" element={<SettingsOpenAI />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
