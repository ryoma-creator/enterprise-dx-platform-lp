import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextGrow | DXで、ビジネスに次の成長を。",
  description: "業務のデジタル化からシステム開発まで、貴社の課題に寄り添い、成果につながるDXを実現します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
