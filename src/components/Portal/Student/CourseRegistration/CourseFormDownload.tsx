import React, { useRef } from 'react';
import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { TbDownload } from "react-icons/tb";
import { Course, StudentProfile } from "@/types";
import jsPDF from 'jspdf';
import CourseFormSVG from './CourseFormSVG';

interface CourseFormDownloadProps {
    courses: Course[];
    studentProfile: StudentProfile;
    currentSemester: string;
    currentSession: string;
    totalUnits: number;
}

export default function CourseFormDownload({ 
    courses, 
    studentProfile, 
    currentSemester, 
    currentSession,
    totalUnits 
}: CourseFormDownloadProps) {
    const svgRef = useRef<HTMLDivElement>(null);

    const handleDownloadPDF = async () => {
        if (!svgRef.current) {
            console.error('SVG ref not found');
            return;
        }
        
        const svgElement = svgRef.current.querySelector('svg');
        if (!svgElement) {
            console.error('SVG element not found');
            return;
        }

        try {
            // Create PDF
            const pdf = new jsPDF('p', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // Clone and prepare SVG
            const svgClone = svgElement.cloneNode(true) as SVGElement;
            
            // Convert SVG to data URL
            const svgString = new XMLSerializer().serializeToString(svgClone);
            const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);

            // Create canvas to render SVG
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            if (!ctx) {
                console.error('Canvas context not available');
                return;
            }

            // Set canvas dimensions based on SVG
            const svgWidth = svgClone.width.baseVal.value || 794;
            const svgHeight = svgClone.height.baseVal.value || 1123;
            canvas.width = svgWidth;
            canvas.height = svgHeight;

            // Create image from SVG
            const img = new Image();
            
            img.onload = () => {
                // Draw SVG on canvas
                ctx.drawImage(img, 0, 0);
                
                // Convert canvas to image data
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate dimensions to fit A4
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                // Add image to PDF
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                
                // Save PDF
                pdf.save(`Course_Registration_${studentProfile.matric_number}_${currentSemester}.pdf`);
                
                // Cleanup
                URL.revokeObjectURL(svgUrl);
            };
            
            img.onerror = (error) => {
                console.error('Error loading SVG as image:', error);
                URL.revokeObjectURL(svgUrl);
            };
            
            img.src = svgUrl;
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <VStack gap={4} align="stretch">
            {/* Download Button Section */}
            <Box
                bg="white"
                border="1px solid"
                borderColor="border"
                rounded="xl"
                p="20px"
            >
                <VStack gap={4}>
                    <Text fontSize="lg" fontWeight={600} color="gray.700">
                        Course Registration Form
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        Preview your course registration form below. Click the download button to save it as a PDF.
                    </Text>
                    
                    <Button
                        size="lg"
                        bg="primary.500"
                        color="white"
                        leftIcon={<TbDownload />}
                        onClick={handleDownloadPDF}
                        _hover={{ bg: "primary.600" }}
                    >
                        Download PDF
                    </Button>
                </VStack>
            </Box>

            {/* SVG Preview - Always Visible */}
                <Box
                    bg="white"
                    border="1px solid"
                    borderColor="border"
                    rounded="xl"
                    p="20px"
                    overflowX="auto"
                >
                    <Text fontSize="md" fontWeight={600} color="gray.700" mb={4}>
                        Form Preview
                    </Text>
                    <Box
                        ref={svgRef}
                        bg="gray.50"
                        p={4}
                        rounded="lg"
                        display="flex"
                        justifyContent="center"
                        overflowX="auto"
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
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#c1c1c1 #f1f1f1',
                        }}
                    >
                        <Box
                            bg="white"
                            boxShadow="lg"
                            maxW="794px"
                        >
                            <CourseFormSVG
                                courses={courses}
                                studentProfile={studentProfile}
                                currentSemester={currentSemester}
                                currentSession={currentSession}
                                totalUnits={totalUnits}
                            />
                        </Box>
                    </Box>
                </Box>
        </VStack>
    );
}
