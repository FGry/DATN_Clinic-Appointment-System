import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';
import bannerImage1 from '../../assets/banner1.png';
import bannerImage2 from '../../assets/banner2.jpg';
import bannerImage3 from '../../assets/banner3.jpg';

const topDoctors: Doctor[] = [
  { id: '1', name: 'Dr. Sarah Mitchell', specialty: 'Senior Cardiologist', schedule: '', imageUrl: 'https://placehold.co/400x400' },
  { id: '2', name: 'Dr. James Wilson', specialty: 'Chief Neurologist', schedule: '', imageUrl: 'https://placehold.co/400x400' },
  { id: '3', name: 'Dr. Elena Rodriguez', specialty: 'Pediatric Specialist', schedule: '', imageUrl: 'https://placehold.co/400x400' }
];

export const HomePage: React.FC = () => {
  // Logic chuyển đổi Banner
  const banners = [bannerImage1, bannerImage2, bannerImage3];
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    // Thiết lập timer tự động chuyển ảnh mỗi 5 giây
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    // Dọn dẹp timer khi component unmount
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main style={{ paddingTop: '80px' }}> 
        {/* Hero Section với Slider Banner */}
        <section className="position-relative d-flex align-items-center bg-st-primary" style={{ minHeight: '600px', overflow: 'hidden' }}>
          
          {/* Vùng chứa các Banner */}
          <div className="position-absolute w-100 h-100 z-0">
            {banners.map((banner, index) => (
              <img 
                key={index}
                className="position-absolute w-100 h-100 object-fit-cover" 
                src={banner} 
                alt={`Hero Background ${index + 1}`} 
                style={{
                  opacity: currentBanner === index ? 0.35 : 0, // Giảm opacity để làm nổi bật chữ
                  transition: 'opacity 1.5s ease-in-out', // Hiệu ứng fade mượt mà
                  objectPosition: 'center',
                }}
              />
            ))}
          </div>

          <div className="container position-relative z-1 py-5">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="display-4 fw-bold text-white mb-4">
                  Precision Care for Your Family's Future.
                </h1>
                <p className="fs-5 text-white opacity-75 mb-5">
                  Experience world-class healthcare with the region's leading specialists. From advanced diagnostics to personalized recovery plans, we prioritize your well-being.
                </p>
                
                {/* Search Card */}
                <div className="card border-0 shadow-lg p-4 rounded-4 bg-white">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                      <label className="small fw-bold text-muted text-uppercase mb-2">Specialty</label>
                      <input className="form-control bg-light py-2" placeholder="Search Specialty" type="text"/>
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold text-muted text-uppercase mb-2">Date</label>
                      <input className="form-control bg-light py-2" type="date"/>
                    </div>
                    <div className="col-md-4">
                      <button className="btn btn-st-secondary w-100 fw-semibold py-2 d-flex align-items-center justify-content-center gap-2">
                        <i className="bi bi-search"></i> Find Care
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional: Chấm tròn (Dots) báo hiệu vị trí slide cho người dùng */}
                <div className="d-flex gap-2 mt-4">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBanner(index)}
                      className={`rounded-circle border-0 p-0 ${currentBanner === index ? 'bg-white' : 'bg-white opacity-50'}`}
                      style={{ width: '10px', height: '10px', transition: 'all 0.3s ease' }}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Explore Specialties */}
        <section className="container py-5 mt-4">
          <div className="text-center mb-5">
            <span className="small fw-bold text-st-secondary text-uppercase tracking-wider">Our Expertise</span>
            <h2 className="fs-1 fw-semibold text-st-primary mt-2">Explore Specialties</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: 'heart-pulse', name: 'Cardiology', desc: 'Expert care for heart health and cardiovascular systems.' },
              { icon: 'lightning-charge', name: 'Neurology', desc: 'Advanced diagnostics and treatment for the nervous system.' },
              { icon: 'bandaid', name: 'Orthopedics', desc: 'Surgical and non-surgical care for musculoskeletal issues.' },
              { icon: 'emoji-smile', name: 'Pediatrics', desc: 'Compassionate medical care for children and adolescents.' }
            ].map((item, index) => (
              <div key={index} className="col-sm-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-border-st-secondary transition-all">
                  <div className="rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 24, 53, 0.1)' }}>
                    <i className={`bi bi-${item.icon} fs-3 text-st-primary`}></i>
                  </div>
                  <h3 className="fs-5 fw-semibold text-st-primary mb-2">{item.name}</h3>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Doctors Section */}
        <section className="bg-st-light py-5 mt-5">
          <div className="container py-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
              <div>
                <span className="small fw-bold text-st-secondary text-uppercase tracking-wider">Our Medical Staff</span>
                <h2 className="fs-1 fw-semibold text-st-primary mt-2 mb-0">Top Doctors</h2>
              </div>
              <Link to="/doctors" className="fs-5 fw-semibold text-st-secondary text-decoration-none d-flex align-items-center gap-2">
                View All Doctors <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
            <div className="row g-4">
              {topDoctors.map(doctor => (
                <div key={doctor.id} className="col-md-4">
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};