import { ModalProps } from '@/types'
import React, { useEffect, useRef } from 'react'


const Modal : React.FC<ModalProps>= ({isOpen, onClose, children, className}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
              onClose();
            }
          };
      
          const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
          };
      
          if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
          }
      
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
          };
    }, [isOpen, onClose]);
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => e.stopPropagation()} >
      <div ref={modalRef} className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal