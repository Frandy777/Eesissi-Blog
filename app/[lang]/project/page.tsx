'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ProjectCard {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  order: number;
}

export default function ProjectPage() {
  const { lang } = useParams();
  const t = useTranslations('Projects');
  const [projects, setProjects] = useState<ProjectCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log('Fetched projects:', data);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-500">Error: {error}</h1>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('projects')}</h1>
        <p className="text-neutral-600 dark:text-neutral-400">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-100">
        {t('projects')}
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
                  {t('viewProject')} →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 