import React from 'react';
import { Course, StudentProfile } from "@/types";

interface CourseFormSVGProps {
    courses: Course[];
    studentProfile: StudentProfile;
    currentSemester: string;
    currentSession: string;
    totalUnits: number;
}

export default function CourseFormSVG({ 
    courses, 
    studentProfile, 
    currentSemester, 
    currentSession,
    totalUnits 
}: CourseFormSVGProps) {
    const svgWidth = 794; // A4 width in pixels at 96 DPI
    const svgHeight = Math.max(1123, 420 + (courses.length * 30) + 70 + 250); // Dynamic height: header + courses + signatures + footer

    return (
        <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{
                backgroundColor: 'white',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            {/* Background */}
            <rect width={svgWidth} height={svgHeight} fill="white" />
            
            {/* Header Section with Decorative Elements */}
            <g id="header">
                {/* Top border decoration */}
                <rect x="0" y="0" width={svgWidth} height="8" fill="#1e88e5" />
                
                {/* University Logo/Seal Circle */}
                <circle cx={svgWidth / 2} cy="60" r="40" fill="#e3f2fd" stroke="#1e88e5" strokeWidth="3" />
                <text
                    x={svgWidth / 2}
                    y="70"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#1e88e5"
                >
                    HU
                </text>
                
                {/* University Name */}
                <text
                    x={svgWidth / 2}
                    y="130"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="#333"
                >
                    HORIZON UNIVERSITY
                </text>
                
                {/* Form Title */}
                <text
                    x={svgWidth / 2}
                    y="155"
                    textAnchor="middle"
                    fontSize="16"
                    fill="#666"
                >
                    Course Registration Form
                </text>
                
                {/* Session Info */}
                <text
                    x={svgWidth / 2}
                    y="175"
                    textAnchor="middle"
                    fontSize="12"
                    fill="#999"
                >
                    {currentSession} • {currentSemester}
                </text>
                
                {/* Decorative line */}
                <line x1="60" y1="190" x2={svgWidth - 60} y2="190" stroke="#1e88e5" strokeWidth="2" />
            </g>

            {/* Student Information Section */}
            <g id="student-info">
                {/* Section Title */}
                <rect x="60" y="210" width="674" height="25" fill="#f5f5f5" />
                <text x="70" y="227" fontSize="14" fontWeight="bold" fill="#333">
                    STUDENT INFORMATION
                </text>
                
                {/* Info Fields */}
                <text x="70" y="255" fontSize="12" fill="#666">Full Name:</text>
                <text x="200" y="255" fontSize="12" fontWeight="bold" fill="#333">{studentProfile.full_name}</text>
                
                <text x="70" y="275" fontSize="12" fill="#666">Matric Number:</text>
                <text x="200" y="275" fontSize="12" fontWeight="bold" fill="#333">{studentProfile.matric_number}</text>
                
                <text x="70" y="295" fontSize="12" fill="#666">Department:</text>
                <text x="200" y="295" fontSize="12" fontWeight="bold" fill="#333">{studentProfile.department?.name || 'N/A'}</text>
                
                <text x="70" y="315" fontSize="12" fill="#666">Level:</text>
                <text x="200" y="315" fontSize="12" fontWeight="bold" fill="#333">{studentProfile.level?.name || 'N/A'}</text>
            </g>

            {/* Courses Table Section */}
            <g id="courses-table">
                {/* Section Title */}
                <rect x="60" y="340" width="674" height="25" fill="#f5f5f5" />
                <text x="70" y="357" fontSize="14" fontWeight="bold" fill="#333">
                    REGISTERED COURSES
                </text>
                
                {/* Table Header */}
                <rect x="60" y="375" width="674" height="30" fill="#1e88e5" />
                <text x="80" y="395" fontSize="11" fontWeight="bold" fill="white">S/N</text>
                <text x="130" y="395" fontSize="11" fontWeight="bold" fill="white">Course Code</text>
                <text x="250" y="395" fontSize="11" fontWeight="bold" fill="white">Course Title</text>
                <text x="680" y="395" fontSize="11" fontWeight="bold" fill="white" textAnchor="end">Units</text>
                
                {/* Table Rows */}
                {courses.map((course, index) => {
                    const yPosition = 420 + (index * 30);
                    const isEven = index % 2 === 0;
                    
                    // Truncate long titles
                    const maxTitleLength = 45;
                    const displayTitle = course.title.length > maxTitleLength 
                        ? course.title.substring(0, maxTitleLength) + '...'
                        : course.title;
                    
                    return (
                        <g key={course.id}>
                            {/* Alternating row background */}
                            {isEven && <rect x="60" y={yPosition - 14} width="674" height="28" fill="#fafafa" />}
                            
                            <text x="85" y={yPosition} fontSize="11" fill="#666">{index + 1}</text>
                            <text x="135" y={yPosition} fontSize="11" fontWeight="600" fill="#333">{course.code}</text>
                            <text x="255" y={yPosition} fontSize="11" fill="#333">{displayTitle}</text>
                            <text x="705" y={yPosition} fontSize="11" fontWeight="600" fill="#333" textAnchor="end">{course.units}</text>
                            
                            {/* Row separator */}
                            <line x1="60" y1={yPosition + 8} x2="734" y2={yPosition + 8} stroke="#e0e0e0" strokeWidth="0.5" />
                        </g>
                    );
                })}
                
                {/* Total Units Row */}
                {(() => {
                    const totalYPosition = 420 + (courses.length * 30) + 20;
                    return (
                        <g>
                            <rect x="60" y={totalYPosition - 15} width="674" height="30" fill="#e3f2fd" />
                            <text x="580" y={totalYPosition} fontSize="13" fontWeight="bold" fill="#1e88e5">
                                Total Units:
                            </text>
                            <text x="705" y={totalYPosition} fontSize="13" fontWeight="bold" fill="#1e88e5" textAnchor="end">
                                {totalUnits}
                            </text>
                        </g>
                    );
                })()}
            </g>

            {/* Signatures Section */}
            {(() => {
                const signaturesYStart = 420 + (courses.length * 30) + 70;
                return (
                    <g id="signatures">
                        {/* Section Title */}
                        <rect x="60" y={signaturesYStart} width="674" height="25" fill="#f5f5f5" />
                        <text x="70" y={signaturesYStart + 17} fontSize="14" fontWeight="bold" fill="#333">
                            SIGNATURES
                        </text>
                        
                        {/* Student Signature */}
                        <line x1="80" y1={signaturesYStart + 70} x2="320" y2={signaturesYStart + 70} stroke="#333" strokeWidth="1" />
                        <text x="80" y={signaturesYStart + 85} fontSize="10" fill="#666">Student's Signature</text>
                        <text x="80" y={signaturesYStart + 100} fontSize="9" fill="#999">Date: ______________</text>
                        
                        {/* Academic Adviser Signature */}
                        <line x1="420" y1={signaturesYStart + 70} x2="660" y2={signaturesYStart + 70} stroke="#333" strokeWidth="1" />
                        <text x="420" y={signaturesYStart + 85} fontSize="10" fill="#666">Academic Adviser's Signature</text>
                        <text x="420" y={signaturesYStart + 100} fontSize="9" fill="#999">Date: ______________</text>
                        
                        {/* HOD Signature */}
                        <line x1="80" y1={signaturesYStart + 140} x2="320" y2={signaturesYStart + 140} stroke="#333" strokeWidth="1" />
                        <text x="80" y={signaturesYStart + 155} fontSize="10" fill="#666">HOD's Signature</text>
                        <text x="80" y={signaturesYStart + 170} fontSize="9" fill="#999">Date: ______________</text>
                        
                        {/* Registrar Signature */}
                        <line x1="420" y1={signaturesYStart + 140} x2="660" y2={signaturesYStart + 140} stroke="#333" strokeWidth="1" />
                        <text x="420" y={signaturesYStart + 155} fontSize="10" fill="#666">Registrar's Signature</text>
                        <text x="420" y={signaturesYStart + 170} fontSize="9" fill="#999">Date: ______________</text>
                    </g>
                );
            })()}

            {/* Footer */}
            {(() => {
                const footerY = svgHeight - 30;
                return (
                    <g id="footer">
                        <line x1="60" y1={footerY - 10} x2={svgWidth - 60} y2={footerY - 10} stroke="#e0e0e0" strokeWidth="1" />
                        <text
                            x={svgWidth / 2}
                            y={footerY}
                            textAnchor="middle"
                            fontSize="9"
                            fill="#999"
                        >
                            Generated on: {new Date().toLocaleDateString()} • Horizon University Registration System
                        </text>
                    </g>
                );
            })()}
        </svg>
    );
}
