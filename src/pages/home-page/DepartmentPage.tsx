import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { publicContentApi } from '../../services/publicContentService';
import type { Specialty } from '../../types/models/Specialty';

export const DepartmentPage: React.FC = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialties = async () => {
      setLoading(true);
      setError(null);
      try {
        const specs = await publicContentApi.getSpecialties();
        setSpecialties(specs || []);
      } catch (err) {
        setSpecialties([]);
        setError('Failed to load specialties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <div className="bg-light min-vh-100 font-manrope">
      <Header />
      <main className="container py-5" style={{ paddingTop: '120px' }}>
        <div className="text-center mb-5">
          <span className="text-st-secondary fw-bold text-uppercase tracking-widest">Our Expertise</span>
          <h1 className="display-4 fw-bold text-st-primary mt-2">Medical Specialties</h1>
        </div>

        {error && (
          <div className="alert alert-danger text-center mb-4" role="alert">
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
            {specialties.length > 0 ? specialties.map((spec) => (
              <div key={spec.id} className="col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 rounded-4 hover-border-st-secondary transition-all">
                  <Link to={`/department/${spec.id}`} className="text-decoration-none text-reset">
                    <div className="rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 24, 53, 0.1)' }}>
                      <i className={`bi bi-heart-pulse fs-3 text-st-primary`}></i>
                    </div>
                    <h4 className="small fw-bold text-st-secondary text-uppercase tracking-wider mb-3">{spec.name}</h4>
                  </Link>
                  <p className="text-muted mb-0">{spec.description}</p>
                </div>
              </div>
            )) : (
              <div className="col-12 text-center py-4">
                <p className="text-muted">No specialties available</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
