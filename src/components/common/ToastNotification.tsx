import React, { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastNotificationProps {
  show: boolean;
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ 
  show, 
  message, 
  type, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgClasses = {
    success: 'bg-success bg-opacity-75 text-white',
    error: 'bg-danger bg-opacity-75 text-white',
    warning: 'bg-warning bg-opacity-75 text-dark',
    info: 'bg-info bg-opacity-75 text-dark'
  };

  const iconClasses = {
    success: 'bi-check-circle-fill',
    error: 'bi-exclamation-triangle-fill',
    warning: 'bi-exclamation-circle-fill',
    info: 'bi-info-circle-fill'
  };

  return (
    <div 
      className={`toast show shadow-lg position-fixed top-0 start-50 translate-middle-x mt-4 rounded-pill border-0 ${bgClasses[type]}`}
      style={{ zIndex: 1080, width: 'max-content', maxWidth: '90vw', backdropFilter: 'blur(10px)' }}
      role="alert" 
      aria-live="assertive" 
      aria-atomic="true"
    >
      <div className="d-flex align-items-center w-100">
        <div className="toast-body d-flex align-items-center justify-content-center gap-2 fw-medium py-2 ps-4 pe-3 m-0">
          <i className={`bi ${iconClasses[type]} fs-5`}></i>
          <span className="text-center">{message}</span>
        </div>
        <button 
          type="button" 
          className={`btn-close me-3 ms-2 ${type === 'success' || type === 'error' ? 'btn-close-white' : ''}`} 
          onClick={onClose}
          aria-label="Close"
          style={{ transform: 'scale(0.8)' }}
        ></button>
      </div>
    </div>
  );
};
