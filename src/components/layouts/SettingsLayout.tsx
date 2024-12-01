import { cn } from "@/lib/utils";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TooltipContainer } from "@/components/TooltipContainer";

const sidebarNavItems = [
  {
    title: "Profile",
    to: "/settings/profile",
  },
  {
    title: "Account",
    to: "/settings/account",
  },
  {
    title: "Open AI",
    to: "/settings/open-ai",
  },
];

export default function SettingsLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-10 pb-16 md:block min-h-screen">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <TooltipContainer label="Return to dashboard">
          <Button
            onClick={() => navigate("/")}
            variant="link"
            className="text-muted-foreground"
          >
            <Home className="h-5 w-5" />
          </Button>
        </TooltipContainer>
      </div>

      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <nav
            className={cn(
              "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"
            )}
          >
            {sidebarNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === item.to
                    ? "bg-muted hover:bg-muted"
                    : "hover:bg-transparent hover:underline",
                  "justify-start"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
