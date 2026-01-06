import React from 'react';
import { TbBooks, TbTrendingUp, TbAward, TbCheck } from "react-icons/tb";
import StatsCardGrid, { StatItem } from "@/components/Generals/StatsCardGrid";

interface GradesStatsProps {
  totalCourses: number;
  currentGpa: number;
  totalCredits: number;
  completedCredits: number;
  currentSemester: string;
  currentSession: string;
}

const GradesStats: React.FC<GradesStatsProps> = ({
  totalCourses,
  currentGpa,
  totalCredits,
  completedCredits
}) => {
  const stats: StatItem[] = [
    {
      title: "Total Courses",
      value: totalCourses,
      subtitle: "Enrolled courses",
      icon: TbBooks,
      color: "blue.500",
    },
    {
      title: "Current GPA",
      value: currentGpa.toFixed(2),
      subtitle: "Grade point average",
      icon: TbTrendingUp,
      color: "green.500",
    },
    {
      title: "Total Credits",
      value: totalCredits,
      subtitle: "Credit hours",
      icon: TbAward,
      color: "purple.500",
    },
    {
      title: "Completed Credits",
      value: completedCredits,
      subtitle: "Earned credits",
      icon: TbCheck,
      color: "orange.500",
    }
  ];

  return <StatsCardGrid stats={stats} />;
};

export default GradesStats;