'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  FiArrowRight, FiBarChart2, FiTrendingUp, FiClock, FiPieChart,
  FiX, FiAlertCircle, FiSettings, FiUser,
} from 'react-icons/fi'
import { FadeUp } from '@/components/ui/animations'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { CASES, type CaseData } from '@/lib/data/cases'

const TABS = ['すべて', '製造業', 'EC・小売業', 'サービス業', 'その他'] as const
type Tab = typeof TABS[number]

const SUMMARY_STATS = [
  { icon: FiBarChart2,  value: '42%',    unit: '',    label: '平均業務効率改善率' },
  { icon: FiPieChart,   value: '750万円', unit: '/年', label: '平均コスト削減額' },
  { icon: FiTrendingUp, value: '135%',   unit: '',    label: '平均売上向上率' },
  { icon: FiClock,      value: '2.8ヶ月', unit: '',   label: '平均導入期間' },
]

function CaseModal({ c, onClose }: { c: CaseData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        className="relative w-full max-w-3xl mx-4 my-6 bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-label={c.title.replace('\n', '')}
      >
        <button
          onClick={onClose}
          aria-label="閉じる"
          className="sticky top-4 float-right mr-4 z-10 w-9 h-9 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          <FiX size={16} />
        </button>

        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <Image src={c.img} alt={c.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
            {c.category}
          </span>
        </div>

        <div className="p-6 pt-5">
          <h2 className="text-xl font-black text-gray-900 leading-snug whitespace-pre-line mb-1">{c.title}</h2>
          <p className="text-xs text-gray-400 mb-3">{c.company}</p>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{c.description}</p>

          <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-gray-100">
            {c.meta.map((m, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-gray-500">
                <m.Icon size={13} className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-xs">{m.label}</span>
                <span className="font-bold text-gray-700 text-xs">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {c.heroMetrics.map((m, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                <p className="text-[10px] text-gray-400 mb-1">{m.label}</p>
                <p className="text-lg font-black text-blue-600 leading-none">
                  {m.value}<span className="text-xs font-bold text-gray-400 ml-0.5">{m.unit}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                <FiAlertCircle size={12} className="text-amber-500" />
              </div>
              <h3 className="text-sm font-black text-gray-900">課題（導入前の状況）</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.challenges.map((ch, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                    <ch.Icon size={14} className="text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-800 mb-0.5">{ch.title}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{ch.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                <FiSettings size={12} className="text-blue-500" />
              </div>
              <h3 className="text-sm font-black text-gray-900">導入内容とアプローチ</h3>
            </div>
            <div className="flex flex-col gap-2">
              {c.approaches.map((ap, i) => (
                <div key={i} className="flex gap-3 items-start bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-[10px] font-black">0{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-900 mb-0.5">{ap.title}</p>
                    <p className="text-[11px] text-gray-500">{ap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                <FiTrendingUp size={12} className="text-emerald-500" />
              </div>
              <h3 className="text-sm font-black text-gray-900">成果（Before / After）</h3>
            </div>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm mb-3">
              <div className="grid grid-cols-3 bg-slate-50 border-b border-gray-100 text-xs">
                <div className="py-2 px-3 font-bold text-gray-500">比較項目</div>
                <div className="py-2 px-3 font-bold text-gray-400 text-center border-l border-gray-100">Before</div>
                <div className="py-2 px-3 font-bold text-blue-600 text-center border-l border-gray-100 bg-blue-50">After</div>
              </div>
              {c.beforeAfter.map((row, i) => (
                <div key={i} className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                  <div className="py-3 px-3 text-xs font-bold text-gray-700">{row.item}</div>
                  <div className="py-3 px-3 text-xs text-gray-400 text-center border-l border-gray-100">{row.before}</div>
                  <div className="py-3 px-3 text-xs font-bold text-blue-600 text-center border-l border-gray-100 bg-blue-50/40">{row.after}</div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-4 text-center shadow-md">
              <p className="text-blue-200 text-[10px] font-bold mb-1">最大成果</p>
              <p className="text-4xl font-black text-white leading-none">{c.bigResult.value}</p>
              <p className="text-blue-100 text-xs font-bold mt-1">{c.bigResult.label}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  <FiUser size={20} className="text-slate-400" />
                </div>
                <p className="text-[10px] text-gray-400 text-center leading-tight">{c.testimonial.role}</p>
                <p className="text-xs font-black text-gray-900 text-center">{c.testimonial.name}</p>
              </div>
              <div className="flex-1 relative">
                <span className="absolute -top-1 -left-0.5 text-5xl text-blue-100 font-serif leading-none select-none">&ldquo;</span>
                <p className="text-xs text-gray-600 leading-relaxed pt-4">{c.testimonial.comment}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <a href="/contact"
              className="relative group overflow-hidden inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
              <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">この事例について相談する</span>
              <FiArrowRight size={13} className="relative" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CaseCard({ c, delay, onOpen }: { c: CaseData; delay: number; onOpen: () => void }) {
  return (
    <FadeUp delay={delay} className="h-full">
      <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
        <div className="relative h-52 flex-shrink-0 overflow-hidden">
          <Image src={c.img} alt={c.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
            {c.category}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="min-h-[4rem] mb-3">
            <h3 className="font-bold text-gray-900 text-base leading-snug whitespace-pre-line mb-1.5">{c.title}</h3>
            <p className="text-xs text-gray-400">{c.company}</p>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 mb-4">{c.description}</p>

          <div className="mt-auto">
            <div className="grid grid-cols-3 divide-x divide-gray-100 border border-gray-100 rounded-xl overflow-hidden mb-4">
              {c.metrics.map((m, i) => (
                <div key={i} className="py-3 px-2 text-center">
                  <p className="text-[11px] text-gray-500 leading-tight min-h-[2rem] flex items-center justify-center">{m.label}</p>
                  <p className="text-lg font-black text-blue-600 leading-none">{m.value}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{m.unit}</p>
                </div>
              ))}
            </div>

            <button onClick={onOpen} className="flex items-center justify-center gap-1.5 w-full py-3 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all">
              詳しく見る <FiArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('すべて')
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const filtered = activeTab === 'すべて'
    ? CASES
    : CASES.filter(c => c.category === activeTab)

  const selectedCase = CASES.find(c => c.id === selectedId) ?? null

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">

      <Nav />

      {/* ── ヒーロー ── */}
      <section className="pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
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
                <a href="/contact" className="relative group overflow-hidden flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
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
                  activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
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
                <CaseCard key={c.id} c={c} delay={i * 0.07} onOpen={() => setSelectedId(c.id)} />
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
            <FadeUp className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-3 leading-tight">
                DXの成功は、パートナー選びから。
              </h2>
              <p className="text-blue-200 text-sm mb-7">まずは無料相談で、貴社の課題をお聞かせください。</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="/contact" className="relative group overflow-hidden flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-bold text-white text-sm shadow-lg shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
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

      {/* ── 事例詳細モーダル ── */}
      <AnimatePresence>
        {selectedCase && (
          <CaseModal c={selectedCase} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
