import { ExternalLink, MapPin, Wrench, BookMarked, FileText, Video, Link2 } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useI18n } from '../../../i18n';
import type { Resource } from '../../../types';
import { stripMarkdown } from '../../../utils/string';

interface ResourceCardProps {
  resource: Resource;
}

const resourceTypeIcons: Record<string, typeof Wrench> = {
  tool: Wrench,
  tutorial: BookMarked,
  documentation: FileText,
  video: Video,
  external_link: Link2,
};

const resourceTypeColors: Record<string, string> = {
  tool: 'bg-blue-100 text-blue-700 border-blue-200',
  tutorial: 'bg-green-100 text-green-700 border-green-200',
  documentation: 'bg-purple-100 text-purple-700 border-purple-200',
  video: 'bg-red-100 text-red-700 border-red-200',
  external_link: 'bg-orange-100 text-orange-700 border-orange-200',
};

const resourceLabelKeyMap: Record<string, string> = {
  tool: 'tools',
  tutorial: 'tutorials',
  documentation: 'documentation',
  video: 'videos',
  external_link: 'externalLinks',
  library: 'libraries',
  cafe: 'cafes',
};


export function ResourceCard({ resource }: ResourceCardProps) {
  const { language, t } = useI18n();

  const name = resource[`name_${language}` as 'name_th' | 'name_en'];
  const description = resource[`description_${language}` as 'description_th' | 'description_en'];
  const address = resource[`address_${language}` as 'address_th' | 'address_en'];

  const typeKey = resource.resource_type === 'library' || resource.resource_type === 'cafe'
    ? resource.resource_type
    : resource.resource_type;
  const Icon = resourceTypeIcons[resource.resource_type as keyof typeof resourceTypeIcons] || Wrench;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border-slate-100">
      <div className="aspect-video relative bg-gradient-to-br from-teal-50 to-cyan-50">
        {resource.image_url ? (
          <img
            src={resource.image_url}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
        )}
        <Badge
          className={`absolute top-3 right-3 ${resourceTypeColors[typeKey]} border`}
        >
          {t.resources[resourceLabelKeyMap[typeKey] as keyof typeof t.resources] || typeKey}
        </Badge>
      </div>

      <CardHeader className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2" title={stripMarkdown(description)}>
            {stripMarkdown(description)}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-2">
        {address && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{address}</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {resource.location ? (
          <Button asChild className="w-full group">
            <a href={resource.location} target="_blank" rel="noopener noreferrer">
              {t.common.open}
              <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        ) : (
          <Button className="w-full" variant="outline">
            {t.common.viewDetails}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}