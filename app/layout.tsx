import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { UserProvider, useUser } from '@/lib/UserProvider';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "University Result Management System",
  description: "University Result Management System",
  generator: "University Result Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <UserProvider>
    
          {children}
    
          <Analytics />
        </UserProvider>
      </body>
    </html>
  );
}
