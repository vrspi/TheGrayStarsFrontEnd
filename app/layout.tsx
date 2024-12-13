import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'TheGrayStars - Official Website',
  description: 'Official website of TheGrayStars band - Music, Tours, and More',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto.variable} font-sans bg-primary-gray text-primary-light min-h-screen flex flex-col`}>
        <Navigation />
        <main className="pt-16 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 