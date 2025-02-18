'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Post, getPostBySlug } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useTranslations } from 'next-intl';

export default function PublicationPage() {
  const { slug, lang } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const t = useTranslations('Common');

  useEffect(() => {
    async function loadPost() {
      if (typeof slug === 'string' && typeof lang === 'string') {
        const postData = await getPostBySlug(slug, lang);
        setPost(postData);
      }
    }
    loadPost();
  }, [slug, lang]);

  if (!post) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600 dark:text-gray-400">
          <time dateTime={post.date}>
            {t('published')}: {new Date(post.date).toLocaleDateString()}
          </time>
          <span className="mx-2">•</span>
          <span>{t('author')}: {post.author}</span>
        </div>
      </header>
      <MarkdownRenderer content={post.content} />
    </div>
  );
} 