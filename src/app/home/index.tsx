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

const RECENT_ACTIVITIES = [
  {
    id: "1",
    name: "John Doe",
    date: "2024-11-16T12:30:00Z",
    read: false,
    subject: "Meeting Notes",
    text: "Here are the notes from the meeting that discussed the new project launch and upcoming deadlines. We will be moving forward with the plan to have everything ready by the end of next month...",
  },
  {
    id: "2",
    name: "Jane Smith",
    date: "2024-11-15T15:45:00Z",
    read: true,
    subject: "Research Update",
    text: "The latest findings from the research on market trends suggest that we need to pivot slightly in order to stay ahead of the competition. Detailed analysis will follow...",
  },
  {
    id: "3",
    name: "Alice Johnson",
    date: "2024-11-14T08:00:00Z",
    read: false,
    subject: "Code Review",
    text: "Please review the latest code update for the new feature. The changes have been tested, but we would appreciate additional feedback on performance optimizations and edge cases...",
  },
  {
    id: "4",
    name: "Bob Brown",
    date: "2024-11-13T20:15:00Z",
    read: true,
    subject: "Design Feedback",
    text: "Attached are the latest design revisions. Let me know if you have any thoughts or if we need to make further adjustments before presenting it to the client...",
  },
];

export default function HomePage() {
  return (
    <div className="h-full">
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
                <RecentActivityList items={RECENT_ACTIVITIES} />
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
