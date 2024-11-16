"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const monthlyActivityData = [
  {
    month: "Jan",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Feb",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Mar",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Apr",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "May",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Jun",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Jul",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Aug",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Sep",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Oct",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Nov",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    month: "Dec",
    activityCount: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function MonthlyActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={monthlyActivityData}>
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey="activityCount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
