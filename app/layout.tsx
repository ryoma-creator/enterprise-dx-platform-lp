import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ── SEO / OGP ────────────────────────────────────────────────────────────────
// デプロイ後に SITE_URL と GA_ID を実際の値に更新する
const SITE_URL = 'https://your-nextgrow-domain.vercel.app'
const GA_ID    = 'G-XXXXXXXXXX'  // Google Analytics の測定ID（未取得なら空文字でもOK）

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'NextGrow | DXで、ビジネスに次の成長を。',
    template: '%s | NextGrow',
  },
  description: '業務のデジタル化からシステム開発まで、貴社の課題に寄り添い、成果につながるDXを実現します。200社以上の導入実績、顧客満足度98%。',
  keywords: ['DX支援', 'デジタルトランスフォーメーション', 'システム開発', 'RPA', '業務改善', 'コンサルティング'],
  authors: [{ name: 'NextGrow Inc.' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: SITE_URL,
    siteName: 'NextGrow',
    title: 'NextGrow | DXで、ビジネスに次の成長を。',
    description: '業務のデジタル化からシステム開発まで、貴社の課題に寄り添い、成果につながるDXを実現します。',
    images: [
      {
        url: '/images/og-image.png',  // 1200×630px の OGP 画像を /public/images/ に配置すること
        width: 1200,
        height: 630,
        alt: 'NextGrow DX支援サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextGrow | DXで、ビジネスに次の成長を。',
    description: '業務のデジタル化からシステム開発まで、貴社の課題に寄り添い、成果につながるDXを実現します。',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}

        {/* ── Google Analytics ── */}
        {GA_ID && GA_ID !== 'G-XXXXXXXXXX' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
