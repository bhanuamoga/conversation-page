"use client"

import type { UIMessage } from "ai"
import { User, Bot, Loader2 } from "lucide-react"
import { MetricCard } from "@/components/analytics/metric-card"
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

        {/* 🔥 TOOL RESULTS (THIS IS THE MISSING PART) */}
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
