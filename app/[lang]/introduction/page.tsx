import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getIntroductionContent } from '@/lib/introduction';
import { locales } from '@/i18n/settings';

// 添加静态路径生成函数
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 添加静态生成配置
export const dynamic = 'force-static';
export const revalidate = 86400; // 每天重新验证一次

export default async function IntroductionPage({ params }: { params: Promise<{ lang: string }> }) {
  // 解析params Promise
  const { lang } = await params;
  
  // 直接从文件系统获取个人简介内容
  const content = await getIntroductionContent(lang);

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-2 pb-8">
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
} 