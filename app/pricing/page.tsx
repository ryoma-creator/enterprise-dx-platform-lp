'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiCheck, FiArrowRight, FiHeadphones } from 'react-icons/fi'

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

const NAV_LINKS = [
  { label: 'サービス',     href: '/#services' },
  { label: '導入事例',    href: '/cases' },
  { label: '選ばれる理由', href: '/#reasons' },
  { label: '料金プラン',  href: '/pricing' },
  { label: 'よくある質問', href: '/#faq' },
]

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    label: 'スタータープラン',
    price: '30',
    desc: 'DXをこれから始める企業様におすすめのスモールスタートプラン',
    featured: false,
    features: [
      '現状分析・課題整理',
      'DX戦略ロードマップの策定',
      '業務プロセスの可視化',
      '月1回の定例ミーティング',
      'メールサポート',
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    label: 'スタンダードプラン',
    price: '80',
    desc: 'DX推進を加速させたい企業様向けの標準プラン',
    featured: true,
    features: [
      'Starterのすべての内容',
      '業務改善・システム導入支援',
      'データ活用基盤の構築支援',
      '効果測定・改善提案',
      '月2回の定例ミーティング',
      'チャットサポート',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'プレミアムプラン',
    price: '150',
    desc: '全社的なDX変革を実現したい企業様向けの伴走支援プラン',
    featured: false,
    features: [
      'Standardのすべての内容',
      '全社DX戦略の策定・実行支援',
      'システムのフルカスタマイズ開発',
      'データ分析・AI活用支援',
      '専任コンサルタントの伴走支援',
      '24時間サポート対応',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden bg-white">

      {/* ── ナビゲーション ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-lg text-gray-900">NextGrow</span>
          </Link>
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href}
                className={`text-sm font-medium transition-colors ${
                  link.href === '/pricing'
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5 font-bold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded-lg text-sm font-bold transition-all">
              資料ダウンロード
            </a>
            <a href="#" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              無料相談を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* ── ヒーロー ── */}
      <section className="pt-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center min-h-[280px]">
          {/* 左：テキスト */}
          <div className="flex-1 py-12 lg:py-16 pr-0 lg:pr-10">
            <FadeUp>
              <div className="text-xs text-gray-400 mb-5 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                <span>›</span>
                <span className="text-gray-700 font-medium">料金プラン</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-5">
                料金プラン
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                お客様の課題や規模に合わせて、最適なプランをご用意しています。<br />
                まずはスモールスタートから、事業の成長に合わせて柔軟に拡張が可能です。
              </p>
            </FadeUp>
          </div>

          {/* 右：画像 */}
          <div className="flex-1 relative hidden lg:block h-64 lg:h-72 w-full">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <Image
                src="/images/pricing-hero.png"
                alt="料金プラン"
                fill
                className="object-cover object-center"
                priority
                onError={() => {}}
              />
              {/* blue monochrome overlay */}
              <div className="absolute inset-0 bg-blue-400/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── プランカード ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan, i) => (
              <FadeUp key={plan.id} delay={i * 0.1} className="flex flex-col">
                {plan.featured ? (
                  <div className="flex flex-col flex-1">
                    {/* おすすめバッジ */}
                    <div className="flex justify-center mb-[-1px] relative z-10">
                      <span className="bg-blue-600 text-white text-xs font-bold px-6 py-1.5 rounded-t-lg">
                        おすすめ
                      </span>
                    </div>
                    {/* カード本体 */}
                    <div className="flex flex-col flex-1 rounded-2xl border-2 border-blue-600 shadow-lg shadow-blue-100 p-7 bg-white">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-black text-blue-600 mb-1">{plan.name}</h3>
                        <p className="text-xs text-gray-400 font-medium mb-4">{plan.label}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.desc}</p>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-sm font-bold text-blue-600">月額</span>
                          <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                          <span className="text-base font-bold text-gray-600">万円〜</span>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-7 flex-1">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                            <FiCheck size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-white text-sm hover:-translate-y-0.5 transition-all duration-300">
                        <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative">無料相談を予約する</span>
                        <FiArrowRight size={14} className="relative" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 rounded-2xl border border-gray-200 p-7 bg-white mt-[30px]">
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-black text-blue-600 mb-1">{plan.name}</h3>
                      <p className="text-xs text-gray-400 font-medium mb-4">{plan.label}</p>
                      <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.desc}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-sm font-bold text-blue-600">月額</span>
                        <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                        <span className="text-base font-bold text-gray-600">万円〜</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-7 flex-1">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <FiCheck size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full border-2 border-blue-400 text-blue-600 font-bold text-sm hover:bg-blue-50 transition-all">
                      無料相談を予約する
                      <FiArrowRight size={13} />
                    </a>
                  </div>
                )}
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 料金について ── */}
      <section className="py-12 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

              {/* 左：注意書き */}
              <div className="flex-1">
                <h3 className="font-black text-gray-900 text-lg mb-2">料金について</h3>
                <div className="w-8 h-0.5 bg-blue-600 rounded-full mb-5" />
                <ul className="space-y-3">
                  {[
                    '料金はご支援範囲や体制により変動します。詳細はお気軽にお問い合わせください。',
                    '初期費用は原則不要です。',
                    '契約期間は3ヶ月単位でのご契約となります。',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <FiCheck size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 右：CTAボックス */}
              <div className="flex-1 flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiHeadphones size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-base mb-1">プランに関するご相談・お見積りはこちら</p>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">専門スタッフが貴社に最適なプランをご提案します。</p>
                  <a href="#" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-all shadow-sm">
                    無料相談を予約する
                    <FiArrowRight size={13} />
                  </a>
                </div>
              </div>

            </div>
          </FadeUp>
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
