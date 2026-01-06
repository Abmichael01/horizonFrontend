import { TbBooks, TbUsers, TbScale, TbClock, TbCheck, TbTrendingUp } from "react-icons/tb";
import { LmsOverview } from "@/types";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface LmsStatsProps {
    data: LmsOverview;
}

export default function LmsStats({ data }: LmsStatsProps) {
    // Detailed LMS Stats
    const lmsStats: StatItem[] = [
        {
            title: "Active Courses",
            value: data?.total_courses || 0,
            subtitle: "Currently teaching",
            icon: TbBooks,
            color: "blue.500",
        },
        {
            title: "Total Students",
            value: data?.total_students || 0,
            subtitle: "Enrolled students",
            icon: TbUsers,
            color: "green.500",
        },
        {
            title: "Course Units",
            value: data?.total_units || 0,
            subtitle: "Total workload",
            icon: TbScale,
            color: "purple.500",
        },
        {
            title: "Assignments Due",
            value: 3, // Mock data - will be real later
            subtitle: "This week",
            icon: TbClock,
            color: "orange.500",
        },
        {
            title: "Pending Grades",
            value: 12, // Mock data - will be real later
            subtitle: "Awaiting review",
            icon: TbCheck,
            color: "red.500",
        },
        {
            title: "Student Engagement",
            value: "87%", // Mock data - will be real later
            subtitle: "Average participation",
            icon: TbTrendingUp,
            color: "teal.500",
        },
    ];

    return <StatsCardGrid stats={lmsStats} templateColumns="repeat(3, 1fr)" />;
}
