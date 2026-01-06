import { Flex, Box, Text, BoxProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface StatItem {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: IconType;
  color?: string;
  iconBg?: string;
}

interface StatsCardProps extends BoxProps {
  stat: StatItem;
}

export default function StatsCard({ stat, ...rest }: StatsCardProps) {
  const {
    title,
    value,
    subtitle,
    icon: Icon,
    color = "gray.700",
    iconBg = "gray.50",
  } = stat;

  return (
    <Flex
      bg="white"
      border="1px solid"
      borderColor="border"
      rounded="xl"
      p="20px"
      direction="column"
      justify="space-between"
      minH="120px"
      {...rest}
    >
      <Box>
        {Icon && (
          <Flex gap="2" align="center" mb={3}>
            <Box
              bg={iconBg}
              p="8px"
              rounded="lg"
              border="1px solid"
              borderColor="border"
            >
              <Icon fontSize="20px" color={color} />
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600">
                {title}
              </Text>
              {subtitle && (
                <Text fontSize="xs" color="gray.500">
                  {subtitle}
                </Text>
              )}
            </Box>
          </Flex>
        )}
        {!Icon && (
          <Box mb={3}>
            <Text fontSize="sm" color="gray.600" fontWeight={500}>
              {title}
            </Text>
          </Box>
        )}
      </Box>
      <Box mt="auto">
        <Text fontWeight={500} color={color} fontSize={Icon ? 28 : 24}>
          {value}
        </Text>
      </Box>
    </Flex>
  );
}

