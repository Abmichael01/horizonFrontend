import { Box, Text, Flex } from "@chakra-ui/react";
import { TbSchool } from "react-icons/tb";

interface DataLoadingProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}


export default function DataLoading({ 
  text = "Loading data...", 
  size = "md" 
}: DataLoadingProps) {
  const sizeConfig = {
    sm: {
      capSize: "24px",
      borderSize: "2px",
      textSize: "sm",
      gap: "8px"
    },
    md: {
      capSize: "32px",
      borderSize: "3px",
      textSize: "md",
      gap: "12px"
    },
    lg: {
      capSize: "40px",
      borderSize: "4px",
      textSize: "lg",
      gap: "16px"
    }
  };

  const config = sizeConfig[size];

  return (
    <Flex 
      align="center" 
      justify="center" 
      gap={config.gap}
      p={4}
    >
      <Box position="relative">
        {/* Rotating border loader */}
        <Box
          position="absolute"
          top="-2px"
          left="-2px"
          right="-2px"
          bottom="-2px"
          border={config.borderSize}
          borderColor="transparent"
          borderTopColor="primary.500"
          borderRightColor="primary.500"
          borderRadius="50%"
          animation={`1s linear infinite`}
          className="animation-spin"
        />
        
        {/* Graduation cap icon */}
        <TbSchool 
          fontSize={config.capSize} 
          color="var(--chakra-colors-primary-500)" 
        />
      </Box>
      
      {/* Loading text */}
      <Text 
        fontSize={config.textSize} 
        color="gray.600"
        fontWeight={400}
      >
        {text}
      </Text>
    </Flex>
  );
}
