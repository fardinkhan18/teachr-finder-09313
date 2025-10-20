import {
  User,
  TutorProfile,
  ParentProfile,
  TuitionPost,
  TutorApplication,
  PaginatedResponse,
  TutorFilters,
  PostFilters,
  VerifyStatus,
} from '../types';
import { loadInitialData, saveData } from './seed';

let data = loadInitialData();

// Helper to simulate latency
const delay = (ms: number = 300) => new Promise((resolve) => setTimeout(resolve, ms));

// Current user simulation
let currentUser: User | null = null;

export const mockHandlers = {
  // AUTH
  async register(email: string, password: string, role: 'PARENT' | 'TUTOR') {
    await delay(400);
    const existing = data.users.find((u: User) => u.email === email);
    if (existing) {
      throw new Error('Email already exists');
    }
    const user: User = {
      id: `user-${Date.now()}`,
      email,
      role,
      name: email.split('@')[0],
    };
    data.users.push(user);
    saveData(data);
    currentUser = user;
    return { user };
  },

  async login(email: string, password: string) {
    await delay(400);
    const user = data.users.find((u: User) => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    currentUser = user;
    return { user };
  },

  async logout() {
    await delay(200);
    currentUser = null;
    return { ok: true };
  },

  async me() {
    await delay(200);
    return { user: currentUser };
  },

  // TUTORS
  async getTutors(filters: TutorFilters = {}): Promise<PaginatedResponse<TutorProfile>> {
    await delay(400);
    const page = filters.page || 1;
    const limit = filters.limit || 12;

    let filtered = [...data.tutors] as TutorProfile[];

    // Apply filters
    if (filters.university) {
      filtered = filtered.filter((t) => t.university === filters.university);
    }
    if (filters.department) {
      filtered = filtered.filter((t) => t.department === filters.department);
    }
    if (filters.session) {
      filtered = filtered.filter((t) => t.session === filters.session);
    }
    if (filters.subject) {
      filtered = filtered.filter((t) => t.subjects.includes(filters.subject!));
    }
    if (filters.area) {
      filtered = filtered.filter((t) => t.areas.includes(filters.area!));
    }
    if (filters.mode) {
      filtered = filtered.filter((t) => t.mode === filters.mode || t.mode === 'HYBRID');
    }
    if (filters.q) {
      const q = filters.q.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.fullName.toLowerCase().includes(q) ||
          t.subjects.some((s) => s.toLowerCase().includes(q)) ||
          t.areas.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Pagination
    const total = filtered.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return { items, total, page, pages };
  },

  async getTutor(id: string): Promise<TutorProfile> {
    await delay(300);
    const tutor = data.tutors.find((t: TutorProfile) => t.id === id);
    if (!tutor) {
      throw new Error('Tutor not found');
    }
    return tutor;
  },

  async upsertTutorProfile(profile: Partial<TutorProfile>): Promise<TutorProfile> {
    await delay(500);
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    const existing = data.tutors.find((t: TutorProfile) => t.userId === currentUser!.id);
    
    if (existing) {
      // Update
      Object.assign(existing, profile);
      saveData(data);
      return existing;
    } else {
      // Create
      const newProfile: TutorProfile = {
        id: `tutor-${Date.now()}`,
        userId: currentUser.id,
        fullName: profile.fullName || '',
        university: profile.university || '',
        department: profile.department || '',
        session: profile.session || '',
        subjects: profile.subjects || [],
        mode: profile.mode || 'ONLINE',
        hourlyRate: profile.hourlyRate,
        areas: profile.areas || [],
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        verify: 'PENDING',
        ratingAvg: 0,
        ratingCount: 0,
        createdAt: new Date().toISOString(),
      };
      data.tutors.push(newProfile);
      saveData(data);
      return newProfile;
    }
  },

  async getMyTutorProfile(): Promise<TutorProfile | null> {
    await delay(300);
    if (!currentUser) return null;
    return data.tutors.find((t: TutorProfile) => t.userId === currentUser!.id) || null;
  },

  // PARENTS
  async upsertParentProfile(profile: Partial<ParentProfile>): Promise<ParentProfile> {
    await delay(500);
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    const existing = data.parents.find((p: ParentProfile) => p.userId === currentUser!.id);

    if (existing) {
      Object.assign(existing, profile);
      saveData(data);
      return existing;
    } else {
      const newProfile: ParentProfile = {
        id: `parent-${Date.now()}`,
        userId: currentUser.id,
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        area: profile.area,
        createdAt: new Date().toISOString(),
      };
      data.parents.push(newProfile);
      saveData(data);
      return newProfile;
    }
  },

  async createPost(post: Partial<TuitionPost>): Promise<TuitionPost> {
    await delay(500);
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    const parent = data.parents.find((p: ParentProfile) => p.userId === currentUser!.id);
    if (!parent) {
      throw new Error('Parent profile not found');
    }

    const newPost: TuitionPost = {
      id: `post-${Date.now()}`,
      parentId: parent.id,
      parentName: parent.fullName,
      grade: post.grade || '',
      subjects: post.subjects || [],
      mode: post.mode || 'ONLINE',
      area: post.area,
      schedule: post.schedule,
      budgetMin: post.budgetMin,
      budgetMax: post.budgetMax,
      note: post.note,
      status: 'OPEN',
      applicationsCount: 0,
      createdAt: new Date().toISOString(),
    };

    data.posts.unshift(newPost);
    saveData(data);
    return newPost;
  },

  async getPosts(filters: PostFilters = {}): Promise<PaginatedResponse<TuitionPost>> {
    await delay(400);
    const page = filters.page || 1;
    const limit = filters.limit || 12;

    let filtered = [...data.posts] as TuitionPost[];

    if (filters.area) {
      filtered = filtered.filter((p) => p.area === filters.area);
    }
    if (filters.subject) {
      filtered = filtered.filter((p) => p.subjects.includes(filters.subject!));
    }
    if (filters.mode) {
      filtered = filtered.filter((p) => p.mode === filters.mode || p.mode === 'HYBRID');
    }
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    const total = filtered.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const items = filtered.slice(start, start + limit);

    return { items, total, page, pages };
  },

  async getMyPosts(): Promise<TuitionPost[]> {
    await delay(300);
    if (!currentUser) return [];
    const parent = data.parents.find((p: ParentProfile) => p.userId === currentUser!.id);
    if (!parent) return [];
    return data.posts.filter((p: TuitionPost) => p.parentId === parent.id);
  },

  // APPLICATIONS
  async createApplication(app: {
    postId: string;
    expectedRate?: number;
    coverNote?: string;
  }): Promise<TutorApplication> {
    await delay(500);
    if (!currentUser) {
      throw new Error('Not authenticated');
    }

    const tutor = data.tutors.find((t: TutorProfile) => t.userId === currentUser!.id);
    if (!tutor) {
      throw new Error('Tutor profile not found');
    }

    const post = data.posts.find((p: TuitionPost) => p.id === app.postId);
    if (!post) {
      throw new Error('Post not found');
    }

    const newApp: TutorApplication = {
      id: `app-${Date.now()}`,
      tutorId: tutor.id,
      tutorName: tutor.fullName,
      postId: app.postId,
      postGrade: post.grade,
      expectedRate: app.expectedRate,
      coverNote: app.coverNote,
      status: 'APPLIED',
      createdAt: new Date().toISOString(),
    };

    data.applications.push(newApp);
    
    // Update applications count
    post.applicationsCount = (post.applicationsCount || 0) + 1;
    
    saveData(data);
    return newApp;
  },

  async getMyApplications(): Promise<TutorApplication[]> {
    await delay(300);
    if (!currentUser) return [];
    const tutor = data.tutors.find((t: TutorProfile) => t.userId === currentUser!.id);
    if (!tutor) return [];
    return data.applications.filter((a: TutorApplication) => a.tutorId === tutor.id);
  },

  // ADMIN
  async getAllTutorsAdmin(verifyFilter?: VerifyStatus): Promise<TutorProfile[]> {
    await delay(400);
    let filtered = [...data.tutors] as TutorProfile[];
    if (verifyFilter) {
      filtered = filtered.filter((t) => t.verify === verifyFilter);
    }
    return filtered;
  },

  async updateVerifyStatus(tutorId: string, status: VerifyStatus): Promise<TutorProfile> {
    await delay(400);
    const tutor = data.tutors.find((t: TutorProfile) => t.id === tutorId);
    if (!tutor) {
      throw new Error('Tutor not found');
    }
    tutor.verify = status;
    saveData(data);
    return tutor;
  },

  // Helpers
  getCurrentUser() {
    return currentUser;
  },

  setCurrentUser(user: User | null) {
    currentUser = user;
  },
};
