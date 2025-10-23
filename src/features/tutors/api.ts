import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, USE_MOCKS } from '@/api/axios';
import { TutorProfile, TutorFilters } from '@/types/api';
import { mockTutors } from '@/data/mocks';

// Get all tutors with filters
export const useTutors = (filters?: TutorFilters) => {
  return useQuery({
    queryKey: ['tutors', filters],
    queryFn: async () => {
      if (USE_MOCKS) {
        // Mock filtering logic
        let filtered = [...mockTutors];
        
        if (filters?.university) {
          filtered = filtered.filter(t => t.university === filters.university);
        }
        if (filters?.departments?.length) {
          filtered = filtered.filter(t => filters.departments!.includes(t.department));
        }
        if (filters?.gender) {
          filtered = filtered.filter(t => t.gender === filters.gender);
        }
        if (filters?.band) {
          filtered = filtered.filter(t => t.bandsFlat.includes(filters.band!));
        }
        if (filters?.subjects?.length) {
          filtered = filtered.filter(t => 
            filters.subjects!.some(s => t.subjectsFlat.includes(s))
          );
        }
        if (filters?.mode) {
          filtered = filtered.filter(t => t.mode === filters.mode);
        }
        if (filters?.salaryMin !== undefined) {
          filtered = filtered.filter(t => (t.expectedSalary || 0) >= filters.salaryMin!);
        }
        if (filters?.salaryMax !== undefined) {
          filtered = filtered.filter(t => (t.expectedSalary || 0) <= filters.salaryMax!);
        }

        // Only show approved tutors for non-admin views
        filtered = filtered.filter(t => t.status === 'approved');
        
        return filtered;
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TutorProfile[]>('/tutors', {
        params: filters,
      });
      return data;
    },
  });
};

// Get single tutor by ID
export const useTutor = (userId: string) => {
  return useQuery({
    queryKey: ['tutor', userId],
    queryFn: async () => {
      if (USE_MOCKS) {
        const tutor = mockTutors.find(t => t.userId === userId);
        if (!tutor) throw new Error('Tutor not found');
        return tutor;
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TutorProfile>(`/tutors/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
};

// Get pending tutors (admin only)
export const usePendingTutors = () => {
  return useQuery({
    queryKey: ['tutors', 'pending'],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockTutors.filter(t => t.status === 'pending');
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TutorProfile[]>('/admin/tutors/pending');
      return data;
    },
  });
};

// Approve tutor (admin only)
export const useApproveTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (USE_MOCKS) {
        // Mock approval
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/tutors/${userId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
};

// Reject tutor (admin only)
export const useRejectTutor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/tutors/${userId}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutors'] });
    },
  });
};
