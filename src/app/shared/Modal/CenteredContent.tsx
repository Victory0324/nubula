'use client';
import { useState, useEffect } from 'react';

export default function CenteredModalContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    setOpacity('opacity-100');
  }, []);

  return (
    <div
      style={{
        backdropFilter: 'blur(9px)',
        WebkitBackdropFilter: 'blur(9px)',
      }}
      className={`
        bg-gray-1e 
        m-auto
        min-w-[300px]
        max-w-2xl

        flex
        flex-col
        items-center

        border
        border-purple-9a 

        rounded-2xl

        transition-opacity
        duration-1000
        ${opacity}
        
        ${className}
    `}
    >
      {children}
    </div>
  );
}
