export type Role = 'student' | 'tutor' | 'admin';

export interface TutorProfile {
  userId: string;
  tutorCode?: string;
  name: string;
  gender: 'male' | 'female';
  university: string;
  department: string;
  pictureUrl?: string;
  session: string;
  teaching: {
    band: '1-8' | '9-10' | '11-12';
    subjects: string[];
  }[];
  education?: {
    school?: {
      name?: string;
      sscGpa?: number;
    };
    college?: {
      name?: string;
      hscGpa?: number;
    };
  };
  expectedSalary?: number;
  mode: 'অনলাইন' | 'অফলাইন' | 'হাইব্রিড';
  status: 'pending' | 'approved' | 'suspended';
  subjectsFlat: string[];
  bandsFlat: ('1-8' | '9-10' | '11-12')[];
}

export interface TuitionPost {
  _id: string;
  studentId: string;
  subject: string;
  area: string;
  mode: 'অনলাইন' | 'অফলাইন' | 'হাইব্রিড';
  budget: number;
  details?: string;
  preferredTutorId?: string;
  status: 'pending' | 'approved' | 'closed';
  createdAt: string;
}

export interface TutorApplication {
  _id: string;
  postId: string;
  tutorId: string;
  note?: string;
  status: 'applied' | 'shortlisted' | 'hired' | 'rejected' | 'closed';
  createdAt: string;
}

export interface KPIs {
  totalTutors: number;
  approvedTutors: number;
  pendingTutors: number;
  totalPosts: number;
  hireRate: number;
  subjectDist: Record<string, number>;
  modeDist: { mode: string; count: number }[];
  funnel: { stage: 'views' | 'applies' | 'shortlists' | 'hires'; value: number }[];
}

export interface TutorFilters {
  university?: string;
  departments?: string[];
  gender?: 'male' | 'female';
  band?: '1-8' | '9-10' | '11-12';
  subjects?: string[];
  mode?: 'অনলাইন' | 'অফলাইন' | 'হাইব্রিড';
  salaryMin?: number;
  salaryMax?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  gender?: 'male' | 'female';
  status: 'active' | 'banned';
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  refId: string;
  scope: 'user' | 'post';
}
