"use client"

import { useState } from "react"
import { ChevronDown, ExternalLink, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface Article {
  id: string
  category: string
  date: string
  headline: string
  summary: string
  aiAnalysis: string
  source?: string
  url?: string
}

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className={cn(
        "group cursor-pointer border-border bg-card transition-all duration-300 hover:border-primary/50",
        isExpanded && "border-primary/50"
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-primary">
                {article.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {article.date}
              </span>
              {article.source && (
                article.url ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-primary underline-offset-2 hover:underline"
                  >
                    {article.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">{article.source}</span>
                )
              )}
            </div>
            <h3 className="font-serif text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
              {article.headline}
            </h3>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {article.summary}
        </p>
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <div className="border-l-2 border-primary bg-primary/5 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  AI分析
                </span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                {article.aiAnalysis}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
