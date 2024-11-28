import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ReactElement, useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/auth/auth-context.ts";

import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";

import LoginPage from "@/app/login";
import RegisterPage from "@/app/register";
import NotFoundPage from "@/app/not-found";
import DashboardPage from "@/app/dashboard";
import StudyRoomsPage from "@/app/study-rooms";
import StudyRoomDetailsPage from "@/app/study-rooms/[roomId]";
import StudyRoomOngoingPage from "@/app/study-rooms/ongoing/[roomId]";
import StudyRoomVerifyPage from "@/app/study-rooms/verify/[roomId]";
import StudyRoomNotFound from "@/app/study-rooms/not-found";
import FriendsPage from "@/app/friends";

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
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="study-rooms" element={<StudyRoomsPage />} />
              <Route
                path="study-rooms/:roomId"
                element={<StudyRoomDetailsPage />}
              />
              <Route path="friends" element={<FriendsPage />} />
            </Route>

            <Route
              path="study-rooms/ongoing/:roomId"
              element={<StudyRoomOngoingPage />}
            />
            <Route
              path="study-rooms/verify/:roomId"
              element={<StudyRoomVerifyPage />}
            />

            <Route
              path="study-rooms/not-found"
              element={<StudyRoomNotFound />}
            />

            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="account" element={<SettingsAccount />} />
              <Route path="profile" element={<SettingsProfile />} />
              <Route path="open-ai" element={<SettingsOpenAI />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
