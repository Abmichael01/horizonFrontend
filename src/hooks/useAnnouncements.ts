import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
    getCourseAnnouncements, 
    getGeneralAnnouncements, 
    createCourseAnnouncement, 
    createGeneralAnnouncement 
} from "@/api/apiEndpoints";
import { Announcement, CourseAnnouncements, GeneralAnnouncements } from "@/types";

// Hook for course-specific announcements
export function useCourseAnnouncements(courseId: number) {
    return useQuery({
        queryKey: ["course-announcements", courseId],
        queryFn: () => getCourseAnnouncements(courseId),
        enabled: !!courseId,
    });
}

// Hook for general announcements
export function useGeneralAnnouncements() {
    return useQuery({
        queryKey: ["general-announcements"],
        queryFn: getGeneralAnnouncements,
    });
}

// Hook for creating course announcement
export function useCreateCourseAnnouncement(courseId: number) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { title: string; content: string }) => 
            createCourseAnnouncement(courseId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course-announcements", courseId] });
        },
    });
}

// Hook for creating general announcement
export function useCreateGeneralAnnouncement() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { title: string; content: string; course_id?: number }) => 
            createGeneralAnnouncement(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["general-announcements"] });
            // If course-specific, also invalidate that course's announcements
            if (variables.course_id) {
                queryClient.invalidateQueries({ queryKey: ["course-announcements", variables.course_id] });
            }
        },
    });
}

