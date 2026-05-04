import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';

const topDoctors: Doctor[] = [
  { id: '1', name: 'Dr. James Wilson', specialty: 'Cardiologist', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' },
  { id: '2', name: 'Dr. Sarah Chen', specialty: 'Pediatrician', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' },
  { id: '3', name: 'Dr. Michael Ross', specialty: 'Neurologist', schedule: 'Mon - Fri: 08:00 AM - 04:00 PM', imageUrl: 'https://placehold.co/400x300' }
];

const specialties = [
  { icon: 'heart-pulse', name: 'Cardiology' }, { icon: 'lightning-charge', name: 'Neurology' },
  { icon: 'emoji-smile', name: 'Pediatrics' }, { icon: 'bandaid', name: 'Dentistry' },
  { icon: 'brightness-high', name: 'Dermatology' }, { icon: 'puzzle', name: 'Psychology' },
];

export const HomePage: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />
      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-8 py-5">
              <h1 className="display-4 fw-bold mb-3">Your Health, Simplified</h1>
              <p className="lead text-muted mb-4">Book appointments with top-rated medical professionals in your neighborhood within minutes.</p>
              <div className="input-group input-group-lg shadow-sm">
                <span className="input-group-text bg-white"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control border-start-0 border-end-0" placeholder="Search doctors, specialties..." />
                <button className="btn btn-primary px-4">Search</button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="bg-white py-5 border-top border-bottom">
          <div className="container">
            <h2 className="fw-bold mb-4">Explore Specialties</h2>
            <div className="row g-4 text-center">
              {specialties.map((item, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-2">
                  <div className="card h-100 border-0 shadow-sm py-4 custom-hover-card">
                    <i className={`bi bi-${item.icon} text-primary fs-1 mb-2`}></i>
                    <span className="fw-semibold">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Doctors */}
        <section className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">Top Doctors</h2>
            <Link to="/doctors" className="text-decoration-none fw-semibold">View All</Link>
          </div>
          <div className="row g-4">
            {topDoctors.map(doctor => (
              <div key={doctor.id} className="col-md-6 col-lg-4">
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};