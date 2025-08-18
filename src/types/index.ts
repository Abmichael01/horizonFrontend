export type LoginData = {
  email: string;
  password: string;
};

export type User = {
  email: string;
  date_joined: string;
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