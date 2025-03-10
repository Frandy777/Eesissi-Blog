import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

// 这个函数会在服务器端运行
export default getRequestConfig(async () => {
  const headersList = await headers();
  const locale = headersList.get('X-NEXT-INTL-LOCALE') ?? 'zh';
  
  // 验证语言设置
  if (locale !== 'en' && locale !== 'zh') {
    notFound();
  }

  return {
    messages: (await import(`../content/translations/${locale}.json`)).default,
    locale: locale,
    timeZone: 'Asia/Shanghai'
  };
}); 