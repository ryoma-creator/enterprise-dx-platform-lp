'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFileText, FiArrowRight, FiCalendar } from 'react-icons/fi'
import { NAV_LINKS } from '@/lib/data/nav'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const pathname = usePathname()

  // スクロール位置に応じてアクティブセクションを追跡
  useEffect(() => {
    if (pathname !== '/') { setActiveSection(null); return }

    const sectionIds = NAV_LINKS
      .filter((l) => l.href.startsWith('/#'))
      .map((l) => l.href.slice(2))

    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(id) })
        },
        { threshold: 0.3, rootMargin: '-64px 0px -30% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [pathname])

  // /#xxx → スクロール位置で1つだけ、通常ページ → pathname一致
  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/' && activeSection === href.slice(2)
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-black">N</span>
          </div>
          <span className="font-black text-lg text-gray-900">NextGrow</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-0.5 font-bold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <a href="#" className="flex items-center gap-1.5 text-sm px-3 py-2 border border-gray-300 rounded-full text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-all font-medium whitespace-nowrap">
            <FiFileText size={13} />
            資料ダウンロード
          </a>
          <Link href="/contact" className="flex items-center gap-1.5 text-sm px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all font-bold shadow-sm shadow-blue-500/30 whitespace-nowrap">
            <FiCalendar size={13} />
            無料相談を予約する
            <FiArrowRight size={12} />
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block text-sm font-medium ${
                  isActive(link.href) ? 'text-blue-600 font-bold' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              <a href="#" className="flex items-center justify-center gap-2 text-sm px-4 py-2.5 border border-gray-300 rounded-full text-gray-700">
                <FiFileText size={14} /> 資料ダウンロード
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 text-sm px-4 py-2.5 bg-blue-600 text-white rounded-full font-bold">
                <FiCalendar size={14} /> 無料相談を予約する <FiArrowRight size={13} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
