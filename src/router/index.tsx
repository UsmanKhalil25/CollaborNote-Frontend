import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ReactElement, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/auth/auth-context.ts";

import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";

import Home from "@/app/home";
import Friends from "@/app/friends";
import Login from "@/app/login";
import NotFound from "@/app/not-found";
import Register from "@/app/register";

import SettingsAccount from "@/app/settings/account";
import SettingsProfile from "@/app/settings/profile";
import SettingsOpenAI from "@/app/settings/open-ai";

const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const auth = useContext(AuthContext);
  if (auth?.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default function Router() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<Home />} />
              <Route path="friends" element={<Friends />} />
            </Route>

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="account" element={<SettingsAccount />} />
              <Route path="profile" element={<SettingsProfile />} />
              <Route path="open-ai" element={<SettingsOpenAI />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
