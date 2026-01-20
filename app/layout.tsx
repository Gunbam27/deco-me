import type { Metadata } from 'next';
import { Geist, Geist_Mono, Jua } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import { AppBar } from '@/components/AppBar';
import { AuthProvider } from '../components/AuthProvider';
import { ToastHost } from '@/components/ToastHost';
import { ModalHost } from '@/components/ModalHost';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: '데코미 | 친구 꾸미기',
  description: '내가 생각하는 너. 친구 캐릭터를 내 맘대로 꾸며보세요.',
};

const jua = Jua({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jua',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`
          min-h-screen
          bg-gradient-to-b from-[#fcbfc3] to-[#fff2f2]
          ${jua.variable}
        `}
      >
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-gray-500">로딩 중...</p></div>}>
          <AuthProvider>
            <AppBar />
            {children}
            <ToastHost />
            <ModalHost />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
