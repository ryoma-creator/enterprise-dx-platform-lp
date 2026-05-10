import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
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
  )
}
