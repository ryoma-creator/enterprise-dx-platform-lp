'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  FiChevronDown, FiArrowRight, FiHeadphones,
  FiBarChart2, FiClipboard, FiTarget, FiUsers, FiMonitor, FiDollarSign,
} from 'react-icons/fi'

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

const NAV_LINKS = [
  { label: 'サービス',     href: '/#services' },
  { label: '導入事例',    href: '/cases' },
  { label: '選ばれる理由', href: '/#reasons' },
  { label: '料金プラン',  href: '/pricing' },
  { label: 'よくある質問', href: '/faq' },
]

const FAQS = [
  {
    Icon: FiBarChart2,
    q: 'DXの推進が初めてでも相談できますか？',
    a: 'はい、可能です。現状の課題整理から丁寧にサポートし、貴社の状況に合わせた最適なプランをご提案します。',
  },
  {
    Icon: FiClipboard,
    q: '相談や見積もりは無料ですか？',
    a: 'はい、初回のご相談・お見積もりは無料です。まずはお気軽にお問い合わせください。',
  },
  {
    Icon: FiTarget,
    q: 'どのくらいの期間で効果が出ますか？',
    a: 'プロジェクトの内容や規模によって異なりますが、短期的に効果を実感できる施策から、中長期的な変革まで、段階的に成果を創出します。',
  },
  {
    Icon: FiUsers,
    q: '対応可能な業種はありますか？',
    a: '製造業、小売・EC、物流、金融、サービス業など、幅広い業種に対応しております。',
  },
  {
    Icon: FiMonitor,
    q: 'システムの開発や運用もサポートしてもらえますか？',
    a: 'はい、システムの設計・開発から運用・保守まで、ワンストップでサポートいたします。',
  },
  {
    Icon: FiDollarSign,
    q: '契約形態や支払い方法について教えてください。',
    a: '契約形態は業務委託契約が基本となります。お支払い方法は銀行振込に対応しております。詳細はご提案時にご案内いたします。',
  },
]

function FaqCard({ Icon, q, a, delay }: { Icon: React.ElementType; q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)

  return (
    <FadeUp delay={delay}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start gap-4 px-6 py-5 text-left hover:bg-gray-50/60 transition-colors"
        >
          {/* 左アイコン */}
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center mt-0.5">
            <Icon size={18} className="text-slate-500" />
          </div>

          {/* 質問 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2.5 mb-0">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-0.5">
                <span className="text-white text-[10px] font-black">Q</span>
              </span>
              <span className="font-black text-gray-900 text-[15px] leading-snug pt-0.5">{q}</span>
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 mt-3 pt-3 border-t border-gray-100">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5">
                      <span className="text-white text-[10px] font-black">A</span>
                    </span>
                    <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 矢印 */}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 text-gray-400 mt-2.5"
          >
            <FiChevronDown size={18} />
          </motion.span>
        </button>
      </div>
    </FadeUp>
  )
}

export default function FaqPage() {
  return (
    <div className="font-sans text-gray-900 overflow-x-hidden min-h-screen bg-slate-50">

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
                  link.href === '/faq'
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
            <a href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              無料相談を予約する
            </a>
          </div>
        </div>
      </nav>

      {/* ── コンテンツ ── */}
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-6 py-16">

          {/* ヘッダー */}
          <FadeUp>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-bold mb-4">
                <FiClipboard size={13} />
                FAQ
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-blue-950 mb-4 tracking-tight">よくある質問</h1>
              <div className="w-10 h-1 bg-blue-600 rounded-full mx-auto mb-5" />
              <p className="text-sm text-gray-400 leading-relaxed">
                お客様からよくいただくご質問をまとめました。<br />
                ご不明点がございましたら、お気軽にお問い合わせください。
              </p>
            </div>
          </FadeUp>

          {/* FAQ一覧 */}
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <FaqCard key={i} Icon={faq.Icon} q={faq.q} a={faq.a} delay={i * 0.06} />
            ))}
          </div>

          {/* 底部CTA */}
          <FadeUp delay={0.3} className="mt-12">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-0">
                {/* 左 */}
                <div className="flex-1 flex items-center gap-4 px-8 py-7">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
                    <FiHeadphones size={22} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-sm mb-1">その他のご質問がある方へ</p>
                    <p className="text-xs text-gray-400 leading-relaxed">専門スタッフが丁寧にお答えします。<br />些細なことでもお気軽にご相談ください。</p>
                  </div>
                </div>

                {/* 区切り */}
                <div className="hidden sm:block w-px h-16 bg-gray-100" />

                {/* 右 */}
                <div className="flex flex-col items-center gap-2 px-8 py-7">
                  <a href="/contact"
                    className="relative group overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                    <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">無料相談を予約する</span>
                    <FiArrowRight size={13} className="relative" />
                  </a>
                  <p className="text-xs text-gray-400">ご相談・お見積りはすべて無料です</p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

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
