import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MarkdownSectionProps } from './types';
import { Card, CardContent } from '../../../../app/lib/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { useI18n } from '../../../../app/i18n';

export function SummaryCard({ title, content }: MarkdownSectionProps) {
  const { t } = useI18n();
  const displayTitle = title || t.equipmentCatalog.markdownSections?.summary || 'Summary';

  return (
    <Card className="overflow-hidden bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-900 shadow-md">
      <CardContent className="p-8 relative">
        <div className="absolute top-0 right-0 p-8 text-sky-200 dark:text-sky-900/40 pointer-events-none">
          <Lightbulb size={120} />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-sky-900 dark:text-sky-100 mb-4 flex items-center gap-3">
            <Lightbulb className="text-sky-500" size={24} />
            {displayTitle}
          </h3>
          
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-3xl
            prose-p:leading-relaxed prose-p:text-sky-900 dark:prose-p:text-sky-100
            prose-strong:text-sky-950 dark:prose-strong:text-white prose-strong:font-bold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
