import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getCourseById, getAllCourseIds } from '@/lib/courses';
import { locales } from '@/i18n/settings';

// 生成所有课程ID和语言的组合路径
export async function generateStaticParams() {
  const courseIds = await getAllCourseIds();
  
  return courseIds.flatMap(courseId => 
    locales.map(locale => ({
      lang: locale,
      courseId
    }))
  );
}

// 配置静态生成
export const dynamic = 'force-static';
export const revalidate = 86400; // 每天重新验证一次

export default async function CourseDetailPage({ params }: { params: Promise<{ lang: string, courseId: string }> }) {
  // 解析params Promise
  const { lang, courseId } = await params;
  const t = await getTranslations('Courses');
  
  // 获取课程详情数据
  const { content } = await getCourseById(courseId, lang);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href={`/${lang}/current-courses`}
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
        {t('backToCourses')}
      </Link>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
} 