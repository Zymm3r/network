import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';
import { Wrench } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function InstallationTimeline({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.installationNotes || 'Installation Notes';

  const components = {
    ol: ({ node, ...props }: any) => (
      <ol className="relative border-l-2 border-emerald-200 dark:border-emerald-900/50 ml-4 space-y-6 my-6 list-none p-0" style={{ counterReset: 'timeline' }} {...props} />
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="relative pl-8" style={{ counterIncrement: 'timeline' }} {...props}>
        <div className="absolute -left-[17px] flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full border-4 border-white dark:border-slate-900 text-emerald-600 dark:text-emerald-400 font-bold text-sm shadow-sm
          before:content-[counter(timeline)]">
        </div>
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 p-4 rounded-xl shadow-sm text-sm text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </li>
    ),
    p: ({ node, children, ...props }: any) => (
      <p className="m-0" {...props}>{children}</p>
    )
  };

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/50 shadow-sm">
      <CardHeader className="bg-emerald-50/50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900/50 py-4 px-6">
        <CardTitle className="text-lg font-bold text-emerald-900 dark:text-emerald-100 flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Wrench size={20} />
          </div>
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-strong:text-emerald-800 dark:prose-strong:text-emerald-200">
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
