import React from 'react';
import { TbFileText, TbClock, TbCheck, TbAlertTriangle } from "react-icons/tb";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface AssignmentsStatsProps {
  totalAssignments: number;
  pendingAssignments: number;
  submittedAssignments: number;
  overdueAssignments: number;
  currentSemester: string;
  currentSession: string;
}

const AssignmentsStats: React.FC<AssignmentsStatsProps> = ({
  totalAssignments,
  pendingAssignments,
  submittedAssignments,
  overdueAssignments
}) => {
  const stats: StatItem[] = [
    {
      title: "Total Assignments",
      value: totalAssignments,
      subtitle: "All courses",
      icon: TbFileText,
      color: "blue.500",
    },
    {
      title: "Pending",
      value: pendingAssignments,
      subtitle: "Not submitted",
      icon: TbClock,
      color: "orange.500",
    },
    {
      title: "Submitted",
      value: submittedAssignments,
      subtitle: "Completed",
      icon: TbCheck,
      color: "green.500",
    },
    {
      title: "Overdue",
      value: overdueAssignments,
      subtitle: "Past due date",
      icon: TbAlertTriangle,
      color: "red.500",
    }
  ];

  return <StatsCardGrid stats={stats} />;
};

export default AssignmentsStats;
