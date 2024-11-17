import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/auth/auth-context.ts";
import { getUserInitials } from "@/lib/utils.ts";

const NAV_ITEMS = [
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
];

export default function UserNav() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    auth?.setUser(null);
    auth?.setToken(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {getUserInitials(auth?.user?.first_name, auth?.user?.last_name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {auth?.user?.first_name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {auth?.user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {NAV_ITEMS.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleNavigation(item.path)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
