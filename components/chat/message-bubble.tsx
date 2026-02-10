"use client"

import type { UIMessage } from "ai"
import { User, Bot, Loader2 } from "lucide-react"
import { MetricCard } from "@/components/analytics/metric-card"
import { AnalyticsBarChart } from "@/components/analytics/analytics-bar-chart"
import { AnalyticsLineChart } from "@/components/analytics/analytics-line-chart"
import { AnalyticsPieChart } from "@/components/analytics/analytics-pie-chart"
import { AnalyticsDataTable } from "@/components/analytics/analytics-data-table"
import { SuggestivePrompts } from "./suggestive-prompts"

interface Props {
  message: UIMessage
  isStreaming?: boolean
  onSuggestionSelect?: (prompt: string) => void
}

function getText(message: UIMessage) {
  return message.parts
    ?.filter((p: any) => p.type === "text")
    ?.map((p: any) => p.text)
    ?.join("") ?? ""
}

export function MessageBubble({
  message,
  isStreaming,
  onSuggestionSelect,
}: Props) {
  const isUser = message.role === "user"
  const text = getText(message)

  /* =========================
     USER
  ========================= */
  if (isUser) {
    return (
      <div className="flex justify-end gap-3">
        <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl text-sm max-w-[80%]">
          {text}
        </div>
        <User className="h-5 w-5 mt-2" />
      </div>
    )
  }

  /* =========================
     ASSISTANT
  ========================= */
  return (
    <div className="flex gap-3">
      <Bot className="h-5 w-5 mt-2 shrink-0" />

      <div className="space-y-3 w-full">

        {/* loading */}
        {isStreaming && !text && (
          <div className="flex gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Fetching data...
          </div>
        )}

        {/* TEXT */}
        {text && (
          <p className="text-sm leading-relaxed">
            {text}
          </p>
        )}

        {/* TOOL RESULTS - RENDER ALL VISUALIZATION TYPES */}
        {message.parts?.map((part: any, i) => {
          if (part.type !== "tool-result") return null

          const result = part.result

          if (!result?.displayType) return null

          /* CARD */
          if (result.displayType === "card" || result.displayType === "createCard") {
            return (
              <MetricCard
                key={i}
                data={result.cardData}
              />
            )
          }

          /* CHART - Route to correct chart type */
          if (result.displayType === "chart") {
            const chartConfig = result.chartConfig
            if (!chartConfig) return null

            const chartType = chartConfig.type

            if (chartType === "bar") {
              return (
                <AnalyticsBarChart
                  key={i}
                  data={{
                    type: "bar_chart",
                    title: chartConfig.options?.plugins?.title?.text || "Chart",
                    data: chartConfig.data?.datasets?.[0]?.data?.map((val: any, idx: number) => ({
                      name: chartConfig.data.labels?.[idx] || `Item ${idx + 1}`,
                      value: val,
                    })) || [],
                    dataKeys: ["value"],
                    xAxisKey: "name",
                  }}
                />
              )
            }

            if (chartType === "line") {
              return (
                <AnalyticsLineChart
                  key={i}
                  data={{
                    type: "line_chart",
                    title: chartConfig.options?.plugins?.title?.text || "Chart",
                    data: chartConfig.data?.datasets?.[0]?.data?.map((val: any, idx: number) => ({
                      name: chartConfig.data.labels?.[idx] || `Item ${idx + 1}`,
                      value: val,
                    })) || [],
                    dataKeys: ["value"],
                    xAxisKey: "name",
                  }}
                />
              )
            }

            if (chartType === "pie" || chartType === "doughnut") {
              return (
                <AnalyticsPieChart
                  key={i}
                  data={{
                    type: "pie_chart",
                    title: chartConfig.options?.plugins?.title?.text || "Chart",
                    data: chartConfig.data?.labels?.map((label: string, idx: number) => ({
                      name: label,
                      value: chartConfig.data.datasets?.[0]?.data?.[idx] || 0,
                    })) || [],
                  }}
                />
              )
            }
          }

          /* TABLE */
          if (result.displayType === "table") {
            const tableData = result.tableData
            if (!tableData) return null

            return (
              <AnalyticsDataTable
                key={i}
                data={{
                  type: "data_table",
                  title: tableData.title || "Table",
                  headers: tableData.columns?.map((col: any) => col.header) || [],
                  rows: tableData.rows?.map((row: any) => 
                    tableData.columns?.map((col: any) => String(row[col.key] || "")) || []
                  ) || [],
                }}
              />
            )
          }

          return null
        })}

        {/* suggestions */}
        {onSuggestionSelect && (
          <SuggestivePrompts
            prompts={[]}
            onSelect={onSuggestionSelect}
          />
        )}
      </div>
    </div>
  )
}
