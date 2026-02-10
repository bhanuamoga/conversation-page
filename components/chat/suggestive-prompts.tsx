"use client"

import { Button } from "@/components/ui/button"

interface SuggestivePromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export function SuggestivePrompts({ prompts, onSelect, disabled }: SuggestivePromptsProps) {
  if (prompts.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <Button
          key={prompt}
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          className="h-auto whitespace-normal rounded-full border-border bg-secondary px-3 py-1.5 text-left text-xs font-normal text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {prompt}
        </Button>
      ))}
    </div>
  )
}
