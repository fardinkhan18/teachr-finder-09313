import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { TutorFilters } from '@/components/filters/TutorFilters';
import { TutorCard } from '@/components/cards/TutorCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { TutorFilters as Filters, PaginatedResponse, TutorProfile } from '@/lib/api/types';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TutorDirectory() {
  const [filters, setFilters] = useState<Filters>({ page: 1, limit: 12 });
  const [data, setData] = useState<PaginatedResponse<TutorProfile> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTutors();
  }, [filters]);

  const loadTutors = async () => {
    setIsLoading(true);
    try {
      const result = await api.tutors.list(filters);
      setData(result);
    } catch (error) {
      console.error('Failed to load tutors', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader
          title="Find Your Perfect Tutor"
          description="Browse verified tutors from top universities"
        />

        <TutorFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : data && data.items.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {data.items.length} of {data.total} tutors
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {data.items.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>

            {data.pages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(data.page - 1)}
                  disabled={data.page === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {data.page} of {data.pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(data.page + 1)}
                  disabled={data.page === data.pages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            icon={<Search className="h-16 w-16" />}
            title="No tutors found"
            description="Try adjusting your filters to see more results"
            action={
              <Button onClick={() => setFilters({ page: 1, limit: 12 })}>
                Clear All Filters
              </Button>
            }
          />
        )}
      </main>
      <AppFooter />
    </div>
  );
}
