import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ReactElement, lazy } from "react";

import { Toaster } from "@/components/ui/toaster";

import RootLayout from "@/components/layouts/RootLayout";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import SettingsLayout from "@/components/layouts/SettingsLayout";
import SuspenseFallback from "@/components/SuspenseFallback";

const LoginPage = lazy(() => import("@/app/login"));
const RegisterPage = lazy(() => import("@/app/register"));
const NotFoundPage = lazy(() => import("@/app/not-found"));
const DashboardPage = lazy(() => import("@/app/dashboard"));
const StudyRoomsPage = lazy(() => import("@/app/study-rooms"));
const StudyRoomDetailsPage = lazy(() => import("@/app/study-rooms/[roomId]"));
const StudyRoomOngoingPage = lazy(
  () => import("@/app/study-rooms/ongoing/[roomId]")
);
const StudyRoomVerifyPage = lazy(
  () => import("@/app/study-rooms/verify/[roomId]")
);
const StudyRoomNotFound = lazy(() => import("@/app/study-rooms/not-found"));
const FriendsPage = lazy(() => import("@/app/friends"));
const SettingsAccount = lazy(() => import("@/app/settings/account"));
const SettingsProfile = lazy(() => import("@/app/settings/profile"));
const SettingsOpenAI = lazy(() => import("@/app/settings/open-ai"));

import { useAuth } from "@/hooks/use-auth";

const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  STUDY_ROOMS: "/study-rooms",
  FRIENDS: "/friends",
  SETTINGS: "/settings",
} as const;

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SuspenseFallback />;
  }

  return user ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

const PublicRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SuspenseFallback />;
  }

  return user ? <Navigate to={ROUTES.DASHBOARD} replace /> : children;
};

export default function Router() {
  return (
    <>
      <SuspenseFallback>
        <Routes>
          <Route element={<RootLayout />}>
            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.REGISTER}
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            <Route element={<PrivateRoute />}>
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

              <Route element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path={ROUTES.STUDY_ROOMS}>
                  <Route index element={<StudyRoomsPage />} />
                  <Route path=":roomId" element={<StudyRoomDetailsPage />} />
                </Route>
                <Route path={ROUTES.FRIENDS} element={<FriendsPage />} />
              </Route>

              <Route path={ROUTES.SETTINGS} element={<SettingsLayout />}>
                <Route index element={<SettingsProfile />} />
                <Route path="account" element={<SettingsAccount />} />
                <Route path="profile" element={<SettingsProfile />} />
                <Route path="open-ai" element={<SettingsOpenAI />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SuspenseFallback>
      <Toaster />
    </>
  );
}
