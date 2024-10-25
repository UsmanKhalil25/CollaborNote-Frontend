import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@/components/Container";
import Home from "@/pages/home";
import Explore from "@/pages/explore";
import Friends from "@/pages/friends";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import Register from "@/pages/register";
import MainLayout from "@/components/layouts/MainLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import SettingsAccount from "@/pages/settings/account";
import SettingsProfile from "@/pages/settings/profile";
import SettingsOpenAI from "@/pages/settings/open-ai";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route element={<MainLayout />}>
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
  );
};

export default Router;
