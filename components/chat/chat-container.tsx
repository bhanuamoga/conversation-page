"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { MessageBubble } from "./message-bubble"
import { WelcomeScreen } from "./welcome-screen"
import { ChatInput } from "./chat-input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { RotateCcw, BarChart3 } from "lucide-react"

const transport = new DefaultChatTransport({ api: "/api/chat" })

export function ChatContainer() {
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport,
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = useCallback(() => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }, [input, isLoading, sendMessage])

  const handlePromptSelect = useCallback(
    (prompt: string) => {
      if (isLoading) return
      sendMessage({ text: prompt })
    },
    [isLoading, sendMessage]
  )

  const handleClear = useCallback(() => {
    setMessages([])
  }, [setMessages])

  const isEmpty = messages.length === 0

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Store Analytics</h1>
            <p className="text-xs text-muted-foreground">Powered by WooCommerce</p>
          </div>
        </div>
        {!isEmpty && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            New chat
          </Button>
        )}
      </header>

      {/* Messages area */}
      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="h-full overflow-y-auto">
          {isEmpty ? (
            <WelcomeScreen onPromptSelect={handlePromptSelect} disabled={isLoading} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-6 px-4 py-6 lg:px-0">
              {messages.map((message, idx) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isStreaming={isLoading && idx === messages.length - 1 && message.role === "assistant"}
                  onSuggestionSelect={handlePromptSelect}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-border bg-card px-4 py-3 lg:px-6">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
            disabled={isLoading}
            placeholder={
              isLoading
                ? "Analyzing your store data..."
                : "Ask about revenue, orders, customers, products..."
            }
          />
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            {"Data is fetched in real-time from your WooCommerce store via the REST API."}
          </p>
        </div>
      </div>
    </div>
  )
}
