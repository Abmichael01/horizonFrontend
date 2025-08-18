import { Course, LoginData, StudentOverview } from "@/types";
import apiClient from "./apiClient"


export const login =  async (data: LoginData): Promise<unknown> => {
    const res = await apiClient.post("/login", data);
    return res.data
} 

export const logout =  async (): Promise<unknown> => {
    const res = await apiClient.post("/logout");
    return res.data
} 

export const getUser =  async (): Promise<unknown> => {
    const res = await apiClient.get("/user");
    return res.data
}

export const getStudentOverview =  async (): Promise<StudentOverview> => {
    const res = await apiClient.get("/student/overview/");
    return res.data
}

export const getAvailableCourses = async (search?: string): Promise<Course[]> => {
    const url = search ? `/student/available-courses/?search=${encodeURIComponent(search)}` : '/student/available-courses/';
  
    const res = await apiClient.get(url); 
    return res.data; 
  };

