"use client"

import React from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({ value, onChange, onSubmit, disabled, placeholder }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (ta) {
      ta.style.height = "auto"
      ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSubmit()
      }
    }
  }

  return (
    <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder ?? "Ask about your store..."}
        rows={1}
        className="min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        aria-label="Chat message input"
      />
      <Button
        onClick={onSubmit}
        disabled={disabled || !value.trim()}
        size="icon"
        className="h-9 w-9 shrink-0 rounded-lg"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
