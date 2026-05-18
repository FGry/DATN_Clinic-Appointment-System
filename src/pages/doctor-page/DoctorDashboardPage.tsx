import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DoctorLayout } from '../../components/layout/DoctorLayout';
import { authService } from '../../services/authService';
import { doctorService, type DoctorAppointmentResponse, type DoctorDashboardStats } from '../../services/doctorService';
import { ToastNotification, type ToastType } from '../../components/common/ToastNotification';

export const DoctorDashboardPage: React.FC = () => {
  const session = authService.getSession();
  const [doctorId, setDoctorId] = useState(0);

  const [stats, setStats] = useState<DoctorDashboardStats>({
    todaysAppointments: 0,
    pendingReviews: 0,
    totalPatients: 0,
    completedToday: 0,
  });
  const [schedule, setSchedule] = useState<DoctorAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    const loadDoctor = async () => {
      try {
        const currentDoctor = await doctorService.getCurrentDoctor();
        setDoctorId(currentDoctor.doctorId);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to resolve doctor profile';
        setError(message);
        setLoading(false);
        setToast({ show: true, message, type: 'error' });
      }
    };

    void loadDoctor();
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!doctorId) {
        return;
      }

      try {
        setLoading(true);
        const [statsData, scheduleData] = await Promise.all([
          doctorService.getDashboardStats(doctorId),
          doctorService.getTodaySchedule(doctorId),
        ]);
        setStats(statsData);
        setSchedule(scheduleData);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to load doctor dashboard';
        setError(message);
        setToast({ show: true, message, type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, [doctorId]);

  const formatTime = (time: string) => {
    const [hourText, minute] = time.split(':');
    const hour = Number(hourText);
    if (Number.isNaN(hour)) return time;

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${suffix}`;
  };

  return (
    <DoctorLayout>
      <ToastNotification
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        {/* Welcome Section */}
        <section className="mb-5">
          <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Welcome back, {session?.username ?? 'Doctor'}!</h2>
          <p className="text-muted fs-6 mb-0">Here is a quick overview of your clinic's status today.</p>
        </section>

        {error && <div className="alert alert-danger border-0 shadow-sm">{error}</div>}

        {/* Summary Cards Bento Layout */}
        <section className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white" style={{ borderLeft: '4px solid #001835' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-calendar-check-fill fs-4" style={{ color: '#001835' }}></i>
                </div>
                <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-bold">Live data</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Today's Appointments</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{loading ? '...' : stats.todaysAppointments}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white" style={{ borderLeft: '4px solid #006a6a' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-clipboard2-pulse-fill fs-4" style={{ color: '#006a6a' }}></i>
                </div>
                <span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fw-bold">Pending</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Pending Reviews</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{loading ? '...' : stats.pendingReviews}</h1>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 h-100 bg-white" style={{ borderLeft: '4px solid #455f87' }}>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                  <i className="bi bi-people-fill fs-4" style={{ color: '#455f87' }}></i>
                </div>
                <span className="badge bg-light text-muted border rounded-pill px-3 py-2 fw-bold">Active this month</span>
              </div>
              <p className="text-muted fw-bold text-uppercase mb-1" style={{ fontSize: '11px', letterSpacing: '1px' }}>Total Patients</p>
              <h1 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{loading ? '...' : stats.totalPatients}</h1>
            </div>
          </div>
        </section>

        <div className="row g-4">
          {/* Recent Patient Activity Table */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 bg-white">
              <div className="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold font-manrope" style={{ color: '#001835' }}>Recent Patient Activity</h5>
                <Link to="/doctor/schedule" className="btn btn-link fw-bold text-decoration-none p-0" style={{ color: '#006a6a' }}>View All</Link>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Name</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                      <th className="py-3 px-4 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                      <th className="py-3 px-4 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-top-0">
                    {schedule.slice(0, 4).map((item) => (
                      <tr key={item.id}>
                        <td className="px-4 py-4">
                          <div className="d-flex align-items-center gap-3">
                            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#001835' }}>
                              {item.patientName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <span className="fw-bold" style={{ color: '#001835' }}>{item.patientName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-muted small fw-medium">{formatTime(item.time)}</td>
                        <td className="px-4 py-4"><span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: item.status === 'COMPLETED' ? '#e6f4f4' : '#f0f0f9', color: item.status === 'COMPLETED' ? '#006a6a' : '#001835' }}>{item.status}</span></td>
                        <td className="px-4 py-4 text-end"><Link to="/doctor/schedule" className="btn btn-link text-muted p-0"><i className="bi bi-three-dots-vertical"></i></Link></td>
                      </tr>
                    ))}
                    {schedule.length === 0 && !loading && <tr><td className="text-center text-muted py-5" colSpan={4}>No appointments yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
              <h5 className="mb-4 fw-bold font-manrope" style={{ color: '#001835' }}>Upcoming Schedule</h5>
              <div className="d-flex flex-column gap-3">
                {schedule.slice(0, 2).map((item) => (
                  <div key={item.id} className="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border hover-bg-white transition-all cursor-pointer">
                    <div className="text-center bg-white shadow-sm rounded-2 py-2 px-3" style={{ minWidth: '60px' }}>
                      <p className="fw-bold mb-0" style={{ color: '#001835' }}>{formatTime(item.time).split(' ')[0]}</p>
                      <small className="text-muted fw-bold" style={{ fontSize: '10px' }}>{formatTime(item.time).split(' ')[1]}</small>
                    </div>
                    <div className="grow">
                      <p className="fw-bold mb-1" style={{ color: '#001835' }}>{item.serviceType || 'General Consultation'}</p>
                      <small className="text-muted d-block"><i className="bi bi-person me-1"></i>{item.patientName}</small>
                    </div>
                    <i className="bi bi-chevron-right text-muted mt-2"></i>
                  </div>
                ))}
                {schedule.length === 0 && !loading && <div className="text-muted">No upcoming schedule.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};