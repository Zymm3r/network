import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';
import { Target, Building2 } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function ApplicationGrid({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.applications || 'Applications';

  const components = {
    ul: ({ node, ...props }: any) => (
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-0 p-0 list-none my-6" {...props} />
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="flex flex-col gap-3 bg-rose-50/30 dark:bg-rose-900/10 p-5 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-center items-center justify-center transition-all hover:shadow-md hover:bg-rose-50/80 dark:hover:bg-rose-900/20" {...props}>
        <div className="p-3 bg-rose-100 dark:bg-rose-900/50 text-rose-500 rounded-full">
          <Building2 size={24} />
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-300 font-semibold">
          {children}
        </div>
      </li>
    ),
    p: ({ node, children, ...props }: any) => (
      <p className="text-slate-600 dark:text-slate-400" {...props}>{children}</p>
    )
  };

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-rose-100 dark:border-rose-900/50 shadow-sm">
      <CardHeader className="bg-rose-50/50 dark:bg-rose-900/20 border-b border-rose-100 dark:border-rose-900/50 py-4 px-6">
        <CardTitle className="text-lg font-bold text-rose-900 dark:text-rose-100 flex items-center gap-3">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-lg">
            <Target size={20} />
          </div>
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
