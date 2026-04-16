"use client"

import { useState } from "react"
import { Newspaper, Loader2 } from "lucide-react"
import { Header } from "@/components/medbrief/header"
import { SettingsPanel } from "@/components/medbrief/settings-panel"
import { ArticleCard, type Article } from "@/components/medbrief/article-card"
import { Button } from "@/components/ui/button"

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    category: "防災",
    date: "2024年4月15日",
    headline: "病院の免震構造、全国普及率が1割にとどまる実態",
    summary:
      "国土交通省の最新調査によると、全国の病院における免震構造の採用率は約10%にとどまっていることが明らかになった。特に地方の中小病院では導入コストの問題から採用が進んでいない現状がある。",
    aiAnalysis:
      "歯科診療所においても同様の課題が想定されます。特に南海トラフ地震の被害想定地域では、診療継続のためのBCP策定と合わせて、建物の耐震・免震対策の検討が急務です。補助金制度の活用も視野に入れた計画立案をお勧めします。",
  },
  {
    id: "2",
    category: "BCP",
    date: "2024年4月14日",
    headline: "熊本地震10年：歯科診療所の災害時BCP策定率は依然低水準",
    summary:
      "熊本地震から10年を迎え、歯科診療所における事業継続計画（BCP）の策定状況について日本歯科医師会が調査を実施。全国の歯科診療所のうち、BCPを策定しているのは約15%にとどまることが判明した。",
    aiAnalysis:
      "BCP策定は診療所の事業継続だけでなく、災害時の地域医療への貢献にも直結します。口腔ケアによる誤嚥性肺炎予防など、歯科医療の重要性は災害後に高まります。厚生労働省の「災害時歯科保健医療体制」のガイドラインを参考に、段階的なBCP整備を推進してください。",
  },
  {
    id: "3",
    category: "政策",
    date: "2024年4月13日",
    headline: "厚労省、災害拠点病院の耐震・免震基準見直しへ",
    summary:
      "厚生労働省は、災害拠点病院の指定要件における耐震・免震基準の見直しに着手する方針を固めた。能登半島地震での被害状況を踏まえ、より厳格な基準の導入を検討している。",
    aiAnalysis:
      "災害拠点病院の基準強化は、周辺医療機関にも波及する可能性があります。歯科診療所においても、地域の災害医療計画との連携や、災害時の役割分担について再確認が必要です。特に、災害拠点病院との連携協定の締結を検討されることをお勧めします。",
  },
]

export default function MedBriefDashboard() {
  const [recipientName, setRecipientName] = useState("")
  const [keywords, setKeywords] = useState([
    "災害医療",
    "免震病院",
    "歯科 防災",
  ])
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateBriefing = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keywords, recipientName }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "エラーが発生しました")
        return
      }
      setArticles(data.articles ?? [])
      setHasSearched(true)
    } catch {
      setError("通信エラーが発生しました。ネットワークを確認してください。")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      <Header recipientName={recipientName} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {/* Settings Panel */}
          <SettingsPanel
            recipientName={recipientName}
            setRecipientName={setRecipientName}
            keywords={keywords}
            setKeywords={setKeywords}
          />

          {/* Generate Button */}
          <Button
            size="lg"
            className="w-full gap-2 bg-primary py-6 text-lg font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
            onClick={generateBriefing}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                ブリーフィングを生成中...
              </>
            ) : (
              <>
                <Newspaper className="h-5 w-5" />
                📰 今朝のブリーフィングを生成
              </>
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Article Cards */}
          {articles.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-foreground">
                本日のブリーフィング
              </h2>
              <div className="space-y-4">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          ) : hasSearched && !isLoading && !error && (
            <p className="text-center text-sm text-muted-foreground">
              該当するニュース記事が見つかりませんでした。キーワードを変えてお試しください。
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <span className="font-medium text-foreground">MedBrief</span> ×{" "}
            <span className="font-medium text-primary">Claude AI</span> — AXP
            JAPAN
          </p>
        </div>
      </footer>
    </div>
  )
}
