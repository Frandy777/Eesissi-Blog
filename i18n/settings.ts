export const locales = ['en', 'zh'] as const;
export type Locale = typeof locales[number];

export const defaultLocale = 'zh' as const;

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const locale = segments[1] as Locale;
  return locales.includes(locale) ? locale : null;
} 