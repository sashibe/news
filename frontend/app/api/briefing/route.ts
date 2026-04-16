import Anthropic from "@anthropic-ai/sdk"
import { NextRequest, NextResponse } from "next/server"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { keywords, recipientName } = await req.json()

  if (!keywords || keywords.length === 0) {
    return NextResponse.json(
      { error: "キーワードを1つ以上設定してください" },
      { status: 400 }
    )
  }

  const keywordList = (keywords as string[]).join("、")
  const recipient = recipientName || "先生"

  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const userPrompt = `
今日は${today}です。${recipient}向けの医療・防災ニュースブリーフィングを生成してください。

検索キーワード: ${keywordList}

【検索・選定ルール】
- 過去30日以内に公開されたニュース記事のみを対象とする
- 発行日が明記されていない記事は除外する
- 以下は除外する: ガイドライン・手引き・Q&A・常設解説ページ・学会診療指針・教育コンテンツ
- 優先するソース: 厚生労働省プレスリリース、内閣府防災新着、日本歯科医師会お知らせ、m3.com、日経メディカル、CareNet、NHK健康、各省庁の報道発表
- 1件でも確実なニュース記事が見つからなければ、件数を減らしてよい（0件も可）

以下の形式で厳密にJSONのみを返してください（配列で1〜5件）:
{
  "articles": [
    {
      "id": "1",
      "headline": "記事の見出し（日本語）",
      "category": "カテゴリ（防災 / BCP / 政策 / 歯科 / 医療 のいずれか）",
      "date": "掲載日（必ず年月日を明記。不明な場合はこの記事を除外）",
      "summary": "記事の要約（100文字以内）",
      "aiAnalysis": "歯科医師・歯科医院経営者への示唆（150文字以内）。BCP、口腔ケア指導、制度変更の観点で分析する。",
      "source": "情報源名（媒体名または省庁名）",
      "url": "元記事の直接URL"
    }
  ]
}
`.trim()

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system:
        "あなたは医療・防災専門のニュースキュレーターです。対象読者は歯科医師・歯科医院経営者です。web_searchで最新ニュースを検索してください。【重要】発行日が明記された直近30日以内のニュース記事のみを採用し、ガイドライン・常設解説ページ・手引きは一切含めないでください。Respond ONLY with a valid JSON object. No explanation, no markdown, no code fences. Start with { and end with }.",
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: userPrompt }],
    } as Parameters<typeof client.messages.create>[0])

    const blocks = response.content || []
    const rawText = blocks
      .filter((b) => b.type === "text")
      .map((b) => (b as { type: "text"; text: string }).text)
      .join("")
      .trim()

    const cleaned = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()

    const start = cleaned.indexOf("{")
    const end = cleaned.lastIndexOf("}")
    if (start === -1 || end === -1) {
      throw new Error("JSONが見つかりませんでした")
    }

    const parsed = JSON.parse(cleaned.slice(start, end + 1))
    return NextResponse.json(parsed)
  } catch (err) {
    console.error("Briefing generation error:", err)
    return NextResponse.json(
      { error: "ブリーフィングの生成に失敗しました。しばらく後でお試しください。" },
      { status: 500 }
    )
  }
}
