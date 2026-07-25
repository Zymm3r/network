import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';

export function GenericSection({ title, content }: MarkdownSectionProps) {
  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
      {title && (
        <CardHeader className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 py-4 px-6">
          <CardTitle className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        <article className="prose prose-slate dark:prose-invert prose-sm sm:prose-base max-w-none
          prose-headings:font-bold prose-headings:border-b prose-headings:border-slate-100 dark:prose-headings:border-slate-800 prose-headings:pb-2 prose-headings:mb-4
          prose-h3:text-base prose-h3:mt-6
          prose-p:leading-relaxed
          prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
          prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-700 dark:prose-code:text-indigo-300 prose-code:text-sm
          prose-ol:list-decimal prose-ul:list-disc">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </CardContent>
    </Card>
  );
}
