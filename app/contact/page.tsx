'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FiCalendar, FiCheck, FiArrowRight,
  FiChevronDown, FiMessageCircle, FiZap, FiUsers, FiShield,
} from 'react-icons/fi'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'

type Step = 1 | 2 | 3

const FEATURES = [
  { icon: FiMessageCircle, title: '課題をヒアリング',     desc: '現状の課題やお悩みを丁寧にお伺いします。' },
  { icon: FiZap,           title: '最適なプランをご提案', desc: '貴社に最適なDXプラン・解決策をご提案します。' },
  { icon: FiUsers,         title: '安心の無料相談',       desc: '初めての方でも安心してご利用いただけます。' },
]

const DATE_OPTIONS = [
  '2026年5月12日（月）', '2026年5月13日（火）', '2026年5月14日（水）',
  '2026年5月15日（木）', '2026年5月16日（金）', '2026年5月19日（月）',
  '2026年5月20日（火）', '2026年5月21日（水）',
]
const TIME_OPTIONS = ['10:00〜11:00', '11:00〜12:00', '13:00〜14:00', '14:00〜15:00', '15:00〜16:00', '16:00〜17:00']

const DOW = ['日', '月', '火', '水', '木', '金', '土']

function CalendarIllo() {
  return (
    <div className="relative w-52 h-52 mx-auto lg:mx-0">
      {/* Shadow card behind */}
      <div className="absolute inset-2 bg-blue-100 rounded-3xl" style={{ transform: 'rotate(4deg)' }} />
      {/* Main calendar card */}
      <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 px-4 pt-4 pb-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2 h-5 rounded-full bg-white/50" />
            <div className="w-2 h-5 rounded-full bg-white/50" />
          </div>
          <span className="text-white font-black text-xs tracking-wide">2026年 5月</span>
          <div className="w-6" />
        </div>
        {/* Grid */}
        <div className="flex-1 p-2.5 grid grid-cols-7 gap-0.5">
          {DOW.map((d) => (
            <div key={d} className="text-center text-[8px] font-bold text-gray-400 py-0.5">{d}</div>
          ))}
          {[...Array(35)].map((_, i) => {
            const day = i - 3
            const isHighlight = day === 8
            const isValid = day >= 1 && day <= 31
            return (
              <div key={i} className={`text-center text-[9px] rounded-full w-5 h-5 flex items-center justify-center mx-auto font-medium
                ${isHighlight ? 'bg-blue-600 text-white font-black' : isValid ? 'text-gray-600' : ''}`}>
                {isValid ? day : ''}
              </div>
            )
          })}
        </div>
      </div>
      {/* Clock badge */}
      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-xl border border-blue-100 flex items-center justify-center">
        <FiCalendar size={20} className="text-blue-500" />
      </div>
    </div>
  )
}

function RequiredBadge() {
  return (
    <span className="ml-1.5 text-[10px] font-bold text-blue-600 border border-blue-300 rounded px-1.5 py-0.5 align-middle">必須</span>
  )
}

const inputCls = 'w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white placeholder:text-gray-300'
const selectCls = 'w-full pl-9 pr-8 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white appearance-none text-gray-500'

export default function ContactPage() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState({
    date: '', time: '', name: '', company: '', email: '', phone: '', message: '',
  })

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))
  const canNext = form.date && form.time && form.name && form.company && form.email && form.phone

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      <Nav />

      <div className="pt-16 min-h-screen" style={{ background: 'linear-gradient(150deg, #dbeafe 0%, #eff6ff 40%, #f8faff 100%)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-12 items-start">

            {/* ── 左 ── */}
            <div className="flex flex-col gap-8">
              <CalendarIllo />

              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-3">無料相談のご予約</h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  貴社の課題やご要望をお聞かせください。<br />
                  専門コンサルタントが最適なDXプランをご提案します。
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 shadow-sm border border-blue-50/80">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-300/40">
                      <f.icon size={17} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight mb-0.5">{f.title}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 右：フォームカード ── */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

              {/* Step indicator */}
              <div className="flex items-center justify-center mb-8">
                {([1, 2, 3] as const).map((s, i) => (
                  <div key={s} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-black text-sm transition-all ${
                        step > s  ? 'bg-blue-50 border-blue-300 text-blue-500' :
                        step === s ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-400/30' :
                                    'bg-white border-gray-200 text-gray-300'
                      }`}>
                        {step > s ? <FiCheck size={14} /> : s}
                      </div>
                      <span className={`text-xs font-bold ${step === s ? 'text-blue-600' : 'text-gray-400'}`}>
                        {s === 1 ? '入力' : s === 2 ? '確認' : '完了'}
                      </span>
                    </div>
                    {i < 2 && <div className="w-16 h-px bg-gray-200 mx-2 mb-5" />}
                  </div>
                ))}
              </div>

              {/* ── Step 1: 入力 ── */}
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); if (canNext) setStep(2) }} className="flex flex-col gap-5">

                  {/* 日時 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">ご希望日時<RequiredBadge /></label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <FiCalendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        <select value={form.date} onChange={(e) => update('date', e.target.value)} className={selectCls}>
                          <option value="">日付を選択してください</option>
                          {DATE_OPTIONS.map((d) => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <FiChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select value={form.time} onChange={(e) => update('time', e.target.value)} className={`${selectCls} pl-4`}>
                          <option value="">時間を選択してください</option>
                          {TIME_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <FiChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* 名前 + 会社名 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">お名前<RequiredBadge /></label>
                      <input type="text" placeholder="例）山田 太郎" value={form.name}
                        onChange={(e) => update('name', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">会社名<RequiredBadge /></label>
                      <input type="text" placeholder="例）株式会社NextGrow" value={form.company}
                        onChange={(e) => update('company', e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  {/* メール + 電話 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">メールアドレス<RequiredBadge /></label>
                      <input type="email" placeholder="例）example@nextgrow.jp" value={form.email}
                        onChange={(e) => update('email', e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-800 mb-2">電話番号<RequiredBadge /></label>
                      <input type="tel" placeholder="例）03-1234-5678" value={form.phone}
                        onChange={(e) => update('phone', e.target.value)} className={inputCls} />
                    </div>
                  </div>

                  {/* 相談内容 */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      ご相談内容・課題感
                      <span className="ml-2 text-xs text-gray-400 font-normal">（任意）</span>
                    </label>
                    <textarea value={form.message} onChange={(e) => update('message', e.target.value)}
                      placeholder="例）業務効率化を進めたい、データ活用を推進したい など"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-gray-300" />
                  </div>

                  {/* Privacy */}
                  <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3 text-xs text-gray-500">
                    <FiShield size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>
                      ご入力いただいた個人情報は、
                      <a href="#" className="text-blue-600 underline underline-offset-2">プライバシーポリシー</a>
                      に基づき適切に管理いたします。
                    </span>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={!canNext}
                    className={`w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
                      canNext
                        ? 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-500/25'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}>
                    <FiCalendar size={17} />
                    確認画面へ進む
                  </button>
                </form>
              )}

              {/* ── Step 2: 確認 ── */}
              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-black text-gray-900 text-base mb-2">入力内容の確認</h2>
                  {[
                    { label: 'ご希望日時',     val: `${form.date}　${form.time}` },
                    { label: 'お名前',         val: form.name },
                    { label: '会社名',         val: form.company },
                    { label: 'メールアドレス', val: form.email },
                    { label: '電話番号',       val: form.phone },
                    { label: 'ご相談内容',     val: form.message || '（なし）' },
                  ].map(({ label, val }) => (
                    <div key={label} className="border-b border-gray-100 pb-3">
                      <p className="text-xs text-gray-400 font-bold mb-1">{label}</p>
                      <p className="text-sm text-gray-800 font-medium">{val}</p>
                    </div>
                  ))}
                  <div className="flex gap-3 mt-2">
                    <button onClick={() => setStep(1)}
                      className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 text-sm font-bold hover:border-gray-300 transition-all">
                      修正する
                    </button>
                    <button onClick={() => setStep(3)}
                      className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-400/25">
                      送信する
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: 完了 ── */}
              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <FiCheck size={28} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-2">送信完了しました</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    お問い合わせありがとうございます。<br />
                    担当者より1営業日以内にご連絡いたします。
                  </p>
                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                    トップページへ戻る <FiArrowRight size={14} />
                  </Link>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
