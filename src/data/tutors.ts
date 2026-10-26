import type { LucideIcon } from 'lucide-react';
import { BookOpen, Calculator, FlaskConical, Code2, Globe, Languages, Landmark, Briefcase } from 'lucide-react';

export type Tutor = {
  id: string;
  name: string;
  faculty: string;
  year: string;
  subjects: string[];
  bio: string;
  rate: number; // ZMW per hour
  rating: number;
  sessions: number;
  avatarInitials: string;
  avatarColor: string;
  whatsapp: string; // placeholder example number, clearly sample
};

// All data below is SAMPLE DATA for prototype demonstration only.
// Names, contact numbers and biographies are fictional.
export const SUBJECTS = [
  { label: 'Mathematics', icon: Calculator },
  { label: 'Statistics', icon: Calculator },
  { label: 'Physics', icon: FlaskConical },
  { label: 'Chemistry', icon: FlaskConical },
  { label: 'Programming', icon: Code2 },
  { label: 'Economics', icon: Landmark },
  { label: 'English', icon: BookOpen },
  { label: 'French', icon: Languages },
  { label: 'Business Studies', icon: Briefcase },
  { label: 'Accounting', icon: Calculator },
  { label: 'Biology', icon: FlaskConical },
  { label: 'Geography', icon: Globe },
] as const;

export const subjectIcon: Record<string, LucideIcon> = Object.fromEntries(
  SUBJECTS.map((s) => [s.label, s.icon])
);

export const TUTORS: Tutor[] = [
  {
    id: 't1',
    name: 'Chanda Bwalya',
    faculty: 'School of Mathematics & Natural Sciences',
    year: '3rd Year',
    subjects: ['Mathematics', 'Statistics'],
    bio: 'I love making statistics feel intuitive. I run weekend revision sessions for first-years and have helped over 40 classmates pass MATH 201.',
    rate: 45,
    rating: 4.9,
    sessions: 38,
    avatarInitials: 'CB',
    avatarColor: 'bg-navy-600',
    whatsapp: '260970000001',
  },
  {
    id: 't2',
    name: 'Mulenga Phiri',
    faculty: 'School of Engineering',
    year: '4th Year',
    subjects: ['Physics', 'Mathematics'],
    bio: 'Electrical engineering student. I break down tough physics problems step-by-step and focus on exam technique so you actually finish the paper.',
    rate: 60,
    rating: 4.8,
    sessions: 51,
    avatarInitials: 'MP',
    avatarColor: 'bg-navy-700',
    whatsapp: '260970000002',
  },
  {
    id: 't3',
    name: 'Memory Mwape',
    faculty: 'School of Business',
    year: '2nd Year',
    subjects: ['Accounting', 'Business Studies', 'Economics'],
    bio: 'Accounting and economics made simple. I use real Zambian business examples so the theory actually clicks. Patient and exam-focused.',
    rate: 40,
    rating: 4.7,
    sessions: 29,
    avatarInitials: 'MM',
    avatarColor: 'bg-gold-500',
    whatsapp: '260970000003',
  },
  {
    id: 't4',
    name: 'Joshua Tembo',
    faculty: 'School of Mines',
    year: '3rd Year',
    subjects: ['Chemistry', 'Biology'],
    bio: 'Geology and chemistry enthusiast. I make organic chemistry reaction mechanisms feel logical instead of memorisation torture.',
    rate: 50,
    rating: 4.9,
    sessions: 34,
    avatarInitials: 'JT',
    avatarColor: 'bg-navy-500',
    whatsapp: '260970000004',
  },
  {
    id: 't5',
    name: 'Esther Sichone',
    faculty: 'School of Humanities',
    year: '2nd Year',
    subjects: ['English', 'French'],
    bio: 'Languages are my thing. I help with essay structure, grammar and conversational French. Friendly, flexible and patient.',
    rate: 35,
    rating: 4.6,
    sessions: 22,
    avatarInitials: 'ES',
    avatarColor: 'bg-navy-800',
    whatsapp: '260970000005',
  },
  {
    id: 't6',
    name: 'Brian Mumba',
    faculty: 'School of Information & Communication Technology',
    year: '4th Year',
    subjects: ['Programming', 'Mathematics'],
    bio: 'Final-year CS student. I tutor Python, Java and web dev. I focus on small projects so you learn by doing, not by copying slides.',
    rate: 70,
    rating: 5.0,
    sessions: 47,
    avatarInitials: 'BM',
    avatarColor: 'bg-navy-900',
    whatsapp: '260970000006',
  },
  {
    id: 't7',
    name: 'Patience Ngoma',
    faculty: 'School of Natural Resources',
    year: '3rd Year',
    subjects: ['Geography', 'Biology'],
    bio: 'Environmental science tutor. Map work, ecosystems and conservation made interesting with field examples from the Copperbelt.',
    rate: 42,
    rating: 4.7,
    sessions: 19,
    avatarInitials: 'PN',
    avatarColor: 'bg-navy-600',
    whatsapp: '260970000007',
  },
  {
    id: 't8',
    name: 'Davies Chisenga',
    faculty: 'School of Engineering',
    year: '2nd Year',
    subjects: ['Mathematics', 'Physics', 'Programming'],
    bio: 'Engineering undergrad who enjoys teaching the fundamentals. I keep sessions relaxed and use lots of worked examples.',
    rate: 38,
    rating: 4.5,
    sessions: 16,
    avatarInitials: 'DC',
    avatarColor: 'bg-navy-700',
    whatsapp: '260970000008',
  },
];
