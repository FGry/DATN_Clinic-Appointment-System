// src/pages/DoctorListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';

// Mock data: Danh sách bác sĩ
const doctorsList: Doctor[] = [
  { id: '1', name: 'Dr. James Sterling', specialty: 'Cardiologist', schedule: 'Mon - Fri • 08:00 - 17:00', imageUrl: 'https://placehold.co/400x300' },
  { id: '2', name: 'Dr. Sarah Chen', specialty: 'Pediatrician', schedule: 'Mon - Fri • 09:00 - 18:00', imageUrl: 'https://placehold.co/400x300' },
  { id: '3', name: 'Dr. Michael Ross', specialty: 'Neurologist', schedule: 'Mon - Thu • 10:00 - 19:00', imageUrl: 'https://placehold.co/400x300' },
  { id: '4', name: 'Dr. Elena Rodriguez', specialty: 'Dermatologist', schedule: 'Tue - Sat • 08:00 - 16:00', imageUrl: 'https://placehold.co/400x300' },
  { id: '5', name: 'Dr. Robert Wilson', specialty: 'Orthopedic Surgeon', schedule: 'Mon - Fri • 07:00 - 15:00', imageUrl: 'https://placehold.co/400x300' },
  { id: '6', name: 'Dr. Aisha Khan', specialty: 'Internal Medicine', schedule: 'Mon - Fri • 09:00 - 17:00', imageUrl: 'https://placehold.co/400x300' }
];

export const DoctorListPage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      
      <main className="container flex-grow-1 py-5">
        {/* Action Header: Nút Back & Thanh tìm kiếm */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-5">
          <div>
            <Link to="/" className="text-decoration-none fw-semibold d-flex align-items-center gap-2 group">
              <i className="bi bi-arrow-left fs-5"></i>
              <span className="text-primary hover-underline">Back to Home</span>
            </Link>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted fs-6"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 ps-0" 
                placeholder="Search doctor or specialty" 
                style={{ width: '250px' }}
              />
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="row g-4">
          {doctorsList.map(doctor => (
            <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};