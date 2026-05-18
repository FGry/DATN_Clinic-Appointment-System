import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';

const deptDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'Senior Cardiologist', schedule: 'Mon - Fri: 08:00 - 17:00', imageUrl: 'https://placehold.co/400x400' },
];

export const DepartmentPage: React.FC = () => {
  return (
    <div className="bg-white min-vh-100 font-manrope">
      <Header />
      <main style={{ paddingTop: '80px' }}>
        {/* Specialty Hero Banner */}
        <section className="position-relative py-5 bg-st-primary text-white overflow-hidden" style={{ minHeight: '400px' }}>
           <div className="position-absolute inset-0 z-0 opacity-25">
             <img src="https://placehold.co/1920x600" className="w-100 h-100 object-fit-cover" alt="Banner" />
           </div>
           <div className="container position-relative z-1 py-5">
             <Link to="/specialties" className="btn btn-link text-st-secondary p-0 mb-4 fw-bold text-decoration-none d-flex align-items-center gap-2">
               <span className="material-symbols-outlined">arrow_back</span> BACK TO SPECIALTIES
             </Link>
             <h1 className="display-3 fw-bold mb-4">Cardiovascular Center</h1>
             <p className="fs-5 opacity-75 max-w-700">
               Redefining excellence in medical care through technology and compassion. Leading the industry in cardiovascular research and patient outcomes.
             </p>
           </div>
        </section>

        {/* Focus Areas & Doctors */}
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <h2 className="fw-bold text-st-primary mb-4">Meet Our Experts</h2>
              <div className="row g-4">
                {deptDoctors.map(doctor => (
                  <div key={doctor.id} className="col-md-6">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                <h4 className="fw-bold text-st-primary mb-3">Our Expertise</h4>
                <ul className="list-unstyled space-y-3">
                  <li className="d-flex gap-3 align-items-start">
                    <span className="material-symbols-outlined text-st-secondary">check_circle</span>
                    <span>Advanced Electrophysiology</span>
                  </li>
                  <li className="d-flex gap-3 align-items-start border-top pt-2">
                    <span className="material-symbols-outlined text-st-secondary">check_circle</span>
                    <span>Interventional Cardiology</span>
                  </li>
                  <li className="d-flex gap-3 align-items-start border-top pt-2">
                    <span className="material-symbols-outlined text-st-secondary">check_circle</span>
                    <span>Heart Failure Management</span>
                  </li>
                </ul>
                <button className="btn btn-st-secondary w-100 mt-4 py-3 fw-bold rounded-3">BOOK CONSULTATION</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};