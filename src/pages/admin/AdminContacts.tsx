import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ContactCardAdmin } from '@/components/admin/ContactCardAdmin';
import { useAdminContacts } from '@/features/admin/api';
import { Eye } from 'lucide-react';

export default function AdminContacts() {
  const [userScope, setUserScope] = useState<'user' | 'post'>('user');
  const [refId, setRefId] = useState('');
  const [viewingRefId, setViewingRefId] = useState('');

  const { data: contact, isLoading } = useAdminContacts(userScope, viewingRefId);

  const handleView = () => {
    setViewingRefId(refId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">যোগাযোগের তথ্য</h2>
        <p className="text-muted-foreground">ইউজার এবং পোস্টের যোগাযোগের তথ্য দেখুন</p>
      </div>

      <Tabs value={userScope} onValueChange={(v) => setUserScope(v as 'user' | 'post')}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="user">টিউটর যোগাযোগ</TabsTrigger>
          <TabsTrigger value="post">স্টুডেন্ট পোস্ট যোগাযোগ</TabsTrigger>
        </TabsList>

        <TabsContent value="user" className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>টিউটর আইডি দিয়ে খুঁজুন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="user-id">টিউটর আইডি</Label>
                <div className="flex gap-3">
                  <Input
                    id="user-id"
                    placeholder="যেমন: tutor-1"
                    value={refId}
                    onChange={e => setRefId(e.target.value)}
                  />
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleView}
                    disabled={!refId || isLoading}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    দেখুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="post" className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>পোস্ট আইডি দিয়ে খুঁজুন</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Label htmlFor="post-id">পোস্ট আইডি</Label>
                <div className="flex gap-3">
                  <Input
                    id="post-id"
                    placeholder="যেমন: post-1"
                    value={refId}
                    onChange={e => setRefId(e.target.value)}
                  />
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={handleView}
                    disabled={!refId || isLoading}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    দেখুন
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {contact && viewingRefId && (
        <ContactCardAdmin contact={contact} />
      )}
    </div>
  );
}
