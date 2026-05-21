import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { DoctorCard } from '../../components/common/DoctorCard';
import type { Doctor } from '../../types/models/Doctor';
import { publicContentApi } from '../../services/publicContentService';
import type { Specialty } from '../../types/models/Specialty';

export const SpecialtyDetail: React.FC = () => {
  const { id } = useParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [specialty, setSpecialty] = useState<Specialty | null>(null);
  const [loadingSpecialty, setLoadingSpecialty] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [errorSpecialty, setErrorSpecialty] = useState<string | null>(null);
  const [errorDoctors, setErrorDoctors] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialty = async () => {
      setLoadingSpecialty(true);
      setErrorSpecialty(null);
      try {
        const specs = await publicContentApi.getSpecialties();
        const found = (specs || []).find((s: any) => String(s.id) === String(id));
        setSpecialty(found || null);
        if (!found) {
          setErrorSpecialty('Specialty not found.');
        }
        console.log('Specialty fetched:', found);
      } catch (err) {
        setSpecialty(null);
        setErrorSpecialty('Failed to load specialty information.');
      } finally {
        setLoadingSpecialty(false);
      }
    };

    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      setErrorDoctors(null);
      try {
        const specialtyId = Number(id);
        const docs = Number.isNaN(specialtyId)
          ? []
          : await publicContentApi.getDoctorsBySpecialtyId(specialtyId);
        const filtered = (docs || []).map((d: any) => ({
          id: String(d.id ?? ''),
          name: d.fullName ?? '',
          specialty: d.specialtyName ?? '',
          schedule: '',
          imageUrl: d.avaUrl ?? d.imageUrl ?? 'https://placehold.co/400x400',
        }));
        setDoctors(filtered);
        console.log('Doctors for specialty fetched:', filtered);
      } catch (err) {
        setDoctors([]);
        setErrorDoctors('Failed to load doctors for this specialty.');
      } finally {
        setLoadingDoctors(false);
      }
    };

    if (id) {
      fetchSpecialty();
      fetchDoctors();
    }
  }, [id]);

  return (
    <div className="bg-white min-vh-100 font-manrope">
      <Header />
      <main style={{ paddingTop: '80px' }}>
        {/* Specialty Hero Banner */}
        <section className="position-relative py-5 bg-st-primary text-white overflow-hidden" style={{ minHeight: '400px' }}>
           <div className="position-absolute inset-0 z-0 opacity-25">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqdFHcwNlueBUnClHzVI8bD7xwtSdZn4tK2L9SzqzkrWNmqhcuxIii5Zolbfco3RLMXZu8t-G0KcaopYuDgHbhG2iehqMi54t1Jf60cvMzflX7xtka-TuYngJEcbzMQ3tqABSxyQsDxXU52E4yezrc0FkjYRM3c-coVQyHtWnWD79Oq2BvlVVsHHwTumFkpBupPu_CGdMBbti6ubX0JuuqaZNpqj-r21PxoaZuTsIRR-OfHlL8y8CtNw9tW5g2KkP6D4OpEsQwqpG_" className="w-100 h-100 object-fit-cover" alt="Banner" />
           </div>
           <div className="container position-relative z-1 py-5">
             <Link to="/department" className="btn btn-link text-st-secondary p-0 mb-4 fw-bold text-decoration-none d-flex align-items-center gap-2">
               <span className="material-symbols-outlined">arrow_back</span> BACK TO SPECIALTIES
             </Link>
             {loadingSpecialty ? (
               <div className="spinner-border spinner-border-sm text-st-secondary" role="status">
                 <span className="visually-hidden">Loading...</span>
               </div>
             ) : errorSpecialty ? (
               <h1 className="display-3 fw-bold mb-4 text-warning">{errorSpecialty}</h1>
             ) : (
               <>
                 <h1 className="display-3 fw-bold mb-4">{specialty?.name ?? 'Specialty'}</h1>
                 <p className="fs-5 opacity-75 max-w-700">{specialty?.description ?? 'Information about this specialty.'}</p>
               </>
             )}
           </div>
        </section>

        {/* Focus Areas & Doctors */}
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-8">
              <h2 className="fw-bold text-st-primary mb-4">Meet Our Experts</h2>
              
              {errorDoctors && (
                <div className="alert alert-warning mb-4" role="alert">
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
                  {doctors.length > 0 ? doctors.map(doctor => (
                    <div key={doctor.id} className="col-md-6">
                      <DoctorCard doctor={doctor} />
                    </div>
                  )) : (
                    <div className="col-12 text-center py-4">
                      <p className="text-muted">No doctors found for this specialty.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                <button className="btn btn-st-secondary w-100 mt-4 py-3 fw-bold rounded-3">LOGIN TO BOOK</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};