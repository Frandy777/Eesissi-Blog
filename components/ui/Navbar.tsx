'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import LocaleSwitcher from '../LocaleSwitcher';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { lang } = useParams();

  // 判断当前是否在主页
  const isHome = pathname === `/${lang}`;
  // 判断当前是否在文章部分
  const isArticle = pathname.includes('/current-courses') || 
                   pathname.includes('/introduction') || 
                   pathname.includes('/publication') || 
                   pathname.includes('/project') || 
                   pathname.includes('/group-members') || 
                   pathname.includes('/gallery');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-[#f5f4f1] to-[#e8e7e4] dark:from-[#1f1f1f] dark:to-[#252525] backdrop-blur supports-[backdrop-filter]:bg-gradient-to-br supports-[backdrop-filter]:from-[#f5f4f1]/60 supports-[backdrop-filter]:to-[#e8e7e4]/60 dark:supports-[backdrop-filter]:from-[#1f1f1f]/60 dark:supports-[backdrop-filter]:to-[#252525]/60">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          {/* 左侧 Logo 和导航链接 */}
          <div className="flex items-center">
            <Link href={`/${lang}`} className="text-xl sm:text-xl font-[800] tracking-wide mr-3 sm:mr-6">
              EESISISI
            </Link>
            <div className="flex space-x-2 sm:space-x-4">
              <Link
                href={`/${lang}`}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isHome ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {t('home')}
              </Link>
              <Link
                href={`/${lang}/current-courses`}
                className={`text-xs sm:text-sm font-medium transition-colors ${
                  isArticle ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {t('articles')}
              </Link>
            </div>
          </div>

          {/* 右侧功能按钮 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LocaleSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 