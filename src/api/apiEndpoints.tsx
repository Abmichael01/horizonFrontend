import { Course, LoginData, RegisteredCourses, StudentOverview, User, CreateUser } from "@/types";
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

