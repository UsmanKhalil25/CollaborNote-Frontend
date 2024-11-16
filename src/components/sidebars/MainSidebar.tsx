import { Link, useLocation } from "react-router-dom";
import { Home, Pen, Users, Notebook } from "lucide-react";

export default function MainSidebar() {
  const location = useLocation();

  const ROUTES = [
    { label: "Dashboard", path: "/", icon: Home },
    { label: "Notes", path: "/notes", icon: Pen },
    { label: "Friends", path: "/friends", icon: Users },
  ];

  const LINK_CLASSES = {
    ACTIVE:
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary",
    UNACTIVE:
      "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="text-primary flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Notebook className="h-6 w-6" />
            <span>CollaborNote</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {ROUTES.map((route) => (
              <Link
                key={route.label}
                to={route.path}
                className={
                  location.pathname === route.path
                    ? LINK_CLASSES.ACTIVE
                    : LINK_CLASSES.UNACTIVE
                }
              >
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
