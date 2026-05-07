'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { FiAlertTriangle, FiMonitor, FiHelpCircle, FiTrendingDown, FiUsers,
  FiSearch, FiCode, FiRefreshCw, FiLifeBuoy } from 'react-icons/fi'
import GsapAnimatedElement from '@/components/scroll/GsapAnimatedElement'

// ── アニメーションラッパー ────────────────────────────
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

// ── カウントアップ ────────────────────────────
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let current = 0
    const step = (end / 1800) * 16
    const timer = setInterval(() => {
      current += step
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count}{suffix}</span>
}

// ── FAQ ────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left gap-4 hover:text-blue-700 transition-colors">
        <span className="text-sm font-medium text-gray-800">Q. {q}</span>
        <span className="text-blue-600 text-xl flex-shrink-0 font-light">{open ? '−' : '+'}</span>
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28 }} className="overflow-hidden">
        <div className="flex gap-3 pb-5 pt-1">
          <span className="text-sm font-black text-blue-600 flex-shrink-0 mt-0.5">A.</span>
          <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
        </div>
      </motion.div>
    </div>
  )
}

// ── データ定義 ────────────────────────────
const NAV_LINKS = [
  { label: 'サービス',    href: '#services' },
  { label: '導入事例',   href: '/cases' },
  { label: '選ばれる理由', href: '#reasons' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'よくある質問', href: '#faq' },
]

const PAIN_POINTS = [
  { Icon: FiAlertTriangle, color: '#EF4444', bg: '#FEF2F2', text: '業務がアナログで\n非効率になっている' },
  { Icon: FiMonitor,       color: '#3B82F6', bg: '#EFF6FF', text: 'システムを導入したが\n使いこなせていない' },
  { Icon: FiHelpCircle,    color: '#8B5CF6', bg: '#F5F3FF', text: 'DXを進めたいが\n何から始めればいいかわからない' },
  { Icon: FiTrendingDown,  color: '#F59E0B', bg: '#FFFBEB', text: '開発コストや期間が\n見えず不安' },
  { Icon: FiUsers,         color: '#10B981', bg: '#ECFDF5', text: '信頼できるパートナーに\n出会えていない' },
]

const SERVICES = [
  { Icon: FiSearch,    title: 'コンサルティング', desc: '現状分析から課題を明確化し、成果につながるDX戦略をご提案します。' },
  { Icon: FiCode,      title: 'システム開発', desc: '業務にフィットしたシステムをオーダーメイドで開発。迅速にスピーディに対応します。' },
  { Icon: FiRefreshCw, title: '業務改善・自動化', desc: 'RPAやSaaSを活用し、業務の自動化・効率化を実現します。' },
  { Icon: FiLifeBuoy,  title: '運用・サポート', desc: '導入後の運用支援から改善提案まで、伴走型チームが一貫してサポートします。' },
]

const REASONS = [
  { num: '01', title: '成果にこだわるDX支援', desc: '単なるシステム導入ではなく、ビジネスの成果に直結するDXを実現します。' },
  { num: '02', title: '豊富な実績と専門性', desc: '多様な業種・規模のDX支援実績をもとに、最適なソリューションをご提供します。' },
  { num: '03', title: '伴走型のサポート体制', desc: '課題発見から導入・運用・保守まで、専任チームが一貫してサポートします。' },
]

const RESULTS = [
  { company: 'A社様（製造業）', title: '生産管理システムの刷新', metric: 40, unit: '%', label: '業務効率改善', from: 'from-blue-50', to: 'to-indigo-50', accent: 'text-blue-600' },
  { company: 'B社様（EC業界）', title: 'ECサイトの構築・運用支援', metric: 150, unit: '%', label: '売上向上', from: 'from-emerald-50', to: 'to-teal-50', accent: 'text-emerald-600' },
  { company: 'C社様（物流）', title: 'RPA導入による業務自動化', metric: 800, unit: '万円', label: '年間コスト削減', from: 'from-purple-50', to: 'to-violet-50', accent: 'text-purple-600' },
]

const STEPS = [
  { num: '01', icon: '✉️', title: 'お問い合わせ', desc: 'まずはお気軽にご相談ください。' },
  { num: '02', icon: '🔍', title: 'ヒアリング・\n課題分析', desc: '貴社の課題をヒアリングし明確化します。' },
  { num: '03', icon: '📋', title: 'ご提案・\nお見積り', desc: '最適なプランとお見積りをご提案します。' },
  { num: '04', icon: '💻', title: '開発・導入', desc: '最短2週間でのプロト開発も可能です。' },
  { num: '05', icon: '📈', title: '運用・改善\nサポート', desc: '導入後も伴走し成果を最大化します。' },
]

const FAQS = [
  { q: '相談や見積もりは無料ですか？', a: 'はい、初回相談・お見積りはすべて無料です。まずはお気軽にご連絡ください。' },
  { q: 'どのような業種に対応していますか？', a: '製造業・小売・物流・医療・サービス業など幅広い業種でのDX支援実績があります。' },
  { q: '費用はどのくらいかかりますか？', a: '規模や要件によって異なりますが、小規模なRPA導入であれば月額数万円から対応可能です。' },
  { q: '小規模な会社でも依頼できますか？', a: 'はい、中小企業・スタートアップのDX支援を得意としています。規模に関わらずご相談ください。' },
  { q: '導入後のサポートはありますか？', a: '運用フェーズも専任チームがサポートします。月次改善提案も含めた伴走支援が可能です。' },
  { q: 'セキュリティ対策はどうしていますか？', a: '情報セキュリティマネジメントに準拠した体制で開発・運用を行っております。詳細はご相談ください。' },
]

// ── メインコンポーネント ────────────────────────────
export default function NextGrowLP() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      {/* ── ナビゲーション ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-lg text-gray-900">NextGrow</span>
          </div>

          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium">{link.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#" className="text-sm px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all font-medium">
              資料ダウンロード
            </a>
            <a href="#" className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm">
              無料相談を予約する
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="block text-sm text-gray-700 font-medium">{link.label}</Link>
            ))}
            <div className="pt-2 space-y-2">
              <a href="#" className="block text-center text-sm px-4 py-2.5 border border-gray-300 rounded-lg">資料ダウンロード</a>
              <a href="#" className="block text-center text-sm px-4 py-2.5 bg-blue-600 text-white rounded-lg">無料相談を予約する</a>
            </div>
          </motion.div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-16 overflow-hidden bg-white">
        {/* 背景画像：右寄せで表示 */}
        <div className="absolute inset-0">
          <Image src="/images/city_sky.png" alt="NextGrow DX支援" fill
            className="object-cover object-right-center" priority />
          {/* 白グラデーション：左35%は白、そこから急速にフェードアウト */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 65%, rgba(255,255,255,0) 75%)'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-10">
          {/* テキスト（ダーク） */}
          <div className="flex-1 text-center lg:text-left">
            <GsapAnimatedElement variant="slideIn" duration={0.8} delay={0.1}>
              <span className="inline-block text-blue-600 text-xs font-bold tracking-widest uppercase mb-5 border border-blue-200 bg-blue-50 px-3 py-1 rounded-full">
                DX支援サービス
              </span>
            </GsapAnimatedElement>

            <GsapAnimatedElement variant="default" duration={0.8} delay={0.2}>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-5">
                DXで、ビジネスに
                <br />
                <span className="text-blue-600">
                  次の成長を。
                </span>
              </h1>
            </GsapAnimatedElement>

            <GsapAnimatedElement variant="fadeIn" duration={1} delay={0.45}>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                業務のデジタル化からシステム開発まで、<br className="hidden sm:block" />
                貴社の課題に寄り添い、成果につながるDXを実現します。
              </p>
            </GsapAnimatedElement>

            <GsapAnimatedElement variant="scaleUp" duration={0.6} delay={0.65}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-600 transition-opacity duration-300 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300 scale-110" />
                  <span className="relative">無料相談を予約する →</span>
                </a>
                <a href="#" className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-blue-400 hover:text-blue-600 font-bold rounded-xl transition-all bg-white/80 backdrop-blur-sm hover:bg-white/90">
                  ↓ 資料をダウンロードする
                </a>
              </div>
            </GsapAnimatedElement>

            <GsapAnimatedElement variant="fadeIn" duration={1} delay={0.85}>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {['課題発見から伴走支援', '最短2週間でプロトタイプ開発', '導入後の活用までサポート'].map((badge) => (
                  <span key={badge} className="flex items-center gap-2 text-sm text-gray-700 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
                    <span className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0">✓</span>
                    {badge}
                  </span>
                ))}
              </div>
            </GsapAnimatedElement>
          </div>

        </div>

      </section>

      {/* ── 実績バー ── */}
      <section className="py-10 bg-white border-y border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x divide-gray-100">
            {[
              { value: '200', suffix: '+', unit: '社', label: '導入実績' },
              { value: '98', suffix: '', unit: '%', label: '顧客満足度' },
              { value: '40', suffix: '', unit: '%平均', label: 'コスト削減実績' },
              { value: '2', suffix: '', unit: '週間〜', label: 'プロトタイプ開発' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl font-black text-blue-600 mb-1">
                  <CountUp end={Number(stat.value)} />{stat.suffix}
                  <span className="text-lg ml-0.5">{stat.unit}</span>
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 課題提示 ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">こんなお悩みありませんか？</h2>
            <p className="text-center text-gray-500 text-sm mb-14">多くの企業が抱えるDXの課題に、NextGrowは向き合います。</p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {PAIN_POINTS.map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.bg }}>
                    <item.Icon size={22} style={{ color: item.color }} />
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium whitespace-pre-line">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="bg-blue-600 rounded-2xl py-5 px-8 text-center">
              <p className="text-white text-xl font-black">
                そのお悩み、<span className="text-yellow-300">NextGrow</span>がすべて解決します。
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── サービス ── */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-white mb-3">NextGrowのDX支援サービス</h2>
            <div className="w-12 h-1 bg-blue-400 mx-auto mb-14 rounded-full" />
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="border border-white/10 rounded-2xl p-6 hover:border-blue-400/60 hover:bg-white/5 transition-all group h-full flex flex-col gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <svc.Icon size={20} className="text-blue-300" />
                  </div>
                  <h3 className="text-white font-bold text-base">{svc.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 選ばれる理由 ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">選ばれる3つの理由</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-16 rounded-full" />
          </FadeUp>

          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="flex-1 space-y-8">
              {REASONS.map((reason, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <div className="flex gap-5 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                      <span className="text-white font-black text-sm">{reason.num}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900 text-lg mb-1">{reason.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* GPT生成写真 */}
            <FadeIn delay={0.2} className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <Image src="/images/reason-photo.png" alt="NextGrow ビジネスパートナーシップ" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 導入実績 ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">導入事例・実績</h2>
            <p className="text-center text-gray-500 text-sm mb-14">※掲載許可を得た一部の事例を紹介しています</p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESULTS.map((result, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-8 bg-gradient-to-br ${result.from} ${result.to} border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{result.company}</div>
                  <h3 className="font-bold text-gray-900 text-base mb-6 leading-snug">{result.title}</h3>
                  <div className="flex items-end gap-1">
                    <span className={`text-5xl font-black ${result.accent}`}><CountUp end={result.metric} /></span>
                    <span className={`text-xl font-black ${result.accent} mb-1`}>{result.unit}</span>
                    <span className="text-gray-400 text-sm mb-2 ml-1">↑</span>
                  </div>
                  <div className="text-gray-600 text-sm font-medium mt-1">{result.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 導入の流れ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">導入までの流れ</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-16 rounded-full" />
          </FadeUp>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-blue-100" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {STEPS.map((step, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="relative text-center">
                    <div className="relative z-10 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-100">
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <div className="text-xs font-black text-blue-500 mb-1">{step.num}</div>
                    <h3 className="font-black text-gray-900 text-sm whitespace-pre-line mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 取引先 ── */}
      <section className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-10">お取引先・導入企業（一部抜粋）</p>
          </FadeUp>
          <FadeIn className="flex flex-wrap justify-center gap-4 items-center">
            {['株式会社〇〇〇〇', '△△△株式会社', 'Sample株式会社', '株式会社□□□', 'Example Co., Ltd.'].map((company) => (
              <div key={company} className="px-6 py-3 bg-white rounded-xl border border-gray-200 text-gray-400 text-sm font-medium hover:text-gray-600 hover:border-gray-300 transition-all">
                {company}
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-gray-900 mb-2">よくある質問</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-14 rounded-full" />
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
            <FadeUp>{FAQS.slice(0, 3).map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}</FadeUp>
            <FadeUp delay={0.1}>{FAQS.slice(3).map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} />)}</FadeUp>
          </div>
        </div>
      </section>

      {/* ── フッターCTA ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-sm">🏆</span>
              <span className="text-yellow-300 text-sm font-bold">完全無料 初回相談実施中</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              DXの第一歩を、<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">
                NextGrowと一緒に。
              </span>
            </h2>
            <p className="text-blue-200/80 text-lg mb-10">まずは無料相談で、貴社の課題をお聞かせください。</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* グラデーション光るボタン（プライマリ） */}
              <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base text-white shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-0 bg-blue-600 transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300 opacity-0 group-hover:opacity-60 transition-opacity duration-300 scale-110" />
                <span className="relative flex items-center gap-2">
                  無料相談を予約する →
                </span>
              </a>
              {/* グラデーション光るボタン（セカンダリ） */}
              <a href="#" className="relative group overflow-hidden flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-base border-2 border-white/25 text-white hover:-translate-y-0.5 transition-all duration-300">
                <div className="absolute inset-0 bg-transparent transition-opacity duration-300 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 blur-xl bg-white/20 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <span className="relative">資料をダウンロードする ↓</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── フッター ── */}
      <footer className="bg-slate-950 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-black">N</span>
            </div>
            <span className="font-black text-white">NextGrow</span>
          </div>
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
