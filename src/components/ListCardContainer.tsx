import { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface ListCardProps {
  title: string;
  description: string;
  showFilter?: boolean;
  filterLabel?: string;
  showFilteredOnly?: boolean;
  setShowFilteredOnly?: (show: boolean) => void;
  children: ReactNode;
}

export default function ListCardContainer({
  title,
  description,
  showFilter = false,
  filterLabel = "Filter",
  showFilteredOnly,
  setShowFilteredOnly,
  children,
}: ListCardProps) {
  const handleCheckChange = (check: boolean) => {
    if (setShowFilteredOnly) {
      setShowFilteredOnly(check);
    }
  };

  if (showFilter) {
    return (
      <Card>
        <CardHeader className="flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id={`${filterLabel}-filter`}
              checked={showFilteredOnly}
              onCheckedChange={handleCheckChange}
            />
            <Label htmlFor={`${filterLabel}-filter`}>{filterLabel}</Label>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
