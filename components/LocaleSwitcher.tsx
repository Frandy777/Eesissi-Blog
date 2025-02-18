'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const localeNames = {
  en: {
    name: 'EN',
    icon: '/images/circle-flags--us.svg'
  },
  zh: {
    name: '中文',
    icon: '/images/circle-flags--cn.svg'
  }
};

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    // 替换当前URL中的语言代码
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // 在客户端挂载完成前显示一个占位符
  if (!mounted) {
    return <div className="w-[76px] h-8" />;
  }

  const currentLocale = localeNames[locale as keyof typeof localeNames];
  const nextLocale = locale === 'zh' ? 'en' : 'zh';
  const nextLocaleName = localeNames[nextLocale as keyof typeof localeNames];

  return (
    <button
      onClick={() => handleLocaleChange(nextLocale)}
      className="flex items-center w-[76px] h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition-colors duration-200"
      aria-label={`切换到${nextLocaleName.name}`}
    >
      <div className="relative w-5 h-5 flex-shrink-0 ml-1.5">
        <Image
          src={currentLocale.icon}
          alt={currentLocale.name}
          fill
          className="object-contain"
          sizes="20px"
        />
      </div>
      <span className="text-xs font-medium flex-1 text-center pr-1.5">
        {currentLocale.name}
      </span>
    </button>
  );
} 