import { Grid, GridProps } from "@chakra-ui/react";
import StatsCard, { StatItem } from "./StatsCard";

export type { StatItem };

interface StatsCardGridProps extends GridProps {
  stats: StatItem[];
}

export default function StatsCardGrid({ 
  stats, 
  templateColumns = { base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" },
  gap = 5,
  ...rest 
}: StatsCardGridProps) {
  return (
    <Grid templateColumns={templateColumns} gap={gap} {...rest}>
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </Grid>
  );
}

