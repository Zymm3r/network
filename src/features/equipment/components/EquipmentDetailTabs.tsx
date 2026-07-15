import { useState, useMemo, useEffect } from 'react';
import { ProductDetailData } from '../types/product';
import { FileText, HelpCircle, Wrench, GraduationCap, Info, X } from 'lucide-react';
import { Skeleton } from '../../../app/lib/components/ui/skeleton';
import { KalturaPlayer } from '../../../app/lib/components/KalturaPlayer';
import ReactMarkdown from 'react-markdown';
import { HybridMarkdownRenderer } from './markdown/HybridMarkdownRenderer';
import remarkGfm from 'remark-gfm';
import { useI18n } from '../../../app/i18n';
import { toast } from 'sonner';

interface EquipmentDetailTabsProps {
  data: ProductDetailData;
  isLoading?: boolean;
  error?: Error | null;
}

export function EquipmentDetailTabs({ data, isLoading = false, error = null }: EquipmentDetailTabsProps) {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  // Defensive: never let a single malformed record crash the whole tab.
  const safeArray = <T,>(arr: T[] | null | undefined): T[] => Array.isArray(arr) ? arr : [];

  const documents = useMemo(() => {
    const arr = safeArray(data.documents);
    const seen = new Set();
    return arr.filter(d => {
      const isDup = seen.has(d.title);
      seen.add(d.title);
      return !isDup;
    });
  }, [data.documents]);

  const faqs = useMemo(() => {
    const arr = safeArray(data.faqs);
    const seen = new Set();
    return arr.filter(f => {
      const isDup = seen.has(f.question);
      seen.add(f.question);
      return !isDup;
    });
  }, [data.faqs]);

  const troubleshootingGuides = useMemo(() => {
    const arr = safeArray(data.troubleshooting_guides);
    const seen = new Set();
    return arr.filter(t => {
      const isDup = seen.has(t.issue);
      seen.add(t.issue);
      return !isDup;
    });
  }, [data.troubleshooting_guides]);

  const trainingCourses = useMemo(() => {
    const arr = safeArray(data.training_courses);
    const sorted = [...arr].sort((a, b) => {
      const aHasMedia = (a.training_lessons && a.training_lessons.length > 0) || a.video_url ? 1 : 0;
      const bHasMedia = (b.training_lessons && b.training_lessons.length > 0) || b.video_url ? 1 : 0;
      return bHasMedia - aHasMedia;
    });

    const seen = new Set();
    return sorted.filter(c => {
      // Use clean string for deduplication in case of minor whitespace differences
      const normalizedTitle = (c.title || '').trim().toLowerCase();
      const isDup = seen.has(normalizedTitle);
      seen.add(normalizedTitle);
      return !isDup;
    });
  }, [data.training_courses]);

  const tabs = useMemo(() => ([
    { id: 'overview',       label: t.equipmentCatalog.overviewTab,         icon: Info },
    { id: 'documents',      label: t.equipmentCatalog.documentsTab,        icon: FileText,    count: documents.length },
    { id: 'faq',            label: t.equipmentCatalog.faqTab,              icon: HelpCircle,  count: faqs.length },
    { id: 'troubleshooting',label: t.equipmentCatalog.troubleTab,  icon: Wrench,      count: troubleshootingGuides.length },
    { id: 'training',       label: t.equipmentCatalog.trainingTab,         icon: GraduationCap, count: trainingCourses.length },
  ]), [documents.length, faqs.length, troubleshootingGuides.length, trainingCourses.length, t]);


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col relative">
      {/* Video Modal */}
      {selectedVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.equipmentCatalog.trainingMediaModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-white font-semibold">{t.equipmentCatalog.trainingMediaModal}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                aria-label="Close"
                className="text-slate-400 hover:text-white p-1 bg-slate-800 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="aspect-video bg-black w-full">
              <KalturaPlayer
                source={{ url: selectedVideo }}
                enforceNoSkip={true}
                showLockIndicator={true}
                onComplete={() => console.log('[Training] Video completed!')}
                onProgress={(p) => console.log(`[Training] Progress: ${p}%`)}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-slate-100 px-6 py-4 bg-slate-50/80 backdrop-blur-sm">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all duration-200 transform active:scale-95 ${
                isActive
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-indigo-600 hover:border-indigo-300'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                  isActive ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 min-h-[400px]">
        {isLoading && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
              <Skeleton className="h-10 w-32 rounded-xl" />
            </div>
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-sm">
            <div className="font-bold mb-1">{t.equipmentCatalog.errorLoading || 'Error Loading Data'}</div>
            <div className="opacity-80">{error.message}</div>
          </div>
        )}

        {!isLoading && !error && activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">{t.equipmentCatalog.detailsTitle}</h3>
              <div className="mt-4">
                <HybridMarkdownRenderer 
                  content={data.product?.content || data.product?.description || t.equipmentCatalog.noDescription}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
               <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">{t.equipmentCatalog.categoryLabel}</div>
                  <div className="font-medium text-slate-800">
                    {(t.equipmentCatalog as any).categoryMap?.[data.product?.category || ''] || data.product?.category || "-"}
                  </div>
               </div>
               <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <div className="text-sm font-semibold text-indigo-500 mb-2 uppercase tracking-wide">{t.equipmentCatalog.sourceLabel}</div>
                  {data.product?.source_url ? (
                    <a href={data.product.source_url} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 hover:underline break-all inline-flex items-center gap-1">
                      {(t.equipmentCatalog as any).sourceMap?.[data.product?.source || ''] || data.product?.source || t.equipmentCatalog.dealerLink}
                    </a>
                  ) : (
                    <span className="text-slate-500">
                      {(t.equipmentCatalog as any).sourceMap?.[data.product?.source || ''] || data.product?.source || "-"}
                    </span>
                  )}
               </div>
            </div>
          </div>
        )}

        {!isLoading && !error && activeTab === 'documents' && (
          <div className="">
            {documents.filter(d => ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(d.mime_type)).length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {documents.filter(d => ['application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(d.mime_type)).map(doc => (
                  <li key={doc.id} className="flex flex-col justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all group">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 line-clamp-2 leading-snug">{doc.title}</div>
                        <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md inline-block uppercase tracking-wider font-bold mt-2">{doc.document_type}</div>
                      </div>
                    </div>
                    <div className="mt-2">
                      {doc.file_url ? (
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="w-full inline-block px-4 py-2.5 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white text-center transition-colors">
                          {t.equipmentCatalog.downloadDoc}
                        </a>
                      ) : (
                        <span className="w-full inline-block px-4 py-2.5 text-sm font-bold text-slate-400 bg-slate-100 rounded-lg text-center cursor-not-allowed">
                          {t.equipmentCatalog.noFileAvailable}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-5">
                  <FileText className="text-slate-300" size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.equipmentCatalog.noDocs}</h3>
                <p className="mt-2 text-slate-500 max-w-sm mx-auto">{t.equipmentCatalog.noDocsDesc}</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && activeTab === 'faq' && (
          <div className="">
            {faqs.length > 0 ? (
              <div className="space-y-4">
                {faqs.map(faq => (
                  <div key={faq.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                    <h4 className="font-bold text-slate-800 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">Q</span>
                      <span className="mt-0.5 text-lg leading-snug">{faq.question}</span>
                    </h4>
                    <div className="mt-4 pl-10">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-5">
                  <HelpCircle className="text-slate-300" size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.equipmentCatalog.noFaq}</h3>
                <p className="mt-2 text-slate-500 max-w-sm mx-auto">{t.equipmentCatalog.noFaqDesc}</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && activeTab === 'troubleshooting' && (
          <div className="">
            {troubleshootingGuides.length > 0 ? (
              <div className="space-y-6">
                {troubleshootingGuides.map(guide => (
                  <div key={guide.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-rose-50 px-6 py-4 border-b border-rose-100 flex items-center gap-3">
                      <div className="bg-rose-200 p-2 rounded-lg"><Wrench className="text-rose-700" size={20} /></div>
                      <h4 className="font-bold text-lg text-rose-900">{t.equipmentCatalog.problemPrefix}{guide.issue}</h4>
                    </div>
                    <div className="p-6 grid sm:grid-cols-2 gap-6">
                      <div className="bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
                        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">{t.equipmentCatalog.symptomsTitle}</div>
                        <div className="p-4 text-slate-700 text-sm leading-relaxed">{guide.symptoms}</div>
                      </div>
                      <div className="bg-emerald-50 rounded-xl border border-emerald-100 overflow-hidden">
                        <div className="bg-emerald-100 px-4 py-2 border-b border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.equipmentCatalog.solutionTitle}</div>
                        <div className="p-4 text-emerald-800 text-sm leading-relaxed">{guide.solution}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-5">
                  <Wrench className="text-slate-300" size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.equipmentCatalog.noTroubleshooting}</h3>
                <p className="mt-2 text-slate-500 max-w-sm mx-auto">{t.equipmentCatalog.noTroubleshootingDesc}</p>
              </div>
            )}
          </div>
        )}

        {!isLoading && !error && activeTab === 'training' && (
          <div className="">
            {trainingCourses.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {trainingCourses.map(course => (
                  <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <GraduationCap size={28} />
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider rounded-full border border-amber-200 shadow-sm">
                        {course.difficulty === 'Beginner' ? t.courses.beginner : course.difficulty === 'Intermediate' ? t.courses.intermediate : course.difficulty === 'Advanced' ? t.courses.advanced : (course.difficulty || 'Beginner')}
                      </span>
                    </div>
                    <h4 className="font-bold text-xl text-slate-800 mb-3 leading-snug">{course.title}</h4>
                    <p className="text-sm text-slate-500 mb-8 line-clamp-3 leading-relaxed flex-1">{course.description}</p>
                    {course.training_lessons && course.training_lessons.length > 0 ? (
                      <div className="space-y-2 mt-4">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.equipmentCatalog.lessonsTitle.replace('{count}', String(course.training_lessons.length))}</div>
                        {course.training_lessons.sort((a, b) => a.lesson_order - b.lesson_order).map(lesson => (
                          <button
                            key={lesson.id}
                            data-testid="lesson-card"
                            onClick={() => {
                              if (lesson.video_url) {
                                setSelectedVideo(lesson.video_url);
                              } else {
                                toast.error(t.equipmentCatalog.noVideoAlert);
                              }
                            }}
                            className="w-full py-2.5 px-4 bg-indigo-50 text-indigo-700 font-semibold text-sm rounded-lg hover:bg-indigo-600 hover:text-white hover:shadow-md transition-all active:scale-95 flex items-center justify-between group"
                          >
                            <span className="truncate pr-2">{lesson.lesson_order}. {lesson.title}</span>
                            <span className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <>
                        {course.video_url ? (
                          <button
                            data-testid="lesson-card"
                            onClick={() => setSelectedVideo(course.video_url!)}
                            className="w-full py-3 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                            {t.equipmentCatalog.watchLessonBtn}
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full py-3 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            {t.equipmentCatalog.noVideoAvailable}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-5">
                  <GraduationCap className="text-slate-300" size={40} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">{t.equipmentCatalog.noTrainingMedia}</h3>
                <p className="mt-2 text-slate-500 max-w-sm mx-auto">{t.equipmentCatalog.noTrainingMediaDesc}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}