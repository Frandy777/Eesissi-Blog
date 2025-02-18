'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 等待客户端挂载完成
  useEffect(() => {
    setMounted(true);
  }, []);

  // 在客户端挂载完成前不渲染任何内容
  if (!mounted) {
    return <div className="w-16 h-8" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`
        relative flex items-center w-16 h-8 rounded-full transition-colors duration-300
        ${isDark ? 'bg-neutral-800' : 'bg-neutral-200'}
      `}
      aria-label={isDark ? '切换到浅色模式' : '切换到深色模式'}
    >
      {/* 滑块 */}
      <div
        className={`
          absolute w-7 h-7 rounded-full transform transition-transform duration-300 flex items-center justify-center
          ${isDark ? 'translate-x-[2.125rem]' : 'translate-x-0.5'} 
          ${isDark ? 'bg-neutral-900' : 'bg-white'}
          shadow-md
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-neutral-200" />
        ) : (
          <Sun className="w-4 h-4 text-neutral-700" />
        )}
      </div>

      {/* 背景图标 */}
      <div className="flex items-center justify-between w-full px-2">
        <Sun className={`w-4 h-4 ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`} />
        <Moon className={`w-4 h-4 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
      </div>
    </button>
  );
} 