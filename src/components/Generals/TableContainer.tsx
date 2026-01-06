import { Box, BoxProps } from "@chakra-ui/react";

interface TableContainerProps extends BoxProps {
    children: React.ReactNode;
    variant?: 'default' | 'compact' | 'full';
}

export default function TableContainer({ 
    children, 
    variant = 'default',
    ...props 
}: TableContainerProps) {
    const getMaxWidth = () => {
        switch (variant) {
            case 'compact':
                return 'calc(100vw - 200px)'; // Less margin for compact tables
            case 'full':
                return 'calc(100vw - 80px)'; // Minimal margin for full-width tables
            default:
                return 'calc(100vw - 320px)'; // Standard: sidebar + padding + margin
        }
    };

    return (
        <Box
            bg="white"
            border="1px solid"
            borderColor="border"
            rounded="xl"
            p="20px"
            w="100%"
            maxW="100%"
            {...props}
        >
            <Box
                overflowX="auto"
                w="100%"
                maxW={getMaxWidth()}
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
            >
                {children}
            </Box>
        </Box>
    );
}
