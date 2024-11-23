import { BookOpen, Users, Plus, UserRoundPlus } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs.tsx";
import { MonthlyActivityChart } from "@/components/MonthlyActivityChart.tsx";
import { TypographyH2 } from "@/components/ui/typography-h2.tsx";
import { RecentActivityList } from "@/components/RecentActivityList.tsx";

const CARDS = [
  { label: "Total Study Rooms", icon: BookOpen, number: 23 },
  { label: "Friends Connected", icon: Users, number: 10 },
  { label: "Invites Received", icon: UserRoundPlus, number: 50 },
  { label: "Points Earned", icon: Plus, number: 150 },
];

export default function DashboardPage() {
  return (
    <div className="h-full space-y-4">
      <TypographyH2 text={"Dashboard"} />
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CARDS.map((card, index) => (
              <InfoCard
                key={index}
                label={card.label}
                icon={card.icon}
                number={card.number}
              />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overall Performance</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <MonthlyActivityChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  You joined 20 rooms in last 30 days.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivityList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function InfoCard({
  label,
  icon: Icon,
  number,
}: {
  label: string;
  icon: any;
  number: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <Icon />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{number}</div>
      </CardContent>
    </Card>
  );
}
