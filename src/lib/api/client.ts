import { mockHandlers } from './mock/handlers';

// API client that uses mock handlers
// In future, swap this with real HTTP client

export const api = {
  auth: {
    register: mockHandlers.register,
    login: mockHandlers.login,
    logout: mockHandlers.logout,
    me: mockHandlers.me,
  },
  tutors: {
    list: mockHandlers.getTutors,
    get: mockHandlers.getTutor,
    upsertProfile: mockHandlers.upsertTutorProfile,
    getMyProfile: mockHandlers.getMyTutorProfile,
  },
  parents: {
    upsertProfile: mockHandlers.upsertParentProfile,
    createPost: mockHandlers.createPost,
    getPosts: mockHandlers.getPosts,
    getMyPosts: mockHandlers.getMyPosts,
  },
  applications: {
    create: mockHandlers.createApplication,
    getMy: mockHandlers.getMyApplications,
  },
  admin: {
    getAllTutors: mockHandlers.getAllTutorsAdmin,
    updateVerify: mockHandlers.updateVerifyStatus,
  },
};

export { mockHandlers };
