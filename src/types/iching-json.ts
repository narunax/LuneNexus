/**
 * JSONベースの易経データ型定義
 * data/iching/hexagram_XX.json の構造に対応
 */

export interface TrigramDetail {
  name: string
  nature: string
  element: string
  direction: string
  season?: string
  animal?: string
  body_part?: string
  attributes: string[]
}

export interface DiagnosisCategory {
  backend_tag: string
  frontend_button: string
  scholarship: string // バックエンドのみで使用（フロントエンドでは非表示）
  situation: string
  advice: string
  warning: string
  affirmation: string
}

export interface Inspiration {
  keywords: string[]
  symbols: string[]
  academic_note: string
}

export interface Line {
  position: number
  name: string
  meaning: string
  advice: string
  affirmation: string
}

export interface HexagramJSON {
  id: number
  gua_name: string
  kanji: string
  reading: string
  english_title: string
  binary_code: string
  trigrams: {
    upper: TrigramDetail
    lower: TrigramDetail
  }
  oracle_text: string
  core_description: string
  diagnoses: {
    time_and_mandate: DiagnosisCategory
    virtue_and_conduct: DiagnosisCategory
    contemplation_and_cultivation: DiagnosisCategory
    field_and_foundation: DiagnosisCategory
  }
  inspiration: Inspiration
  lines: Line[]
}

// ジャンル選択のキー型
export type DiagnosisKey = keyof HexagramJSON['diagnoses']

// フロントエンドのジャンルボタン定義
export interface GenreButton {
  key: DiagnosisKey
  label: string
  icon: string
  description: string
}

export const GENRE_BUTTONS: GenreButton[] = [
  {
    key: 'time_and_mandate',
    label: '流れ・好機',
    icon: '🌊',
    description: '運気の流れとタイミング',
  },
  {
    key: 'virtue_and_conduct',
    label: '仕事・対人',
    icon: '🤝',
    description: '社会的行動と人間関係',
  },
  {
    key: 'contemplation_and_cultivation',
    label: '自己・精神',
    icon: '🧘',
    description: '内面の成長と意識',
  },
  {
    key: 'field_and_foundation',
    label: '基盤・環境',
    icon: '🏛️',
    description: '物理的環境と身体性',
  },
]

// 質問タグの型定義
export interface QuestionTag {
  id: string
  label: string
  icon: string
  category: string
  mappedDiagnosis: DiagnosisKey | null // null = 全方向性表示
}

// ユーザーが選択する質問タグ一覧
export const QUESTION_TAGS: QuestionTag[] = [
  // 仕事・キャリア
  { id: 'work', label: '仕事', icon: '💼', category: '仕事・キャリア', mappedDiagnosis: 'virtue_and_conduct' },
  { id: 'career', label: 'キャリア', icon: '📈', category: '仕事・キャリア', mappedDiagnosis: 'time_and_mandate' },
  { id: 'business', label: '事業・経営', icon: '🏢', category: '仕事・キャリア', mappedDiagnosis: 'time_and_mandate' },

  // 人間関係
  { id: 'love', label: '恋愛', icon: '💕', category: '人間関係', mappedDiagnosis: 'virtue_and_conduct' },
  { id: 'family', label: '家族', icon: '👨‍👩‍👧‍👦', category: '人間関係', mappedDiagnosis: 'virtue_and_conduct' },
  { id: 'relationship', label: '人間関係', icon: '🤝', category: '人間関係', mappedDiagnosis: 'virtue_and_conduct' },

  // 内面・成長
  { id: 'self_growth', label: '自己成長', icon: '🌱', category: '内面・成長', mappedDiagnosis: 'contemplation_and_cultivation' },
  { id: 'inner_work', label: '内観', icon: '🧘', category: '内面・成長', mappedDiagnosis: 'contemplation_and_cultivation' },

  // 決断・選択
  { id: 'decision', label: '決断', icon: '🎯', category: '決断・選択', mappedDiagnosis: 'time_and_mandate' },
  { id: 'choice', label: '選択', icon: '🔀', category: '決断・選択', mappedDiagnosis: 'time_and_mandate' },

  // 健康・環境
  { id: 'health', label: '健康', icon: '🏥', category: '健康・環境', mappedDiagnosis: 'field_and_foundation' },
  { id: 'space', label: '空間・場所', icon: '🏛️', category: '健康・環境', mappedDiagnosis: 'field_and_foundation' },

  // 総合
  { id: 'general', label: '総合・その他', icon: '🌟', category: '総合', mappedDiagnosis: null },
]
