import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Info, 
  Star, 
  Target, 
  Wrench, 
  ThumbsUp, 
  AlertTriangle, 
  GraduationCap, 
  FileText, 
  Zap,
  HelpCircle,
  LucideIcon
} from 'lucide-react';

interface Section {
  title: string;
  content: string;
}

interface EquipmentMarkdownRendererProps {
  content?: string;
}

const SECTION_CONFIG: Record<string, { icon: LucideIcon; color: string; bgColor: string }> = {
  overview: { icon: Info, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  features: { icon: Star, color: 'text-amber-500', bgColor: 'bg-amber-50' },
  applications: { icon: Target, color: 'text-rose-500', bgColor: 'bg-rose-50' },
  'installation notes': { icon: Wrench, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  'best practices': { icon: ThumbsUp, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  troubleshooting: { icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-50' },
  training: { icon: GraduationCap, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  summary: { icon: FileText, color: 'text-slate-600', bgColor: 'bg-slate-100' },
  'key highlights': { icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
};

function getSectionConfig(title: string) {
  const normalizedTitle = title.toLowerCase().trim();
  // Try exact match
  if (SECTION_CONFIG[normalizedTitle]) return SECTION_CONFIG[normalizedTitle];
  // Try partial match
  for (const [key, config] of Object.entries(SECTION_CONFIG)) {
    if (normalizedTitle.includes(key)) {
      return config;
    }
  }
  // Default
  return { icon: HelpCircle, color: 'text-slate-500', bgColor: 'bg-slate-100' };
}

export function EquipmentMarkdownRenderer({ content }: EquipmentMarkdownRendererProps) {
  const sections = useMemo(() => {
    if (!content) return [];

    // The markdown template has standard structure like "##Overview" or "## Overview"
    const parts = content.split(/\n##\s*/);
    
    const parsedSections: Section[] = [];
    
    if (parts[0].trim()) {
      if (content.trim().startsWith('##')) {
         const firstLineEnd = parts[0].indexOf('\n');
         const title = firstLineEnd !== -1 ? parts[0].substring(0, firstLineEnd).trim() : parts[0].trim();
         const body = firstLineEnd !== -1 ? parts[0].substring(firstLineEnd + 1).trim() : '';
         parsedSections.push({ title, content: body });
      } else {
        parsedSections.push({ title: 'Overview', content: parts[0].trim() });
      }
    }
    
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
    <div className="space-y-6">
      {sections.map((section, idx) => {
        const { icon: Icon, color, bgColor } = getSectionConfig(section.title);
        
        return (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 m-0">{section.title}</h3>
            </div>
            
            <div className="p-6">
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none
                prose-headings:text-slate-800 prose-headings:font-bold prose-headings:border-b prose-headings:border-slate-100 prose-headings:pb-2 prose-headings:mb-4
                prose-h3:text-base prose-h3:mt-6
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600
                prose-strong:text-slate-800 prose-strong:font-semibold
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-700 prose-code:text-sm
                prose-ol:list-decimal prose-ul:list-disc">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {section.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
