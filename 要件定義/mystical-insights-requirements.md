# 🌟 Mystical Insights - 神秘的洞察
## カバラ数秘術×易経 統合占いプラットフォーム要件定義書

**Version:** 2.0.0  
**作成日:** 2025年12月16日  
**プロジェクトコード:** MYSTIC-INSIGHTS  
**対象:** VSCode Claude Code バイブコーディング用

---

## 📋 目次

1. [プロジェクト概要](#1-プロジェクト概要)
2. [システムアーキテクチャ](#2-システムアーキテクチャ)
3. [フロントエンドデザイン仕様](#3-フロントエンドデザイン仕様)
4. [バックエンド仕様](#4-バックエンド仕様)
5. [データベース設計](#5-データベース設計)
6. [API設計](#6-api設計)
7. [機能要件詳細](#7-機能要件詳細)
8. [UI/UXデザイン詳細](#8-uiuxデザイン詳細)
9. [アニメーション・インタラクション仕様](#9-アニメーションインタラクション仕様)
10. [セキュリティ要件](#10-セキュリティ要件)
11. [テスト戦略](#11-テスト戦略)
12. [デプロイメント](#12-デプロイメント)
13. [易経64卦データベース](#13-易経64卦データベース)
14. [開発タスクリスト](#14-開発タスクリスト)

---

## 1. プロジェクト概要

### 1.1 ビジョン

「古代の叡智と現代のテクノロジーを融合し、人々の自己理解と成長を支援する世界最高峰の占いプラットフォーム」

### 1.2 コアバリュー

```yaml
values:
  - authenticity: 本物の占術知識に基づく正確な計算
  - beauty: 触れていて楽しい美しいインターフェース
  - depth: 表層的ではない深い洞察の提供
  - accessibility: 誰でも簡単に使える直感的な操作性
  - mystique: 神秘的な雰囲気と現代的なデザインの調和
```

### 1.3 ターゲットユーザー

| セグメント | ペルソナ | ニーズ |
|-----------|----------|--------|
| **探求者** | 自己理解を深めたい20-40代 | 人生の指針、自己分析 |
| **実践者** | 占術に興味がある全年齢 | 正確な占術計算、学習 |
| **プロフェッショナル** | 占い師、カウンセラー | クライアント診断ツール |

### 1.4 差別化要素

- **統合占術**: カバラ数秘術と易経の革新的融合
- **視覚的美しさ**: 生命の樹、易経卦象のアニメーション表現
- **深層分析**: AI支援による複合的解釈
- **パーソナライズ**: 個人の成長記録とトラッキング

---

## 2. システムアーキテクチャ

### 2.1 技術スタック

```typescript
// 技術選定
const techStack = {
  frontend: {
    framework: "Next.js 15",
    language: "TypeScript",
    styling: "Tailwind CSS + CSS Modules",
    animation: "Framer Motion + GSAP",
    state: "Zustand",
    charts: "D3.js / Three.js",
    icons: "Lucide React"
  },
  
  backend: {
    runtime: "Node.js 22",
    framework: "Next.js API Routes",
    database: "PostgreSQL 16 (Supabase)",
    cache: "Redis",
    auth: "NextAuth.js",
    validation: "Zod"
  },
  
  infrastructure: {
    hosting: "Vercel",
    database: "Supabase",
    storage: "Cloudinary",
    analytics: "Vercel Analytics",
    monitoring: "Sentry"
  },
  
  development: {
    editor: "VSCode",
    ai: "Claude Code",
    testing: "Vitest + Playwright",
    linting: "ESLint + Prettier",
    git: "Git + GitHub"
  }
};
```

### 2.2 システム構成図

```mermaid
graph TB
    subgraph "Client Layer"
        UI[React UI]
        PWA[PWA Support]
    end
    
    subgraph "Application Layer"
        API[Next.js API]
        Auth[NextAuth]
        Cache[Redis Cache]
    end
    
    subgraph "Data Layer"
        DB[(PostgreSQL)]
        Storage[Object Storage]
    end
    
    subgraph "External Services"
        AI[AI API]
        Analytics[Analytics]
    end
    
    UI --> API
    PWA --> API
    API --> Auth
    API --> Cache
    API --> DB
    API --> Storage
    API --> AI
    UI --> Analytics
```

### 2.3 ディレクトリ構造

```
mystical-insights/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 認証関連ページ
│   │   ├── (dashboard)/        # ダッシュボード
│   │   ├── kabbalah/           # カバラ数秘術
│   │   ├── iching/             # 易経
│   │   ├── api/                # API Routes
│   │   └── layout.tsx          # ルートレイアウト
│   │
│   ├── components/             # Reactコンポーネント
│   │   ├── ui/                # 基本UIコンポーネント
│   │   ├── kabbalah/           # カバラ専用コンポーネント
│   │   ├── iching/             # 易経専用コンポーネント
│   │   ├── animations/         # アニメーション
│   │   └── charts/             # チャート・ビジュアライゼーション
│   │
│   ├── lib/                    # ライブラリ・ユーティリティ
│   │   ├── kabbalah/           # カバラ計算ロジック
│   │   ├── iching/             # 易経計算ロジック
│   │   ├── db/                 # データベース
│   │   └── utils/              # 共通ユーティリティ
│   │
│   ├── hooks/                  # カスタムフック
│   ├── stores/                 # Zustand stores
│   ├── styles/                 # グローバルスタイル
│   └── types/                  # TypeScript型定義
│
├── public/                     # 静的アセット
│   ├── fonts/                  # カスタムフォント
│   ├── images/                 # 画像
│   └── sounds/                 # 効果音
│
├── prisma/                     # Prismaスキーマ
├── tests/                      # テスト
└── scripts/                    # ビルドスクリプト
```

---

## 3. フロントエンドデザイン仕様

### 3.1 デザインコンセプト

**「Mystical Modernism - 神秘的モダニズム」**

古代の神秘性と現代のミニマリズムを融合。深い宇宙を想起させる色彩と、幾何学的な神聖図形をモチーフにした独創的なインターフェース。

### 3.2 カラーパレット

```scss
// メインカラーシステム
$colors: (
  // 基本色
  cosmos-black: #0A0B14,        // 宇宙の黒
  mystic-purple: #6B46C1,       // 神秘の紫
  oracle-gold: #D4AF37,         // 神託の金
  astral-blue: #4A7C7E,         // アストラル青緑
  lunar-silver: #C0C0C0,        // 月の銀
  
  // グラデーション
  aurora: linear-gradient(135deg, #667eea 0%, #764ba2 100%),
  nebula: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%),
  
  // セマンティックカラー
  positive: #22C55E,            // 吉
  negative: #EF4444,            // 凶
  neutral: #94A3B8,             // 中立
  
  // 背景
  bg-primary: #0F0F1F,          // 主背景
  bg-secondary: #1A1A2E,        // 副背景
  bg-card: rgba(255, 255, 255, 0.03),
  
  // テキスト
  text-primary: #F8F8FF,
  text-secondary: #A8A8B3,
  text-accent: #D4AF37
);
```

### 3.3 タイポグラフィ

```scss
// フォントシステム
$typography: (
  // ディスプレイフォント（見出し）
  display: 'Cinzel Decorative',  // 装飾的セリフ
  
  // 見出しフォント
  heading: 'Philosopher',         // エレガントなサンセリフ
  
  // 本文フォント
  body: 'Noto Sans JP',          // 日本語対応
  
  // 数字・コード
  mono: 'Fira Code',             // リガチャ対応
  
  // 特殊文字（易経卦象）
  special: 'I Ching Symbols'     // カスタムフォント
);

// サイズスケール
$font-sizes: (
  xs: 0.75rem,    // 12px
  sm: 0.875rem,   // 14px
  base: 1rem,     // 16px
  lg: 1.125rem,   // 18px
  xl: 1.25rem,    // 20px
  2xl: 1.5rem,    // 24px
  3xl: 1.875rem,  // 30px
  4xl: 2.25rem,   // 36px
  5xl: 3rem,      // 48px
  6xl: 3.75rem    // 60px
);
```

### 3.4 コンポーネントライブラリ

```typescript
// UIコンポーネント定義
interface ComponentLibrary {
  // 基本コンポーネント
  Button: {
    variants: ['primary', 'secondary', 'mystic', 'ghost'];
    sizes: ['sm', 'md', 'lg'];
    states: ['default', 'hover', 'active', 'disabled', 'loading'];
  };
  
  Card: {
    variants: ['glass', 'solid', 'bordered', 'floating'];
    animations: ['fadeIn', 'slideUp', 'shimmer'];
  };
  
  // カバラ専用
  TreeOfLife: {
    mode: ['interactive', 'static', 'animated'];
    theme: ['classic', 'cosmic', 'golden'];
  };
  
  // 易経専用
  Hexagram: {
    style: ['traditional', 'modern', 'animated'];
    size: ['sm', 'md', 'lg', 'xl'];
  };
}
```

---

## 4. バックエンド仕様

### 4.1 API アーキテクチャ

```typescript
// APIルート構造
const apiRoutes = {
  '/api/auth': {
    POST: '/register',    // ユーザー登録
    POST: '/login',       // ログイン
    POST: '/logout',      // ログアウト
    GET: '/session'       // セッション確認
  },
  
  '/api/kabbalah': {
    POST: '/calculate',   // 数値計算
    GET: '/reading/:id',  // リーディング取得
    POST: '/save',        // 結果保存
    GET: '/history'       // 履歴取得
  },
  
  '/api/iching': {
    POST: '/divine',      // 占い実行
    GET: '/hexagram/:id', // 卦情報取得
    POST: '/interpret',   // 解釈生成
    GET: '/history'       // 履歴取得
  },
  
  '/api/user': {
    GET: '/profile',      // プロフィール取得
    PATCH: '/profile',    // プロフィール更新
    GET: '/readings',     // 全リーディング
    DELETE: '/account'    // アカウント削除
  }
};
```

### 4.2 ビジネスロジック層

```typescript
// カバラ数秘術サービス
class KabbalahService {
  // ライフパス計算
  async calculateLifePath(birthDate: Date): Promise<LifePathResult> {
    const { year, month, day } = this.extractDateComponents(birthDate);
    const lifePath = this.reduceToDigit(
      this.sumDigits(month) + 
      this.sumDigits(day) + 
      this.sumDigits(year)
    );
    
    return {
      number: lifePath,
      isMaster: this.isMasterNumber(lifePath),
      hasKarmicDebt: this.hasKarmicDebt(lifePath),
      interpretation: await this.getInterpretation(lifePath, 'lifePath')
    };
  }
  
  // 名前分析
  async analyzeName(name: string, language: 'en' | 'ja'): Promise<NameAnalysis> {
    const normalized = language === 'ja' 
      ? await this.convertJapaneseToRomaji(name)
      : this.normalizeEnglish(name);
    
    return {
      expression: await this.calculateExpression(normalized),
      soulUrge: await this.calculateSoulUrge(normalized),
      personality: await this.calculatePersonality(normalized)
    };
  }
  
  // 相性診断
  async calculateCompatibility(
    person1: NumerologyProfile,
    person2: NumerologyProfile
  ): Promise<CompatibilityResult> {
    const matrix = await this.loadCompatibilityMatrix();
    return this.computeCompatibilityScore(person1, person2, matrix);
  }
}

// 易経サービス
class IChingService {
  // 卦を立てる
  async castHexagram(method: CastingMethod): Promise<HexagramResult> {
    let hexagram: number;
    
    switch(method) {
      case 'coins':
        hexagram = await this.coinMethod();
        break;
      case 'yarrow':
        hexagram = await this.yarrowMethod();
        break;
      case 'random':
        hexagram = this.randomMethod();
        break;
    }
    
    return {
      primary: await this.getHexagramData(hexagram),
      changing: await this.getChangingLines(hexagram),
      interpretation: await this.generateInterpretation(hexagram)
    };
  }
  
  // AI解釈生成
  async generateInterpretation(
    hexagram: number,
    context?: string
  ): Promise<string> {
    const hexagramData = await this.getHexagramData(hexagram);
    const prompt = this.buildInterpretationPrompt(hexagramData, context);
    return this.callAIService(prompt);
  }
}
```

---

## 5. データベース設計

### 5.1 ERD（Entity Relationship Diagram）

```mermaid
erDiagram
    User ||--o{ KabbalahReading : creates
    User ||--o{ IChingReading : creates
    User ||--o{ SavedProfile : has
    
    KabbalahReading ||--|| KabbalahResult : contains
    IChingReading ||--|| Hexagram : primary
    IChingReading ||--o| Hexagram : changing
    
    Hexagram ||--|| UpperTrigram : has
    Hexagram ||--|| LowerTrigram : has
    
    User {
        uuid id PK
        string email UK
        string username UK
        string password_hash
        jsonb preferences
        timestamp created_at
        timestamp updated_at
    }
    
    KabbalahReading {
        uuid id PK
        uuid user_id FK
        date birth_date
        string full_name
        jsonb core_numbers
        jsonb cycles
        jsonb interpretation
        timestamp created_at
    }
    
    IChingReading {
        uuid id PK
        uuid user_id FK
        int primary_hexagram FK
        int changing_hexagram FK
        jsonb changing_lines
        string question
        text interpretation
        timestamp created_at
    }
```

### 5.2 テーブル定義（PostgreSQL）

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    birth_date DATE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- カバラ数秘術リーディング
CREATE TABLE kabbalah_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    birth_date DATE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    language VARCHAR(2) DEFAULT 'ja',
    
    -- コア数値
    life_path JSONB NOT NULL,
    expression JSONB NOT NULL,
    soul_urge JSONB NOT NULL,
    personality JSONB NOT NULL,
    
    -- サイクル
    pinnacles JSONB,
    challenges JSONB,
    personal_year INTEGER,
    
    -- 解釈
    interpretation JSONB,
    
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_readings (user_id, created_at DESC)
);

-- 易経リーディング
CREATE TABLE iching_readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    primary_hexagram INTEGER NOT NULL CHECK (primary_hexagram BETWEEN 1 AND 64),
    changing_hexagram INTEGER CHECK (changing_hexagram BETWEEN 1 AND 64),
    changing_lines INTEGER[],
    
    casting_method VARCHAR(20) NOT NULL,
    question TEXT,
    context TEXT,
    interpretation TEXT,
    
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_iching (user_id, created_at DESC)
);

-- 易経64卦マスターデータ
CREATE TABLE hexagrams (
    number INTEGER PRIMARY KEY CHECK (number BETWEEN 1 AND 64),
    chinese_name VARCHAR(10) NOT NULL,
    pinyin VARCHAR(20) NOT NULL,
    english_name VARCHAR(50) NOT NULL,
    japanese_name VARCHAR(50) NOT NULL,
    
    upper_trigram INTEGER NOT NULL CHECK (upper_trigram BETWEEN 1 AND 8),
    lower_trigram INTEGER NOT NULL CHECK (lower_trigram BETWEEN 1 AND 8),
    
    unicode_symbol CHAR(1) NOT NULL,
    binary_code VARCHAR(6) NOT NULL,
    
    judgment TEXT NOT NULL,
    image TEXT NOT NULL,
    
    line_meanings JSONB NOT NULL,
    keywords JSONB,
    
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 八卦（トリグラム）マスターデータ
CREATE TABLE trigrams (
    number INTEGER PRIMARY KEY CHECK (number BETWEEN 1 AND 8),
    chinese_name VARCHAR(10) NOT NULL,
    english_name VARCHAR(20) NOT NULL,
    japanese_name VARCHAR(20) NOT NULL,
    
    element VARCHAR(20) NOT NULL,
    symbol VARCHAR(3) NOT NULL,
    
    attributes JSONB,
    
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- カバラ数値解釈マスターデータ
CREATE TABLE number_meanings (
    number INTEGER NOT NULL,
    context VARCHAR(20) NOT NULL,
    language VARCHAR(2) NOT NULL DEFAULT 'ja',
    
    title VARCHAR(100),
    keywords JSONB,
    interpretation TEXT,
    
    positive_traits JSONB,
    negative_traits JSONB,
    advice TEXT,
    
    PRIMARY KEY (number, context, language)
);

-- 相性マトリックス
CREATE TABLE compatibility_matrix (
    number1 INTEGER NOT NULL CHECK (number1 BETWEEN 1 AND 9),
    number2 INTEGER NOT NULL CHECK (number2 BETWEEN 1 AND 9),
    score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
    description_ja TEXT,
    description_en TEXT,
    
    PRIMARY KEY (number1, number2),
    CHECK (number1 <= number2)
);
```

---

## 6. API設計

### 6.1 RESTful API仕様

```yaml
openapi: 3.0.0
info:
  title: Mystical Insights API
  version: 1.0.0
  
paths:
  /api/kabbalah/calculate:
    post:
      summary: カバラ数秘術計算
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                birthDate:
                  type: string
                  format: date
                fullName:
                  type: string
                language:
                  type: string
                  enum: [ja, en]
              required:
                - birthDate
                - fullName
      responses:
        200:
          description: 計算結果
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/KabbalahResult'
                
  /api/iching/divine:
    post:
      summary: 易経占い実行
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                method:
                  type: string
                  enum: [coins, yarrow, random]
                question:
                  type: string
                context:
                  type: string
              required:
                - method
      responses:
        200:
          description: 占い結果
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/IChingResult'
```

### 6.2 型定義（TypeScript）

```typescript
// ====================
// カバラ数秘術型定義
// ====================

interface KabbalahInput {
  birthDate: string;  // YYYY-MM-DD
  fullName: string;
  language: 'ja' | 'en';
  romanizedName?: string;  // 日本語の場合
}

interface NumberResult {
  value: number;
  isMaster: boolean;
  hasKarmicDebt: boolean;
  karmicNumber?: number;
  interpretation: {
    title: string;
    description: string;
    keywords: string[];
    advice: string;
  };
}

interface KabbalahResult {
  coreNumbers: {
    lifePath: NumberResult;
    expression: NumberResult;
    soulUrge: NumberResult;
    personality: NumberResult;
    birthday: NumberResult;
  };
  
  cycles: {
    pinnacles: Array<{
      number: number;
      period: string;
      age: string;
      meaning: string;
    }>;
    challenges: Array<{
      number: number;
      period: string;
      lesson: string;
    }>;
    personalYear: {
      number: number;
      theme: string;
      advice: string;
    };
  };
  
  sephirothMapping: {
    lifePath: string;  // セフィラ名
    attributes: string[];
  };
  
  summary: {
    strengths: string[];
    challenges: string[];
    purpose: string;
    advice: string;
  };
}

// ====================
// 易経型定義
// ====================

interface IChingInput {
  method: 'coins' | 'yarrow' | 'random';
  question?: string;
  context?: string;
}

interface Hexagram {
  number: number;
  chineseName: string;
  englishName: string;
  japaneseName: string;
  unicode: string;
  
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  
  judgment: string;
  image: string;
  
  lines: Array<{
    position: number;
    type: 'yin' | 'yang';
    changing: boolean;
    meaning: string;
  }>;
}

interface IChingResult {
  primary: Hexagram;
  changing?: Hexagram;
  changingLines: number[];
  
  interpretation: {
    situation: string;
    advice: string;
    warning?: string;
    timeline?: string;
  };
  
  reading: {
    question: string;
    context: string;
    method: string;
    timestamp: string;
  };
}

// ====================
// 共通型定義
// ====================

interface User {
  id: string;
  email: string;
  username: string;
  profile?: {
    fullName?: string;
    birthDate?: string;
    preferences: {
      theme: 'light' | 'dark' | 'cosmic';
      language: 'ja' | 'en';
      notifications: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface Reading {
  id: string;
  userId: string;
  type: 'kabbalah' | 'iching' | 'combined';
  result: KabbalahResult | IChingResult;
  createdAt: string;
  tags?: string[];
  notes?: string;
}

interface CompatibilityAnalysis {
  person1: KabbalahResult;
  person2: KabbalahResult;
  
  compatibility: {
    overall: number;  // 0-100
    lifePath: number;
    expression: number;
    soulUrge: number;
    personality: number;
  };
  
  analysis: {
    strengths: string[];
    challenges: string[];
    advice: string;
  };
}
```

---

## 7. 機能要件詳細

### 7.1 コア機能

```typescript
// 機能マトリックス
const features = {
  // Phase 1: MVP（必須機能）
  mvp: {
    kabbalah: {
      'ライフパス計算': 'MUST',
      '名前分析': 'MUST',
      'コア数値表示': 'MUST',
      '基本解釈': 'MUST',
      '結果保存': 'MUST'
    },
    
    iching: {
      'コイン投げ': 'MUST',
      '64卦表示': 'MUST',
      '基本解釈': 'MUST',
      '変爻対応': 'MUST',
      '結果保存': 'MUST'
    },
    
    user: {
      'ユーザー登録': 'MUST',
      'ログイン': 'MUST',
      '履歴表示': 'MUST',
      'プロフィール': 'MUST'
    }
  },
  
  // Phase 2: 拡張機能
  enhanced: {
    kabbalah: {
      '生命の樹ビジュアライゼーション': 'SHOULD',
      'ピナクル・チャレンジ計算': 'SHOULD',
      '相性診断': 'SHOULD',
      'パーソナルイヤー': 'SHOULD',
      '日本語名対応': 'SHOULD'
    },
    
    iching: {
      '筮竹法': 'COULD',
      '梅花心易': 'COULD',
      '時間占い': 'COULD',
      'AI深層解釈': 'SHOULD',
      '卦の関連性表示': 'COULD'
    },
    
    integration: {
      'カバラ×易経統合診断': 'SHOULD',
      '運勢カレンダー': 'COULD',
      'パーソナルレポート生成': 'SHOULD',
      'データエクスポート': 'COULD'
    }
  },
  
  // Phase 3: アドバンスド機能
  advanced: {
    social: {
      '占い結果シェア': 'COULD',
      'コミュニティ': 'WONT',
      '占い師マッチング': 'WONT'
    },
    
    premium: {
      '詳細レポートPDF': 'COULD',
      'API アクセス': 'WONT',
      'カスタマイズ占術': 'WONT'
    }
  }
};
```

### 7.2 ユーザーストーリー

```gherkin
# カバラ数秘術ユーザーストーリー
Feature: カバラ数秘術診断
  As a ユーザー
  I want to 生年月日と名前から数秘術診断を受ける
  So that 自己理解を深められる

  Scenario: 基本診断を実行
    Given ユーザーがカバラページにアクセス
    When 生年月日 "1990-05-15" を入力
    And 名前 "山田太郎" を入力
    And "診断する" ボタンをクリック
    Then ライフパスナンバー "5" が表示される
    And エクスプレッションナンバーが表示される
    And 詳細な解釈テキストが表示される
    And 結果を保存オプションが表示される

  Scenario: 日本語名の自動変換
    Given ユーザーが日本語名入力モード
    When 漢字で "山田太郎" を入力
    Then ふりがな入力フィールドが表示
    When "やまだたろう" を入力
    Then ローマ字 "YAMADA TARO" に自動変換
    And 数値計算が実行される

# 易経ユーザーストーリー
Feature: 易経占い
  As a ユーザー  
  I want to 質問に対する易経の答えを得る
  So that 人生の指針を得られる

  Scenario: コイン投げ法で占う
    Given ユーザーが易経ページにアクセス
    When 質問 "転職すべきか" を入力
    And "コイン投げ法" を選択
    And 6回コインを投げる
    Then 卦象が表示される
    And 卦の名前と番号が表示される
    And 判断と象が表示される
    And 変爻がある場合は之卦も表示される
```

---

## 8. UI/UXデザイン詳細

### 8.1 画面遷移図

```mermaid
graph LR
    A[ランディング] --> B{ユーザー状態}
    B -->|未ログイン| C[ログイン/登録]
    B -->|ログイン済| D[ダッシュボード]
    
    D --> E[カバラ数秘術]
    D --> F[易経]
    D --> G[統合診断]
    D --> H[履歴]
    D --> I[プロフィール]
    
    E --> E1[入力フォーム]
    E1 --> E2[計算結果]
    E2 --> E3[詳細解釈]
    E3 --> E4[保存/シェア]
    
    F --> F1[質問入力]
    F1 --> F2[占い方法選択]
    F2 --> F3[卦を立てる]
    F3 --> F4[解釈表示]
    F4 --> F5[保存/シェア]
```

### 8.2 主要画面デザイン

#### 8.2.1 ランディングページ

```typescript
const LandingPageDesign = {
  hero: {
    background: 'animated-constellation', // 星座アニメーション背景
    title: {
      text: 'Ancient Wisdom, Modern Insights',
      animation: 'typewriter-glow',
      font: 'Cinzel Decorative'
    },
    subtitle: {
      text: 'カバラ数秘術と易経で見つける、あなたの真実',
      animation: 'fade-in-up'
    },
    cta: {
      primary: '無料で始める',
      secondary: '詳しく見る',
      style: 'glass-morphism'
    }
  },
  
  features: {
    layout: 'alternating-cards',
    items: [
      {
        icon: 'tree-of-life',
        title: 'カバラ数秘術',
        description: '生命の樹と数値の神秘',
        animation: 'float'
      },
      {
        icon: 'hexagram',
        title: '易経',
        description: '64卦が示す宇宙の真理',
        animation: 'rotate'
      }
    ]
  },
  
  testimonials: {
    style: 'carousel-3d',
    autoplay: true,
    parallax: true
  }
};
```

#### 8.2.2 カバラ数秘術画面

```tsx
// カバラ入力フォームコンポーネント
const KabbalahInputForm: React.FC = () => {
  return (
    <div className="kabbalah-form">
      {/* 生年月日入力セクション */}
      <section className="birth-date-section">
        <div className="cosmic-calendar">
          {/* カスタムカレンダーUI */}
          <CalendarPicker 
            theme="mystical"
            animation="constellation-connect"
          />
        </div>
      </section>
      
      {/* 名前入力セクション */}
      <section className="name-section">
        <div className="name-input-container">
          <input 
            type="text"
            placeholder="あなたの名前を入力"
            className="mystical-input"
          />
          <div className="gematria-preview">
            {/* リアルタイムゲマトリア計算表示 */}
          </div>
        </div>
      </section>
      
      {/* 計算ボタン */}
      <button className="calculate-btn">
        <span className="btn-text">神秘を解き明かす</span>
        <span className="btn-particles">
          {/* パーティクルエフェクト */}
        </span>
      </button>
    </div>
  );
};

// 結果表示コンポーネント
const KabbalahResult: React.FC = () => {
  return (
    <div className="result-container">
      {/* 生命の樹ビジュアライゼーション */}
      <div className="tree-of-life-viz">
        <TreeOfLife 
          data={sephirothData}
          interactive={true}
          animation="energy-flow"
        />
      </div>
      
      {/* 数値カード */}
      <div className="number-cards">
        <NumberCard 
          title="ライフパス"
          number={5}
          isMaster={false}
          description="冒険と自由の探求者"
          animation="flip-reveal"
        />
        {/* 他の数値カード */}
      </div>
      
      {/* 詳細解釈 */}
      <div className="interpretation-panel">
        <TabPanel tabs={['総合', '性格', '使命', '課題']}>
          {/* タブコンテンツ */}
        </TabPanel>
      </div>
    </div>
  );
};
```

#### 8.2.3 易経画面

```tsx
// 易経メインコンポーネント
const IChingDivination: React.FC = () => {
  return (
    <div className="iching-container">
      {/* 質問入力エリア */}
      <div className="question-area">
        <textarea 
          placeholder="心に問いかけたいことを入力..."
          className="question-input"
        />
        <div className="context-tags">
          <Tag>仕事</Tag>
          <Tag>恋愛</Tag>
          <Tag>健康</Tag>
          <Tag>成長</Tag>
        </div>
      </div>
      
      {/* 占い方法選択 */}
      <div className="method-selection">
        <MethodCard 
          icon="coins"
          title="硬貨投げ"
          description="3枚の硬貨で卦を立てる"
          onClick={() => startCoinMethod()}
        />
        <MethodCard 
          icon="yarrow"
          title="筮竹法"
          description="伝統的な50本の筮竹"
          onClick={() => startYarrowMethod()}
        />
      </div>
      
      {/* コイン投げアニメーション */}
      <div className="coin-casting">
        <CoinAnimation 
          onComplete={(result) => handleCoinResult(result)}
        />
      </div>
      
      {/* 卦象表示 */}
      <div className="hexagram-display">
        <HexagramVisualization 
          primary={hexagram}
          changing={changingHexagram}
          animation="draw-lines"
        />
      </div>
    </div>
  );
};
```

---

## 9. アニメーション・インタラクション仕様

### 9.1 グローバルアニメーション

```typescript
// アニメーション定義
const animations = {
  // エントランスアニメーション
  entrance: {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    
    scaleReveal: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5, ease: "backOut" }
    },
    
    constellationDraw: {
      initial: { pathLength: 0 },
      animate: { pathLength: 1 },
      transition: { duration: 2, ease: "easeInOut" }
    }
  },
  
  // インタラクティブアニメーション
  interactive: {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(107, 70, 193, 0.3)",
      transition: { duration: 0.3 }
    },
    
    click: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    
    ripple: {
      keyframes: {
        "0%": { transform: "scale(0)", opacity: 1 },
        "100%": { transform: "scale(4)", opacity: 0 }
      },
      duration: "600ms"
    }
  },
  
  // 特殊エフェクト
  effects: {
    particleField: {
      count: 100,
      speed: 0.5,
      size: { min: 1, max: 3 },
      color: ["#6B46C1", "#D4AF37", "#4A7C7E"],
      behavior: "float"
    },
    
    auroraGlow: {
      gradient: ["#667eea", "#764ba2", "#f093fb"],
      animation: "wave",
      duration: 10000
    },
    
    mysticalGlow: {
      blur: 20,
      spread: 40,
      color: "rgba(212, 175, 55, 0.3)",
      pulse: true
    }
  }
};
```

### 9.2 コンポーネント固有アニメーション

```tsx
// 生命の樹アニメーション
const TreeOfLifeAnimation = {
  // セフィロト（球体）
  sephiroth: {
    initial: {
      scale: 0,
      opacity: 0
    },
    animate: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "backOut"
      }
    }),
    hover: {
      scale: 1.2,
      boxShadow: "0 0 30px currentColor",
      transition: { duration: 0.3 }
    }
  },
  
  // パス（接続線）
  paths: {
    draw: {
      pathLength: [0, 1],
      opacity: [0, 1],
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.5 }
      }
    },
    
    energyFlow: {
      strokeDasharray: "5 5",
      strokeDashoffset: [0, -10],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
};

// 易経卦象アニメーション
const HexagramAnimation = {
  // 線の描画
  drawLines: {
    initial: { scaleX: 0 },
    animate: (index: number) => ({
      scaleX: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  },
  
  // 変爻アニメーション
  changingLine: {
    keyframes: {
      "0%": { transform: "scaleX(1)" },
      "50%": { transform: "scaleX(0)" },
      "100%": { transform: "scaleX(1)" }
    },
    duration: "800ms",
    iteration: 2
  },
  
  // コイン投げアニメーション
  coinFlip: {
    rotateX: [0, 1800],
    rotateY: [0, 720],
    transition: {
      duration: 1.5,
      ease: "easeOut"
    }
  }
};
```

### 9.3 マイクロインタラクション

```scss
// ボタンインタラクション
.mystical-button {
  position: relative;
  overflow: hidden;
  
  // ベースステート
  background: linear-gradient(135deg, $mystic-purple, $oracle-gold);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  // ホバーエフェクト
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 10px 20px rgba(107, 70, 193, 0.3),
      0 6px 6px rgba(107, 70, 193, 0.2);
    
    &::before {
      transform: translateX(100%);
    }
    
    .button-particles {
      opacity: 1;
      animation: particle-float 2s infinite;
    }
  }
  
  // グロウエフェクト
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }
  
  // クリックフィードバック
  &:active {
    transform: scale(0.95);
    transition: transform 0.1s;
  }
}

// カードホバーエフェクト
.mystical-card {
  transform-style: preserve-3d;
  transition: transform 0.6s;
  
  &:hover {
    transform: 
      rotateY(5deg) 
      rotateX(-5deg) 
      translateZ(20px);
    
    .card-glow {
      opacity: 1;
      animation: pulse-glow 2s infinite;
    }
    
    .card-content {
      background: 
        radial-gradient(
          circle at var(--mouse-x) var(--mouse-y),
          rgba(212, 175, 55, 0.1),
          transparent
        );
    }
  }
}

// 入力フィールドインタラクション
.mystical-input {
  border: 1px solid rgba(107, 70, 193, 0.3);
  transition: all 0.3s;
  
  &:focus {
    border-color: $oracle-gold;
    box-shadow: 
      0 0 0 3px rgba(212, 175, 55, 0.1),
      inset 0 1px 2px rgba(0, 0, 0, 0.1);
    
    & + .input-label {
      transform: translateY(-25px) scale(0.85);
      color: $oracle-gold;
    }
  }
  
  &:valid {
    border-color: rgba(34, 197, 94, 0.5);
  }
}
```

---

## 10. セキュリティ要件

### 10.1 認証・認可

```typescript
// 認証フロー
const authenticationFlow = {
  // JWT設定
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
    refreshTokenExpiresIn: '30d',
    algorithm: 'HS256'
  },
  
  // セッション管理
  session: {
    name: 'mystical_session',
    secret: process.env.SESSION_SECRET,
    secure: true, // HTTPS必須
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7日
  },
  
  // レート制限
  rateLimiting: {
    login: {
      window: 15 * 60 * 1000, // 15分
      max: 5 // 最大5回
    },
    api: {
      window: 60 * 1000, // 1分
      max: 100 // 最大100リクエスト
    },
    compute: {
      window: 60 * 1000, // 1分
      max: 20 // 計算処理は20回まで
    }
  }
};
```

### 10.2 データ保護

```typescript
// データ暗号化
const dataProtection = {
  // 個人情報暗号化
  encryption: {
    algorithm: 'aes-256-gcm',
    fields: ['email', 'fullName', 'birthDate'],
    atRest: true,
    inTransit: true
  },
  
  // パスワードハッシュ化
  password: {
    algorithm: 'argon2id',
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4
  },
  
  // データマスキング
  masking: {
    email: (email: string) => {
      const [local, domain] = email.split('@');
      return `${local.slice(0, 2)}****@${domain}`;
    },
    birthDate: (date: string) => {
      return `****-**-${date.slice(-2)}`;
    }
  }
};
```

### 10.3 セキュリティヘッダー

```typescript
// セキュリティヘッダー設定
const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.mysticalinsights.com"
  ].join('; '),
  
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};
```

---

## 11. テスト戦略

### 11.1 テストピラミッド

```yaml
test_pyramid:
  unit_tests: 70%
    - ビジネスロジック
    - ユーティリティ関数
    - カバラ計算アルゴリズム
    - 易経卦判定ロジック
    
  integration_tests: 20%
    - API エンドポイント
    - データベース操作
    - 外部サービス連携
    
  e2e_tests: 10%
    - ユーザーフロー
    - クリティカルパス
    - 決済フロー
```

### 11.2 テストコード例

```typescript
// カバラ計算ユニットテスト
describe('KabbalahCalculator', () => {
  describe('calculateLifePath', () => {
    it('should calculate life path number correctly', () => {
      const result = calculateLifePath(1990, 5, 15);
      expect(result.value).toBe(3);
      expect(result.isMaster).toBe(false);
    });
    
    it('should preserve master number 22', () => {
      const result = calculateLifePath(1990, 10, 22);
      expect(result.value).toBe(22);
      expect(result.isMaster).toBe(true);
    });
    
    it('should detect karmic debt number', () => {
      const result = calculateLifePath(1990, 7, 6);
      expect(result.hasKarmicDebt).toBe(true);
      expect(result.karmicNumber).toBe(13);
    });
  });
});

// 易経APIインテグレーションテスト
describe('I Ching API', () => {
  describe('POST /api/iching/divine', () => {
    it('should return hexagram for coin method', async () => {
      const response = await request(app)
        .post('/api/iching/divine')
        .send({
          method: 'coins',
          question: 'Should I change careers?'
        });
      
      expect(response.status).toBe(200);
      expect(response.body.primary).toHaveProperty('number');
      expect(response.body.primary.number).toBeGreaterThanOrEqual(1);
      expect(response.body.primary.number).toBeLessThanOrEqual(64);
    });
  });
});

// E2Eテスト
describe('Complete Reading Flow', () => {
  it('should complete kabbalah reading from start to finish', async () => {
    await page.goto('/kabbalah');
    
    // 生年月日入力
    await page.fill('[data-testid="birth-date"]', '1990-05-15');
    
    // 名前入力
    await page.fill('[data-testid="full-name"]', 'Test User');
    
    // 計算実行
    await page.click('[data-testid="calculate-btn"]');
    
    // 結果表示確認
    await expect(page.locator('[data-testid="life-path-result"]'))
      .toBeVisible();
    
    // 保存
    await page.click('[data-testid="save-reading"]');
    
    // 履歴確認
    await page.goto('/history');
    await expect(page.locator('[data-testid="reading-item"]'))
      .toHaveCount(1);
  });
});
```

---

## 12. デプロイメント

### 12.1 CI/CDパイプライン

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '22'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm run test:ci
        
      - name: Run linting
        run: npm run lint
        
      - name: Type check
        run: npm run type-check
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build application
        run: npm run build
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: .next/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### 12.2 環境変数設定

```env
# .env.production
# データベース
DATABASE_URL=postgresql://user:pass@host:5432/mystical_insights
DIRECT_URL=postgresql://user:pass@host:5432/mystical_insights

# 認証
NEXTAUTH_URL=https://mysticalinsights.com
NEXTAUTH_SECRET=your-secret-key
JWT_SECRET=your-jwt-secret

# 外部サービス
OPENAI_API_KEY=sk-...
REDIS_URL=redis://...
SENTRY_DSN=https://...

# ストレージ
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# アナリティクス
VERCEL_ANALYTICS_ID=...
GA_MEASUREMENT_ID=G-...

# セキュリティ
ENCRYPTION_KEY=...
RATE_LIMIT_SECRET=...
```

### 12.3 インフラストラクチャ

```typescript
// infrastructure/config.ts
export const infraConfig = {
  // Vercel設定
  vercel: {
    regions: ['iad1'], // US East
    functions: {
      maxDuration: 10,
      memory: 1024
    }
  },
  
  // Supabase設定
  supabase: {
    region: 'us-east-1',
    pricing: 'pro',
    features: {
      auth: true,
      realtime: true,
      storage: true,
      edge_functions: true
    }
  },
  
  // CDN設定
  cdn: {
    provider: 'cloudflare',
    caching: {
      static: '1 year',
      api: '5 minutes',
      html: '10 minutes'
    }
  },
  
  // モニタリング
  monitoring: {
    sentry: {
      environment: 'production',
      tracesSampleRate: 0.1
    },
    uptime: {
      checks: ['https://mysticalinsights.com/health'],
      interval: '5 minutes'
    }
  }
};
```

---

## 13. 易経64卦データベース

### 13.1 64卦マスターデータ

```json
{
  "hexagrams": [
    {
      "number": 1,
      "unicode": "䷀",
      "binary": "111111",
      "name": {
        "chinese": "乾",
        "pinyin": "qián",
        "english": "The Creative",
        "japanese": "天（けん）"
      },
      "trigrams": {
        "upper": { "name": "天", "element": "heaven" },
        "lower": { "name": "天", "element": "heaven" }
      },
      "judgment": "元亨利貞。天行健，君子以自強不息。",
      "interpretation": {
        "general": "純粋な創造力と強さを表す。全てが陽の力で満ち、無限の可能性を秘めている。",
        "advice": "自信を持って前進する時。リーダーシップを発揮し、新しい道を切り開く。",
        "warning": "過度の強さは脆さを生む。謙虚さを忘れずに。",
        "keywords": ["創造", "力", "リーダーシップ", "始まり", "天命"]
      },
      "lines": [
        {
          "position": 1,
          "text": "潜龍勿用",
          "meaning": "潜んでいる龍は用いるべきでない。時期尚早。"
        },
        {
          "position": 2,
          "text": "見龍在田，利見大人",
          "meaning": "龍が田に現れる。偉大な人に会うのが良い。"
        },
        {
          "position": 3,
          "text": "君子終日乾乾",
          "meaning": "君子は終日努力を続ける。"
        },
        {
          "position": 4,
          "text": "或躍在淵",
          "meaning": "淵に躍り込むかもしれない。選択の時。"
        },
        {
          "position": 5,
          "text": "飛龍在天",
          "meaning": "飛龍が天にある。最高の時。"
        },
        {
          "position": 6,
          "text": "亢龍有悔",
          "meaning": "高ぶった龍は後悔する。頂点からの下降。"
        }
      ]
    },
    {
      "number": 2,
      "unicode": "䷁",
      "binary": "000000",
      "name": {
        "chinese": "坤",
        "pinyin": "kūn",
        "english": "The Receptive",
        "japanese": "地（こん）"
      },
      "trigrams": {
        "upper": { "name": "地", "element": "earth" },
        "lower": { "name": "地", "element": "earth" }
      },
      "judgment": "元亨，利牝馬之貞。地勢坤，君子以厚德載物。",
      "interpretation": {
        "general": "純粋な受容性と育成の力。全てを受け入れ、育む大地の如き存在。",
        "advice": "従順で受容的であることが成功への鍵。サポート役に徹する。",
        "warning": "過度の受動性は停滞を招く。適切な時に行動を。",
        "keywords": ["受容", "育成", "母性", "従順", "大地"]
      }
    },
    {
      "number": 3,
      "unicode": "䷂",
      "binary": "010001",
      "name": {
        "chinese": "屯",
        "pinyin": "zhūn",
        "english": "Difficulty at the Beginning",
        "japanese": "水雷屯（すいらいちゅん）"
      },
      "trigrams": {
        "upper": { "name": "水", "element": "water" },
        "lower": { "name": "雷", "element": "thunder" }
      },
      "judgment": "元亨利貞。勿用有攸往，利建侯。",
      "interpretation": {
        "general": "始まりの困難。新しい事業や関係の初期段階での混乱と苦労。",
        "advice": "忍耐強く基礎を築く時。急がず着実に進む。",
        "warning": "性急な行動は失敗を招く。準備と計画が重要。",
        "keywords": ["困難", "始まり", "成長痛", "忍耐", "基礎"]
      }
    },
    {
      "number": 64,
      "unicode": "䷿",
      "binary": "010101",
      "name": {
        "chinese": "未濟",
        "pinyin": "wèi jì",
        "english": "Before Completion",
        "japanese": "火水未済（かすいびせい）"
      },
      "trigrams": {
        "upper": { "name": "火", "element": "fire" },
        "lower": { "name": "水", "element": "water" }
      },
      "judgment": "亨，小狐汔濟，濡其尾，無攸利。",
      "interpretation": {
        "general": "完成直前の状態。あと少しで目標達成だが、最後の詰めが重要。",
        "advice": "慎重に最後まで気を抜かずに進める。完成まであと一歩。",
        "warning": "油断は禁物。最後の瞬間まで集中力を維持する。",
        "keywords": ["未完成", "継続", "慎重", "最終段階", "新たな始まり"]
      }
    }
  ]
}
```

### 13.2 八卦（トリグラム）データ

```json
{
  "trigrams": [
    {
      "number": 1,
      "symbol": "☰",
      "binary": "111",
      "name": {
        "chinese": "乾",
        "english": "Heaven",
        "japanese": "天"
      },
      "element": "天",
      "nature": "創造的、強い、動的",
      "family": "父",
      "body": "頭",
      "animal": "馬"
    },
    {
      "number": 2,
      "symbol": "☷",
      "binary": "000",
      "name": {
        "chinese": "坤",
        "english": "Earth",
        "japanese": "地"
      },
      "element": "地",
      "nature": "受容的、従順、静的",
      "family": "母",
      "body": "腹",
      "animal": "牛"
    },
    {
      "number": 3,
      "symbol": "☳",
      "binary": "001",
      "name": {
        "chinese": "震",
        "english": "Thunder",
        "japanese": "雷"
      },
      "element": "雷",
      "nature": "動き、興奮、始動",
      "family": "長男",
      "body": "足",
      "animal": "龍"
    },
    {
      "number": 4,
      "symbol": "☵",
      "binary": "010",
      "name": {
        "chinese": "坎",
        "english": "Water",
        "japanese": "水"
      },
      "element": "水",
      "nature": "危険、深淵、流動",
      "family": "中男",
      "body": "耳",
      "animal": "豚"
    },
    {
      "number": 5,
      "symbol": "☶",
      "binary": "100",
      "name": {
        "chinese": "艮",
        "english": "Mountain",
        "japanese": "山"
      },
      "element": "山",
      "nature": "静止、瞑想、障害",
      "family": "少男",
      "body": "手",
      "animal": "犬"
    },
    {
      "number": 6,
      "symbol": "☴",
      "binary": "110",
      "name": {
        "chinese": "巽",
        "english": "Wind",
        "japanese": "風"
      },
      "element": "風/木",
      "nature": "穏やか、浸透、柔軟",
      "family": "長女",
      "body": "股",
      "animal": "鶏"
    },
    {
      "number": 7,
      "symbol": "☲",
      "binary": "101",
      "name": {
        "chinese": "離",
        "english": "Fire",
        "japanese": "火"
      },
      "element": "火",
      "nature": "明るさ、美、付着",
      "family": "中女",
      "body": "目",
      "animal": "雉"
    },
    {
      "number": 8,
      "symbol": "☱",
      "binary": "011",
      "name": {
        "chinese": "兌",
        "english": "Lake",
        "japanese": "沢"
      },
      "element": "沢",
      "nature": "喜び、開放、反映",
      "family": "少女",
      "body": "口",
      "animal": "羊"
    }
  ]
}
```

---

## 14. 開発タスクリスト

### 14.1 Phase 1: Foundation（2週間）

```markdown
## Week 1: Setup & Infrastructure
- [ ] プロジェクト初期化（Next.js, TypeScript）
- [ ] Gitリポジトリ設定
- [ ] 開発環境構築
- [ ] データベース設計・セットアップ（Supabase）
- [ ] 認証システム実装（NextAuth）
- [ ] 基本UIコンポーネント作成
- [ ] デザインシステム構築

## Week 2: Core Business Logic  
- [ ] カバラ計算エンジン実装
- [ ] 易経データモデル作成
- [ ] API エンドポイント基本実装
- [ ] ユニットテスト作成
- [ ] 基本的な画面レイアウト
```

### 14.2 Phase 2: Feature Development（3週間）

```markdown
## Week 3: Kabbalah Features
- [ ] カバラ入力フォーム
- [ ] 計算ロジック実装
- [ ] 結果表示画面
- [ ] 生命の樹ビジュアライゼーション
- [ ] 解釈テキスト表示
- [ ] 保存機能

## Week 4: I Ching Features
- [ ] 易経入力フォーム
- [ ] コイン投げメカニズム
- [ ] 64卦データベース構築
- [ ] 卦象表示コンポーネント
- [ ] 解釈生成
- [ ] 変爻処理

## Week 5: Integration & Polish
- [ ] ユーザーダッシュボード
- [ ] 履歴機能
- [ ] プロフィール管理
- [ ] データエクスポート
- [ ] レスポンシブ対応
- [ ] アニメーション実装
```

### 14.3 Phase 3: Quality & Launch（2週間）

```markdown
## Week 6: Testing & Optimization
- [ ] インテグレーションテスト
- [ ] E2Eテスト実装
- [ ] パフォーマンス最適化
- [ ] SEO対策
- [ ] アクセシビリティ改善
- [ ] セキュリティ監査

## Week 7: Deployment & Launch
- [ ] 本番環境セットアップ
- [ ] CI/CDパイプライン構築
- [ ] モニタリング設定
- [ ] ドキュメント作成
- [ ] バックアップ戦略
- [ ] ローンチ準備
```

### 14.4 実装優先順位

```typescript
// 優先度マトリックス
const priorities = {
  critical: [
    'ユーザー認証',
    'カバラ基本計算',
    'データベース接続',
    'セキュリティ実装'
  ],
  
  high: [
    'カバラ結果表示',
    '易経基本機能',
    'レスポンシブデザイン',
    'エラーハンドリング'
  ],
  
  medium: [
    'アニメーション',
    '詳細解釈',
    'ビジュアライゼーション',
    'ソーシャル機能'
  ],
  
  low: [
    '高度な占術オプション',
    'カスタマイズ機能',
    'API公開',
    'プレミアム機能'
  ]
};
```

---

## 付録A: VSCode Claude Code用セットアップ

### セットアップコマンド

```bash
# プロジェクト初期化
npx create-next-app@latest mystical-insights --typescript --tailwind --app

# 依存関係インストール
npm install framer-motion gsap three @react-three/fiber @react-three/drei
npm install zustand @tanstack/react-query axios
npm install next-auth @auth/prisma-adapter prisma @prisma/client
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react clsx tailwind-merge

# 開発依存関係
npm install -D @types/node @types/react vitest @vitejs/plugin-react
npm install -D playwright @playwright/test
npm install -D eslint prettier eslint-config-prettier
npm install -D @tailwindcss/forms @tailwindcss/typography
```

### ファイル構成テンプレート

```typescript
// src/app/layout.tsx
import { Metadata } from 'next'
import { Cinzel_Decorative, Philosopher, Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel_Decorative({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel'
})

const philosopher = Philosopher({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-philosopher'
})

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp'
})

export const metadata: Metadata = {
  title: 'Mystical Insights - カバラ数秘術×易経',
  description: '古代の叡智で見つける、あなたの真実',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${cinzel.variable} ${philosopher.variable} ${notoSansJP.variable}`}>
      <body className="bg-cosmos-black text-text-primary">
        {children}
      </body>
    </html>
  )
}
```

---

## まとめ

本要件定義書は、カバラ数秘術と易経を統合した世界最高峰の占いWEBサービス「Mystical Insights」の完全な設計仕様です。

**重要なポイント:**

1. **美しさと機能の両立** - 触っていて楽しい、神秘的なデザイン
2. **正確な占術計算** - 本格的なカバラ数秘術と易経のアルゴリズム
3. **堅牢な実装** - セキュリティ、テスト、エラー処理を完備
4. **拡張可能な設計** - 将来の機能追加を見据えたアーキテクチャ

VSCode Claude Codeでの実装時は、この仕様書を参照しながら、段階的に機能を実装していくことをお勧めします。

**成功への鍵:**
- デザインファーストで美しいUIを作る
- テスト駆動開発で品質を保証
- ユーザー体験を最優先に考える
- 神秘性と使いやすさのバランスを保つ

準備は整いました。さあ、神秘的な旅を始めましょう！🌟
