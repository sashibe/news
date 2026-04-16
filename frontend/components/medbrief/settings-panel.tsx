"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SettingsPanelProps {
  recipientName: string
  setRecipientName: (name: string) => void
  keywords: string[]
  setKeywords: (keywords: string[]) => void
}

const PRESET_KEYWORDS = [
  "BCP 医療機関",
  "口腔ケア 災害",
  "南海トラフ 病院",
  "感染症対策",
  "医療DX",
  "在宅医療",
]

export function SettingsPanel({
  recipientName,
  setRecipientName,
  keywords,
  setKeywords,
}: SettingsPanelProps) {
  const [newKeyword, setNewKeyword] = useState("")

  const addKeyword = (keyword: string) => {
    if (keyword.trim() && !keywords.includes(keyword.trim())) {
      setKeywords([...keywords, keyword.trim()])
    }
    setNewKeyword("")
  }

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addKeyword(newKeyword)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-medium text-foreground">
          設定
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recipient Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            宛名
          </label>
          <Input
            type="text"
            placeholder="田中 太郎"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Active Keywords */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            キーワード
          </label>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary"
              >
                {keyword}
                <button
                  onClick={() => removeKeyword(keyword)}
                  className="ml-1 rounded-full p-0.5 transition-colors hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">削除</span>
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="新しいキーワードを追加..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
            <Button
              size="icon"
              variant="secondary"
              onClick={() => addKeyword(newKeyword)}
              disabled={!newKeyword.trim()}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">追加</span>
            </Button>
          </div>
        </div>

        {/* Preset Keywords */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            おすすめキーワード
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESET_KEYWORDS.filter((k) => !keywords.includes(k)).map(
              (keyword) => (
                <button
                  key={keyword}
                  onClick={() => addKeyword(keyword)}
                  className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  + {keyword}
                </button>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
