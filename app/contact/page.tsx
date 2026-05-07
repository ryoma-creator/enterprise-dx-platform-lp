'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck, FiChevronDown, FiArrowRight } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'サービス',     href: '/#services' },
  { label: '導入事例',    href: '/cases' },
  { label: '選ばれる理由', href: '/#reasons' },
  { label: '料金プラン',  href: '/pricing' },
  { label: 'よくある質問', href: '/faq' },
]

const FEATURES = [
  { icon: FiUser,         text: '専門コンサルタントが対応' },
  { icon: FiMessageSquare, text: '課題整理から丁寧にサポート' },
  { icon: FiCheck,        text: '相談・見積もりは完全無料' },
]

const INQUIRY_OPTIONS = [
  'DX戦略・コンサルティング',
  'システム開発',
  '業務改善・RPA導入',
  '運用・保守サポート',
  'その他',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    inquiry: '', date1: '', time1: '', date2: '', time2: '',
    message: '', privacy: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (key: string, val: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: val }))

  const canSubmit = form.name && form.company && form.email && form.inquiry && form.privacy

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    setSubmitted(true)
  }

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
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:block px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 rounded-lg text-sm font-bold transition-all">
              資料ダウンロード
            </a>
            <Link href="/contact" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-sm">
              無料相談を予約する
            </Link>
          </div>
        </div>
      </nav>

      {/* ── メインコンテンツ ── */}
      <div className="pt-16 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] min-h-[calc(100vh-64px)]">

          {/* ── 左：背景写真＋説明 ── */}
          <div className="relative flex flex-col justify-center px-10 lg:px-16 py-16 overflow-hidden">
            {/* 背景写真 */}
            <div className="absolute inset-0">
              <Image src="/images/document-hero.png" alt="無料相談" fill className="object-cover object-center" priority />
              <div className="absolute inset-0 bg-blue-900/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-blue-900/60 to-blue-900/30" />
            </div>

            {/* テキスト */}
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-300" />
                <span className="text-white/90 text-xs font-bold">DX推進・業務改善のご相談はこちら</span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-5">
                無料相談を<br />予約する
              </h1>

              <p className="text-blue-100 text-sm leading-relaxed mb-10">
                専門コンサルタントが、貴社の課題をヒアリングしてご提案します。<br />
                まずはお気軽にご相談ください。
              </p>

              <div className="flex flex-col gap-4">
                {FEATURES.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      <f.icon size={16} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 右：フォーム ── */}
          <div className="bg-gray-50 flex items-start justify-center px-6 py-12 lg:px-8">
            <div className="w-full max-w-md">
              {submitted ? (
                /* 送信完了 */
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                    <FiCheck size={28} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-3">送信完了しました</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-8">
                    お問い合わせありがとうございます。<br />
                    担当者より1営業日以内にご連絡いたします。
                  </p>
                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                    トップページへ戻る <FiArrowRight size={14} />
                  </Link>
                </div>
              ) : (
                /* フォーム */
                <div className="bg-white rounded-2xl shadow-sm p-7">
                  <h2 className="text-lg font-black text-gray-900 mb-1">ご相談予約フォーム</h2>
                  <p className="text-xs text-gray-400 mb-6">以下のフォームにご入力のうえ、送信してください。</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    {/* お名前 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        お名前 <span className="text-red-500">必須</span>
                      </label>
                      <div className="relative">
                        <FiUser size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="例）山田 太郎" value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
                      </div>
                    </div>

                    {/* 会社名 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        会社名 <span className="text-red-500">必須</span>
                      </label>
                      <input type="text" placeholder="例）株式会社○○○○" value={form.company}
                        onChange={(e) => update('company', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
                    </div>

                    {/* メールアドレス */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        メールアドレス <span className="text-red-500">必須</span>
                      </label>
                      <div className="relative">
                        <FiMail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="email" placeholder="example@company.co.jp" value={form.email}
                          onChange={(e) => update('email', e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
                      </div>
                    </div>

                    {/* ご連絡先 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">ご連絡先（任意）</label>
                      <div className="relative">
                        <FiPhone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="tel" placeholder="例）03-1234-5678" value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
                      </div>
                    </div>

                    {/* ご相談内容 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">
                        ご相談内容 <span className="text-red-500">必須</span>
                      </label>
                      <div className="relative">
                        <select value={form.inquiry} onChange={(e) => update('inquiry', e.target.value)}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-gray-700">
                          <option value="">選択してください</option>
                          {INQUIRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <FiChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* ご希望日時 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">ご希望日時①</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" value={form.date1} onChange={(e) => update('date1', e.target.value)}
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-gray-700" />
                        <select value={form.time1} onChange={(e) => update('time1', e.target.value)}
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-gray-700">
                          <option value="">時間帯</option>
                          {['10:00','11:00','13:00','14:00','15:00','16:00','17:00'].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">ご希望日時②</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" value={form.date2} onChange={(e) => update('date2', e.target.value)}
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-gray-700" />
                        <select value={form.time2} onChange={(e) => update('time2', e.target.value)}
                          className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all text-gray-700">
                          <option value="">時間帯</option>
                          {['10:00','11:00','13:00','14:00','15:00','16:00','17:00'].map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* ご要望 */}
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">ご要望・ご状況など（任意）</label>
                      <textarea value={form.message} onChange={(e) => update('message', e.target.value)}
                        placeholder="現在の課題や背景、ご要望などをご記入ください。"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all" />
                    </div>

                    {/* プライバシーポリシー */}
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => update('privacy', !form.privacy)}
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center transition-all cursor-pointer ${
                          form.privacy ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'
                        }`}
                      >
                        {form.privacy && <FiCheck size={11} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-xs text-gray-500 leading-relaxed">
                        <a href="#" className="text-blue-600 underline underline-offset-2">プライバシーポリシー</a>
                        に同意のうえ送信します。
                      </span>
                    </label>

                    {/* 送信ボタン */}
                    <button type="submit" disabled={!canSubmit}
                      className={`relative group overflow-hidden w-full py-4 rounded-xl font-bold text-white text-sm transition-all duration-300 mt-1 ${
                        canSubmit ? 'hover:-translate-y-0.5 shadow-md shadow-blue-500/20' : 'opacity-40 cursor-not-allowed'
                      }`}>
                      <div className="absolute inset-0 bg-blue-600 group-hover:opacity-0 transition-opacity duration-300" />
                      {canSubmit && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      )}
                      <span className="relative flex items-center justify-center gap-2">
                        確認画面へ進む <FiArrowRight size={15} />
                      </span>
                    </button>

                  </form>
                </div>
              )}
            </div>
          </div>
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
            <Link href="/contact" className="hover:text-gray-300 transition-colors">お問い合わせ</Link>
          </div>
          <p className="text-xs text-gray-600">© 2025 NextGrow Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
