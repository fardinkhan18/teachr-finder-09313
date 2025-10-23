import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance, USE_MOCKS } from '@/api/axios';
import { KPIs, User, ContactInfo } from '@/types/api';
import { mockKPIs, mockUsers } from '@/data/mocks';

// Get admin KPIs
export const useAdminKpis = () => {
  return useQuery({
    queryKey: ['admin', 'kpis'],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockKPIs;
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<KPIs>('/admin/kpis');
      return data;
    },
  });
};

// Get all users (admin only)
export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: async () => {
      if (USE_MOCKS) {
        return mockUsers;
      }

      // TODO: Real API call
      const { data } = await axiosInstance.get<User[]>('/admin/users');
      return data;
    },
  });
};

// Ban user (admin only)
export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/users/${userId}/ban`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

// Unban user (admin only)
export const useUnbanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      if (USE_MOCKS) {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { success: true };
      }

      // TODO: Real API call
      const { data } = await axiosInstance.post(`/admin/users/${userId}/unban`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

// Get contact info (admin only)
export const useAdminContacts = (scope: 'user' | 'post', refId: string) => {
  return useQuery({
    queryKey: ['admin', 'contacts', scope, refId],
    queryFn: async () => {
      if (USE_MOCKS) {
        // Mock contact data
        return {
          phone: '+৮৮০১৭১২৩৪৫৬৭৮',
          email: 'example@test.com',
          refId,
          scope,
        } as ContactInfo;
      }

      // TODO: Real API call
      const { data} = await axiosInstance.get<ContactInfo>(`/admin/contacts/${scope}/${refId}`);
      return data;
    },
    enabled: !!refId,
  });
};
