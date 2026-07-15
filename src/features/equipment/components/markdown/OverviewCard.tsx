import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../app/lib/components/ui/card';
import { Info } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function OverviewCard({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.overview || 'Overview';

  return (
    <Card className="overflow-hidden bg-white dark:bg-slate-900 border-blue-100 dark:border-blue-900 shadow-sm">
      <CardHeader className="bg-blue-50/50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 py-5 px-6">
        <CardTitle className="text-xl font-bold text-blue-900 dark:text-blue-100 flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-lg">
            <Info size={24} />
          </div>
          {displayTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <article className="prose prose-slate dark:prose-invert prose-base sm:prose-lg max-w-none
          prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300
          prose-strong:text-slate-900 dark:prose-strong:text-slate-100 prose-strong:font-semibold">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </article>
      </CardContent>
    </Card>
  );
}
