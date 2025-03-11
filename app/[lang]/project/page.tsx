import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { locales } from '@/i18n/settings';
import fs from 'fs/promises';
import path from 'path';

// 生成所有语言的静态路径
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

// 配置静态生成
export const dynamic = 'force-static';
export const revalidate = 86400; // 每天重新验证一次

// 直接从文件系统加载翻译文件
async function loadTranslations(locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'translations', `${locale}.json`);
    const fileContent = await fs.readFile(filePath, 'utf8');
    const translations = JSON.parse(fileContent);
    return translations.Projects; // 返回Projects命名空间的翻译
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    // 如果加载失败，返回空对象
    return {};
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string }> }) {
  // 解析params Promise
  const { lang } = await params;
  
  // 直接从文件系统加载翻译
  const translations = await loadTranslations(lang);
  
  // 获取所有项目数据
  const projects = await getAllProjects();

  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{translations.projects || 'Research Projects'}</h1>
        <p className="text-neutral-600 dark:text-neutral-400">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
        {translations.projects || 'Research Projects'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/${lang}/project/${project.id}`}
            className="group block h-full"
          >
            <div className="h-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-3 text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors line-clamp-2">
                {project.title[lang as keyof typeof project.title]}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 flex-grow line-clamp-3">
                {project.description[lang as keyof typeof project.description]}
              </p>
              <div className="flex items-center justify-end mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <span className="text-sm text-primary font-medium">
                  {translations.viewProject || 'View Project Details'} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 