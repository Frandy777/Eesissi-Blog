import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/ui/Sidebar';
import TableOfContents from '@/components/ui/TableOfContents';

const locales = ['en', 'zh'];

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const metadata: Metadata = {
  title: 'EESISISI',
  description: '深圳大学特聘研究员、博士生导师、副教授',
  icons: {
    icon: [
      {
        url: '/Logo/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/Logo/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    apple: [
      {
        url: '/Logo/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    shortcut: ['/Logo/favicon.ico']
  },
  manifest: '/Logo/site.webmanifest'
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../content/translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // 等待并解构动态参数
  const { lang } = await params;
  
  const isValidLocale = locales.includes(lang);
  if (!isValidLocale) {
    notFound();
  }

  const messages = await getMessages(lang);

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <div className="min-h-screen bg-gradient-to-br from-[#f8f7f4] to-[#e8e7e4] dark:from-[#1a1a1a] dark:to-[#252525]">
        <Navbar />
        <div className="flex">
          {/* 左侧边栏 - 仅在文章部分显示 */}
          <Sidebar />
          
          {/* 主要内容区域 */}
          <main className="flex-1 min-w-0 transition-all duration-300">
            <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-2 pb-8">
              {children}
            </div>
          </main>

          {/* 右侧目录 - 仅在文章部分显示 */}
          <TableOfContents />
        </div>
      </div>
    </NextIntlClientProvider>
  );
} 