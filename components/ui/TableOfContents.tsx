'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items?: TocItem[];
}

export default function TableOfContents({ items = [] }: TableOfContentsProps) {
  const t = useTranslations('Common');
  const pathname = usePathname();
  const { lang } = useParams();

  // 判断是否显示目录
  const shouldShowTOC = pathname !== `/${lang}`;

  if (!shouldShowTOC) {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="w-64 hidden xl:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
          {t('onThisPage')}
        </h4>
        <nav className="space-y-1">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm py-1 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors ${
                item.level === 2 ? 'pl-4' : 'pl-8'
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
} 