import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { TuitionPost } from '@/lib/api/types';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

interface TuitionPostCardProps {
  post: TuitionPost;
  action?: React.ReactNode;
}

export function TuitionPostCard({ post, action }: TuitionPostCardProps) {
  return (
    <Card className="p-6 hover:shadow-card transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-lg mb-1">{post.grade}</h3>
          {post.parentName && (
            <p className="text-sm text-muted-foreground">Posted by {post.parentName}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <StatusBadge status={post.mode} type="mode" />
          <StatusBadge status={post.status} type="post" />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.subjects.map((subject) => (
          <Badge key={subject} variant="secondary" className="text-xs">
            {subject}
          </Badge>
        ))}
      </div>

      <div className="space-y-2 text-sm text-muted-foreground mb-4">
        {post.area && (
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{post.area}</span>
          </div>
        )}
        {post.schedule && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{post.schedule}</span>
          </div>
        )}
        {(post.budgetMin || post.budgetMax) && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              ৳{post.budgetMin || 0} - ৳{post.budgetMax || 0}/hr
            </span>
          </div>
        )}
      </div>

      {post.note && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {post.note}
        </p>
      )}

      {action && <div className="pt-4 border-t">{action}</div>}
    </Card>
  );
}
