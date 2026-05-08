'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiArrowRight, FiHeadphones, FiCheck, FiX,
  FiBarChart2, FiMap, FiSettings, FiDatabase,
  FiTrendingUp, FiUsers, FiMessageSquare, FiMail,
  FiUserCheck, FiClock, FiAward,
} from 'react-icons/fi'

/* ── アニメーション helpers ── */
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

function FadeRow({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.36, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

/* ── Nav ── */
const NAV_LINKS = [
  { label: 'サービス',     href: '/#services' },
  { label: '導入事例',    href: '/cases' },
  { label: '選ばれる理由', href: '/#reasons' },
  { label: '料金プラン',  href: '/pricing' },
  { label: 'よくある質問', href: '/faq' },
]

/* ── プランデータ ── */
const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    label: 'スタータープラン',
    price: '30',
    desc: 'DXをこれから始める企業様におすすめのスモールスタートプラン',
    badge: null,
    icon: '🌱',
    iconBg: 'bg-emerald-100',
    nameColor: 'text-emerald-600',
    priceColor: 'text-emerald-600',
    border: 'border-gray-200',
    shadow: '',
    btnClass: 'border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50',
    btnFill: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    label: 'スタンダードプラン',
    price: '80',
    desc: 'DX推進を加速させたい企業様向けの標準プラン',
    badge: 'おすすめ',
    badgeColor: 'bg-blue-600',
    icon: '📊',
    iconBg: 'bg-blue-100',
    nameColor: 'text-blue-600',
    priceColor: 'text-gray-900',
    border: 'border-2 border-blue-600',
    shadow: 'shadow-lg shadow-blue-100',
    btnClass: 'bg-blue-600 text-white hover:bg-blue-700',
    btnFill: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    label: 'プレミアムプラン',
    price: '150',
    desc: '全社的なDX変革を実現したい企業様向けの伴走支援プラン',
    badge: '最も充実',
    badgeColor: 'bg-amber-500',
    icon: '👑',
    iconBg: 'bg-amber-100',
    nameColor: 'text-amber-500',
    priceColor: 'text-amber-500',
    border: 'border-amber-300',
    shadow: 'shadow-xl shadow-amber-100',
    btnClass: 'bg-gradient-to-r from-amber-500 to-orange-400 text-white hover:from-amber-600 hover:to-orange-500',
    btnFill: true,
  },
]

/* ── 比較テーブルデータ ── */
type Cell = boolean | string

const COMPARISON: {
  Icon: React.ElementType
  label: string
  starter: Cell
  standard: Cell
  premium: Cell
}[] = [
  { Icon: FiBarChart2, label: '現状分析・課題整理',         starter: true,            standard: true,             premium: true },
  { Icon: FiMap,       label: 'DX戦略ロードマップの策定',   starter: true,            standard: true,             premium: true },
  { Icon: FiSettings,  label: '業務プロセスの可視化',       starter: true,            standard: '対応（詳細分析付き）',  premium: '対応（全社プロセス対応）' },
  { Icon: FiDatabase,  label: 'データ活用基盤の構築支援',   starter: false,           standard: true,             premium: '対応（本格構築支援）' },
  { Icon: FiTrendingUp,label: '効果測定・改善提案',         starter: false,           standard: true,             premium: '対応（継続的な改善支援）' },
  { Icon: FiUsers,     label: '定例ミーティング',           starter: '対応（月1回）',   standard: '対応（月2回）',   premium: '対応（月2回）' },
  { Icon: FiMessageSquare, label: 'チャットサポート',       starter: true,            standard: true,             premium: '対応（優先対応）' },
  { Icon: FiMail,      label: 'メールサポート',             starter: true,            standard: true,             premium: '対応（優先対応）' },
  { Icon: FiUserCheck, label: '専任コンサルタントの伴走支援', starter: false,          standard: false,            premium: true },
  { Icon: FiClock,     label: '24時間サポート対応',         starter: false,           standard: false,            premium: true },
]

/* ── セルコンポーネント ── */
function PlanCell({ value, planId }: { value: Cell; planId: string }) {
  const isGreen   = planId === 'starter'
  const isBlue    = planId === 'standard'
  const isGold    = planId === 'premium'
  const checkBg   = isGold ? 'bg-amber-500' : isBlue ? 'bg-blue-600' : 'bg-emerald-500'
  const textColor = isGold ? 'text-amber-600' : isBlue ? 'text-blue-700' : 'text-emerald-700'

  if (value === false) {
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
          <FiX size={12} className="text-red-400" />
        </div>
        <span className="text-xs text-red-400 font-medium">未対応</span>
      </div>
    )
  }
  const label = value === true ? '対応' : value
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${checkBg}`}>
        <FiCheck size={12} className="text-white" />
      </div>
      <span className={`text-xs font-medium ${textColor}`}>{label}</span>
    </div>
  )
}

/* ── メインページ ── */
export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null)

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden bg-white">

      {/* ── ナビ ── */}
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
                className={`text-sm font-medium transition-colors ${link.href === '/pricing' ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5 font-bold' : 'text-gray-600 hover:text-blue-600'}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded-lg text-sm font-bold transition-all">資料ダウンロード</a>
            <a href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">無料相談を予約する</a>
          </div>
        </div>
      </nav>

      {/* ── ヒーロー ── */}
      <section className="pt-16 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center min-h-[280px]">
          <div className="flex-1 py-12 lg:py-16 pr-0 lg:pr-10">
            <FadeUp>
              <div className="text-xs text-gray-400 mb-5 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                <span>›</span>
                <span className="text-gray-700 font-medium">料金プラン</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-5">料金プラン</h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-md">
                お客様の課題や規模に合わせて、最適なプランをご用意しています。<br />
                まずはスモールスタートから、事業の成長に合わせて柔軟に拡張が可能です。
              </p>
            </FadeUp>
          </div>
          <div className="flex-1 relative hidden lg:block h-64 lg:h-72 w-full">
            <div className="absolute inset-0 overflow-hidden rounded-xl">
              <Image src="/images/pricing-hero.png" alt="料金プラン" fill className="object-cover object-center" priority onError={() => {}} />
              <div className="absolute inset-0 bg-blue-400/40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── プランカード ── */}
      <section className="pb-0 pt-10 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            {PLANS.map((plan, i) => {
              const isHovered = hoveredPlan === plan.id
              const isOtherHovered = hoveredPlan !== null && !isHovered
              return (
                <FadeUp key={plan.id} delay={i * 0.1} className="flex flex-col">
                  <div className="relative flex flex-col">
                    {/* バッジ */}
                    {plan.badge && (
                      <div className={`flex ${plan.id === 'premium' ? 'justify-end' : 'justify-center'} mb-[-1px] relative z-10`}>
                        <span className={`${plan.badgeColor} text-white text-xs font-bold px-5 py-1.5 rounded-t-lg`}>
                          {plan.badge}
                        </span>
                      </div>
                    )}

                    {/* カード本体 */}
                    <motion.div
                      onMouseEnter={() => setHoveredPlan(plan.id)}
                      onMouseLeave={() => setHoveredPlan(null)}
                      animate={{
                        scale: isHovered ? 1.04 : isOtherHovered ? 0.97 : 1,
                        opacity: isOtherHovered ? 0.75 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className={`flex flex-col flex-1 rounded-2xl border ${plan.border} ${plan.shadow} p-7 bg-white cursor-pointer relative overflow-hidden
                        ${plan.id === 'premium' ? 'bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30' : ''}
                        ${!plan.badge ? 'mt-[30px]' : ''}`}
                    >
                      {/* Premiumの光彩エフェクト */}
                      {plan.id === 'premium' && (
                        <motion.div
                          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{ boxShadow: '0 0 40px 8px rgba(245,158,11,0.18)' }}
                        />
                      )}

                      {/* Premiumのスパークル */}
                      {plan.id === 'premium' && (
                        <>
                          <span className="absolute top-4 right-12 text-amber-400 text-xs select-none">✦</span>
                          <span className="absolute bottom-16 right-4 text-amber-300 text-[10px] select-none">✦</span>
                          <span className="absolute top-16 left-4 text-amber-200 text-[8px] select-none">✦</span>
                        </>
                      )}

                      <div className="text-center relative">
                        {/* アイコン */}
                        <div className={`w-14 h-14 rounded-full ${plan.iconBg} flex items-center justify-center mx-auto mb-3 text-2xl`}>
                          {plan.icon}
                        </div>
                        <h3 className={`text-2xl font-black ${plan.nameColor} mb-1`}>{plan.name}</h3>
                        <p className="text-xs text-gray-400 font-medium mb-3">{plan.label}</p>
                        <p className="text-xs text-gray-500 leading-relaxed mb-5">{plan.desc}</p>

                        {/* 価格 */}
                        <div className="flex items-baseline justify-center gap-1 mb-6 relative">
                          {plan.id === 'premium' && (
                            <span className="absolute -left-2 top-0 text-amber-400 text-xs select-none">✦</span>
                          )}
                          <span className={`text-sm font-bold ${plan.nameColor}`}>月額</span>
                          <span className={`text-4xl font-black ${plan.priceColor}`}>{plan.price}</span>
                          <span className="text-base font-bold text-gray-600">万円〜</span>
                          {plan.id === 'premium' && (
                            <span className="absolute -right-2 top-0 text-amber-400 text-xs select-none">✦</span>
                          )}
                        </div>

                        {/* CTAボタン */}
                        <a href="/contact"
                          className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-bold text-sm transition-all ${plan.btnClass}`}>
                          無料相談を予約する
                          <motion.span
                            animate={isHovered
                              ? { x: [0, 5, 0, 5, 0] }
                              : { x: 0 }}
                            transition={isHovered
                              ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut' }
                              : { duration: 0.2 }}
                          >
                            <FiArrowRight size={14} />
                          </motion.span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 機能・サポート比較表 ── */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-xl font-black text-gray-900 mb-8">機能・サポート比較</h2>
          </FadeUp>

          <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            {/* テーブルヘッダー */}
            <FadeUp delay={0.05}>
              <div className="grid grid-cols-[1fr_130px_150px_130px] bg-white border-b border-gray-200">
                <div className="px-6 py-4" />

                {/* Starter ヘッダー */}
                <motion.div
                  animate={{ backgroundColor: hoveredPlan === 'starter' ? 'rgb(209 250 229)' : 'rgb(255 255 255)' }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-4 text-center"
                  onMouseEnter={() => setHoveredPlan('starter')}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <span className="text-lg">🌱</span>
                  <p className="text-sm font-black text-emerald-600 mt-0.5">Starter</p>
                </motion.div>

                {/* Standard ヘッダー */}
                <motion.div
                  animate={{ backgroundColor: hoveredPlan === 'standard' ? 'rgb(219 234 254)' : 'rgb(255 255 255)' }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-4 text-center border-x border-blue-100"
                  onMouseEnter={() => setHoveredPlan('standard')}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <span className="text-lg">📊</span>
                  <p className="text-sm font-black text-blue-600 mt-0.5">Standard</p>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">おすすめ</span>
                </motion.div>

                {/* Premium ヘッダー */}
                <motion.div
                  animate={{ backgroundColor: hoveredPlan === 'premium' ? 'rgb(254 243 199)' : 'rgb(255 255 255)' }}
                  transition={{ duration: 0.2 }}
                  className="px-4 py-4 text-center"
                  onMouseEnter={() => setHoveredPlan('premium')}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  <span className="text-lg">👑</span>
                  <p className="text-sm font-black text-amber-500 mt-0.5">Premium</p>
                </motion.div>
              </div>
            </FadeUp>

            {/* 行 */}
            {COMPARISON.map((row, i) => (
              <FadeRow key={i} delay={i * 0.04}>
                <div className={`grid grid-cols-[1fr_130px_150px_130px] items-center ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'} border-b border-gray-100 last:border-0`}>
                  {/* 機能名 */}
                  <div className="flex items-center gap-3 px-6 py-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <row.Icon size={15} className="text-blue-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{row.label}</span>
                  </div>

                  {/* Starter セル */}
                  <motion.div
                    animate={{ backgroundColor: hoveredPlan === 'starter' ? 'rgb(209 250 229 / 0.5)' : 'transparent' }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-4 flex justify-center"
                    onMouseEnter={() => setHoveredPlan('starter')}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    <PlanCell value={row.starter} planId="starter" />
                  </motion.div>

                  {/* Standard セル */}
                  <motion.div
                    animate={{ backgroundColor: hoveredPlan === 'standard' ? 'rgb(219 234 254 / 0.7)' : 'transparent' }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-4 flex justify-center border-x border-blue-100/60"
                    onMouseEnter={() => setHoveredPlan('standard')}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    <PlanCell value={row.standard} planId="standard" />
                  </motion.div>

                  {/* Premium セル */}
                  <motion.div
                    animate={{ backgroundColor: hoveredPlan === 'premium' ? 'rgb(254 243 199 / 0.6)' : 'transparent' }}
                    transition={{ duration: 0.2 }}
                    className="px-4 py-4 flex justify-center"
                    onMouseEnter={() => setHoveredPlan('premium')}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    <PlanCell value={row.premium} planId="premium" />
                  </motion.div>
                </div>
              </FadeRow>
            ))}
          </div>
        </div>
      </section>

      {/* ── 底部CTA ── */}
      <section className="py-12 bg-slate-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                className="flex-1 flex items-center gap-5 rounded-2xl border border-blue-200 p-7 shadow-sm relative overflow-hidden group cursor-pointer"
              >
                {/* グラデーション背景（ホバーで出現） */}
                <div className="absolute inset-0 bg-white transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 group-hover:bg-white/20 flex items-center justify-center relative z-10 transition-colors duration-300">
                  <FiHeadphones size={24} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 relative z-10">
                  <p className="font-black text-gray-900 group-hover:text-white text-base mb-1 transition-colors duration-300">プランに関するご相談・お見積りはこちら</p>
                  <p className="text-xs text-gray-500 group-hover:text-blue-100 mb-4 leading-relaxed transition-colors duration-300">専門スタッフが貴社に最適なプランをご提案します。</p>
                  <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 group-hover:bg-white/20 group-hover:border group-hover:border-white/40 text-white text-sm font-bold rounded-full transition-all duration-300">
                    無料相談を予約する
                    <motion.span
                      className="inline-flex"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <FiArrowRight size={13} />
                    </motion.span>
                  </span>
                </div>
              </motion.a>
              <div className="lg:w-72 bg-emerald-50 border border-emerald-200 rounded-2xl p-7">
                <p className="font-black text-emerald-800 text-sm mb-4">まずはお気軽にご相談ください</p>
                <ul className="space-y-2.5">
                  {['初期費用は原則不要です', '契約期間は3ヶ月単位でのご契約となります', '料金はご支援範囲により変動します'].map((text, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                      <FiCheck size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />{text}
                    </li>
                  ))}
                </ul>
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
