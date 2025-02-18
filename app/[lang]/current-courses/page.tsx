'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface CourseCard {
  id: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  period: string;
}

export default function CoursesPage() {
  const { lang } = useParams();
  const t = useTranslations('Courses');
  const [courses, setCourses] = useState<CourseCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
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