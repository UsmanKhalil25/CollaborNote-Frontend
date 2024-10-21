import { Link } from "react-router-dom";
import { Notebook, CircleUserRound, UserRoundPen, Terminal } from "lucide-react";

export default function Sidebar() {
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
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <CircleUserRound className="h-4 w-4" />
              Account
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <UserRoundPen className="h-4 w-4" />
              Profile
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Terminal className="h-4 w-4" />
              ChatGPT Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
