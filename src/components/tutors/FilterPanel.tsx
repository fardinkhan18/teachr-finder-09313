import { useState } from 'react';
import { TutorFilters } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { SlidersHorizontal, X } from 'lucide-react';

interface FilterPanelProps {
  filters: TutorFilters;
  onFiltersChange: (filters: TutorFilters) => void;
}

const universities = ['RUET', 'BUET', 'CUET', 'Dhaka University', 'KUET'];
const departments = ['CSE', 'EEE', 'ME', 'Civil', 'English', 'Math', 'Physics'];
const subjects = ['পদার্থবিজ্ঞান', 'রসায়ন', 'গণিত', 'ইংরেজি', 'বাংলা', 'উচ্চতর গণিত', 'বিজ্ঞান'];
const bands: ('1-8' | '9-10' | '11-12')[] = ['1-8', '9-10', '11-12'];
const modes: ('অনলাইন' | 'অফলাইন' | 'হাইব্রিড')[] = ['অনলাইন', 'অফলাইন', 'হাইব্রিড'];

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<TutorFilters>(filters);

  const handleUniversityChange = (uni: string) => {
    setLocalFilters(prev => ({
      ...prev,
      university: prev.university === uni ? undefined : uni,
    }));
  };

  const handleDepartmentToggle = (dept: string) => {
    setLocalFilters(prev => {
      const current = prev.departments || [];
      const updated = current.includes(dept)
        ? current.filter(d => d !== dept)
        : [...current, dept];
      return { ...prev, departments: updated.length > 0 ? updated : undefined };
    });
  };

  const handleSubjectToggle = (subject: string) => {
    setLocalFilters(prev => {
      const current = prev.subjects || [];
      const updated = current.includes(subject)
        ? current.filter(s => s !== subject)
        : [...current, subject];
      return { ...prev, subjects: updated.length > 0 ? updated : undefined };
    });
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(localFilters).some(
    key => localFilters[key as keyof TutorFilters] !== undefined
  );

  const FiltersContent = () => (
    <div className="space-y-6">
      {/* University */}
      <div>
        <Label className="mb-3 block">বিশ্ববিদ্যালয়</Label>
        <div className="flex flex-wrap gap-2">
          {universities.map(uni => (
            <Badge
              key={uni}
              variant={localFilters.university === uni ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleUniversityChange(uni)}
            >
              {uni}
            </Badge>
          ))}
        </div>
      </div>

      {/* Departments */}
      <div>
        <Label className="mb-3 block">ডিপার্টমেন্ট</Label>
        <div className="flex flex-wrap gap-2">
          {departments.map(dept => (
            <Badge
              key={dept}
              variant={(localFilters.departments || []).includes(dept) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleDepartmentToggle(dept)}
            >
              {dept}
            </Badge>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div>
        <Label className="mb-3 block">লিঙ্গ</Label>
        <div className="flex gap-2">
          <Badge
            variant={localFilters.gender === 'male' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setLocalFilters(prev => ({
              ...prev,
              gender: prev.gender === 'male' ? undefined : 'male',
            }))}
          >
            পুরুষ
          </Badge>
          <Badge
            variant={localFilters.gender === 'female' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setLocalFilters(prev => ({
              ...prev,
              gender: prev.gender === 'female' ? undefined : 'female',
            }))}
          >
            নারী
          </Badge>
        </div>
      </div>

      {/* Class Band */}
      <div>
        <Label className="mb-3 block">ক্লাস</Label>
        <div className="flex flex-wrap gap-2">
          {bands.map(band => (
            <Badge
              key={band}
              variant={localFilters.band === band ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setLocalFilters(prev => ({
                ...prev,
                band: prev.band === band ? undefined : band,
              }))}
            >
              {band}
            </Badge>
          ))}
        </div>
      </div>

      {/* Subjects */}
      <div>
        <Label className="mb-3 block">বিষয়</Label>
        <div className="flex flex-wrap gap-2">
          {subjects.map(subject => (
            <Badge
              key={subject}
              variant={(localFilters.subjects || []).includes(subject) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleSubjectToggle(subject)}
            >
              {subject}
            </Badge>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div>
        <Label className="mb-3 block">পদ্ধতি</Label>
        <div className="flex flex-wrap gap-2">
          {modes.map(mode => (
            <Badge
              key={mode}
              variant={localFilters.mode === mode ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setLocalFilters(prev => ({
                ...prev,
                mode: prev.mode === mode ? undefined : mode,
              }))}
            >
              {mode}
            </Badge>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="space-y-3">
        <Label>প্রত্যাশিত বেতন (৳)</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              type="number"
              placeholder="সর্বনিম্ন"
              value={localFilters.salaryMin || ''}
              onChange={e => setLocalFilters(prev => ({
                ...prev,
                salaryMin: e.target.value ? Number(e.target.value) : undefined,
              }))}
            />
          </div>
          <div>
            <Input
              type="number"
              placeholder="সর্বোচ্চ"
              value={localFilters.salaryMax || ''}
              onChange={e => setLocalFilters(prev => ({
                ...prev,
                salaryMax: e.target.value ? Number(e.target.value) : undefined,
              }))}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-4">
        <Button
          onClick={handleApply}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700"
        >
          ফিল্টার প্রয়োগ করুন
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={handleReset}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: Card */}
      <Card className="hidden lg:block rounded-2xl mb-6">
        <CardHeader>
          <CardTitle>ফিল্টার</CardTitle>
        </CardHeader>
        <CardContent>
          <FiltersContent />
        </CardContent>
      </Card>

      {/* Mobile: Sheet */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              ফিল্টার
              {hasActiveFilters && (
                <Badge className="ml-2 bg-emerald-600">সক্রিয়</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>ফিল্টার</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
