import { TbBooks, TbClipboardList, TbCheck, TbTrendingUp } from "react-icons/tb";
import { StudentLmsOverview } from "@/types";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface LmsStatsProps {
    data: StudentLmsOverview;
}

export default function LmsStats({ data }: LmsStatsProps) {
    const stats: StatItem[] = [
        {
            title: "Enrolled Courses",
            value: data?.total_courses || 0,
            subtitle: "Current semester",
            icon: TbBooks,
            color: "blue.500",
        },
        {
            title: "Pending Assignments",
            value: data?.pending_assignments || 0,
            subtitle: "Need attention",
            icon: TbClipboardList,
            color: "orange.500",
        },
        {
            title: "Submitted Assignments",
            value: data?.submitted_assignments || 0,
            subtitle: "Completed",
            icon: TbCheck,
            color: "green.500",
        },
        {
            title: "Current GPA",
            value: data?.current_gpa ? data.current_gpa.toFixed(2) : "0.00",
            subtitle: "Academic performance",
            icon: TbTrendingUp,
            color: "purple.500",
        },
    ];

    return <StatsCardGrid stats={stats} />;
}
