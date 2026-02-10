import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  data?: {
    title?: string
    value?: string | number
    description?: string
    icon?: string
    trend?: {
      value: number
      direction: "up" | "down"
    }
  }
}

export function MetricCard({ data }: MetricCardProps) {
  if (!data) return null

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          {data.title || "Metric"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold">
            {data.value || "—"}
          </div>
          {data.description && (
            <p className="text-sm text-muted-foreground">
              {data.description}
            </p>
          )}
          {data.trend && (
            <div className={`text-sm font-medium ${
              data.trend.direction === "up" ? "text-green-600" : "text-red-600"
            }`}>
              {data.trend.direction === "up" ? "↑" : "↓"} {Math.abs(data.trend.value)}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
