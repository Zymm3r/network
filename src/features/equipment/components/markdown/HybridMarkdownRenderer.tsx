import React, { useMemo } from 'react';
import { OverviewCard } from './OverviewCard';
import { FeatureGrid } from './FeatureGrid';
import { ApplicationGrid } from './ApplicationGrid';
import { InstallationTimeline } from './InstallationTimeline';
import { BestPracticeChecklist } from './BestPracticeChecklist';
import { SummaryCard } from './SummaryCard';
import { GenericSection } from './GenericSection';
import { MarkdownSectionProps } from './types';

interface HybridMarkdownRendererProps {
  content?: string;
  documents?: any[];
}

export function HybridMarkdownRenderer({ content, documents = [] }: HybridMarkdownRendererProps) {
  const sections = useMemo(() => {
    if (!content) return [];

    // We split on `\n## ` but only if followed by one of our known section keywords
    // This allows Troubleshooting to have sub-headings like `## Power Issue` without breaking the split.
    const knownHeadings = [
      'Overview', 'Features', 'Applications', 'Installation Notes', 
      'Best Practices', 'Summary', 'Key Highlights', 'ภาพรวม', 'คุณสมบัติ', 
      'การนำไปใช้งาน', 'ข้อแนะนำการติดตั้ง', 'ข้อควรปฏิบัติที่ดี', 
      'สรุป'
    ];
    
    // Construct regex: \n##\s+(?=Overview|Features|...)
    const headingPattern = knownHeadings.join('|');
    const regex = new RegExp(`\\n##\\s+(?=${headingPattern})`, 'i');
    
    const parts = content.split(regex);
    
    const parsedSections: MarkdownSectionProps[] = [];
    
    // Process the very first part (could be text without heading, or an implicit Overview)
    if (parts[0].trim()) {
      if (content.trim().startsWith('##')) {
        const firstLineEnd = parts[0].indexOf('\n');
        const title = firstLineEnd !== -1 ? parts[0].substring(0, firstLineEnd).replace(/^##\s*/, '').trim() : parts[0].replace(/^##\s*/, '').trim();
        const body = firstLineEnd !== -1 ? parts[0].substring(firstLineEnd + 1).trim() : '';
        parsedSections.push({ title, content: body });
      } else {
        parsedSections.push({ title: 'Overview', content: parts[0].trim() });
      }
    }
    
    // Process remaining parts
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const firstLineEnd = part.indexOf('\n');
      let title = '';
      let body = '';
      
      if (firstLineEnd !== -1) {
        title = part.substring(0, firstLineEnd).trim();
        body = part.substring(firstLineEnd + 1).trim();
      } else {
        title = part.trim();
      }
      
      if (title.endsWith(':')) {
        title = title.substring(0, title.length - 1).trim();
      }
      
      if (title || body) {
        parsedSections.push({ title, content: body });
      }
    }
    
    return parsedSections;
  }, [content]);

  if (!sections.length) {
    return <div className="text-slate-500 text-sm">No content available.</div>;
  }

  return (
    <div className="space-y-8">
      {sections.map((section, idx) => {
        const t = section.title.toLowerCase();
        
        if (t.includes('overview') || t.includes('ภาพรวม')) {
          return <OverviewCard key={idx} {...section} />;
        }
        if (t.includes('features') || t.includes('คุณสมบัติ')) {
          return <FeatureGrid key={idx} {...section} />;
        }
        if (t.includes('application') || t.includes('การนำไปใช้งาน')) {
          return <ApplicationGrid key={idx} {...section} />;
        }
        if (t.includes('installation') || t.includes('ข้อแนะนำการติดตั้ง')) {
          return <InstallationTimeline key={idx} {...section} />;
        }
        if (t.includes('best practice') || t.includes('ข้อควรปฏิบัติ')) {
          return <BestPracticeChecklist key={idx} {...section} />;
        }
        if (t.includes('summary') || t.includes('สรุป') || t.includes('highlight')) {
          return <SummaryCard key={idx} {...section} />;
        }
        
        return <GenericSection key={idx} {...section} />;
      })}
    </div>
  );
}
