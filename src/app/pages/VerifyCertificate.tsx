import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { certificateApi } from '../lib/api/certificates';
import { useI18n } from '../i18n';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CheckCircle2, XCircle, Award, Calendar, Hash, ArrowLeft, Download } from 'lucide-react';

export function VerifyCertificate() {
  const { certificateNumber } = useParams();
  const { language, t } = useI18n();
  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<any>(null);

  useEffect(() => {
    const verify = async () => {
      if (!certificateNumber) return;
      try {
        setLoading(true);
        const data = await certificateApi.verify(certificateNumber);
        setCertificate(data);
      } catch (err) {
        console.error('Failed to verify certificate', err);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [certificateNumber]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500">
          {t.verifyCert.verifying}
        </p>
      </div>
    );
  }

  const isVerified = !!certificate;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.verifyCert.backToHome}
      </Link>

      <Card className="overflow-hidden border-slate-200 shadow-md">
        <div className={`h-2 ${isVerified ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            {isVerified ? (
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            {isVerified ? t.verifyCert.validTitle : t.verifyCert.invalidTitle}
          </CardTitle>
          <CardDescription className="text-base text-slate-600 mt-2">
            {isVerified ? t.verifyCert.validDesc : t.verifyCert.invalidDesc}
          </CardDescription>
        </CardHeader>
        
        {isVerified && (
          <CardContent className="px-8 py-6">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Award className="w-48 h-48" />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-4 h-4" />
                    {t.verifyCert.certNumber}
                  </p>
                  <p className="text-lg font-mono font-semibold text-slate-800">
                    {certificate.certificate_number}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {t.verifyCert.issueDate}
                  </p>
                  <p className="text-lg font-medium text-slate-800">
                    {(() => {
                      const localeMap = { th: 'th-TH', en: 'en-US' } as const;
                      return new Date(certificate.issued_at).toLocaleDateString(localeMap[language], {
                        day: 'numeric', month: 'long', year: 'numeric'
                      });
                    })()}
                  </p>
                </div>

                <div className="space-y-1 sm:col-span-2 pt-4 border-t border-slate-200/60">
                  <p className="text-sm font-medium text-slate-500">
                    {t.verifyCert.awardedTo}
                  </p>
                  <p className="text-xl font-bold text-slate-800">
                    {certificate.auth?.users?.raw_user_meta_data?.full_name || certificate.user_id}
                  </p>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <p className="text-sm font-medium text-slate-500">
                    {t.verifyCert.forCompleting}
                  </p>
                  <p className="text-xl font-bold text-indigo-700">
                    {certificate.courses ? (certificate.courses[`name_${language}` as 'name_th' | 'name_en'] || certificate.courses.name_th || certificate.courses.name_en) : ''}
                    {certificate.learning_paths ? (certificate.learning_paths[`name_${language}` as 'name_th' | 'name_en'] || certificate.learning_paths.name_th || certificate.learning_paths.name_en) : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" disabled>
                <Download className="w-4 h-4 mr-2" />
                {t.verifyCert.downloadPdf}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
