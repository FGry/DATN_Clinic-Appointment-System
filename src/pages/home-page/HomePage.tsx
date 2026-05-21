import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';
import { publicContentApi } from '../../services/publicContentService';
import type { Specialty } from '../../types/models/Specialty';
import bannerImage1 from '../../assets/banner1.png';
import bannerImage2 from '../../assets/banner2.jpg';
import bannerImage3 from '../../assets/banner3.jpg';

export const HomePage: React.FC = () => {
  // Logic chuyển đổi Banner
  const banners = [bannerImage1, bannerImage2, bannerImage3];
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [filteredSpecialties, setFilteredSpecialties] = useState<Specialty[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorSpecialties, setErrorSpecialties] = useState<string | null>(null);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);
  const [searchSpecialty, setSearchSpecialty] = useState('');

  useEffect(() => {
    // Thiết lập timer tự động chuyển ảnh mỗi 5 giây
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    // Dọn dẹp timer khi component unmount
    return () => clearInterval(timer);
  }, [banners.length]);

  // Fetch specialties from API
  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoadingSpecialties(true);
      setErrorSpecialties(null);
      try {
        const specs = await publicContentApi.getSpecialties();
        const data = specs || [];
        setSpecialties(data);
        setFilteredSpecialties(data);
        console.log('Public specialties fetched:', data);
      } catch (err) {
        setSpecialties([]);
        setFilteredSpecialties([]);
        setErrorSpecialties('Failed to load specialties. Please try again.');
      } finally {
        setLoadingSpecialties(false);
      }
    };
    fetchSpecialties();
  }, []);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      setErrorDoctors(null);
      try {
        const docs = await publicContentApi.getDoctors();
        // Map AdminDoctor -> Doctor (minimal fields used in UI)
        const mapped: Doctor[] = (docs || []).map((d: any) => ({
          id: String(d.id ?? d.doctorId ?? ''),
          name: d.fullName ?? '',
          specialty: d.specialtyName ?? '',
          schedule: '',
          imageUrl: d.avaUrl ?? d.imageUrl ?? 'https://placehold.co/400x400',
        }));
        setDoctors(mapped);
        console.log('Public doctors fetched:', mapped);
      } catch (err) {
        setDoctors([]);
        setErrorDoctors('Failed to load doctors. Please try again.');
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Handle specialty search
  const handleSpecialtySearch = (value: string) => {
    setSearchSpecialty(value);
    if (value.trim() === '') {
      setFilteredSpecialties(specialties);
    } else {
      const filtered = specialties.filter(spec =>
        spec.name.toLowerCase().includes(value.toLowerCase()) ||
        spec.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSpecialties(filtered);
    }
  };

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
                      <div className="position-relative">
                        <input 
                          className="form-control bg-light py-2" 
                          placeholder="Search Specialty" 
                          type="text"
                          value={searchSpecialty}
                          onChange={(e) => handleSpecialtySearch(e.target.value)}
                          autoComplete="off"
                        />
                        {searchSpecialty && filteredSpecialties.length > 0 && (
                          <div className="dropdown-menu position-absolute w-100 show mt-1" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {filteredSpecialties.map(spec => (
                              <button
                                key={spec.id}
                                className="dropdown-item"
                                onClick={() => setSearchSpecialty(spec.name)}
                              >
                                {spec.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
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
            <span className="fw-bold text-st-secondary text-uppercase tracking-wider">Our Expertise</span>
            <h2 className="fs-1 fw-semibold text-st-primary mt-2">Explore Specialties</h2>
          </div>
          
          {errorSpecialties && (
            <div className="alert alert-danger text-center mb-4" role="alert">
              {errorSpecialties}
            </div>
          )}

          {loadingSpecialties ? (
            <div className="text-center py-5">
              <div className="spinner-border text-st-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {specialties.length > 0 ? specialties.map((spec) => (
                <div key={spec.id} className="col-sm-6 col-lg-3">
                  <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-border-st-secondary transition-all">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 24, 53, 0.1)' }}>
                      <i className={`bi bi-heart-pulse fs-3 text-st-primary`}></i>
                    </div>
                    <h3 className="small fw-bold text-st-secondary text-uppercase tracking-wider mb-3"><Link to={`/department/${spec.id}`} className="text-decoration-none">{spec.name}</Link></h3>
                    <p className="text-muted mb-0">{spec.description}</p>
                  </div>
                </div>
              )) : (
                <div className="col-12 text-center py-4">
                  <p className="text-muted">No specialties found</p>
                </div>
              )}
            </div>
          )}
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

            {errorDoctors && (
              <div className="alert alert-danger text-center mb-4" role="alert">
                {errorDoctors}
              </div>
            )}

            {loadingDoctors ? (
              <div className="text-center py-5">
                <div className="spinner-border text-st-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="row g-4">
                {doctors.length > 0 ? (
                  doctors.slice(0, 6).map(doctor => (
                    <div key={doctor.id} className="col-md-4">
                      <DoctorCard doctor={doctor} />
                    </div>
                  ))
                ) : (
                  <div className="col-12 text-center py-4">
                    <p className="text-muted">No doctors available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};