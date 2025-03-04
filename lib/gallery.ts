import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 从文件系统获取画廊内容
 * @param locale 语言代码
 * @returns 画廊内容
 */
export async function getGalleryContent(locale: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'content', 'gallery', locale, 'gallery.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch (error) {
    console.error('Error reading gallery file:', error);
    throw new Error('Gallery not found');
  }
} 