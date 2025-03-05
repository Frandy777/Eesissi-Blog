import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getAllCourses } from '@/lib/courses';
import { locales } from '@/i18n/settings';

// 生成所有语言的静态路径
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 配置静态生成
export const dynamic = 'force-static';
export const revalidate = 86400; // 每天重新验证一次

export default async function CoursesPage({ params }: { params: Promise<{ lang: string }> }) {
  // 解析params Promise
  const { lang } = await params;
  const t = await getTranslations('Courses');
  
  // 获取所有课程数据
  const courses = await getAllCourses();

  if (!courses || courses.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('currentCourses')}</h1>
        <p className="text-neutral-600 dark:text-neutral-400">No courses found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
        {t('currentCourses')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/${lang}/current-courses/${course.id}`}
            className="group block h-full"
          >
            <div className="h-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors line-clamp-2">
                {course.title[lang as keyof typeof course.title]}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow line-clamp-3">
                {course.description[lang as keyof typeof course.description]}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {course.period}
                </div>
                <span className="text-sm text-primary font-medium">
                  {t('viewCourse')} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 