"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts"
import type { BarChartData } from "@/lib/analytics-types"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function AnalyticsBarChart({ data }: { data: BarChartData }) {
  const config: ChartConfig = {}
  data.dataKeys.forEach((key, i) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: COLORS[i % COLORS.length],
    }
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="h-[250px] w-full">
          <BarChart data={data.data} accessibilityLayer>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={data.xAxisKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
            <ChartTooltip content={<ChartTooltipContent />} />
            {data.dataKeys.map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                fill={COLORS[i % COLORS.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
