import { TbClipboardList, TbEye, TbEyeOff, TbFileText } from "react-icons/tb";
import { AllAssignmentsOverview } from "@/types";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface AssignmentsStatsProps {
    data: AllAssignmentsOverview;
}

export default function AssignmentsStats({ data }: AssignmentsStatsProps) {
    const stats: StatItem[] = [
        {
            title: "Total Assignments",
            value: data.total_assignments,
            subtitle: "All courses",
            icon: TbClipboardList,
            color: "blue.500",
        },
        {
            title: "Published",
            value: data.published_assignments,
            subtitle: "Live assignments",
            icon: TbEye,
            color: "green.500",
        },
        {
            title: "Drafts",
            value: data.draft_assignments,
            subtitle: "In preparation",
            icon: TbEyeOff,
            color: "orange.500",
        },
        {
            title: "Assignment Types",
            value: Object.keys(data.assignment_types).length,
            subtitle: "Different formats",
            icon: TbFileText,
            color: "purple.500",
        },
    ];

    return <StatsCardGrid stats={stats} />;
}
