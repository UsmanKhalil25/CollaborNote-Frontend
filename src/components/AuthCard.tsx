import { ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description?: string;
  alternativeMessage: ReactNode;
  linkText: string;
  linkHref: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  description = "",
  alternativeMessage,
  linkText,
  linkHref,
  children,
}: AuthCardProps) {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
        <div className="mt-4 text-center text-sm">
          {alternativeMessage}{" "}
          <Link to={linkHref} className="underline">
            {linkText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
