export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'student' | 'admin' | 'instructor';
  phone_model: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  long_description: string | null;
  price: number;
  currency: string;
  status: 'draft' | 'published' | 'archived';
  image_url: string | null;
  instructor_name: string | null;
  instructor_bio: string | null;
  instructor_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  order_index: number;
  created_at: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  video_url: string | null;
  video_duration: number | null;
  thumbnail_url: string | null;
  order_index: number;
  is_preview: boolean;
  key_takeaway: string | null;
  practical_example: string | null;
  created_at: string;
  updated_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  stripe_payment_id: string | null;
  enrolled_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
  last_watched_at: string | null;
  watch_time_seconds: number;
}

export interface Order {
  id: string;
  user_id: string | null;
  course_id: string;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  customer_email: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  created_at: string;
}

export interface Assignment {
  id: string;
  lesson_id: string;
  title: string;
  instructions: string | null;
  order_index: number;
  created_at: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  user_id: string;
  image_url: string | null;
  submitted_at: string;
  feedback_status: 'pending' | 'processing' | 'completed';
  ai_feedback: string | null;
  feedback_at: string | null;
}

export interface CourseWithModules extends Course {
  modules: ModuleWithLessons[];
}

export interface ModuleWithLessons extends Module {
  lessons: Lesson[];
}

export interface CourseProgress {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  lastLesson: Lesson | null;
}
