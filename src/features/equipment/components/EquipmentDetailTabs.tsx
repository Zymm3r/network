import { useState, useMemo } from 'react';
import { ProductDetailData } from '../types/product';
import { FileText, HelpCircle, Wrench, GraduationCap, Info, CircuitBoard, X, Loader2 } from 'lucide-react';
import { WiringSimulator } from './WiringSimulator';
import { KalturaPlayer } from '../../../app/components/KalturaPlayer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useI18n } from '../../../app/i18n';

interface EquipmentDetailTabsProps {
  data: ProductDetailData;
  isLoading?: boolean;
  error?: Error | null;
}

export function EquipmentDetailTabs({ data, isLoading = false, error = null }: EquipmentDetailTabsProps) {
  const { t, language } = useI18n();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Defensive: never let a single malformed record crash the whole tab.
  const safeArray = <T,>(arr: T[] | null | undefined): T[] => Array.isArray(arr) ? arr : [];

  const documents             = safeArray(data.documents);
  const faqs                  = safeArray(data.faqs);
  const troubleshootingGuides = safeArray(data.troubleshooting_guides);
  const trainingCourses       = safeArray(data.training_courses);

  const tabs = useMemo(() => ([
    { id: 'overview',       label: t.equipmentCatalog.overviewTab,         icon: Info },
    { id: 'simulator',      label: t.equipmentCatalog.wiringTab, icon: CircuitBoard },
    { id: 'documents',      label: t.equipmentCatalog.documentsTab,        icon: FileText,    count: documents.length },
    { id: 'faq',            label: t.equipmentCatalog.faqTab,              icon: HelpCircle,  count: faqs.length },
    { id: 'troubleshooting',label: t.equipmentCatalog.troubleTab,  icon: Wrench,      count: troubleshootingGuides.length },
    { id: 'training',       label: t.equipmentCatalog.trainingTab,         icon: GraduationCap, count: trainingCourses.length },
  ]), [documents.length, faqs.length, troubleshootingGuides.length, trainingCourses.length, t]);


  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col relative">
      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50">
              <h3 className="text-white font-semibold">{t.equipmentCatalog.trainingMediaModal}</h3>
              <button 
                onClick={() => setSelectedVideo(null)}
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
      <div className="flex flex-wrap gap-2 border-b border-slate-100 px-6 py-4 bg-slate-50/80 backdrop-blur-sm">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
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
                <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
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
          <div className="flex items-center gap-3 text-slate-500 text-sm py-6">
            <Loader2 className="animate-spin" size={18} />
            {t.equipmentCatalog.loading}
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-sm">
            <div className="font-bold mb-1">{t.equipmentCatalog.errorLoading}</div>
            <div className="opacity-80">{error.message}</div>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">{t.equipmentCatalog.detailsTitle}</h3>
              <div className="prose prose-slate prose-sm sm:prose-base max-w-none
                prose-headings:text-slate-800 prose-headings:font-bold prose-headings:border-b prose-headings:border-slate-100 prose-headings:pb-2 prose-headings:mb-4
                prose-h2:text-lg prose-h2:mt-8
                prose-h3:text-base prose-h3:mt-6
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600
                prose-strong:text-slate-800 prose-strong:font-semibold
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-700 prose-code:text-sm
                prose-ol:list-decimal prose-ul:list-disc">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {data.product?.content || data.product?.description || t.equipmentCatalog.noDescription}
                </ReactMarkdown>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
               <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                  <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wide">{t.equipmentCatalog.categoryLabel}</div>
                  <div className="font-medium text-slate-800">{data.product?.category || "-"}</div>
               </div>
               <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                  <div className="text-sm font-semibold text-indigo-500 mb-2 uppercase tracking-wide">{t.equipmentCatalog.sourceLabel}</div>
                  {data.product?.source_url ? (
                    <a href={data.product.source_url} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-700 hover:underline break-all inline-flex items-center gap-1">
                      {t.equipmentCatalog.dealerLink}
                    </a>
                  ) : (
                    <span className="text-slate-500">-</span>
                  )}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'simulator' && (
          <WiringSimulator 
            productName={data.product?.name || t.equipmentCatalog.defaultDeviceName} 
            productCategory={data.product?.category || ''}
          />
        )}

        {activeTab === 'documents' && (
          <div className="">
            {data.documents?.length > 0 ? (
              <ul className="grid gap-4 sm:grid-cols-2">
                {data.documents.map(doc => (
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

        {activeTab === 'faq' && (
          <div className="">
            {data.faqs?.length > 0 ? (
              <div className="space-y-4">
                {data.faqs.map(faq => (
                  <div key={faq.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all">
                    <h4 className="font-bold text-slate-800 flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">Q</span>
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

        {activeTab === 'troubleshooting' && (
          <div className="">
            {data.troubleshooting_guides?.length > 0 ? (
              <div className="space-y-6">
                {data.troubleshooting_guides.map(guide => (
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

        {activeTab === 'training' && (
          <div className="">
            {data.training_courses?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {data.training_courses.map(course => (
                  <div key={course.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-5">
                      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <GraduationCap size={28} />
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider rounded-full border border-amber-200 shadow-sm">
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
                            onClick={() => {
                              if (lesson.video_url) {
                                setSelectedVideo(lesson.video_url);
                              } else {
                                alert(t.equipmentCatalog.noVideoAlert);
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