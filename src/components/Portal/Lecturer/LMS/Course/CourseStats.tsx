import { TbUsers, TbClipboardList, TbCheck, TbUserCheck } from "react-icons/tb";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface CourseStatsProps {
    courseStats: {
        total_students: number;
        assignments_count: number;
        announcements_count: number;
        pending_grades: number;
        attendance_rate: number;
    };
}

export default function CourseStats({ courseStats }: CourseStatsProps) {
    const statsCards: StatItem[] = [
        {
            title: "Total Students",
            value: courseStats.total_students,
            icon: TbUsers,
            color: "blue.500",
            iconBg: "blue.50",
        },
        {
            title: "Assignments",
            value: courseStats.assignments_count,
            icon: TbClipboardList,
            color: "green.500",
            iconBg: "green.50",
        },
        {
            title: "Pending Grades",
            value: courseStats.pending_grades,
            icon: TbCheck,
            color: "red.500",
            iconBg: "red.50",
        },
        {
            title: "Attendance Rate",
            value: `${courseStats.attendance_rate}%`,
            icon: TbUserCheck,
            color: "purple.500",
            iconBg: "purple.50",
        },
    ];

    return <StatsCardGrid stats={statsCards} templateColumns="repeat(4, 1fr)" gap={4} />;
}
