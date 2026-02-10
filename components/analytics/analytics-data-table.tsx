import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DataTableData } from "@/lib/analytics-types"

export function AnalyticsDataTable({ data }: { data: DataTableData }) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-foreground">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[300px] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                {data.headers.map((header) => (
                  <TableHead
                    key={header}
                    className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row, rowIdx) => (
                <TableRow
                  key={`row-${
                    // biome-ignore lint: index key fine for static rows
                    rowIdx
                  }`}
                  className="border-border"
                >
                  {row.map((cell, cellIdx) => (
                    <TableCell
                      key={`cell-${
                        // biome-ignore lint: index key fine for static cells
                        cellIdx
                      }`}
                      className="text-sm text-foreground"
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
