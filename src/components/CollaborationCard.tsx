import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const PARTICIPANTS = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/03.png",
    fallback: "OM",
    access: "edit",
  },
  {
    name: "Isabella Nguyen",
    email: "b@example.com",
    avatar: "/avatars/05.png",
    fallback: "IN",
    access: "view",
  },
  {
    name: "Sofia Davis",
    email: "p@example.com",
    avatar: "/avatars/01.png",
    fallback: "SD",
    access: "view",
  },
];

export default function CollabrationCard() {
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>Share this document</CardTitle>
        <CardDescription>
          Anyone with the link can view this document.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Input value="http://example.com/link/to/document" readOnly />
          <Button variant="secondary" className="shrink-0">
            Copy Link
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <div className="text-sm font-medium">People with access</div>
          <div className="grid gap-6">
            {PARTICIPANTS.map((user) => (
              <div
                key={user.email}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.fallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Select defaultValue={user.access}>
                  <SelectTrigger className="ml-auto w-[110px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="edit">Can edit</SelectItem>
                    <SelectItem value="view">Can view</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
