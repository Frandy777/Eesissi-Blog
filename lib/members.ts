import { join } from 'path';
import { readFile } from 'fs/promises';
import matter from 'gray-matter';

/**
 * 从文件系统获取团队成员内容
 * @param locale 语言代码
 * @returns 团队成员内容
 */
export async function getMembersContent(locale: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'content', 'members', locale, 'members.md');
    const fileContent = await readFile(fullPath, 'utf8');
    const { content } = matter(fileContent);
    return content;
  } catch (error) {
    console.error('Error reading members file:', error);
    throw new Error('Members not found');
  }
} 