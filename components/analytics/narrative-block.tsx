import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { NarrativeData } from "@/lib/analytics-types"

export function NarrativeBlock({ data }: { data: NarrativeData }) {
  return (
    <Card className="bg-card border-border border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">{data.content}</p>
        {data.highlights && data.highlights.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4">
            {data.highlights.map((h) => (
              <div key={h.label} className="flex flex-col">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {h.label}
                </span>
                <span className="text-lg font-bold text-foreground">{h.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
