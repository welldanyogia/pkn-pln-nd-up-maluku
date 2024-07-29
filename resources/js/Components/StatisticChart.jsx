"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";

const chartData = [
    { category: "Kritis", alat_kerja: 275, fill: "#F59E0B" },
    { category: "Kronis", alat_kerja: 200, fill: "#B91C1C" },
    { category: "Normal", alat_kerja: 187, fill: "#10b981" },
];

const chartConfig = {
    alat_kerja: {
        label: "alat_kerja",
    },
    kronis: {
        label: "Kronis",
        color: "hsl(var(--chart-1))",
    },
    kritis: {
        label: "Kritis",
        color: "hsl(var(--chart-2))",
    },
    normal: {
        label: "Normal",
        color: "hsl(var(--chart-3))",
    }
};

export function StatisticChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie data={chartData} dataKey="alat_kerja" nameKey="category" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total alat_kerja for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
