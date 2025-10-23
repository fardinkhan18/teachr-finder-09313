import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, USE_MOCKS } from '@/api/axios';
import { TutorApplication } from '@/types/api';
import { mockApplications } from '@/data/mocks';

// Get applicants for a post (admin only)
export const useApplicants = (postId: string) => {
  return useQuery({
    queryKey: ['applications', postId],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockApplications.filter(a => a.postId === postId);
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TutorApplication[]>(`/admin/posts/${postId}/applications`);
      return data;
    },
    enabled: !!postId,
  });
};

// Shortlist application (admin only)
export const useShortlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/applications/${appId}/shortlist`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// Hire application (admin only)
export const useHire = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/applications/${appId}/hire`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};

// Reject application (admin only)
export const useReject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/applications/${appId}/reject`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
    },
  });
};
