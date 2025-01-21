"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", bitcoin: 186 },
  { month: "February", bitcoin: 305 },
  { month: "March", bitcoin: 237 },
  { month: "April", bitcoin: 73 },
  { month: "May", bitcoin: 209 },
  { month: "June", bitcoin: 214 },
];

const chartConfig = {
  bitcoin: {
    label: "Bitcoin",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function MockTradingVolumeChart() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>Trading flow over time</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-full w-full">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
              formatter={(value, name) => (
                <div className="font-bold w-full text-center">{`${name
                  .toString()
                  .toUpperCase()}: $${value}B`}</div>
              )}
            />
            <Area
              className="h-full w-full"
              dataKey="bitcoin"
              type="linear"
              fill="var(--color-bitcoin)"
              fillOpacity={0.4}
              stroke="var(--color-bitcoin)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
