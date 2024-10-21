import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Register from "@/pages/register";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import SettingsAccount from "@/pages/settings/account";
import SettingsProfile from "@/pages/settings/profile";
import SettingsOpenAI from "@/pages/settings/open-ai";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route index element={<SettingsProfile />} />
          <Route path="account" element={<SettingsAccount />} />
          <Route path="profile" element={<SettingsProfile />} />
          <Route path="open-ai" element={<SettingsOpenAI />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
