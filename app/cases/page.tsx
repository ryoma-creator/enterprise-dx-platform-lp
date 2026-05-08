'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowRight, FiBarChart2, FiTrendingUp, FiClock, FiPieChart } from 'react-icons/fi'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

const TABS = ['すべて', '製造業', 'EC・小売業', 'サービス業', 'その他'] as const
type Tab = typeof TABS[number]

const CASES = [
  {
    id: 1,
    category: '製造業',
    img: '/images/case-manufacturing.png',
    title: '生産管理システムの刷新で\n業務効率を大幅に改善',
    company: '株式会社○○製作所 様',
    description: '老朽化した生産管理システムを刷新し、リアルタイムでの進捗管理とデータの可視化を実現。属人化していた業務を標準化し、生産性が大幅に向上しました。',
    metrics: [
      { label: '業務効率', value: '40%', unit: '改善' },
      { label: '導入期間', value: '4',   unit: 'ヶ月' },
      { label: '年間コスト削減', value: '800', unit: '万円' },
    ],
  },
  {
    id: 2,
    category: 'EC・小売業',
    img: '/images/case-ec.png',
    title: 'ECサイトの構築・運用支援で\n売上を大きく伸長',
    company: '株式会社△商店 様',
    description: '戦略設計からサイト構築、集客施策までを一貫して支援。UI/UXの改善とマーケティング施策により、売上が150%向上しました。',
    metrics: [
      { label: '売上',    value: '150%', unit: '向上' },
      { label: '導入期間', value: '3',    unit: 'ヶ月' },
      { label: 'CVR',    value: '2.5',  unit: '倍'   },
    ],
  },
  {
    id: 3,
    category: 'サービス業',
    img: '/images/case-rpa.png',
    title: 'RPA導入による業務自動化で\n年間800万円のコスト削減',
    company: '株式会社□□サービス 様',
    description: '定型業務をRPAで自動化し、人的リソースをコア業務へシフト。ミスの削減と業務スピードの向上を実現しました。',
    metrics: [
      { label: '年間コスト削減', value: '800',   unit: '万円' },
      { label: '削減工数',      value: '1,200', unit: '時間' },
      { label: '導入期間',      value: '2',     unit: 'ヶ月' },
    ],
  },
]

const SUMMARY_STATS = [
  { icon: FiBarChart2,  value: '42%',     unit: '',      label: '平均業務効率改善率' },
  { icon: FiPieChart,   value: '750万円',  unit: '/年',   label: '平均コスト削減額' },
  { icon: FiTrendingUp, value: '135%',    unit: '',      label: '平均売上向上率' },
  { icon: FiClock,      value: '2.8ヶ月', unit: '',      label: '平均導入期間' },
]

function CaseCard({ c, delay }: { c: typeof CASES[number]; delay: number }) {
  return (
    // h-full でグリッドセルを埋める → 全カード同じ高さになる
    <FadeUp delay={delay} className="h-full">
      <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
        {/* サムネイル：固定高さ */}
        <div className="relative h-52 flex-shrink-0 overflow-hidden">
          <Image src={c.img} alt={c.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
            {c.category}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          {/* タイトル・会社名：min-h で2行分確保 → 行数が違っても揃う */}
          <div className="min-h-[4rem] mb-3">
            <h3 className="font-bold text-gray-900 text-base leading-snug whitespace-pre-line mb-1.5">{c.title}</h3>
            <p className="text-xs text-gray-400">{c.company}</p>
          </div>

          {/* 説明：line-clamp-4 で行数を統一 */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4">{c.description}</p>

          {/* メトリクス：mt-auto で底部方向に寄せ、ラベルに min-h で縦位置を揃える */}
          <div className="mt-auto">
            <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-4">
              {c.metrics.map((m, i) => (
                <div key={i} className="py-3 px-2 text-center">
                  {/* min-h-[2rem] でラベルの高さを固定 → 数値の縦位置が全セルで揃う */}
                  <p className="text-[11px] text-gray-500 leading-tight min-h-[2rem] flex items-center justify-center">{m.label}</p>
                  <p className="text-lg font-black text-blue-600 leading-none">{m.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{m.unit}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="#" className="flex items-center justify-center gap-1.5 w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
              詳しく見る <FiArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('すべて')

  const filtered = activeTab === 'すべて'
    ? CASES
    : CASES.filter(c => c.category === activeTab)

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      {/* ── ナビゲーション ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-lg text-gray-900">NextGrow</span>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/#services" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">サービス</Link>
            <Link href="/cases" className="text-sm text-blue-600 font-bold border-b-2 border-blue-600 pb-0.5">導入事例</Link>
            <Link href="/#reasons" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">選ばれる理由</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">料金プラン</Link>
            <Link href="/faq" className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">よくある質問</Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 rounded-lg text-sm font-medium transition-all">
              資料ダウンロード
            </a>
            <a href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              無料相談を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* ── ヒーロー（左テキスト / 右写真） ── */}
      <section className="pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
          {/* 左：テキスト */}
          <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-16 bg-white">
            <FadeUp>
              <div className="text-xs text-gray-400 mb-5 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                <span>›</span>
                <span className="text-gray-700 font-medium">導入事例</span>
              </div>
              <p className="text-sm font-bold text-blue-600 mb-3">導入事例</p>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                DXで成果を上げた<br />企業のリアルな声
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md">
                NextGrowのDX支援サービスを導入いただいた企業様の事例をご紹介します。<br />
                業種や課題はさまざまですが、共通して「業務の効率化」と「ビジネスの成長」を実現しています。
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#" className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">無料相談を予約する →</span>
                </a>
                <a href="#" className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 font-bold rounded-lg text-sm transition-all">
                  資料をダウンロードする ↓
                </a>
              </div>
            </FadeUp>
          </div>

          {/* 右：写真 */}
          <div className="relative hidden lg:block min-h-[480px]">
            <Image src="/images/city_sky.png" alt="企業オフィス" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-blue-900/30" />
          </div>
        </div>
      </section>

      {/* ── フィルタータブ ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 py-4 overflow-x-auto justify-center">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── ケースカード ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="font-medium">該当する事例がありません</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c, i) => (
                <CaseCard key={c.id} c={c} delay={i * 0.07} />
              ))}
            </div>
          )}

          <FadeUp className="mt-10 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 border border-gray-300 px-8 py-3 rounded-full hover:border-blue-400 hover:text-blue-600 transition-all">
              すべての事例を見る →
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ── 導入企業の成果まとめ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-gray-900 mb-3">導入企業の成果まとめ</h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full mx-auto" />
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {SUMMARY_STATS.map((stat, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full border-2 border-blue-100 flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={24} className="text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                  <p className="text-3xl font-black text-blue-600">
                    {stat.value}
                    {stat.unit && <span className="text-lg font-bold text-gray-500 ml-0.5">{stat.unit}</span>}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── フッターCTA ── */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* 左：テキスト＋ボタン */}
            <FadeUp className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-3 leading-tight">
                DXの成功は、パートナー選びから。
              </h2>
              <p className="text-blue-200 text-sm mb-7">まずは無料相談で、貴社の課題をお聞かせください。</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white text-sm shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <span className="relative">無料相談を予約する →</span>
                </a>
                <a href="#" className="flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white hover:border-white/60 font-bold rounded-lg text-sm transition-all">
                  資料をダウンロードする ↓
                </a>
              </div>
            </FadeUp>

            {/* 右：完全無料バッジ */}
            <FadeUp delay={0.15} className="flex-shrink-0">
              <div className="relative w-44 h-44 flex flex-col items-center justify-center">
                {/* 放射状の装飾線 */}
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400/60" />
                <div className="absolute inset-2 rounded-full border border-yellow-400/30" />
                {/* 月桂樹風の飾り */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-yellow-400/70 text-xs tracking-widest">✦ ✦ ✦</div>
                <div className="relative text-center px-4 pb-4">
                  <p className="text-yellow-300 text-xs font-bold mb-1">ご相談・お見積り</p>
                  <p className="text-yellow-400 text-3xl font-black leading-none">完全無料</p>
                  <p className="text-yellow-200/70 text-[10px] mt-2 leading-tight">ご相談後にご契約頂く<br />必要はありません</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-slate-950 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
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
