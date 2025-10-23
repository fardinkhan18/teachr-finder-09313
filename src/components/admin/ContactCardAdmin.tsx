import { ContactInfo } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, Mail, AlertTriangle } from 'lucide-react';

interface ContactCardAdminProps {
  contact: ContactInfo;
}

export function ContactCardAdmin({ contact }: ContactCardAdminProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>যোগাযোগের তথ্য</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            এই তথ্য শুধুমাত্র অ্যাডমিনের জন্য। গোপনীয়তা রক্ষা করুন।
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          {contact.phone && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">ফোন নম্বর</div>
                <div className="font-medium">{contact.phone}</div>
              </div>
            </div>
          )}

          {contact.email && (
            <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">ইমেইল</div>
                <div className="font-medium">{contact.email}</div>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          লগ: অ্যাক্সেস লগড - {new Date().toLocaleString('bn-BD')}
        </div>
      </CardContent>
    </Card>
  );
}
