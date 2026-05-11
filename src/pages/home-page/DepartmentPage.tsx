import React from 'react';
import { Header } from '../../components/layout/Header';

export const DepartmentPage: React.FC = () => {
  const specialties = [
    { name: 'Cardiology', icon: 'cardiology', desc: 'Expert care for heart health and cardiovascular systems.' },
    { name: 'Neurology', icon: 'neurology', desc: 'Advanced diagnostics and treatment for the nervous system.' },
    { name: 'Orthopedics', icon: 'orthopedics', desc: 'Surgical and non-surgical care for musculoskeletal issues.' },
    { name: 'Pediatrics', icon: 'child_care', desc: 'Compassionate medical care for children and adolescents.' },
  ];

  return (
    <div className="bg-light min-vh-100 font-manrope">
      <Header />
      <main className="container py-5" style={{ paddingTop: '120px' }}>
        <div className="text-center mb-5">
          <span className="text-st-secondary fw-bold text-uppercase tracking-widest">Our Expertise</span>
          <h1 className="display-4 fw-bold text-st-primary mt-2">Medical Specialties</h1>
        </div>

        <div className="row g-4">
          {specialties.map((spec, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-border-st-secondary transition-all cursor-pointer">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <span className="material-symbols-outlined text-st-primary fs-2">{spec.icon}</span>
                </div>
                <h4 className="fw-bold text-st-primary mb-2">{spec.name}</h4>
                <p className="text-muted mb-0">{spec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
