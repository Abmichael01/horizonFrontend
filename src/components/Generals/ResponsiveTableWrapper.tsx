import { Box, BoxProps } from "@chakra-ui/react";

interface ResponsiveTableWrapperProps extends BoxProps {
    children: React.ReactNode;
    sidebarWidth?: number;
    containerPadding?: number;
}

export default function ResponsiveTableWrapper({ 
    children, 
    sidebarWidth = 280,
    containerPadding = 40,
    ...props 
}: ResponsiveTableWrapperProps) {
    // Calculate available width accounting for sidebar and padding
    const availableWidth = `calc(100vw - ${sidebarWidth + containerPadding + 40}px)`;
    
    return (
        <Box
            overflowX="auto"
            w="100%"
            maxW={availableWidth}
            css={{
                '&::-webkit-scrollbar': {
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#c1c1c1',
                    borderRadius: '10px',
                    '&:hover': {
                        background: '#a8a8a8',
                    },
                },
                // For Firefox
                scrollbarWidth: 'thin',
                scrollbarColor: '#c1c1c1 #f1f1f1',
            }}
            {...props}
        >
            {children}
        </Box>
    );
}
