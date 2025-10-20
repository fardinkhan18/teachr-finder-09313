import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { TutorFilters as Filters } from '@/lib/api/types';
import { Search, X } from 'lucide-react';

interface TutorFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const universities = ['RUET', 'BUET', 'DU', 'KUET'];
const departments = ['CSE', 'EEE', 'ME', 'CE', 'Physics', 'Math'];
const sessions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'ICT'];
const areas = ['Dhanmondi', 'Uttara', 'Mirpur', 'Banani', 'Mohammadpur', 'Gulshan', 'Bashundhara'];

export function TutorFilters({ filters, onFiltersChange }: TutorFiltersProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
  };

  const handleSearch = () => {
    onFiltersChange({ ...localFilters, page: 1 });
  };

  const handleReset = () => {
    const resetFilters: Filters = { page: 1, limit: filters.limit };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = Object.keys(localFilters).some(
    (key) => key !== 'page' && key !== 'limit' && localFilters[key as keyof Filters]
  );

  return (
    <Card className="p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="university">University</Label>
          <Select
            value={localFilters.university || ''}
            onValueChange={(v) => handleChange('university', v)}
          >
            <SelectTrigger id="university">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {universities.map((u) => (
                <SelectItem key={u} value={u}>
                  {u}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department">Department</Label>
          <Select
            value={localFilters.department || ''}
            onValueChange={(v) => handleChange('department', v)}
          >
            <SelectTrigger id="department">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="session">Session</Label>
          <Select
            value={localFilters.session || ''}
            onValueChange={(v) => handleChange('session', v)}
          >
            <SelectTrigger id="session">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {sessions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select
            value={localFilters.subject || ''}
            onValueChange={(v) => handleChange('subject', v)}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="area">Area</Label>
          <Select
            value={localFilters.area || ''}
            onValueChange={(v) => handleChange('area', v)}
          >
            <SelectTrigger id="area">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="mode">Mode</Label>
          <Select
            value={localFilters.mode || ''}
            onValueChange={(v) => handleChange('mode', v)}
          >
            <SelectTrigger id="mode">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ONLINE">Online</SelectItem>
              <SelectItem value="OFFLINE">Offline</SelectItem>
              <SelectItem value="HYBRID">Hybrid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="q">Search</Label>
          <Input
            id="q"
            placeholder="Search by name, subject, area..."
            value={localFilters.q || ''}
            onChange={(e) => handleChange('q', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button onClick={handleSearch} size="sm">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        {hasActiveFilters && (
          <Button onClick={handleReset} size="sm" variant="outline">
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </Card>
  );
}
