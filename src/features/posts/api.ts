import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, USE_MOCKS } from '@/api/axios';
import { TuitionPost } from '@/types/api';
import { mockPosts } from '@/data/mocks';

// Get all posts
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockPosts.filter(p => p.status === 'approved');
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TuitionPost[]>('/posts');
      return data;
    },
  });
};

// Get pending posts (admin only)
export const usePendingPosts = () => {
  return useQuery({
    queryKey: ['posts', 'pending'],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockPosts.filter(p => p.status === 'pending');
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<TuitionPost[]>('/admin/posts/pending');
      return data;
    },
  });
};

// Approve post (admin only)
export const useApprovePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/posts/${postId}/approve`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};

// Close post (admin only)
export const useClosePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/posts/${postId}/close`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
