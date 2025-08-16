import { LoginData } from "@/types";
import apiClient from "./apiClient"


export const login =  async (data: LoginData): Promise<{ key: string }> => {
    const res = await apiClient.post("/login", data);
    return res.data
} 

export const getUser =  async (): Promise<unknown> => {
    const res = await apiClient.get("/user");
    return res.data
}