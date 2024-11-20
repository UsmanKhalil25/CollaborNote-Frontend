import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { getUserInitials } from "@/lib/utils";

interface UserInfoProps {
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

export default function UserInfo({
  first_name,
  last_name,
  email,
  avatar,
}: UserInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>
          {getUserInitials(first_name, last_name)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium leading-none">
          {first_name} {last_name}
        </p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
