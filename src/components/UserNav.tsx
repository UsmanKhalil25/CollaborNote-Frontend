import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LoadingText } from "@/components/ui/loading-text";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

import { getUserInitials } from "@/utils";
import { useLogoutUser } from "@/mutations";
import { Response } from "@/types/api";

const NAV_ITEMS = [
  { label: "Profile", path: "/profile" },
  { label: "Settings", path: "/settings" },
];

export default function UserNav() {
  const { user, setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const { mutate: blacklistToken, isPending } = useLogoutUser({
    onSuccess: (response: Response<null>) => {
      setUser(null);
      setToken(null);
      toast({ title: response.message, description: "Come back soon" });
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: error.message || "An unexpected error occurred",
      });
    },
  });

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    blacklistToken();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {getUserInitials(user?.firstName, user?.lastName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? <LoadingText text="Logging out..." /> : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
