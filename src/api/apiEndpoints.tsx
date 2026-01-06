import { Course, LoginData, RegisteredCourses, StudentOverview, LecturerOverview, LmsOverview, CourseManagement, Assignment, CourseAssignments, User, CreateUser, CourseStudents, CourseAnnouncements, GeneralAnnouncements, Announcement } from "@/types";
import apiClient from "./apiClient"
import { CreateUserData } from "../types";


export const login =  async (data: LoginData): Promise<unknown> => {
    const res = await apiClient.post("/login", data);
    return res.data
} 

export const createUser =  async (data:  Partial<CreateUser>): Promise<unknown> => {
    const res = await apiClient.post("/auth/create-user/", data);
    return res.data
}

export const getCreateUserData =  async (): Promise<CreateUserData> => {
    const res = await apiClient.get("/auth/create-user/");
    return res.data
}

export const logout =  async (): Promise<unknown> => {
    const res = await apiClient.post("/logout");
    return res.data
} 

export const getUser =  async (): Promise<User> => {
    const res = await apiClient.get("/user");
    return res.data
}

export const getStudentOverview =  async (): Promise<StudentOverview> => {
    const res = await apiClient.get("/student/overview/");
    return res.data
}

export const getLecturerOverview =  async (): Promise<LecturerOverview> => {
    const res = await apiClient.get("/lecturer/overview/");
    return res.data
}

export const getAssignedCourses =  async (): Promise<LmsOverview> => {
    const res = await apiClient.get("/lecturer/lms-overview/");
    return res.data
}

export const getAllAssignments = async (): Promise<AllAssignmentsOverview> => {
    const res = await apiClient.get("/lecturer/assignments/");
    return res.data;
}

// Student LMS API Endpoints
export const getStudentLmsOverview = async (): Promise<StudentLmsOverview> => {
    const res = await apiClient.get("/student/lms-overview/");
    return res.data;
}

export const getStudentAssignments = async (): Promise<StudentAssignmentsOverview> => {
    const res = await apiClient.get("/student/assignments/");
    return res.data;
}

export const getStudentGrades = async (): Promise<StudentGradesOverview> => {
    const res = await apiClient.get("/student/grades/");
    return res.data;
}

export const getStudentAnnouncements = async (): Promise<StudentAnnouncementsOverview> => {
    const res = await apiClient.get("/student/announcements/");
    return res.data;
}

export const getStudentCourseDetails = async (courseId: number): Promise<StudentCourseDetails> => {
    const res = await apiClient.get(`/student/course/${courseId}/`);
    return res.data;
}

export const getStudentAssignmentDetails = async (assignmentId: number): Promise<StudentAssignmentDetails> => {
    const res = await apiClient.get(`/student/assignment/${assignmentId}/`);
    return res.data;
}

export const submitAssignment = async (assignmentId: number, submissionData: any): Promise<any> => {
    const res = await apiClient.post(`/student/assignment/${assignmentId}/submit/`, submissionData);
    return res.data;
}

export const getAvailableCourses = async (search?: string): Promise<Course[]> => {
    const url = search ? `/student/register-courses/?search=${encodeURIComponent(search)}` : '/student/register-courses/';
  
    const res = await apiClient.get(url); 
    return res.data; 
};

export const registerCourses =  async (data: { course_codes: string[]}): Promise<unknown> => {
    const res = await apiClient.post("/student/register-courses/", data);
    return res.data
} 

export const registeredCourses =  async (): Promise<RegisteredCourses> => {
    const res = await apiClient.get("/student/registered-courses/");
    return res.data
}

export const getCourseManagement = async (courseId: number): Promise<CourseManagement> => {
    const res = await apiClient.get(`/lecturer/course/${courseId}/`);
    return res.data;
}

export const getCourseAssignments = async (courseId: number): Promise<CourseAssignments> => {
    const res = await apiClient.get(`/lecturer/course/${courseId}/assignments/`);
    return res.data;
}

export const createAssignment = async (courseId: number, assignmentData: Partial<Assignment>): Promise<Assignment> => {
    const res = await apiClient.post(`/lecturer/course/${courseId}/assignments/`, assignmentData);
    return res.data.assignment;
}

export const getAssignment = async (courseId: number, assignmentId: number): Promise<{ assignment: Assignment }> => {
    const res = await apiClient.get(`/lecturer/course/${courseId}/assignments/${assignmentId}/`);
    return res.data;
}

export const updateAssignment = async (courseId: number, assignmentId: number, assignmentData: Partial<Assignment>): Promise<Assignment> => {
    const res = await apiClient.put(`/lecturer/course/${courseId}/assignments/${assignmentId}/`, assignmentData);
    return res.data.assignment;
}

export const deleteAssignment = async (courseId: number, assignmentId: number): Promise<void> => {
    await apiClient.delete(`/lecturer/course/${courseId}/assignments/${assignmentId}/`);
}

export const getCourseStudents = async (courseId: number): Promise<CourseStudents> => {
    const res = await apiClient.get(`/lecturer/course/${courseId}/students/`);
    return res.data;
}

export const getCourseAnnouncements = async (courseId: number): Promise<CourseAnnouncements> => {
    const res = await apiClient.get(`/lecturer/course/${courseId}/announcements/`);
    return res.data;
}

export const getGeneralAnnouncements = async (): Promise<GeneralAnnouncements> => {
    const res = await apiClient.get(`/lecturer/announcements/`);
    return res.data;
}

export const createCourseAnnouncement = async (courseId: number, data: { title: string; content: string }): Promise<Announcement> => {
    const res = await apiClient.post(`/lecturer/course/${courseId}/announcements/`, data);
    return res.data.announcement;
}

export const createGeneralAnnouncement = async (data: { title: string; content: string; course_id?: number }): Promise<Announcement> => {
    const res = await apiClient.post(`/lecturer/announcements/`, data);
    return res.data.announcement;
}

