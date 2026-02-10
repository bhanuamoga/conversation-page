"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Pie, PieChart, Cell } from "recharts"
import type { PieChartData } from "@/lib/analytics-types"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function AnalyticsPieChart({ data }: { data: PieChartData }) {
  const config: ChartConfig = {}
  data.data.forEach((item, i) => {
    config[item.name] = {
      label: item.name,
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
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={data.data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              strokeWidth={2}
            >
              {data.data.map((_, i) => (
                <Cell
                  key={`cell-${
                    // biome-ignore lint: index key is fine for static data
                    i
                  }`}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
          {data.data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span>
                {item.name} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
