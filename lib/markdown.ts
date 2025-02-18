import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  author: string;
  slug: string;
  cover?: string;
  tags?: string[];
  status?: string;
}

export interface Post extends PostMeta {
  content: string;
}

export async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  try {
    const response = await fetch(`/api/markdown?slug=${slug}&locale=${locale}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(locale: string): Promise<PostMeta[]> {
  try {
    const response = await fetch(`/api/posts?locale=${locale}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
} 
