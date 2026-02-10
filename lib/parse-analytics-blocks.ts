import type { AnalyticsBlock } from "./analytics-types"

export type ParsedSegment =
  | { type: "text"; content: string }
  | { type: "analytics"; block: AnalyticsBlock }

/**
 * Parse an assistant message text into alternating text and analytics-block segments.
 * Analytics blocks are JSON objects wrapped in ```analytics-block ... ``` fences.
 */
export function parseAnalyticsBlocks(text: string): ParsedSegment[] {
  const segments: ParsedSegment[] = []
  const regex = /```analytics-block\s*\n?([\s\S]*?)```/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  match = regex.exec(text)
  while (match !== null) {
    // Text before this block
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index).trim()
      if (before) segments.push({ type: "text", content: before })
    }

    // Try to parse the JSON block
    try {
      const parsed = JSON.parse(match[1].trim()) as AnalyticsBlock
      if (parsed && parsed.type) {
        segments.push({ type: "analytics", block: parsed })
      }
    } catch {
      // If JSON parsing fails, treat it as text
      segments.push({ type: "text", content: match[1].trim() })
    }

    lastIndex = match.index + match[0].length
    match = regex.exec(text)
  }

  // Remaining text after the last block
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex).trim()
    if (remaining) segments.push({ type: "text", content: remaining })
  }

  // If no blocks found, return the whole text
  if (segments.length === 0 && text.trim()) {
    segments.push({ type: "text", content: text.trim() })
  }

  return segments
}

/**
 * Extract suggested follow-up questions from the AI response text.
 * The AI is instructed to prefix suggestions with "**Suggested:**"
 */
export function extractSuggestions(text: string): string[] {
  const suggestions: string[] = []
  const lines = text.split("\n")

  let inSuggested = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.toLowerCase().includes("**suggested:**") || trimmed.toLowerCase().includes("**suggested**:")) {
      inSuggested = true
      // Check if there's content on the same line after "Suggested:"
      const afterColon = trimmed.replace(/\*\*suggested:?\*\*:?\s*/i, "").trim()
      if (afterColon) {
        suggestions.push(afterColon.replace(/^[-*]\s*/, "").replace(/[?]$/, "?").replace(/^["']|["']$/g, ""))
      }
      continue
    }
    if (inSuggested && trimmed.match(/^[-*]\s+/)) {
      suggestions.push(trimmed.replace(/^[-*]\s+/, "").replace(/[?]$/, "?").replace(/^["']|["']$/g, ""))
    } else if (inSuggested && trimmed === "") {
      inSuggested = false
    }
  }

  return suggestions.slice(0, 3)
}
