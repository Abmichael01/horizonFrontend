import { useState, useEffect } from 'react';

interface UseTableWidthOptions {
  sidebarWidth?: number;
  containerPadding?: number;
  additionalMargin?: number;
}

export function useTableWidth(options: UseTableWidthOptions = {}) {
  const {
    sidebarWidth = 280, // Default sidebar width
    containerPadding = 40, // 20px padding on each side
    additionalMargin = 40, // Additional margin for safety
  } = options;

  const [tableWidth, setTableWidth] = useState<string>('100%');

  useEffect(() => {
    const calculateWidth = () => {
      const viewportWidth = window.innerWidth;
      const availableWidth = viewportWidth - sidebarWidth - containerPadding - additionalMargin;
      
      // Ensure minimum width
      const minWidth = 600;
      const finalWidth = Math.max(availableWidth, minWidth);
      
      setTableWidth(`${finalWidth}px`);
    };

    // Calculate on mount
    calculateWidth();

    // Recalculate on resize
    window.addEventListener('resize', calculateWidth);
    
    return () => window.removeEventListener('resize', calculateWidth);
  }, [sidebarWidth, containerPadding, additionalMargin]);

  return tableWidth;
}

// Alternative: Use CSS custom properties
export function useTableWidthCSS() {
  return {
    maxW: 'calc(100vw - 320px)', // 280px sidebar + 40px padding/margin
    w: '100%',
  };
}
