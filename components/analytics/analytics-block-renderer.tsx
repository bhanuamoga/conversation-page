"use client"

import type { AnalyticsBlock } from "@/lib/analytics-types"
import { MetricCard } from "./metric-card"
import { MetricGrid } from "./metric-grid"
import { AnalyticsBarChart } from "./analytics-bar-chart"
import { AnalyticsLineChart } from "./analytics-line-chart"
import { AnalyticsPieChart } from "./analytics-pie-chart"
import { AnalyticsDataTable } from "./analytics-data-table"
import { NarrativeBlock } from "./narrative-block"

export function AnalyticsBlockRenderer({ block }: { block: AnalyticsBlock }) {
  switch (block.type) {
    case "metric_card":
      return <MetricCard data={block} />
    case "metric_grid":
      return <MetricGrid data={block} />
    case "bar_chart":
      return <AnalyticsBarChart data={block} />
    case "line_chart":
      return <AnalyticsLineChart data={block} />
    case "pie_chart":
      return <AnalyticsPieChart data={block} />
    case "data_table":
      return <AnalyticsDataTable data={block} />
    case "narrative":
      return <NarrativeBlock data={block} />
    default:
      return null
  }
}
