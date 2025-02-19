'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import {
  BookOpen,
  FileText,
  Rocket,
  Users,
  Image,
  GraduationCap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const { lang } = useParams();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 判断是否显示侧边栏
  const shouldShowSidebar = pathname !== `/${lang}`;

  useEffect(() => {
    // 检查是否为移动端
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCollapsed(window.innerWidth < 768);
    };

    // 初始检查
    checkMobile();

    // 监听窗口大小变化
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!shouldShowSidebar) {
    return null;
  }

  const menuItems = [
    { href: '/introduction', label: t('introduction'), icon: BookOpen },
    { href: '/publication', label: t('publication'), icon: FileText },
    { href: '/project', label: t('project'), icon: Rocket },
    { href: '/group-members', label: t('groupMembers'), icon: Users },
    { href: '/gallery', label: t('gallery'), icon: Image },
    { href: '/current-courses', label: t('currentCourses'), icon: GraduationCap },
  ];

  return (
    <>
      {/* 移动端遮罩层 */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-x-0 top-16 bottom-0 bg-neutral-900/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside 
        className={`
          ${isCollapsed ? 'w-16' : 'w-56'} 
          sticky top-16
          bg-gradient-to-br from-[#f5f4f1] to-[#e8e7e4] dark:from-[#1f1f1f] dark:to-[#252525]
          border-r border-neutral-200 dark:border-neutral-800 
          h-[calc(100vh-4rem)]
          shadow-[1px_0_2px_rgba(0,0,0,0.03)] 
          transition-[width] duration-200
          ${isMobile && !isCollapsed ? 'z-50' : ''}
        `}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            absolute top-3 p-1.5 rounded-full 
            bg-gradient-to-br from-[#f5f4f1] to-[#e8e7e4] dark:from-[#1f1f1f] dark:to-[#252525]
            border border-neutral-200 dark:border-neutral-800 
            text-secondary hover:text-primary 
            transition-[colors,right] duration-200
            shadow-sm hover:shadow
            ${isMobile && !isCollapsed ? 'right-3' : '-right-4'}
          `}
          aria-label={isCollapsed ? '展开侧边栏' : '折叠侧边栏'}
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname.includes(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={`/${lang}${item.href}`}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2.5'} px-2.5 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-active text-primary'
                    : 'text-secondary hover:bg-hover hover:text-primary'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
} 