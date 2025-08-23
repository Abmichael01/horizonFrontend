import { create } from 'zustand';
import { Course } from '@/types';

interface CourseStore {
  availableCourses: Course[];
  addedCourses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (courseCode: string) => void;
  setAvailableCourses: (courses: Course[]) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  availableCourses: [],
  addedCourses: [],
  addCourse: (course) =>
    set((state) => ({
      addedCourses: [...state.addedCourses, course],
      availableCourses: state.availableCourses.filter(
        (c) => c.code !== course.code
      ),
    })),
  removeCourse: (courseCode) =>
    set((state) => {
      const courseToRemove = state.addedCourses.find(
        (course) => course.code === courseCode
      );
      // Only add back the course if it exists
      const newAvailableCourses = courseToRemove
        ? [...state.availableCourses, courseToRemove]
        : [...state.availableCourses];
      // Sort only if both a and b are defined
      newAvailableCourses.sort((a, b) => a.code.localeCompare(b.code));
      return {
        addedCourses: state.addedCourses.filter((course) => course.code !== courseCode),
        availableCourses: newAvailableCourses,
      };
    }),
  setAvailableCourses: (courses) => set({ availableCourses: courses }),
}));
