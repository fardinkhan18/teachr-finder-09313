import { Badge } from '@/components/ui/badge';
import { VerifyStatus, PostStatus, AppStatus, Mode } from '@/lib/api/types';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: VerifyStatus | PostStatus | AppStatus | Mode;
  type: 'verify' | 'post' | 'app' | 'mode';
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  if (type === 'verify') {
    const verifyStatus = status as VerifyStatus;
    if (verifyStatus === 'APPROVED') {
      return (
        <Badge className="bg-approved/10 text-approved hover:bg-approved/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Verified
        </Badge>
      );
    }
    if (verifyStatus === 'PENDING') {
      return (
        <Badge className="bg-pending/10 text-pending hover:bg-pending/20">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    }
    return (
      <Badge className="bg-rejected/10 text-rejected hover:bg-rejected/20">
        <XCircle className="h-3 w-3 mr-1" />
        Rejected
      </Badge>
    );
  }

  if (type === 'post') {
    const postStatus = status as PostStatus;
    if (postStatus === 'OPEN') {
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Open</Badge>;
    }
    if (postStatus === 'ASSIGNED') {
      return <Badge className="bg-info/10 text-info hover:bg-info/20">Assigned</Badge>;
    }
    return <Badge variant="secondary">Closed</Badge>;
  }

  if (type === 'app') {
    const appStatus = status as AppStatus;
    if (appStatus === 'HIRED') {
      return <Badge className="bg-success/10 text-success hover:bg-success/20">Hired</Badge>;
    }
    if (appStatus === 'SHORTLISTED') {
      return <Badge className="bg-info/10 text-info hover:bg-info/20">Shortlisted</Badge>;
    }
    if (appStatus === 'REJECTED') {
      return <Badge className="bg-rejected/10 text-rejected hover:bg-rejected/20">Rejected</Badge>;
    }
    return <Badge variant="secondary">Applied</Badge>;
  }

  if (type === 'mode') {
    const mode = status as Mode;
    if (mode === 'ONLINE') {
      return <Badge variant="outline" className="border-primary text-primary">Online</Badge>;
    }
    if (mode === 'OFFLINE') {
      return <Badge variant="outline">Offline</Badge>;
    }
    return <Badge variant="outline" className="border-accent text-accent">Hybrid</Badge>;
  }

  return null;
}
