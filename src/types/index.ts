export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  date_joined: string;
  user_type: 'student' | 'lecturer' | null;
};

export type Faculty = {
    id: number;
    name: string;
    short: string;
  };

// Type for the Department (assuming the Department model has id and name fields)
export type Department = {
  id: number;
  name: string;
  short: string;
  faculty: Faculty;
};

// Type for the StudentProfile (matching the fields in the serializer)
export type StudentProfile = {
  id: number;
  user: User;
  full_name: string;
  matric_number: string;
  dob: string; // ISO date string
  cgpa: number;
  phone: string;
  department: Department;
  department_id: number;
  level: string;
  created_at: string; // ISO date string
};

// Type for the AcademicSession (matching the fields in the serializer)
export type AcademicSession = {
  session_name: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
};

// Type for the response from the `StudentOverview` API
export type StudentOverview = {
  current_semester: string;
  student_profile: StudentProfile;
  current_academic_session: AcademicSession;
};

export type Course = {
  id: number;
  code: string;
  title: string;
  units: number;
  department: string; // Assuming department is a string in the response
  level: string; // Level name from backend
};

export type CourseEnrollment = {
  id: number;
  course: Course;
  student: StudentProfile;
  grade: string | null;
  grade_point: number | null;
  academic_session: string;
  semester: string;
  date_recorded: string; // ISO date string
};

export type CourseRegistration = {
  id: number;
  student: StudentProfile;
  academic_session: string;
  semester: string;
  courses: CourseEnrollment[];
  enrollment_date: string; // ISO date string
  total_units: number;
  semester_gpa: number;
};

export type RegisteredCourses = {
  total_courses: number;
  total_units: number;
  courses: Course[];
};

export type CreateUser =  {
  user_type: string;
  email: string;
  password: string;
  full_name: string;
  phone: string;
  department: number;
  // Student specific fields
  dob?: string; // ISO date string
  level?: number;
  // Lecturer specific fields
  specialization?: string;
}

export type Level = {
  id: number;
  name: string;
}

export type CreateUserData = {
  departments: Department[];
  levels: Level[];
}

// Lecturer Types
export type LecturerProfile = {
  id: string; // Format: LEC-XXXXXX
  user: User;
  full_name: string;
  staff_id: string; // Same as id for consistency
  phone: string;
  department: Department;
  specialization: string;
  created_at: string;
};

export type LecturerOverview = {
  current_semester: string;
  lecturer_profile: LecturerProfile;
  current_academic_session: AcademicSession;
  total_courses: number;
  total_students: number;
};

export type LecturerActivity = {
  id: number;
  type: 'assignment' | 'grade' | 'announcement' | 'course';
  description: string;
  date: string;
  course?: string;
};

export type LmsOverview = {
  total_courses: number;
  total_students: number;
  total_units: number;
  current_semester: string;
  current_session: string;
  courses: Course[];
};

export type AllAssignmentsOverview = {
  total_assignments: number;
  published_assignments: number;
  draft_assignments: number;
  assignment_types: Record<string, number>;
  current_semester: string;
  current_session: string;
  assignments: Assignment[];
};

// Student LMS Types
export type StudentLmsOverview = {
  total_courses: number;
  pending_assignments: number;
  submitted_assignments: number;
  current_gpa: number;
  current_semester: string;
  current_session: string;
  enrolled_courses: Course[];
};

export type StudentAssignmentsOverview = {
  total_assignments: number;
  pending_assignments: number;
  submitted_assignments: number;
  overdue_assignments: number;
  current_semester: string;
  current_session: string;
  assignments: StudentAssignment[];
};

export type StudentGradesOverview = {
  total_courses: number;
  current_gpa: number;
  total_credits: number;
  completed_credits: number;
  current_semester: string;
  current_session: string;
  grades: StudentGrade[];
};

export type StudentAnnouncementsOverview = {
  total_announcements: number;
  unread_announcements: number;
  current_semester: string;
  current_session: string;
  announcements: Announcement[];
};

export type StudentCourseDetails = {
  course: Course;
  assignments: StudentAssignment[];
  grades: StudentGrade[];
  announcements: Announcement[];
  total_assignments: number;
  pending_assignments: number;
  total_points: number;
  current_semester: string;
  current_session: string;
};

export type StudentAssignmentDetails = {
  assignment: Assignment;
  submission?: AssignmentSubmission;
  current_semester: string;
  current_session: string;
};

export type StudentAssignment = Assignment & {
  course: Course;
  submission_status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  due_date_status: 'upcoming' | 'due_soon' | 'overdue';
  submission?: AssignmentSubmission;
};

export type StudentGrade = {
  id: number;
  course: Course;
  assignment?: Assignment;
  grade: string;
  grade_point: number;
  total_points: number;
  earned_points: number;
  feedback?: string;
  graded_at: string;
  semester: string;
  academic_session: string;
};

export type AssignmentSubmission = {
  id: number;
  assignment: number;
  student: number;
  submission_type: 'text' | 'file' | 'url' | 'mixed';
  text_content?: string;
  file_url?: string;
  url?: string;
  submission_status: 'draft' | 'submitted' | 'graded' | 'late';
  submitted_at: string;
  grade?: number;
  feedback?: string;
  graded_at?: string;
};

export type Announcement = {
  id: number;
  title: string;
  content: string;
  course?: Course | null;
  is_general: boolean;
  created_by: LecturerProfile | string;
  created_at: string;
  updated_at: string;
  is_read?: boolean;
};

export type CourseManagement = {
  course: Course;
  current_semester: string;
  current_session: string;
  course_stats: {
    total_students: number;
    assignments_count: number;
    announcements_count: number;
    pending_grades: number;
    attendance_rate: number;
  };
};

export type Assignment = {
  id: number;
  course: Course;
  course_id: number;
  title: string;
  description: string;
  assignment_type: 'text' | 'file' | 'url' | 'mixed';
  max_points: number;
  due_date: string;
  created_by: LecturerProfile;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  submissions_count: number;
};

export type AssignmentSubmission = {
  id: number;
  assignment: Assignment;
  student: StudentProfile;
  text_content: string | null;
  file_upload: string | null;
  url_submission: string | null;
  status: 'draft' | 'submitted' | 'graded' | 'late';
  submitted_at: string | null;
  grade: number | null;
  feedback: string | null;
  graded_by: LecturerProfile | null;
  graded_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CourseAssignments = {
  course: {
    id: number;
    code: string;
    title: string;
  };
  assignments: Assignment[];
  total_assignments: number;
};

export type CourseStudent = {
  id: number;
  full_name: string;
  matric_number: string;
  department: string | null;
  level: string | null;
  cgpa: number | null;
  grade: string | null;
  grade_point: number | null;
};

export type CourseStudents = {
  course: Course;
  current_semester: string;
  current_session: string;
  total_students: number;
  students: CourseStudent[];
};

export type CourseAnnouncements = {
  course: {
    id: number;
    code: string;
    title: string;
  };
  total_announcements: number;
  announcements: Announcement[];
};

export type GeneralAnnouncements = {
  total_announcements: number;
  announcements: Announcement[];
};