import { Inter } from 'next/font/google'

import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import ActiveStatus from './components/ActiveStatus'
import TopLoader from './components/TopLoader'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chatify',
  description: 'Chatify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <AuthContext>
            <TopLoader />
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
      </body>
    </html>
  )
}
