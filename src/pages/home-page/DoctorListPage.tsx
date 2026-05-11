import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';

const doctorsList: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'Senior Cardiologist', schedule: 'Minimally invasive procedures', imageUrl: 'https://placehold.co/400x400' },
  { id: '2', name: 'Dr. James Wilson', specialty: 'Chief Neurologist', schedule: 'Neurodegenerative disorders', imageUrl: 'https://placehold.co/400x400' },
  { id: '3', name: 'Dr. Elena Rodriguez', specialty: 'Pediatric Specialist', schedule: 'Holistic child healthcare', imageUrl: 'https://placehold.co/400x400' },
];

export const DoctorListPage: React.FC = () => {
  return (
    <div className="bg-light min-vh-100 font-manrope">
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <div className="container py-5">
          <div className="row align-items-end mb-5 g-4">
            <div className="col-md-7">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb mb-0 fw-semibold">
                  <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                  <li className="breadcrumb-item active text-st-primary">Doctors</li>
                </ol>
              </nav>
              <h1 className="display-4 fw-bold text-st-primary mb-0">Our Medical Specialists</h1>
            </div>
            <div className="col-md-5">
              <div className="input-group shadow-sm border-0 rounded-3 overflow-hidden">
                <span className="input-group-text bg-white border-0 px-3">
                  <span className="material-symbols-outlined text-muted">search</span>
                </span>
                <input type="text" className="form-control border-0 py-3" placeholder="Search by name or specialty..." />
              </div>
            </div>
          </div>

          <div className="row g-4">
            {doctorsList.map(doctor => (
              <div key={doctor.id} className="col-md-6 col-lg-4">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};