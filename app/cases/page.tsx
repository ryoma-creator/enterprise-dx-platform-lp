'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiTrendingUp, FiClock, FiDollarSign, FiBarChart2 } from 'react-icons/fi'

// ── アニメーション ────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

// ── データ ────────────────────────────
const TABS = ['すべて', '製造業', 'EC・小売', 'サービス業', 'その他'] as const
type Tab = typeof TABS[number]

const CASES = [
  {
    id: 1,
    category: '製造業',
    img: '/images/case-manufacturing.png',
    imgFallback: '🏭',
    title: '生産管理システム刷新で業務を革新する',
    company: 'A社様（製造業・従業員300名）',
    challenge: '老朽化した紙ベースの生産管理が原因で、進捗把握に毎日2時間以上を要し、ミスも頻発していた。',
    solution: 'クラウド型生産管理システムを導入し、リアルタイムでの工程管理・在庫連携を実現。モバイルからも操作可能に。',
    metrics: [
      { icon: FiTrendingUp, label: '業務効率', value: '40%', unit: '向上', color: 'text-blue-600', bg: 'bg-blue-50' },
      { icon: FiClock,      label: '開発期間', value: '4',   unit: 'ヶ月', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { icon: FiDollarSign, label: 'コスト削減', value: '800', unit: '万円', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ],
  },
  {
    id: 2,
    category: 'EC・小売',
    img: '/images/case-ec.png',
    imgFallback: '🛒',
    title: 'ECサイトの構築・運用支援で売上を倍増',
    company: 'B社様（EC・小売業・従業員50名）',
    challenge: '自社サイトが古く、スマホ対応もできていなかった。カート離脱率が高く、受注管理もすべて手作業だった。',
    solution: 'フルリニューアルでモバイルファースト対応。受注〜出荷の自動連携システムを構築し、業務負荷を大幅削減。',
    metrics: [
      { icon: FiTrendingUp, label: '売上',     value: '150%', unit: '向上', color: 'text-blue-600', bg: 'bg-blue-50' },
      { icon: FiClock,      label: '開発期間', value: '2.5',  unit: 'ヶ月', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { icon: FiBarChart2,  label: '離脱率',   value: '38%',  unit: '改善', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ],
  },
  {
    id: 3,
    category: 'サービス業',
    img: '/images/case-rpa.png',
    imgFallback: '⚡',
    title: 'RPA導入で年間800時間の手作業を自動化',
    company: 'C社様（物流・サービス業・従業員120名）',
    challenge: '請求書処理・データ転記・メール通知など、繰り返し作業に毎月150時間以上を費やしていた。',
    solution: 'RPA（ロボティック・プロセス・オートメーション）を導入し、定型業務を完全自動化。人為ミスをゼロに。',
    metrics: [
      { icon: FiClock,      label: '年間削減時間', value: '800',   unit: '時間', color: 'text-blue-600', bg: 'bg-blue-50' },
      { icon: FiDollarSign, label: '年間コスト削減', value: '1,200', unit: '万円', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      { icon: FiTrendingUp, label: '稼働期間',      value: '2',    unit: 'ヶ月', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ],
  },
]

const SUMMARY_STATS = [
  { value: '42%', label: '平均業務効率改善', icon: '📈' },
  { value: '750万円', label: '平均コスト削減額', icon: '💴' },
  { value: '135%', label: '平均売上向上率', icon: '🚀' },
  { value: '2.8ヶ月', label: '平均導入期間', icon: '⏱' },
]

// ── コンポーネント ────────────────────────────
function CaseCard({ c, delay }: { c: typeof CASES[number]; delay: number }) {
  const catColor: Record<string, { text: string; bg: string }> = {
    '製造業':    { text: 'text-blue-700',   bg: 'bg-blue-50'   },
    'EC・小売':  { text: 'text-violet-700', bg: 'bg-violet-50' },
    'サービス業': { text: 'text-emerald-700', bg: 'bg-emerald-50' },
    'その他':    { text: 'text-gray-700',   bg: 'bg-gray-100'  },
  }
  const col = catColor[c.category] ?? catColor['その他']

  return (
    <FadeUp delay={delay}>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full group">
        {/* サムネイル */}
        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
          <Image src={c.img} alt={c.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => {}} />
          {/* フォールバック（画像がない場合） */}
          <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">{c.imgFallback}</div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${col.text} ${col.bg}`}>
            {c.category}
          </span>
        </div>

        <div className="p-6 flex flex-col gap-4 flex-1">
          <div>
            <p className="text-xs text-gray-400 mb-1">{c.company}</p>
            <h3 className="font-black text-gray-900 text-base leading-snug">{c.title}</h3>
          </div>

          {/* 課題・解決 */}
          <div className="space-y-3">
            <div className="bg-red-50 rounded-xl p-3 border-l-2 border-red-300">
              <p className="text-xs font-bold text-red-600 mb-1">課題</p>
              <p className="text-xs text-gray-600 leading-relaxed">{c.challenge}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border-l-2 border-blue-400">
              <p className="text-xs font-bold text-blue-600 mb-1">解決策</p>
              <p className="text-xs text-gray-600 leading-relaxed">{c.solution}</p>
            </div>
          </div>

          {/* メトリクス */}
          <div className="grid grid-cols-3 gap-2">
            {c.metrics.map((m, i) => (
              <div key={i} className={`rounded-xl p-3 text-center ${m.bg}`}>
                <m.icon size={14} className={`mx-auto mb-1 ${m.color}`} />
                <div className={`text-lg font-black ${m.color}`}>{m.value}</div>
                <div className="text-[10px] text-gray-500">{m.unit}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-auto pt-2">
            <a href="#" className="group/btn flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              詳しく見る
              <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

// ── メインページ ────────────────────────────
export default function CasesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('すべて')

  const filtered = activeTab === 'すべて'
    ? CASES
    : CASES.filter(c => c.category === activeTab)

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      {/* ── ナビゲーション ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-lg text-gray-900">NextGrow</span>
          </Link>
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">← トップへ戻る</Link>
            <a href="#" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm">
              無料相談を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* ── ヒーロー ── */}
      <section className="relative pt-16 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image src="/images/city_sky.png" alt="導入事例" fill className="object-cover object-right-center" priority />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 65%, rgba(255,255,255,0) 75%)'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <FadeUp>
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
              <span>›</span>
              <span className="text-gray-800 font-medium">導入事例</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-5 max-w-2xl">
              DXで成果を上げた<br />
              <span className="text-blue-600">企業のリアルな声</span>
            </h1>
            <p className="text-gray-600 text-base leading-relaxed max-w-xl mb-8">
              NextGrowのDX支援で実際に成果を上げた企業の事例をご紹介します。<br />
              業種・規模を問わず、課題解決から成果創出まで伴走します。
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">無料相談を予約する →</span>
              </a>
              <a href="#" className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 font-bold rounded-xl text-sm transition-all bg-white/80 backdrop-blur-sm">
                資料をダウンロードする ↓
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── フィルタータブ ── */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 py-3 overflow-x-auto">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}>
                {tab}
                {tab !== 'すべて' && (
                  <span className={`ml-1.5 text-xs ${activeTab === tab ? 'text-blue-200' : 'text-gray-400'}`}>
                    {CASES.filter(c => c.category === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ケースカード一覧 ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-4">📂</p>
              <p className="font-medium">該当する事例がありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c, i) => (
                <CaseCard key={c.id} c={c} delay={i * 0.08} />
              ))}
            </div>
          )}

          <FadeUp className="mt-10 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 border border-blue-200 px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              さらに事例を見る <FiArrowRight size={14} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── サマリー統計 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-2xl font-black text-center text-gray-900 mb-10">導入企業の成果まとめ</h2>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {SUMMARY_STATS.map((stat, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-slate-50 rounded-2xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-black text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── フッターCTA ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-sm">🏆</span>
              <span className="text-yellow-300 text-sm font-bold">完全無料 初回相談実施中</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
              DXの成功は、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                パートナー選びから。
              </span>
            </h2>
            <p className="text-blue-200/80 text-base mb-8">まずは無料相談で、貴社の課題をお聞かせください。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-0 bg-blue-600 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-110" />
                <span className="relative">無料相談を予約する →</span>
              </a>
              <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base border-2 border-white/25 text-white hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative">資料をダウンロードする ↓</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-slate-950 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-white">NextGrow</span>
          </Link>
          <div className="flex flex-wrap gap-6 text-xs text-gray-500 justify-center">
            <a href="#" className="hover:text-gray-300 transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-gray-300 transition-colors">特定商取引法に基づく表記</a>
            <a href="#" className="hover:text-gray-300 transition-colors">お問い合わせ</a>
          </div>
          <p className="text-xs text-gray-600">© 2025 NextGrow Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
