# MedBrief

医療・防災ニュース AIキュレーター for 山田先生

詳細は [CLAUDE.md](./CLAUDE.md) を参照。

## 構成

```
medbrief/
├── CLAUDE.md          # 開発コンテキスト（Claude Code 用）
├── frontend/          # React フロントエンド（v0 → 移行予定）
│   └── src/
│       └── components/
│           └── MedBrief.jsx   # プロトタイプ
└── functions/         # Firebase Cloud Functions（Phase 1）
    └── src/
```

## 開発

Claude Code で作業する場合は、このリポジトリのルートで `claude` を実行。
CLAUDE.md が自動的に読み込まれる。
