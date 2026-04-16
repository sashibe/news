"use client"

import { Stethoscope } from "lucide-react"

interface HeaderProps {
  recipientName: string
}

export function Header({ recipientName }: HeaderProps) {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Stethoscope className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              MedBrief
            </h1>
            <p className="text-xs text-muted-foreground">
              医療・防災ニュース AIキュレーター
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div>
            <p className="text-sm text-muted-foreground">{today}</p>
            {recipientName && (
              <p className="text-sm font-medium text-foreground">
                {recipientName} 様
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
