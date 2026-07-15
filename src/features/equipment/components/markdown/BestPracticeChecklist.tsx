import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';
import { ThumbsUp, CheckSquare } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function BestPracticeChecklist({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.bestPractices || 'Best Practices';

  const components = {
    ul: ({ node, ...props }: any) => (
      <ul className="flex flex-col gap-3 m-0 p-0 list-none my-4" {...props} />
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/30 py-3 px-4 rounded-lg border border-slate-100 dark:border-slate-800" {...props}>
        <div className="mt-0.5 text-teal-500 shrink-0">
          <CheckSquare size={18} />
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {children}
        </div>
      </li>
    ),
    p: ({ node, children, ...props }: any) => (
      <p className="m-0 inline" {...props}>{children}</p>
    )
  };

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-teal-100 dark:border-teal-900/50 shadow-sm">
      <CardHeader className="bg-teal-50/50 dark:bg-teal-900/20 border-b border-teal-100 dark:border-teal-900/50 py-4 px-6">
        <CardTitle className="text-lg font-bold text-teal-900 dark:text-teal-100 flex items-center gap-3">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-lg">
            <ThumbsUp size={20} />
          </div>
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-strong:text-teal-900 dark:prose-strong:text-teal-100">
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
