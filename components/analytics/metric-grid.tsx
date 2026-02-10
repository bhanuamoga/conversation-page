import type { MetricGridData } from "@/lib/analytics-types"
import { MetricCard } from "./metric-card"

export function MetricGrid({ data }: { data: MetricGridData }) {
  const cols =
    data.metrics.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : data.metrics.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

  return (
    <div className={`grid gap-3 ${cols}`}>
      {data.metrics.map((metric, i) => (
        <MetricCard key={`${metric.label}-${i}`} data={metric} />
      ))}
    </div>
  )
}
