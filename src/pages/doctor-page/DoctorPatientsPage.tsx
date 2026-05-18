import React, { useEffect, useState } from 'react';
import { DoctorLayout } from '../../components/layout/DoctorLayout';
import { doctorService, type DoctorPatientResponse } from '../../services/doctorService';
import { ToastNotification, type ToastType } from '../../components/common/ToastNotification';

export const DoctorPatientsPage: React.FC = () => {
  const [doctorId, setDoctorId] = useState(0);
  const [doctorReady, setDoctorReady] = useState(false);

  const [patients, setPatients] = useState<DoctorPatientResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ show: true, message, type });
  };

  const formatTime = (time: string) => {
    const [hourText, minute] = time.split(':');
    const hour = Number(hourText);
    if (Number.isNaN(hour)) return time;

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${suffix}`;
  };

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const currentDoctor = await doctorService.getCurrentDoctor();
        setDoctorId(currentDoctor.doctorId);
        setDoctorReady(true);
      } catch (error) {
        console.error('Failed to resolve doctor profile', error);
        showToast('Không xác định được hồ sơ bác sĩ.', 'error');
        setDoctorReady(true);
        setLoading(false);
      }
    };

    void loadDoctor();
  }, []);

  useEffect(() => {
    const loadPatients = async () => {
      if (!doctorReady) {
        return;
      }

      if (!doctorId) {
        setLoading(false);
        showToast('Không xác định được hồ sơ bác sĩ.', 'error');
        return;
      }

      try {
        setLoading(true);
        const data = await doctorService.getTodayPatients(doctorId);
        setPatients(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Không tải được danh sách bệnh nhân';
        showToast(message, 'error');
      } finally {
        setLoading(false);
      }
    };

    void loadPatients();
  }, [doctorId, doctorReady]);

  const completedCount = patients.filter((item) => item.status === 'COMPLETED').length;
  const inProgressCount = patients.filter((item) => item.status === 'CONFIRMED' || item.status === 'PENDING').length;

  return (
    <DoctorLayout>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bold font-manrope mb-1" style={{ color: '#001835' }}>Today's Patients</h2>
            <p className="text-muted mb-0">Danh sách bệnh nhân đăng ký khám trong ngày.</p>
          </div>
          <button className="btn fw-bold px-4 py-2 shadow-sm rounded-3 transition-all active-scale" style={{ backgroundColor: '#001835', color: '#fff', border: 'none' }}>
            <i className="bi bi-file-earmark-arrow-down me-2"></i>Export List
          </button>
        </div>

        {/* Table Container */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Gender</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Age</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center text-muted">
                      <div className="spinner-border text-secondary me-2" role="status"></div>
                      Đang tải danh sách bệnh nhân...
                    </td>
                  </tr>
                )}

                {!loading && patients.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center text-muted fw-semibold">
                      Chưa có bệnh nhân nào trong ngày hôm nay.
                    </td>
                  </tr>
                )}

                {!loading && patients.map((patient) => (
                  <tr key={`${patient.time}-${patient.patientName}`}>
                    <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>{formatTime(patient.time)}</td>
                    <td className="px-4 py-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>
                          {patient.patientName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <span className="fw-bold" style={{ color: '#001835' }}>{patient.patientName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-muted fw-medium">{patient.gender}</td>
                    <td className="px-4 py-4 text-muted fw-medium">{patient.age}</td>
                    <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: patient.status === 'COMPLETED' ? '#e6f4f4' : '#f0f0f9', color: patient.status === 'COMPLETED' ? '#006a6a' : '#001835' }}>{patient.status}</span></td>
                    <td className="px-4 py-4 text-end"><button className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical fs-5"></i></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-white border-top p-4 d-flex justify-content-between align-items-center">
            <span className="text-muted small fw-medium">Showing {patients.length} patients for today</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-light border rounded-3 px-3 fw-bold text-muted" disabled>Prev</button>
              <button className="btn btn-sm btn-light border rounded-3 px-3 fw-bold text-dark hover-bg-light">Next</button>
            </div>
          </div>
        </div>

        {/* Quick Stats Bento Grid */}
        <div className="row g-4 mt-2">
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-clock-history fs-4" style={{ color: '#001835' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#001835', fontSize: '11px', letterSpacing: '1px' }}>Wait Time</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>{loading ? '...' : patients.length > 0 ? '14 min' : '0 min'}</h2>
              <small className="text-muted fw-medium">Average patient wait time</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-check-circle-fill fs-4" style={{ color: '#006a6a' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#006a6a', fontSize: '11px', letterSpacing: '1px' }}>Completed</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>{loading ? '...' : `${completedCount}/${patients.length || 0}`}</h2>
              <small className="text-muted fw-medium">Appointments finished today</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white border-start border-4" style={{ borderColor: '#455f87' }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                  <i className="bi bi-person-plus-fill fs-4" style={{ color: '#455f87' }}></i>
                </div>
                <span className="fw-bold text-uppercase" style={{ color: '#455f87', fontSize: '11px', letterSpacing: '1px' }}>New Cases</span>
              </div>
              <h2 className="fw-bolder font-manrope mb-1" style={{ color: '#001835' }}>{loading ? '...' : inProgressCount}</h2>
              <small className="text-muted fw-medium">First-time consultations</small>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};