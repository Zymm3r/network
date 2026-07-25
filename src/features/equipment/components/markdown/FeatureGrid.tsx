import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';
import { Star, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function FeatureGrid({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.features || 'Features';

  const components = {
    ul: ({ node, ...props }: any) => (
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-0 p-0 list-none" {...props} />
    ),
    li: ({ node, children, ...props }: any) => (
      <li className="flex items-start gap-3 bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-xl border border-amber-100/50 dark:border-amber-900/30" {...props}>
        <div className="mt-0.5 text-amber-500 shrink-0">
          <CheckCircle2 size={18} />
        </div>
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {children}
        </div>
      </li>
    ),
    p: ({ node, children, ...props }: any) => (
      <p className="text-slate-600 dark:text-slate-400 mb-6 last:mb-0" {...props}>{children}</p>
    )
  };

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-amber-100 dark:border-amber-900/50 shadow-sm">
      <CardHeader className="bg-amber-50/50 dark:bg-amber-900/20 border-b border-amber-100 dark:border-amber-900/50 py-4 px-6">
        <CardTitle className="text-lg font-bold text-amber-900 dark:text-amber-100 flex items-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-lg">
            <Star size={20} />
          </div>
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-slate dark:prose-invert max-w-none prose-strong:text-amber-900 dark:prose-strong:text-amber-100">
          <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  );
}
