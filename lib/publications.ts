import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 从文件系统获取出版物内容
 * @param locale 语言代码
 * @returns 出版物内容
 */
export async function getPublicationContent(locale: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'content', 'publication', locale, 'publication.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch (error) {
    console.error('Error reading publication file:', error);
    throw new Error('Publication not found');
  }
} 