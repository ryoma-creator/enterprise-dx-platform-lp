'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  FiArrowRight, FiAlertCircle, FiTrendingUp, FiSettings,
  FiUser, FiCheckCircle, FiPhoneCall,
} from 'react-icons/fi'
import { FadeUp } from '@/components/ui/animations'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import { CASES } from '@/lib/data/cases'

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const c = CASES.find(d => d.id === Number(params.id))
  if (!c) notFound()

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden min-h-screen bg-white">

      <Nav />

      <div className="pt-16">

        {/* ── ヒーローセクション ── */}
        <section className="bg-slate-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-12">

            <FadeUp>
              <div className="text-xs text-gray-400 mb-6 flex items-center gap-2">
                <Link href="/" className="hover:text-blue-600 transition-colors">ホーム</Link>
                <span>›</span>
                <Link href="/cases" className="hover:text-blue-600 transition-colors">導入事例</Link>
                <span>›</span>
                <span className="text-gray-600 font-medium line-clamp-1">{c.title.replace('\n', '')}</span>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <FadeUp>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white mb-4">
                    {c.category}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-3 whitespace-pre-line">
                    {c.title}
                  </h1>
                  <p className="text-sm text-gray-400 mb-3">{c.company}</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {c.meta.map((m, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <m.Icon size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="text-gray-400">{m.label}</span>
                        <span className="font-bold text-gray-700">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              </div>

              <div className="flex flex-col gap-4">
                <FadeUp delay={0.1}>
                  <div className="grid grid-cols-2 gap-3">
                    {c.heroMetrics.map((m, i) => (
                      <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
                        <p className="text-[11px] text-gray-400 mb-1">{m.label}</p>
                        <p className="text-2xl font-black text-blue-600 leading-none">
                          {m.value}<span className="text-sm font-bold text-gray-400 ml-0.5">{m.unit}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </FadeUp>

                <FadeUp delay={0.15}>
                  <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-200">
                    <Image src={c.img} alt={c.title} fill className="object-cover" />
                  </div>
                </FadeUp>
              </div>
            </div>
          </div>
        </section>

        {/* ── 課題 ── */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                  <FiAlertCircle size={15} className="text-amber-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900">課題（導入前の状況）</h2>
              </div>
              <p className="text-sm text-gray-400 mb-8 ml-11">既存システムの老朽化や手作業による運用により、様々な課題を抱えていました。</p>
            </FadeUp>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {c.challenges.map((ch, i) => (
                <FadeUp key={i} delay={i * 0.07}>
                  <div className="bg-slate-50 rounded-2xl p-5 text-center border border-slate-100 h-full flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-3 mx-auto">
                      <ch.Icon size={20} className="text-blue-500" />
                    </div>
                    <p className="text-xs font-black text-gray-800 leading-snug mb-2">{ch.title}</p>
                    <p className="text-[11px] text-gray-500 leading-relaxed">{ch.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── 導入内容とアプローチ ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <FiSettings size={15} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900">導入内容とアプローチ</h2>
              </div>
              <p className="text-sm text-gray-400 mb-8 ml-11">業務フローの見直しとシステム刷新により、課題を根本から解決しました。</p>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-3">
                {c.approaches.map((ap, i) => (
                  <FadeUp key={i} delay={i * 0.06}>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white text-xs font-black">0{i + 1}</span>
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm mb-1">{ap.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{ap.desc}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp delay={0.2}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-xs font-bold text-gray-400 mb-5 text-center">導入フロー</p>
                  <div className="flex flex-wrap justify-center gap-2 items-center">
                    {c.flowSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                            <FiCheckCircle size={18} className="text-blue-500" />
                          </div>
                          <span className="text-[11px] font-bold text-gray-600 text-center">{step}</span>
                        </div>
                        {i < c.flowSteps.length - 1 && (
                          <FiArrowRight size={14} className="text-gray-300 flex-shrink-0 -mt-4" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <div className="inline-block bg-blue-600 text-white text-xs font-black px-5 py-2 rounded-full shadow-md shadow-blue-500/20">
                      一元管理システム
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── 成果 ── */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                  <FiTrendingUp size={15} className="text-emerald-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900">成果（導入後の効果）</h2>
              </div>
              <p className="text-sm text-gray-400 mb-8 ml-11">システム導入により、定量的・定性的な成果を実現しました。</p>
            </FadeUp>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <FadeUp delay={0.05} className="lg:col-span-3">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-3 bg-slate-50 border-b border-gray-100">
                    <div className="py-3 px-4 text-xs font-bold text-gray-500">比較項目</div>
                    <div className="py-3 px-4 text-xs font-bold text-gray-400 text-center border-l border-gray-100">Before（導入前）</div>
                    <div className="py-3 px-4 text-xs font-bold text-blue-600 text-center border-l border-gray-100 bg-blue-50">After（導入後）</div>
                  </div>
                  {c.beforeAfter.map((row, i) => (
                    <div key={i} className={`grid grid-cols-3 border-b border-gray-50 ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                      <div className="py-4 px-4 text-xs font-bold text-gray-700">{row.item}</div>
                      <div className="py-4 px-4 text-xs text-gray-400 text-center border-l border-gray-100">{row.before}</div>
                      <div className="py-4 px-4 text-xs font-bold text-blue-600 text-center border-l border-gray-100 bg-blue-50/40">{row.after}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.15} className="lg:col-span-2">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 flex flex-col items-center justify-center h-full text-center shadow-lg shadow-blue-500/20">
                  <p className="text-blue-200 text-xs font-bold mb-3">導入後の最大成果</p>
                  <p className="text-7xl font-black text-white leading-none mb-2">{c.bigResult.value}</p>
                  <p className="text-blue-100 text-base font-bold">{c.bigResult.label}</p>
                  <div className="mt-6 pt-5 border-t border-blue-500/40 w-full">
                    <div className="grid grid-cols-2 gap-3">
                      {c.heroMetrics.slice(0, 2).map((m, i) => (
                        <div key={i} className="text-center">
                          <p className="text-[10px] text-blue-200 mb-1">{m.label}</p>
                          <p className="text-lg font-black text-white leading-none">{m.value}</p>
                          {m.unit && <p className="text-[10px] text-blue-200">{m.unit}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── お客様の声 ── */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <FadeUp>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-violet-50 border border-violet-200 flex items-center justify-center flex-shrink-0">
                  <FiUser size={15} className="text-violet-500" />
                </div>
                <h2 className="text-xl font-black text-gray-900">お客様の声</h2>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                      <FiUser size={28} className="text-slate-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400">{c.testimonial.role}</p>
                      <p className="text-sm font-black text-gray-900">{c.testimonial.name}</p>
                      <p className="text-xs text-gray-400">{c.testimonial.company}</p>
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <span className="absolute -top-2 -left-1 text-6xl text-blue-100 font-serif leading-none select-none">&ldquo;</span>
                    <p className="text-sm text-gray-600 leading-relaxed pt-4 relative z-10">
                      {c.testimonial.comment}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 底部CTA ── */}
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <FadeUp>
              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-5">
                <FiPhoneCall size={22} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">
                貴社の課題解決に向けて、まずはお気軽にご相談ください
              </h2>
              <p className="text-sm text-gray-400 mb-8">専門スタッフが貴社の課題をヒアリングし、最適なプランをご提案します。</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact"
                  className="relative group overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white text-sm shadow-md shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">無料相談を予約する</span>
                  <FiArrowRight size={14} className="relative" />
                </a>
                <Link href="/cases"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-gray-600 text-sm border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-all">
                  他の導入事例を見る <FiArrowRight size={14} />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
