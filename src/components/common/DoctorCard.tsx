import React from 'react';
import type { Doctor } from '../../types/models/Doctor';
import { useNavigate } from 'react-router-dom';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="card h-100 border-0 shadow-sm p-4 text-center hover-border-st-secondary transition-all" style={{ borderRadius: '1rem' }}>
      <div className="position-relative mx-auto mb-4" style={{ width: '160px', height: '160px' }}>
        <div className="position-absolute w-100 h-100 rounded-circle border border-2 border-opacity-25" style={{ borderColor: 'var(--st-secondary)' }}></div>
        <img className="w-100 h-100 object-fit-cover rounded-circle p-1" src={doctor.imageUrl} alt={doctor.name} />
      </div>
      <h3 className="fs-4 fw-semibold text-st-primary mb-1">{doctor.name}</h3>
      <p className="small fw-bold text-st-secondary text-uppercase tracking-wider mb-3">{doctor.specialty}</p>
      <p className="text-muted mb-4 flex-grow-1">{doctor.schedule || "Specializing in comprehensive and preventative care."}</p>
      <button 
        className="btn btn-st-secondary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2 rounded-3 mt-auto"
        onClick={() => navigate('/login')}
      >
        <i className="bi bi-calendar-check"></i> Login to Book
      </button>
    </div>
  );
};