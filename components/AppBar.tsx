'use client';

import Image from 'next/image';

export function AppBar() {
  return (
    <header
      className="
        sticky top-0 z-50
        bg-pink-100
        border-b border-black/5
      "
    >
      <div
        className="
          mx-auto max-w-[640px]
          h-14
          px-4
          flex items-center justify-center
          relative
        "
      >
        {/* 중앙 로고 */}
        <Image
          src="/logo.png" // 🔁 네 로고 경로로 변경
          alt="Deco Me"
          width={96}
          height={24}
          priority
        />
      </div>
    </header>
  );
}
