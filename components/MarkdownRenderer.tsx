'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';
import type { ReactNode } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';
import { useEffect } from 'react';
import Image from 'next/image';

// 添加字体声明
const jetBrainsMonoStyle = `
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/fonts/JetBrainsMono-VariableFont_wght.ttf') format('truetype-variations');
    font-weight: 100 800;
    font-style: normal;
  }
`;

interface MarkdownRendererProps {
  content: string;
}

interface ComponentProps {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  title?: string;
  dir?: string;
  lang?: string;
  onClick?: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

interface ImageProps extends ComponentProps {
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

const components: Components = {
  h1: ({ children, ...props }: ComponentProps) => (
    <h1 className="text-2xl md:text-3xl font-bold mt-0 mb-6 text-neutral-900 dark:text-neutral-50" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ComponentProps) => (
    <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-neutral-900 dark:text-neutral-100" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ComponentProps) => (
    <h3 className="text-lg md:text-xl font-bold mt-6 mb-3 text-neutral-900 dark:text-neutral-200" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ComponentProps) => (
    <p className="my-4 leading-relaxed text-sm md:text-base text-neutral-800 dark:text-neutral-300" {...props}>
      {children}
    </p>
  ),
  img: ({ 
    src, 
    alt, 
    width, 
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */ 
    className, 
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */ 
    ...props 
  }: ImageProps) => {
    if (!src) return null;
    
    // 处理图片路径
    const imageSrc = src.startsWith('/images/') ? src : src;
    
    // 计算宽度百分比
    const widthPercent = typeof width === 'string' && width.includes('%') 
      ? parseInt(width.replace('%', '')) 
      : 80; // 默认80%宽度
    
    // 转换为像素值 (基于容器宽度)
    const pixelWidth = 1200; // 最大宽度，会根据容器自动缩放
    
    return (
      <div className="my-6 w-full flex justify-center">
        <div className="w-full" style={{ maxWidth: `${widthPercent}%` }}>
          <Image
            src={imageSrc}
            alt={alt || ''}
            width={pixelWidth}
            height={0} // 高度自动计算，保持原始比例
            style={{ 
              width: '100%',
              height: 'auto',
              borderRadius: '0.5rem', // 8px
              maxWidth: '100%'
            }}
            className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:shadow-neutral-900"
            onError={(e) => {
              console.error('Image failed to load:', {
                original: src,
                processed: imageSrc
              });
              const target = e.currentTarget;
              target.style.border = '1px dashed #4B5563';
              target.style.backgroundColor = '#1F2937';
            }}
          />
        </div>
        {alt && (
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400 mt-2 w-full">{alt}</p>
        )}
      </div>
    );
  },
  div: ({ className, children, ...props }: ComponentProps) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  strong: ({ children, ...props }: ComponentProps) => (
    <strong className="font-bold text-neutral-900 dark:text-neutral-50" {...props}>
      {children}
    </strong>
  ),
  ul: ({ children, ...props }: ComponentProps) => (
    <ul className="list-disc pl-6 my-4 text-sm md:text-base text-neutral-800 dark:text-neutral-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentProps) => (
    <ol className="list-decimal pl-6 my-4 text-sm md:text-base text-neutral-800 dark:text-neutral-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentProps) => (
    <li className="my-1 text-sm md:text-base" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentProps) => (
    <blockquote className="border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 my-4 italic text-neutral-700 dark:text-neutral-300" {...props}>
      {children}
    </blockquote>
  ),
  hr: ({ ...props }: ComponentProps) => (
    <hr className="my-8 border-t border-neutral-200 dark:border-neutral-800" {...props} />
  ),
  a: ({ children, href, ...props }: ComponentProps & { href?: string }) => (
    <a
      href={href}
      className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100 transition-colors duration-200 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, className, ...props }: ComponentProps) => {
    const isInline = !className;
    const language = className ? className.replace('language-', '') : '';
    
    if (isInline) {
      return (
        <code className="text-neutral-100 rounded px-1 py-0.5 text-sm bg-neutral-800 font-['JetBrains_Mono']" {...props}>
          {children}
        </code>
      );
    }

    let highlightedCode = children;
    if (language && hljs.getLanguage(language)) {
      try {
        highlightedCode = hljs.highlight(children as string, {
          language,
          ignoreIllegals: true
        }).value;
      } catch (error) {
        console.warn('Failed to highlight code block:', error);
      }
    }

    return (
      <code 
        className={`block text-neutral-100 text-sm whitespace-pre-wrap font-['JetBrains_Mono'] hljs ${language} rounded-lg`} 
        dangerouslySetInnerHTML={{ __html: highlightedCode as string }}
        {...props}
      />
    );
  },
  pre: ({ children, ...props }: ComponentProps) => (
    <pre 
      className="bg-neutral-900 rounded-lg p-4 my-4 overflow-x-auto font-['JetBrains_Mono']" 
      style={{ 
        tabSize: 2,
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
      }} 
      {...props}
    >
      {children}
    </pre>
  ),
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  useEffect(() => {
    hljs.configure({
      ignoreUnescapedHTML: true,
      throwUnescapedHTML: false,
    });
  }, []);

  return (
    <>
      <style jsx global>{jetBrainsMonoStyle}</style>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownRenderer; 