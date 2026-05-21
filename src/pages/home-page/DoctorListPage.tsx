import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';
import { publicContentApi } from '../../services/publicContentService';

export const DoctorListPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);
      try {
        const docs = await publicContentApi.getDoctors();
        const mapped: Doctor[] = (docs || []).map((d: any) => ({
          id: String(d.id ?? d.doctorId ?? ''),
          name: d.fullName ?? '',
          specialty: d.specialtyName ?? '',
          schedule: d.experience ?? '',
          imageUrl: d.avaUrl ?? d.imageUrl ?? 'https://placehold.co/400x400',
        }));
        setDoctors(mapped);
        setFilteredDoctors(mapped);
        console.log('Doctor list fetched:', mapped);
      } catch (err) {
        setDoctors([]);
        setFilteredDoctors([]);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(value.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  };

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
                </span>
                <input 
                  type="text" 
                  className="form-control border-0 py-3" 
                  placeholder="Search by name or specialty..." 
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger mb-4" role="alert">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-st-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <div key={doctor.id} className="col-md-6 col-lg-4">
                    <DoctorCard doctor={doctor} />
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-4">
                  <p className="text-muted">
                    {doctors.length === 0 ? 'No doctors available' : 'No doctors match your search'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};