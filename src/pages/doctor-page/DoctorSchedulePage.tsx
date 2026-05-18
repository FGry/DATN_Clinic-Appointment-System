import React, { useEffect, useMemo, useState } from 'react';
import { ToastNotification, type ToastType } from '../../components/common/ToastNotification';
import { DoctorLayout } from '../../components/layout/DoctorLayout';
import { doctorService, type DoctorAppointmentResponse, type DoctorAppointmentStatus } from '../../services/doctorService';

export const DoctorSchedulePage: React.FC = () => {
  const [doctorId, setDoctorId] = useState(0);
  const [doctorReady, setDoctorReady] = useState(false);

  const [appointments, setAppointments] = useState<DoctorAppointmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [rowSaving, setRowSaving] = useState<Record<number, boolean>>({});
  const [diagnosisDrafts, setDiagnosisDrafts] = useState<Record<number, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalAppointmentId, setModalAppointmentId] = useState<number | null>(null);
  const [modalDiagnosis, setModalDiagnosis] = useState('');
  const [toast, setToast] = useState<{ show: boolean; message: string; type: ToastType }>({
    show: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleModalConfirm = async () => {
    const appointmentId = modalAppointmentId;
    if (!appointmentId) return;

    const appointment = appointments.find((a) => a.id === appointmentId);
    if (appointment?.status === 'COMPLETED') {
      showToast('Lịch hẹn đã hoàn tất, không thể thay đổi nữa.', 'error');
      setShowModal(false);
      return;
    }

    if (!modalDiagnosis.trim()) {
      showToast('Vui lòng nhập chẩn đoán trước khi hoàn tất.', 'error');
      return;
    }

    try {
      setRowSaving((prev) => ({ ...prev, [appointmentId]: true }));
      const updated = await doctorService.updateAppointmentStatus(doctorId, appointmentId, {
        status: 'COMPLETED',
        diagnosis: modalDiagnosis,
      });

      setAppointments((prev) => prev.map((item) => (item.id === appointmentId ? updated : item)));
      setDiagnosisDrafts((prev) => ({ ...prev, [appointmentId]: updated.diagnosis ?? '' }));
      showToast('Cập nhật lịch hẹn thành công.', 'success');
      setShowModal(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Cập nhật lịch hẹn thất bại.';
      showToast(message, 'error');
    } finally {
      setRowSaving((prev) => ({ ...prev, [appointmentId]: false }));
    }
  };

  const formatTime = (time: string) => {
    const [hourText, minute] = time.split(':');
    const hour = Number(hourText);
    if (Number.isNaN(hour)) {
      return time;
    }

    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${String(displayHour).padStart(2, '0')}:${minute} ${suffix}`;
  };

  const fetchSchedule = async () => {
    if (!doctorReady) {
      return;
    }

    if (!doctorId) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await doctorService.getTodaySchedule(doctorId);
      setAppointments(data);

      const nextDiagnosis: Record<number, string> = {};
      data.forEach((item) => {
        nextDiagnosis[item.id] = item.diagnosis ?? '';
      });
      setDiagnosisDrafts(nextDiagnosis);
    } catch (error) {
      console.error('Failed to fetch doctor schedule', error);
      showToast('Không tải được lịch khám hôm nay.', 'error');
    } finally {
      setLoading(false);
    }
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
    fetchSchedule();
  }, [doctorId, doctorReady]);

  

  const completedCount = useMemo(
    () => appointments.filter((item) => item.status === 'COMPLETED').length,
    [appointments],
  );

  const remainingCount = Math.max(appointments.length - completedCount, 0);

  const statusBadgeStyle = (status: DoctorAppointmentStatus): { bg: string; text: string } => {
    switch (status) {
      case 'COMPLETED':
        return { bg: '#e6f4f4', text: '#006a6a' };
      case 'CONFIRMED':
        return { bg: '#f0f0f9', text: '#001835' };
      case 'REJECTED':
      case 'CANCELLED':
        return { bg: '#fdebec', text: '#8f1d2c' };
      default:
        return { bg: '#f5f5f5', text: '#4b5563' };
    }
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
        {/* Date & Filters Header */}
        <section className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 bg-white p-4 rounded-4 shadow-sm border-0 mb-4">
          <div>
            <h3 className="fw-bolder font-manrope mb-3" style={{ color: '#001835' }}>Daily Schedule</h3>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 bg-light px-4 py-2 rounded-3">
                <i className="bi bi-calendar-event fs-5" style={{ color: '#006a6a' }}></i>
                <span className="fw-bolder fs-5" style={{ color: '#001835' }}>
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>
          {!doctorId && <span className="text-danger fw-semibold">Không tìm thấy phiên đăng nhập bác sĩ.</span>}
        </section>

        {/* Table Section */}
        <section className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Time</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Patient Name</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Service/Type</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Diagnosis</th>
                  <th className="px-4 py-3 text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Status</th>
                  <th className="px-4 py-3 text-end text-muted text-uppercase fw-bold" style={{ fontSize: '11px', letterSpacing: '1px' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center text-muted">
                      <div className="spinner-border text-secondary me-2" role="status"></div>
                      Đang tải lịch khám...
                    </td>
                  </tr>
                )}

                {!loading && appointments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-5 text-center text-muted fw-semibold">
                      Chưa có lịch hẹn hôm nay.
                    </td>
                  </tr>
                )}

                {!loading &&
                  appointments.map((item) => {
                    const badgeStyle = statusBadgeStyle(item.status);
                    return (
                      <tr key={item.id}>
                        <td className="px-4 py-4">
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-clock-fill" style={{ color: '#006a6a' }}></i>
                            <span className="fw-bolder" style={{ color: '#001835' }}>{formatTime(item.time)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="fw-bold text-dark">{item.patientName}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="badge bg-light text-muted border rounded-pill px-3 py-2 fw-bold">{item.serviceType || 'Consultation'}</span>
                        </td>
                        <td className="px-4 py-4" style={{ minWidth: '280px' }}>
                          <textarea
                            className="form-control form-control-sm"
                            rows={2}
                            placeholder="Chẩn đoán"
                            value={diagnosisDrafts[item.id] ?? ''}
                            readOnly
                          />
                        </td>
                        <td className="px-4 py-4" style={{ minWidth: '190px' }}>
                          <div className="d-flex flex-column gap-2">
                            <span
                              className="badge rounded-pill px-3 py-2 fw-bold text-uppercase"
                              style={{
                                backgroundColor: badgeStyle.bg,
                                color: badgeStyle.text,
                                width: 'fit-content',
                              }}
                            >
                              {item.status}
                            </span>
                            <small className="text-muted fw-medium">Chỉ hỗ trợ hoàn tất sau khi nhập chẩn đoán</small>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-end">
                          <button
                            className="btn btn-sm fw-bold text-white"
                            style={{ backgroundColor: '#006a6a' }}
                            disabled={Boolean(rowSaving[item.id]) || item.status === 'COMPLETED'}
                            onClick={() => {
                              // open modal to input diagnosis and confirm completion
                              setModalAppointmentId(item.id);
                              setModalDiagnosis(diagnosisDrafts[item.id] ?? '');
                              setShowModal(true);
                            }}
                          >
                            {rowSaving[item.id] ? 'Saving...' : item.status === 'COMPLETED' ? 'Completed' : 'Complete'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {/* Diagnosis modal */}
                {showModal && (
                  <>
                    <div className="modal-backdrop show" style={{ position: 'fixed', inset: 0, zIndex: 1050 }} />
                    <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ zIndex: 1060 }}>
                      <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Complete Appointment</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                          </div>
                          <div className="modal-body">
                            <label className="form-label fw-semibold">Diagnosis</label>
                            <textarea
                              className="form-control"
                              rows={5}
                              value={modalDiagnosis}
                              onChange={(e) => setModalDiagnosis(e.target.value)}
                              placeholder="Nhập chẩn đoán..."
                            />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                            <button type="button" className="btn btn-sm fw-bold text-white" style={{ backgroundColor: '#006a6a' }} onClick={handleModalConfirm}>Done</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-people-fill fs-3" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Remaining</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{remainingCount} Patients</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-check-circle-fill fs-3" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Completed</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>{completedCount} Done</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-4 bg-white border-start border-4" style={{ borderColor: '#455f87' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '56px', height: '56px' }}>
                <i className="bi bi-stopwatch-fill fs-3" style={{ color: '#455f87' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-1 text-uppercase" style={{ fontSize: '11px', letterSpacing: '1px' }}>Avg. Time</p>
                <h3 className="fw-bolder mb-0 font-manrope" style={{ color: '#001835' }}>15 mins</h3>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DoctorLayout>
  );
};