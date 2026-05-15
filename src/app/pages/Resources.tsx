import { useI18n } from '../i18n';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ResourceCard } from '../components/resources/ResourceCard';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Wrench, BookMarked, FileText, Video, Link2, MapPin, Coffee } from 'lucide-react';
import type { Resource, ResourceType } from '../types';

const resourceCategories = [
  { key: 'all', label: 'ทั้งหมด', icon: null },
  { key: 'tool', label: 'เครื่องมือ', icon: Wrench },
  { key: 'tutorial', label: 'บทช่วยสอน', icon: BookMarked },
  { key: 'documentation', label: 'เอกสาร', icon: FileText },
  { key: 'video', label: 'วิดีโอ', icon: Video },
  { key: 'external_link', label: 'ลิงก์', icon: Link2 },
];

const mockLocalResources = [
  {
    id: 'local-1',
    name_th: 'ห้องสมุด ม.กรุงเทพ',
    name_en: 'Bangkok University Library',
    description_th: 'พื้นที่เรียนรู้ที่เหมาะสำหรับการศึกษา',
    description_en: 'Learning space suitable for study',
    resource_type: 'library' as ResourceType,
    address_th: 'กรุงเทพมหานคร',
    address_en: 'Bangkok',
  },
  {
    id: 'local-2',
    name_th: 'Co-working Space สยาม',
    name_en: 'Siam Co-working Space',
    description_th: 'พื้นที่ทำงานร่วมกันพร้อมอินเทอร์เน็ตความเร็วสูง',
    description_en: 'Co-working space with high-speed internet',
    resource_type: 'cafe' as ResourceType,
    address_th: 'กรุงเทพมหานคร',
    address_en: 'Bangkok',
  },
];

export function Resources() {
  const { t } = useI18n();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('resources')
          .select('*')
          .order('created_at', { ascending: false });

        if (selectedType !== 'all') {
          query = query.eq('resource_type', selectedType);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;
        setResources(data || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch resources'));
        setResources(mockLocalResources as any);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [selectedType]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">แหล่งเรียนรู้</h1>
        <p className="text-muted-foreground">เครื่องมือและแหล่งข้อมูลสำหรับการเรียนรู้การสร้างเครือข่าย</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {resourceCategories.map((cat) => (
          <Button
            key={cat.key}
            variant={selectedType === cat.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(cat.key as ResourceType | 'all')}
            className="gap-1.5"
          >
            {cat.icon && <cat.icon className="w-4 h-4" />}
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Local Study Spots */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">สถานที่เรียนรู้ใกล้คุณ</h3>
              <p className="text-sm text-muted-foreground mt-1">ห้องสมุดและ Co-working Space ที่เหมาะสำหรับการเรียนรู้</p>
              <div className="flex gap-2 mt-3">
                <div className="px-2 py-1 bg-amber-100 rounded text-xs text-amber-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> ห้องสมุด
                </div>
                <div className="px-2 py-1 bg-orange-100 rounded text-xs text-orange-800 flex items-center gap-1">
                  <Coffee className="w-3 h-3" /> Co-working
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-600 border border-red-100">
          {t.common.error}: {error.message}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : resources.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <Wrench className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ไม่พบแหล่งเรียนรู้</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
}