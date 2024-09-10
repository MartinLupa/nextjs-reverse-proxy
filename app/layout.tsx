import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reverse Proxy',
  description: 'Reverse proxy for unified-web application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
