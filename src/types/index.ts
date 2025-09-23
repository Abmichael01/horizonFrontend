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