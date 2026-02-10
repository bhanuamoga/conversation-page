// ============================================
// Types for structured analytics responses
// The AI returns these as tool results so the
// frontend can render rich UI components.
// ============================================

export interface MetricCardData {
  type: "metric_card"
  label: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  prefix?: string
  suffix?: string
}

export interface MetricGridData {
  type: "metric_grid"
  metrics: MetricCardData[]
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface BarChartData {
  type: "bar_chart"
  title: string
  data: ChartDataPoint[]
  dataKeys: string[]
  xAxisKey: string
}

export interface LineChartData {
  type: "line_chart"
  title: string
  data: ChartDataPoint[]
  dataKeys: string[]
  xAxisKey: string
}

export interface PieChartData {
  type: "pie_chart"
  title: string
  data: { name: string; value: number; fill?: string }[]
}

export interface DataTableData {
  type: "data_table"
  title: string
  headers: string[]
  rows: string[][]
}

export interface NarrativeData {
  type: "narrative"
  title: string
  content: string
  highlights?: { label: string; value: string }[]
}

export type AnalyticsBlock =
  | MetricCardData
  | MetricGridData
  | BarChartData
  | LineChartData
  | PieChartData
  | DataTableData
  | NarrativeData

// WooCommerce order shape (simplified)
export interface WooOrder {
  id: number
  status: string
  total: string
  currency: string
  date_created: string
  billing: {
    first_name: string
    last_name: string
    email: string
  }
  line_items: {
    name: string
    quantity: number
    total: string
  }[]
}

// WooCommerce customer shape (simplified)
export interface WooCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  date_created: string
  orders_count: number
  total_spent: string
}

// WooCommerce product shape (simplified)
export interface WooProduct {
  id: number
  name: string
  price: string
  total_sales: number
  stock_quantity: number | null
  status: string
}
