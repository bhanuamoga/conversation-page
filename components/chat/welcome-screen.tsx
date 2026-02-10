"use client"

import { BarChart3, Users, ShoppingCart, Package, TrendingUp, DollarSign } from "lucide-react"
import { SuggestivePrompts } from "./suggestive-prompts"

const WELCOME_PROMPTS = [
  "What is my revenue today?",
  "How many orders did I get this week?",
  "How many customers do I have?",
  "Show me my top selling products",
  "Give me a full store overview for this month",
  "What is my order status breakdown?",
]

const FEATURES = [
  { icon: DollarSign, label: "Revenue" },
  { icon: ShoppingCart, label: "Orders" },
  { icon: Users, label: "Customers" },
  { icon: Package, label: "Products" },
  { icon: TrendingUp, label: "Trends" },
  { icon: BarChart3, label: "Reports" },
]

interface WelcomeScreenProps {
  onPromptSelect: (prompt: string) => void
  disabled?: boolean
}

export function WelcomeScreen({ onPromptSelect, disabled }: WelcomeScreenProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon grid */}
        <div className="mb-6 flex items-center justify-center gap-3">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground"
            >
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </div>

        <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground">
          WooCommerce Store Analytics
        </h2>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
          Ask anything about your store. I can pull real-time data from your WooCommerce store and
          present it as charts, tables, and insights.
        </p>

        {/* Prompt chips */}
        <div className="mt-8">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Try asking
          </p>
          <SuggestivePrompts prompts={WELCOME_PROMPTS} onSelect={onPromptSelect} disabled={disabled} />
        </div>
      </div>
    </div>
  )
}
