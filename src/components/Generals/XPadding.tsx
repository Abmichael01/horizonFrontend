import { cn } from "@/lib/utils";
import { Box, type BoxProps } from "@chakra-ui/react";

type XPaddingProps = BoxProps & { // Use BoxProps here to type the props correctly
  children: React.ReactNode;
  className?: string;
};

export default function XPadding({ children, className, ...rest }: XPaddingProps) {
  return (
    <Box
      px={[4, 5, 10, 20]} // Default padding values from Chakra UI's `Box`
      className={cn(
        "px-5 sm:px-6 lg:px-10", // Tailwind classes for padding
        className // Allows custom classes to override or extend
      )}
      {...rest} // Spread the rest of the props here (like `style`, `onClick`, etc.)
    >
      {children}
    </Box>
  );
}
