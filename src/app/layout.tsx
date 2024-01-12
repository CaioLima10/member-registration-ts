import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header'
import { AuthProvider } from '@/provider/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Membros Igreja AD Brás',
  description: 'Cadatre seu membro da Igreja AD, de forma facil.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
