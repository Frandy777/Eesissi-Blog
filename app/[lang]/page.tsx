import Image from 'next/image';
import { locales } from '@/i18n/settings';
import fs from 'fs/promises';
import path from 'path';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export const dynamic = 'force-static';
export const revalidate = 86400;

// 直接从文件系统加载翻译文件
async function loadTranslations(locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'translations', `${locale}.json`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    return translations.Index; // 返回Index命名空间的翻译
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    // 如果加载失败，返回空对象
    return {};
  }
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  try {
    // 解析params Promise
    const resolvedParams = await params;
    const lang = resolvedParams.lang || 'zh'; // 确保有默认值
    
    console.log('Home page language:', lang); // 添加日志以便调试
    
    // 直接从文件系统加载翻译
    const translations = await loadTranslations(lang);
    
    // 确保researchList是数组
    const researchList = translations.researchList || [];
    
    return (
      <main className="min-h-screen w-full py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-12 md:gap-16">
          {/* 个人信息部分 */}
          <div className="w-full flex flex-col items-center text-center space-y-4">
            <div className="w-32 h-32 md:w-40 md:h-40 relative">
              <Image
                src="/images/introduction/wuxx.jpg"
                alt="Profile"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 128px, 160px"
              />
            </div>
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold">{translations.name}</h1>
              <h2 className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 max-w-[280px] md:max-w-[320px] mx-auto leading-relaxed">
                {translations.title}
              </h2>
              <div className="flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${translations.email}`} className="hover:text-primary transition-colors text-sm">
                  {translations.email}
                </a>
              </div>
            </div>
          </div>

          {/* 研究领域标签 - 循环滚动 */}
          <div className="w-full overflow-hidden">
            <div className="overflow-x-hidden relative">
              <div className="flex whitespace-nowrap gap-3 animate-scroll">
                {[...researchList, ...researchList].map((research, index) => (
                  <span
                    key={`${research}-${index}`}
                    className="inline-block px-3 py-1.5 bg-neutral-100 dark:bg-neutral-700 rounded-full text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    {research}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 关于我 */}
          <div className="w-full">
            <div className="backdrop-blur-md bg-white bg-opacity-30 dark:bg-neutral-800 dark:bg-opacity-30 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-lg md:text-xl font-bold mb-4">{translations.aboutMe}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm md:text-base">
                {translations.aboutText}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    // 出错时返回一个简单的错误页面
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>加载页面时出错，请刷新重试。</p>
      </div>
    );
  }
}