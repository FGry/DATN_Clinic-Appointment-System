import React from 'react';
import type { Doctor } from '../../types/models/Doctor';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="card h-100 shadow-sm border-0">
      <img src={doctor.imageUrl} className="card-img-top object-fit-cover" alt={doctor.name} style={{ height: '200px' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{doctor.name}</h5>
        <p className="card-text text-muted mb-2">{doctor.specialty}</p>
        <div className="d-flex align-items-center text-muted mb-4">
          <i className="bi bi-clock fs-6 me-2"></i>
          <small>{doctor.schedule}</small>
        </div>
        <div className="mt-auto">
          <Button variant="outline" fullWidth onClick={() => navigate('/login')}>Login to Book</Button>
        </div>
      </div>
    </div>
  );
};