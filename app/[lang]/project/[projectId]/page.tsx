import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getProjectById, getAllProjectIds } from '@/lib/projects';
import { locales } from '@/i18n/settings';

// 生成所有项目ID和语言的组合路径
export async function generateStaticParams() {
  const projectIds = await getAllProjectIds();
  
  return projectIds.flatMap(projectId => 
    locales.map(locale => ({
      lang: locale,
      projectId
    }))
  );
}

// 配置静态生成
export const dynamic = 'force-static';
export const revalidate = 86400; // 每天重新验证一次

export default async function ProjectDetailPage({ params }: { params: Promise<{ lang: string, projectId: string }> }) {
  // 解析params Promise
  const { lang, projectId } = await params;
  const t = await getTranslations('Projects');
  
  // 获取项目详情数据
  const { content } = await getProjectById(projectId, lang);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href={`/${lang}/project`}
        className="inline-flex items-center mb-6 text-neutral-600 dark:text-neutral-400 hover:text-primary transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t('backToProjects')}
      </Link>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
} 