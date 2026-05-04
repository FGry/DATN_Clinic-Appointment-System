import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { DoctorCard } from '../components/common/DoctorCard';
import type { Doctor } from '../types/models/Doctor';

const departmentDoctors: Doctor[] = [
  { id: '1', name: 'Dr. James Wilson', specialty: 'Cardiologist', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' },
  { id: '2', name: 'Dr. Sarah Chen', specialty: 'Pediatrician', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' },
  { id: '3', name: 'Dr. Michael Ross', specialty: 'Neurologist', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' }
];

export const DepartmentPage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">
      <Header />
      
      <main className="container flex-grow-1 py-5">
        <div className="mb-5">
          <Link to="/" className="text-decoration-none fw-semibold d-inline-flex align-items-center gap-2 text-primary">
            <i className="bi bi-arrow-left fs-5"></i>
            Back to Home
          </Link>
        </div>

        <div className="mb-5" style={{ maxWidth: '800px' }}>
          <h1 className="display-5 fw-bold mb-3 text-dark">Cardiology Department</h1>
          <p className="lead text-muted" style={{ lineHeight: '1.8' }}>
            Our cardiology department provides comprehensive care for heart-related conditions, utilizing the latest diagnostic tools and treatment options. We are dedicated to delivering excellence in cardiac health through prevention, diagnosis, and advanced therapeutic interventions.
          </p>
        </div>

        <div className="row g-4">
          {departmentDoctors.map(doctor => (
            <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
