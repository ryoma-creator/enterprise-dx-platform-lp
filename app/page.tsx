'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Image from 'next/image'
import {
  FiAlertTriangle, FiMonitor, FiHelpCircle, FiTrendingDown, FiUsers,
  FiSearch, FiCode, FiLifeBuoy,
  FiClipboard, FiTarget, FiDollarSign, FiChevronDown, FiBarChart2,
  FiMail, FiTrendingUp, FiMessageCircle, FiPieChart, FiSettings, FiSmartphone,
  FiArrowRight, FiAward, FiChevronRight, FiCalendar,
} from 'react-icons/fi'
import GsapAnimatedElement from '@/components/scroll/GsapAnimatedElement'
import { FadeUp, FadeIn } from '@/components/ui/animations'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'

// ── カウントアップ ────────────────────────────
function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let rafId: number
    const startTime = performance.now()
    const duration = 1800

    const tick = (now: number) => {
      const elapsed = Math.min((now - startTime) / duration, 1)
      setCount(Math.floor(elapsed * end))
      if (elapsed < 1) rafId = requestAnimationFrame(tick)
      else setCount(end)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, end])

  return <span ref={ref}>{count}{suffix}</span>
}

// ── FAQ ────────────────────────────
function FaqItem({ Icon, q, a }: { Icon: React.ElementType; q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-gray-50/60 transition-colors"
      >
        <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center">
          <Icon size={17} className="text-slate-500" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2.5">
          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-black">Q</span>
          </span>
          <span className="font-black text-gray-900 text-[15px] leading-snug">{q}</span>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-gray-400">
          <FiChevronDown size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="a"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden">
            <div className="flex items-start gap-4 px-6 pb-5 pt-0 border-t border-gray-100">
              <div className="flex-shrink-0 w-11 h-11" />
              <div className="flex items-start gap-2.5 pt-4 flex-1">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                  <span className="text-white text-[10px] font-black">A</span>
                </span>
                <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── データ定義 ────────────────────────────
const PAIN_POINTS = [
  { Icon: FiAlertTriangle, color: '#EF4444', bg: '#FEF2F2', text: '業務がアナログで\n非効率になっている' },
  { Icon: FiMonitor,       color: '#3B82F6', bg: '#EFF6FF', text: 'システムを導入したが\n使いこなせていない' },
  { Icon: FiHelpCircle,    color: '#8B5CF6', bg: '#F5F3FF', text: 'DXを進めたいが\n何から始めればいいかわからない' },
  { Icon: FiTrendingDown,  color: '#F59E0B', bg: '#FFFBEB', text: '開発コストや期間が\n見えず不安' },
  { Icon: FiUsers,         color: '#10B981', bg: '#ECFDF5', text: '信頼できるパートナーに\n出会えていない' },
]

const SERVICES = [
  { img: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778225928/search.glass_zxdboj.png', title: 'コンサルティング', desc: '現状分析から課題を明確化し、成果につながるDX戦略をご提案します。' },
  { img: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226768/laptopscreen_wfwgvj.png', title: 'システム開発', desc: '業務にフィットしたシステムをオーダーメイドで開発。迅速にスピーディに対応します。' },
  { img: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226589/ClipboardwithCheckmark_fbn77g.png', title: '業務改善・自動化', desc: 'RPAやSaaSを活用し、業務の自動化・効率化を実現します。' },
  { img: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226979/Barchart_assraj.png', title: '運用・サポート', desc: '導入後の運用支援から改善提案まで、伴走型チームが一貫してサポートします。' },
]

const REASONS = [
  { num: '01', IlloIcon: FiTrendingUp, title: '成果にこだわるDX支援', desc: '単なるシステム導入ではなく、ビジネスの成果に直結するDXを実現します。' },
  { num: '02', IlloIcon: FiAward,      title: '豊富な実績と専門性', desc: '多様な業種・規模のDX支援実績をもとに、最適なソリューションをご提供します。' },
  { num: '03', IlloIcon: FiUsers,      title: '伴走型のサポート体制', desc: '課題発見から導入・運用・保守まで、専任チームが一貫してサポートします。' },
]

const RESULTS = [
  { company: 'A社様（製造業）', title: '生産管理システムの刷新', metric: 40, unit: '%', label: '業務効率改善', from: 'from-blue-50', to: 'to-indigo-50', accent: 'text-blue-600' },
  { company: 'B社様（EC業界）', title: 'ECサイトの構築・運用支援', metric: 150, unit: '%', label: '売上向上', from: 'from-emerald-50', to: 'to-teal-50', accent: 'text-emerald-600' },
  { company: 'C社様（物流）', title: 'RPA導入による業務自動化', metric: 800, unit: '万円', label: '年間コスト削減', from: 'from-purple-50', to: 'to-violet-50', accent: 'text-purple-600' },
]

const STEPS = [
  { num: '01', Icon: FiMail,       IlloMain: FiSmartphone,   IlloSub: FiMessageCircle, image: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778227090/shakehands-blue_gr3bfa.png', title: 'お問い合わせ',      desc: 'まずはお気軽にご相談ください。専任スタッフが対応します。' },
  { num: '02', Icon: FiSearch,     IlloMain: FiClipboard,    IlloSub: FiPieChart,      image: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778225928/search.glass_zxdboj.png', title: 'ヒアリング・課題分析', desc: '貴社の課題や現状を詳しくヒアリングし、解決の方向性を明確にします。' },
  { num: '03', Icon: FiClipboard,  IlloMain: FiDollarSign,   IlloSub: FiBarChart2,     image: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226589/ClipboardwithCheckmark_fbn77g.png', title: 'ご提案・お見積り',   desc: '課題に最適なプランと施策をご提案し、お見積りをご提示します。' },
  { num: '04', Icon: FiMonitor,    IlloMain: FiSettings,     IlloSub: FiCode,          image: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226768/laptopscreen_wfwgvj.png', title: '開発・導入',         desc: '最短2週間での導入も可能です。進捗は定期的にご報告します。' },
  { num: '05', Icon: FiTrendingUp, IlloMain: FiBarChart2,    IlloSub: FiTrendingUp,    image: 'https://res.cloudinary.com/da3abynbu/image/upload/v1778226979/Barchart_assraj.png', title: '運用・改善サポート', desc: '導入後も継続的な改善提案とサポートで成果の最大化を支援します。' },
]

const FAQS = [
  { Icon: FiClipboard,    q: '相談や見積もりは無料ですか？',       a: 'はい、初回相談・お見積りはすべて無料です。まずはお気軽にご連絡ください。' },
  { Icon: FiUsers,        q: 'どのような業種に対応していますか？', a: '製造業・小売・物流・医療・サービス業など幅広い業種でのDX支援実績があります。' },
  { Icon: FiDollarSign,   q: '費用はどのくらいかかりますか？',     a: '規模や要件によって異なりますが、小規模なRPA導入であれば月額数万円から対応可能です。' },
  { Icon: FiBarChart2,    q: '小規模な会社でも依頼できますか？',   a: 'はい、中小企業・スタートアップのDX支援を得意としています。規模に関わらずご相談ください。' },
  { Icon: FiLifeBuoy,     q: '導入後のサポートはありますか？',     a: '運用フェーズも専任チームがサポートします。月次改善提案も含めた伴走支援が可能です。' },
  { Icon: FiTarget,       q: 'セキュリティ対策はどうしていますか？', a: '情報セキュリティマネジメントに準拠した体制で開発・運用を行っております。詳細はご相談ください。' },
]

// ── メインコンポーネント ────────────────────────────
export default function NextGrowLP() {
  useEffect(() => {
    if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      <Nav />

      {/* ── Hero ── */}
      <section className="relative pt-16 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <Image src="https://res.cloudinary.com/da3abynbu/image/upload/v1778231845/dx-lp2_z8kmlo.png" alt="NextGrow DX支援" fill
            className="object-cover object-right-center" priority />
          <div className="absolute inset-0 bg-white/80 lg:hidden" />
          <div className="absolute inset-0 hidden lg:block" style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 30%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.1) 65%, rgba(255,255,255,0) 75%)'
          }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-10">
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
                <span className="text-blue-600">次の成長を。</span>
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
                <a href="/contact" className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300">
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
              { value: 200, suffix: '+', unit: '社', label: '導入実績' },
              { value: 98,  suffix: '',  unit: '%', label: '顧客満足度' },
              { value: 40,  suffix: '',  unit: '%平均', label: 'コスト削減実績' },
              { value: 2,   suffix: '',  unit: '週間〜', label: 'プロトタイプ開発' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl font-black text-blue-600 mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
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
      <section id="services" className="py-24 bg-slate-900 scroll-mt-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none">
          <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.04]" viewBox="0 0 600 600" preserveAspectRatio="xMaxYMid slice">
            <circle cx="480" cy="80" r="120" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="480" cy="80" r="80"  fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="480" cy="80" r="40"  fill="none" stroke="white" strokeWidth="1"/>
            <line x1="360" y1="80" x2="600" y2="80"  stroke="white" strokeWidth="0.5"/>
            <line x1="480" y1="0"  x2="480" y2="200" stroke="white" strokeWidth="0.5"/>
            <rect x="60" y="350" width="20" height="80"  fill="white" opacity="0.5"/>
            <rect x="90" y="310" width="20" height="120" fill="white" opacity="0.5"/>
            <rect x="120" y="280" width="20" height="150" fill="white" opacity="0.5"/>
            <rect x="150" y="320" width="20" height="110" fill="white" opacity="0.5"/>
            <polyline points="60,350 90,310 120,280 150,320 180,260" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8"/>
            <circle cx="60" cy="350" r="3" fill="white"/><circle cx="90" cy="310" r="3" fill="white"/>
            <circle cx="120" cy="280" r="3" fill="white"/><circle cx="150" cy="320" r="3" fill="white"/>
          </svg>
          {[...Array(6)].map((_, row) => [...Array(10)].map((_, col) => (
            <div key={`${row}-${col}`} className="absolute w-0.5 h-0.5 rounded-full bg-white/20"
              style={{ top: `${row * 80 + 40}px`, left: `${col * 120 + 60}px` }} />
          )))}
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-white mb-3">NextGrowのDX支援サービス</h2>
            <div className="w-12 h-1 bg-blue-400 mx-auto mb-3 rounded-full" />
            <p className="text-center text-blue-200/60 text-sm mb-14">
              戦略立案からシステム開発、運用・改善まで、<br className="hidden sm:block" />
              DX推進に必要なすべてをワンストップで支援します。
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc, i) => (
              <FadeUp key={i} delay={i * 0.1} className="h-full">
                {/* Outer wrapper: provides space for the overlapping badge */}
                <div className="relative pt-5 pl-2 h-full">
                  {/* Number badge — overlaps top-left corner like image 2 */}
                  <div className="absolute top-0 left-0 z-10 w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-400/40">
                    <span className="text-white text-sm font-black">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {/* Card */}
                  <div className="bg-white rounded-3xl shadow-md border border-slate-100 px-5 pt-8 pb-6 text-center flex flex-col items-center hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 group h-full">
                    {/* Illustration circle — w-32/h-32 to match reference */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center mb-5 overflow-hidden relative shadow-sm">
                      <Image src={svc.img} alt={svc.title} fill className="object-contain p-4" />
                    </div>
                    {/* Title */}
                    <h3 className="font-black text-gray-900 text-base mb-3">{svc.title}</h3>
                    {/* Dot separator — matches reference style */}
                    <div className="flex gap-1 justify-center mb-3">
                      {[...Array(8)].map((_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full bg-blue-300" />
                      ))}
                    </div>
                    {/* Description */}
                    <p className="text-gray-500 text-xs leading-relaxed flex-1">{svc.desc}</p>
                    {/* Arrow button */}
                    <div className="mt-5 w-9 h-9 rounded-full border-2 border-blue-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                      <FiArrowRight size={15} className="text-blue-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 選ばれる理由 ── */}
      <section id="reasons" className="py-24 bg-white scroll-mt-16">
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <p className="text-center text-xs font-black text-blue-600 tracking-widest mb-3">REASON</p>
            <h2 className="text-4xl font-black text-center text-gray-900 mb-2">選ばれる3つの理由</h2>
            <div className="w-12 h-1 bg-blue-600 mx-auto mb-16 rounded-full" />
          </FadeUp>

          <div className="flex flex-col lg:flex-row gap-10 items-stretch">
            <div className="flex-1 flex flex-col">
              {REASONS.map((reason, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="flex gap-4 items-start">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-300/40 flex-shrink-0">
                        <span className="text-white font-black text-sm">{reason.num}</span>
                      </div>
                      {i < REASONS.length - 1 && (
                        <div className="flex flex-col items-center gap-1.5 my-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-100" />
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-200" />
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        </div>
                      )}
                    </div>
                    <div className={`flex-1 bg-white border border-slate-100 rounded-2xl px-5 py-5 flex items-center gap-4 shadow-sm hover:border-blue-100 hover:shadow-md transition-all ${i < REASONS.length - 1 ? 'mb-0' : ''}`}>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-gray-900 text-lg mb-1.5 leading-snug">{reason.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
                      </div>
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                        <reason.IlloIcon size={36} className="text-blue-500" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeIn delay={0.2} className="flex-1 w-full flex flex-col gap-4">
              <div className="relative rounded-2xl overflow-hidden shadow-lg flex-1 min-h-[260px]">
                <Image src="/images/reason-photo.png" alt="NextGrow ビジネスパートナーシップ" fill className="object-cover" />
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-md shadow-blue-300/40">
                  <FiTrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-base leading-snug mb-2">
                    ビジネスの成長を加速させるDXを、<br />
                    <span className="text-blue-600">NextGrow</span>が実現します。
                  </p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    戦略立案からシステム開発、運用・改善まで、<br />
                    DX推進に必要なすべてをワンストップで支援します。
                  </p>
                </div>
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
                <div className={`rounded-2xl p-8 bg-gradient-to-br ${result.from} ${result.to} border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center sm:text-left`}>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{result.company}</div>
                  <h3 className="font-bold text-gray-900 text-base mb-6 leading-snug">{result.title}</h3>
                  <div className="flex items-end gap-1 justify-center sm:justify-start">
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

      {/* ── 支援の流れ ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f0f5ff 0%, #ffffff 100%)' }}>
        <div className="max-w-6xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-xs font-black text-blue-600 tracking-widest mb-3">SUPPORT FLOW</p>
              <h2 className="text-4xl font-black text-gray-900 mb-3">支援の流れ</h2>
              <div className="w-10 h-1 bg-blue-600 mx-auto mb-4 rounded-full" />
              <p className="text-sm text-gray-400">お問い合わせから導入・運用まで、専任担当が伴走支援します。</p>
            </div>
          </FadeUp>

          {/* デスクトップ */}
          <div className="hidden lg:flex items-stretch gap-3">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-center flex-1">
                {/* CLAUDE.md: FadeUp に h-full 必須 */}
                <FadeUp delay={i * 0.08} className="flex-1 h-full">
                  {/* CLAUDE.md: wrapper も h-full */}
                  <div className="relative pt-5 pl-3 h-full">
                    <div className="absolute top-0 left-0 z-10 w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-400/30">
                      <span className="text-white text-sm font-black">{step.num}</span>
                    </div>
                    {/* CLAUDE.md: カード本体に h-full + flex-col */}
                    <div className="bg-white rounded-3xl shadow-md border border-slate-100 px-5 pt-8 pb-6 text-center flex flex-col items-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
                      {/* 画像のみ（Iconを absolute で重ねない） */}
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center mb-4 overflow-hidden flex-shrink-0">
                        <Image
                          src={step.image}
                          alt={step.title}
                          width={100}
                          height={100}
                          className="object-contain"
                          style={{ mixBlendMode: 'multiply' }}
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                      </div>
                      {/* CLAUDE.md: タイトルに min-h で高さ確保 */}
                      <div className="min-h-[3rem] flex items-center justify-center mb-2">
                        <h3 className="font-black text-gray-900 text-base leading-snug">{step.title}</h3>
                      </div>
                      <div className="flex gap-1 justify-center mb-3">
                        {[...Array(8)].map((_, j) => (
                          <div key={j} className="w-1 h-1 rounded-full bg-blue-300" />
                        ))}
                      </div>
                      {/* CLAUDE.md: line-clamp で行数統一 */}
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{step.desc}</p>
                    </div>
                  </div>
                </FadeUp>
                {i < STEPS.length - 1 && (
                  <div className="flex-shrink-0 pb-6 text-blue-400">
                    <FiChevronRight size={26} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* モバイル */}
          <div className="lg:hidden">
            {STEPS.map((step, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 w-4 pt-5">
                    <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-blue-200 flex-shrink-0 z-10" />
                    {i < STEPS.length - 1 && (
                      <>
                        <div className="w-0.5 flex-1 bg-blue-200 my-1.5" />
                        <div className="text-blue-400 text-sm leading-none mb-1.5">↓</div>
                      </>
                    )}
                  </div>
                  <div className={`flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-3 ${i < STEPS.length - 1 ? 'mb-3' : ''}`}>
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <step.Icon size={26} className="text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-black text-blue-500 tracking-wider mb-0.5">{step.num}</div>
                      <h3 className="font-black text-gray-900 text-sm leading-snug mb-1 whitespace-pre-line">{step.title}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-slate-100 flex items-end justify-end p-1.5 relative overflow-hidden">
                      <step.IlloMain size={36} className="text-slate-300 absolute top-1.5 left-1.5" />
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center z-10 shadow-sm">
                        <step.IlloSub size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
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
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <FadeUp>
            <h2 className="text-3xl font-black text-center text-blue-950 mb-2">よくある質問</h2>
            <div className="w-10 h-1 bg-blue-600 mx-auto mb-14 rounded-full" />
          </FadeUp>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <FaqItem Icon={faq.Icon} q={faq.q} a={faq.a} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── フッターCTA ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a6e 50%, #1e40af 100%)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #818cf8, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-yellow-400 text-xs font-bold">★</span>
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
              <a href="/contact" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-white text-blue-700 shadow-lg shadow-blue-900/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300">
                <FiCalendar size={17} />
                無料相談を予約する
                <FiArrowRight size={15} />
              </a>
              <a href="#" className="flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-base border-2 border-white/30 text-white hover:border-white/60 hover:-translate-y-0.5 transition-all duration-300">
                資料をダウンロードする ↓
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  )
}
