export type Role = 'PARENT' | 'TUTOR' | 'ADMIN';
export type VerifyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type Mode = 'ONLINE' | 'OFFLINE' | 'HYBRID';
export type PostStatus = 'OPEN' | 'ASSIGNED' | 'CLOSED';
export type AppStatus = 'APPLIED' | 'SHORTLISTED' | 'HIRED' | 'REJECTED';

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface TutorProfile {
  id: string;
  userId: string;
  fullName: string;
  university: string;
  department: string;
  session: string;
  subjects: string[];
  mode: Mode;
  hourlyRate?: number;
  areas: string[];
  bio?: string;
  avatarUrl?: string;
  verify: VerifyStatus;
  ratingAvg?: number;
  ratingCount?: number;
  createdAt: string;
}

export interface ParentProfile {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  area?: string;
  createdAt: string;
}

export interface TuitionPost {
  id: string;
  parentId: string;
  parentName?: string;
  grade: string;
  subjects: string[];
  mode: Mode;
  area?: string;
  schedule?: string;
  budgetMin?: number;
  budgetMax?: number;
  note?: string;
  status: PostStatus;
  applicationsCount?: number;
  createdAt: string;
}

export interface TutorApplication {
  id: string;
  tutorId: string;
  tutorName?: string;
  postId: string;
  postGrade?: string;
  expectedRate?: number;
  coverNote?: string;
  status: AppStatus;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface TutorFilters {
  university?: string;
  department?: string;
  session?: string;
  subject?: string;
  area?: string;
  mode?: Mode;
  q?: string;
  page?: number;
  limit?: number;
}

export interface PostFilters {
  area?: string;
  subject?: string;
  mode?: Mode;
  status?: PostStatus;
  page?: number;
  limit?: number;
}
