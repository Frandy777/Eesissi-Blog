'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface GalleryData {
  content: string;
}

export default function GalleryPage() {
  const { lang } = useParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`/api/gallery?locale=${lang}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.content);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch gallery');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [lang]);

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

  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-2 pb-8">
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
} 