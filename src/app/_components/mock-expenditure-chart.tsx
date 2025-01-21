"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { coin: "bitcoin", amount: 275, fill: "var(--color-bitcoin)" },
  { coin: "eth", amount: 200, fill: "var(--color-eth)" },
  { coin: "usdt", amount: 187, fill: "var(--color-usdt)" },
  { coin: "polkadot", amount: 173, fill: "var(--color-polkadot)" },
  { coin: "other", amount: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  amount: {
    label: "Coin",
  },
  bitcoin: {
    label: "Bitcoin",
    color: "var(--chart-1)",
  },
  eth: {
    label: "ETH",
    color: "var(--chart-2)",
  },
  usdt: {
    label: "USDT",
    color: "var(--chart-3)",
  },
  polkadot: {
    label: "Polkadot",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function MockExpenditureChart() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>Porfolio allocation</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer className="h-full w-full" config={chartConfig}>
          <PieChart>
            <Pie data={chartData} dataKey="amount" />
            <ChartTooltip
              content={<ChartTooltipContent nameKey="coin" hideLabel />}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="coin" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
