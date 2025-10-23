import { useState } from 'react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { TutorCard } from '@/components/tutors/TutorCard';
import { FilterPanel } from '@/components/tutors/FilterPanel';
import { Skeleton } from '@/components/ui/skeleton';
import { useTutors } from '@/features/tutors/api';
import { TutorFilters } from '@/types/api';
import { EmptyState } from '@/components/common/EmptyState';
import { Search } from 'lucide-react';

export default function TutorDirectory() {
  const [filters, setFilters] = useState<TutorFilters>({});
  const { data: tutors, isLoading } = useTutors(filters);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader
          title="আপনার উপযুক্ত টিউটর খুঁজুন"
          description="ভেরিফাইড টিউটর খুঁজুন বিশ্ববিদ্যালয়, বিষয় এবং এলাকা অনুযায়ী"
        />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters - Left Sidebar on Desktop */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Results - Main Content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            ) : tutors && tutors.length > 0 ? (
              <>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    {tutors.length} জন টিউটর পাওয়া গেছে
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {tutors.map(tutor => (
                    <TutorCard key={tutor.userId} tutor={tutor} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                icon={<Search className="h-16 w-16" />}
                title="কোনো টিউটর পাওয়া যায়নি"
                description="ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন"
              />
            )}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
