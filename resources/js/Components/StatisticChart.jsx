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
    ChartContainer, ChartLegend, ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";

const chartData = [
    { category: "Kritis", alat_kerja: 60, fill: "#F59E0B" },
    { category: "Kronis", alat_kerja: 20, fill: "#B91C1C" },
    { category: "Normal", alat_kerja: 20, fill: "#10b981" },
];

const chartConfig = {
    alat_kerja: {
        label: "alat_kerja",
    },
    kronis: {
        label: "Kronis",
        color: "#B91C1C", // Adjusted to a direct color value
    },
    kritis: {
        label: "Kritis",
        color: "#F59E0B", // Adjusted to a direct color value
    },
    normal: {
        label: "Normal",
        color: "#10b981", // Adjusted to a direct color value
    }
};

export function StatisticChart() {
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Kondisi Alat Kerja</CardTitle>
                <CardDescription>PLN Nusa Daya UP Maluku</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={true}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="alat_kerja"
                            nameKey="category"
                            fill={entry => entry.fill} // Ensure color is applied
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="category" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            {/* Uncomment if you want to use CardFooter */}
            <CardFooter className="flex-col gap-2 text-sm">
                {/*<div className="flex items-center gap-2 font-medium leading-none">*/}
                {/*    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />*/}
                {/*</div>*/}
                <div className="leading-none text-muted-foreground">
                    Menampilkan total alat kerja pada PLN Nusa Daya UP Maluku
                </div>
            </CardFooter>
        </Card>
    );
}
