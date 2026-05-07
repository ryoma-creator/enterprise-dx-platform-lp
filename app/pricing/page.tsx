'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheck, FiArrowRight, FiMessageCircle } from 'react-icons/fi'

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

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    label: 'スタータープラン',
    price: '30',
    unit: '万円〜',
    desc: '小規模な業務改善や、まずDXを試してみたい企業様向けのプランです。',
    featured: false,
    features: [
      '業務分析・ヒアリング',
      '課題整理とロードマップ作成',
      '小規模システム開発（1機能）',
      '基本サポート（3ヶ月）',
      '月次レポート提出',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    label: 'スタンダードプラン',
    price: '80',
    unit: '万円〜',
    desc: '10名程度の組織の業務効率化や複数機能のシステム開発に対応します。',
    featured: true,
    features: [
      'Starterの全内容を含む',
      '中規模システム開発（複数機能）',
      'UI/UX設計・改善',
      'システム連携・API開発',
      '専任担当者アサイン',
      '運用サポート（6ヶ月）',
      '月次ミーティング',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'プレミアムプラン',
    price: '150',
    unit: '万円〜',
    desc: '大規模開発や組織全体のDX推進、長期的なパートナーシップを希望する企業様向けです。',
    featured: false,
    features: [
      'Standardの全内容を含む',
      '大規模・複合システム開発',
      '専任チームによる開発体制',
      'データ分析・BI構築',
      'カスタムAPI・外部連携',
      '優先対応・緊急サポート',
      '運用サポート（12ヶ月）',
      '経営層向け戦略レポート',
    ],
  },
]

const NAV_LINKS = [
  { label: 'サービス',    href: '/#services' },
  { label: '導入事例',   href: '/cases' },
  { label: '選ばれる理由', href: '/#reasons' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'よくある質問', href: '/#faq' },
]

export default function PricingPage() {
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
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.href === '/pricing'
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5'
                    : 'text-gray-600 hover:text-blue-600'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block px-4 py-2 border border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 rounded-lg text-sm font-medium transition-all">
              資料ダウンロード
            </a>
            <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              無料相談を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* ── ヒーロー（左テキスト / 右写真） ── */}
      <section className="pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[360px]">
          {/* 左：テキスト */}
          <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-14 bg-white">
            <FadeUp>
              <div className="text-xs text-gray-400 mb-5 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                <span>›</span>
                <span className="text-gray-700 font-medium">料金プラン</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-4">
                料金プラン
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                お客様の課題や規模に合わせて、最適なプランをご提案します。<br />
                ご予算やスケジュールに応じて、カスタマイズも対応可能です。
              </p>
            </FadeUp>
          </div>

          {/* 右：写真 */}
          <div className="relative hidden lg:block min-h-[360px]">
            <Image src="/images/case-rpa.png" alt="料金プラン" fill className="object-cover object-center" priority />
            <div className="absolute inset-0 bg-blue-900/40" />
          </div>
        </div>
      </section>

      {/* ── 料金カード ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <FadeUp key={plan.id} delay={i * 0.1}>
                {plan.featured ? (
                  // おすすめカード（強調）
                  <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20">
                    {/* おすすめバッジ */}
                    <div className="bg-blue-600 text-white text-xs font-bold text-center py-2 tracking-wide">
                      おすすめ
                    </div>
                    <div className="bg-blue-600 p-7 text-white">
                      <p className="text-blue-200 text-xs font-bold mb-1">{plan.label}</p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-4xl font-black">{plan.price}</span>
                        <span className="text-lg font-bold">{plan.unit}</span>
                      </div>
                      <p className="text-blue-100 text-xs leading-relaxed">{plan.desc}</p>
                    </div>
                    <div className="bg-white p-7 flex flex-col gap-6">
                      <ul className="space-y-3">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <FiCheck size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                        <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">無料相談で詳しく見る →</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  // 通常カード
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-6">
                    <div>
                      <p className="text-gray-400 text-xs font-bold mb-1">{plan.label}</p>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                        <span className="text-lg font-bold text-gray-600">{plan.unit}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{plan.desc}</p>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <FiCheck size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="flex items-center justify-center gap-2 w-full py-3.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
                      無料相談で詳しく見る <FiArrowRight size={13} />
                    </a>
                  </div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 料金について ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <FiMessageCircle size={18} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-3">料金について</h3>
                <ul className="space-y-2 text-sm text-gray-500 leading-relaxed list-none">
                  <li>・ 上記は目安の料金です。実際のお見積もりは、要件ヒアリング後にご提示します。</li>
                  <li>・ 複数機能の組み合わせや規模によってカスタマイズが可能です。</li>
                  <li>・ 初回相談・お見積もりは完全無料です。お気軽にご連絡ください。</li>
                  <li>・ 月額サポート契約（保守・運用）は別途ご相談となります。</li>
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── フッターCTA ── */}
      <section className="py-16 bg-blue-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <FadeUp className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-3 leading-tight">
                プランに関するご相談・<br className="hidden lg:block" />お見積もりはこちら
              </h2>
              <p className="text-blue-200 text-sm mb-7">ご予算や課題に合わせて最適なプランをご提案します。まずはお気軽にご相談ください。</p>
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

            <FadeUp delay={0.15} className="flex-shrink-0">
              <div className="relative w-44 h-44 flex flex-col items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400/60" />
                <div className="absolute inset-2 rounded-full border border-yellow-400/30" />
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
