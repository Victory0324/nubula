'use client';

import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  children?: React.ReactNode;
  close?: Function;
}

const Modal = ({ children, close }: ModalProps) => {
  const [backgroundClass, setBackgroundClass] = useState('bg-transparent');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBackgroundClass('bg-gray-13/90');
  }, []);

  return (
    <div
      ref={modalRef}
      className={`
        fixed
        top-0
        bottom-0
        left-0
        right-0
        z-[1000]
        flex
        h-screen

        transition-colors
        duration-1000

        ${backgroundClass}

      `}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          close && close();
        }
      }}
    >
      {children}
    </div>
  );
};

export default Modal;
