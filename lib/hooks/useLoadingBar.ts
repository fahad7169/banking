'use client'
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const useLoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setProgress(100);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  const handleLinkClick = () => {
    setProgress(30);
    
    // Simulate loading progression
    setTimeout(() => {
      setProgress(50);
    }, 200);

    setTimeout(() => {
      setProgress(70);
    }, 400);

    setTimeout(() => {
      setProgress(80);
    }, 600);
  };

  const setProgress1 = (progress: number) => {
    setProgress(progress);
  };

  // Return the current progress and the click handler
  return { progress, handleLinkClick, setProgress1 };
};

export default useLoadingBar;
