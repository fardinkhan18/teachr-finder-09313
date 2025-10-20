import {
  User,
  TutorProfile,
  ParentProfile,
  TuitionPost,
  TutorApplication,
  VerifyStatus,
  Mode,
  PostStatus,
  AppStatus,
} from '../types';

const universities = ['RUET', 'BUET', 'DU', 'KUET'];
const departments = ['CSE', 'EEE', 'ME', 'CE', 'Physics', 'Math'];
const sessions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
const subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'English', 'ICT'];
const areas = ['Dhanmondi', 'Uttara', 'Mirpur', 'Banani', 'Mohammadpur', 'Gulshan', 'Bashundhara'];
const modes: Mode[] = ['ONLINE', 'OFFLINE', 'HYBRID'];
const grades = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC'];

const names = [
  'Rafiq Ahmed', 'Sabina Yasmin', 'Kamal Hassan', 'Nasrin Sultana', 'Jahangir Alam',
  'Fatima Begum', 'Rahim Uddin', 'Shahnaz Parvin', 'Habibur Rahman', 'Roksana Akter',
  'Milon Kumar', 'Shapla Khatun', 'Farhan Israk', 'Tahsin Zaman', 'Nusrat Jahan',
  'Iftekhar Mahmud', 'Sadia Islam', 'Mehedi Hasan', 'Anika Rahman', 'Tanvir Ahmed',
  'Faria Tabassum', 'Shakib Al Hasan', 'Ayesha Siddika', 'Rakib Hassan', 'Sumona Akter',
  'Imran Khan', 'Nadia Afrin', 'Sajid Rahman', 'Rupa Khatun', 'Limon Ahmed',
  'Monika Rani', 'Shahidul Islam', 'Nafisa Anjum', 'Rubel Hossain', 'Sultana Razia',
  'Masum Billah', 'Sharmin Akter', 'Javed Iqbal', 'Mahfuza Begum', 'Aziz Mahmud'
];

export const users: User[] = [
  {
    id: 'user-parent-1',
    email: 'parent@test.com',
    role: 'PARENT',
    name: 'Parent User',
  },
  {
    id: 'user-tutor-1',
    email: 'tutor@test.com',
    role: 'TUTOR',
    name: 'Tutor User',
  },
  {
    id: 'user-admin-1',
    email: 'admin@test.com',
    role: 'ADMIN',
    name: 'Admin User',
  },
];

// Generate 36 tutors
export const tutors: TutorProfile[] = names.slice(0, 36).map((name, i) => {
  const uni = universities[i % universities.length];
  const dept = departments[i % departments.length];
  const sess = sessions[Math.floor(i / 5) % sessions.length];
  const mode = modes[i % modes.length];
  const tutorSubjects = subjects.slice(0, 2 + (i % 3));
  const tutorAreas = areas.slice(0, 1 + (i % 2));
  const verify: VerifyStatus = i < 30 ? 'APPROVED' : i < 34 ? 'PENDING' : 'REJECTED';
  
  return {
    id: `tutor-${i + 1}`,
    userId: `user-tutor-${i + 1}`,
    fullName: name,
    university: uni,
    department: dept,
    session: sess,
    subjects: tutorSubjects,
    mode,
    hourlyRate: 300 + (i * 50) % 500,
    areas: tutorAreas,
    bio: `Experienced tutor in ${tutorSubjects.join(', ')}. Passionate about teaching and helping students achieve their goals.`,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(' ', '')}`,
    verify,
    ratingAvg: verify === 'APPROVED' ? 4 + Math.random() * 1 : undefined,
    ratingCount: verify === 'APPROVED' ? Math.floor(5 + Math.random() * 20) : 0,
    createdAt: new Date(2024, 0, 1 + i).toISOString(),
  };
});

export const parents: ParentProfile[] = [
  {
    id: 'parent-1',
    userId: 'user-parent-1',
    fullName: 'Parent User',
    phone: '+8801711111111',
    area: 'Dhanmondi',
    createdAt: new Date(2024, 0, 1).toISOString(),
  },
];

// Generate 10 tuition posts
export const posts: TuitionPost[] = Array.from({ length: 10 }, (_, i) => ({
  id: `post-${i + 1}`,
  parentId: 'parent-1',
  parentName: 'Parent User',
  grade: grades[i % grades.length],
  subjects: subjects.slice(0, 1 + (i % 3)),
  mode: modes[i % modes.length],
  area: areas[i % areas.length],
  schedule: i % 2 === 0 ? '3 days/week, evenings' : '2 days/week, weekends',
  budgetMin: 400 + (i * 100) % 300,
  budgetMax: 600 + (i * 100) % 400,
  note: `Looking for an experienced tutor for ${grades[i % grades.length]}.`,
  status: i < 7 ? 'OPEN' : i < 9 ? 'ASSIGNED' : 'CLOSED',
  applicationsCount: Math.floor(Math.random() * 5),
  createdAt: new Date(2024, 9, 1 + i).toISOString(),
}));

// Generate 8 applications
export const applications: TutorApplication[] = Array.from({ length: 8 }, (_, i) => ({
  id: `app-${i + 1}`,
  tutorId: tutors[i].id,
  tutorName: tutors[i].fullName,
  postId: posts[i % posts.length].id,
  postGrade: posts[i % posts.length].grade,
  expectedRate: 500 + (i * 50) % 300,
  coverNote: `I am interested in teaching ${posts[i % posts.length].subjects.join(', ')} for ${posts[i % posts.length].grade}.`,
  status: i < 4 ? 'APPLIED' : i < 6 ? 'SHORTLISTED' : i < 7 ? 'HIRED' : 'REJECTED',
  createdAt: new Date(2024, 9, 2 + i).toISOString(),
}));

// Initialize from localStorage or use defaults
export function loadInitialData() {
  const stored = localStorage.getItem('smart-tutor-data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored data', e);
    }
  }
  return {
    users,
    tutors,
    parents,
    posts,
    applications,
  };
}

export function saveData(data: any) {
  localStorage.setItem('smart-tutor-data', JSON.stringify(data));
}
