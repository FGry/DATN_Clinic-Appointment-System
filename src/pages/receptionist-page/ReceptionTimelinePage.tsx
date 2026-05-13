import React, { useState, useEffect } from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';
import { receptionistService, type DoctorScheduleResponse, type AdminDoctorResponse } from '../../services/receptionistService';
import { ToastNotification } from '../../components/common/ToastNotification';

export const ReceptionTimelinePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctors, setDoctors] = useState<AdminDoctorResponse[]>([]);
  const [schedules, setSchedules] = useState<DoctorScheduleResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [docsData, schedulesData] = await Promise.all([
        receptionistService.getDoctors(),
        receptionistService.getAllSchedules()
      ]);
      setDoctors(docsData);
      // Filter schedules for the selected date
      setSchedules(schedulesData.filter(s => s.date === selectedDate));
    } catch (error) {
      console.error('Failed to fetch timeline data:', error);
      setToast({ show: true, message: 'Failed to load timeline data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00 (Lunch)', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const getShiftStyle = (start: string, end: string) => {
    const startHour = parseInt(start.split(':')[0]);
    const startMin = parseInt(start.split(':')[1]);
    const endHour = parseInt(end.split(':')[0]);
    const endMin = parseInt(end.split(':')[1]);
    
    const startTimeDecimal = startHour + startMin / 60;
    const endTimeDecimal = endHour + endMin / 60;
    
    // We are showing from 08:00 to 18:00 (10 hours total)
    const totalHours = 10;
    const leftOffset = ((startTimeDecimal - 8) / totalHours) * 100;
    const width = ((endTimeDecimal - startTimeDecimal) / totalHours) * 100;
    
    return {
      left: `${leftOffset}%`,
      width: `${width}%`,
      backgroundColor: 'rgba(0, 106, 106, 0.1)',
      color: '#006a6a',
      borderLeft: `4px solid #006a6a`,
      boxSizing: 'border-box' as const
    };
  };

  const processShifts = (doctorSchedules: DoctorScheduleResponse[]) => {
    const processed: { start: string, end: string, type: string }[] = [];
    doctorSchedules.forEach(s => {
      const startH = parseInt(s.startTime.split(':')[0]);
      const endH = parseInt(s.endTime.split(':')[0]);
      
      // If shift spans across 12:00-13:00, split it
      if (startH < 12 && endH > 12) {
        processed.push({ start: s.startTime, end: '12:00', type: 'Morning' });
        processed.push({ start: '13:00', end: s.endTime, type: 'Afternoon' });
      } else {
        processed.push({ start: s.startTime, end: s.endTime, type: startH < 12 ? 'Morning' : 'Afternoon' });
      }
    });
    return processed;
  };

  const filteredDoctors = React.useMemo(() => {
    const doctorIdsWithSchedules = new Set(schedules.map(s => s.doctorId));
    return doctors.filter(doc => doctorIdsWithSchedules.has(doc.id));
  }, [doctors, schedules]);

  return (
    <ReceptionLayout onOpenBookingModal={() => {}}>
        <ToastNotification 
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
        <div className="mx-auto font-manrope animate-fade-in" style={{ maxWidth: '1400px' }}>
          
          {/* Page Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge rounded-pill px-3 py-1 text-uppercase fw-bold" style={{ backgroundColor: 'rgba(0, 24, 53, 0.05)', color: '#001835', fontSize: '10px', letterSpacing: '1px' }}>Timeline View</span>
              </div>
              <h2 className="fw-bolder mb-1" style={{ color: '#001835', fontSize: '2.25rem' }}>Doctor Shift Timeline</h2>
              <p className="text-muted mb-0 opacity-75">Visual overview of medical staff availability and shift distribution.</p>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              <div className="bg-white p-1 rounded-3 d-flex border shadow-sm" style={{ height: '46px' }}>
                <Link 
                  to="/reception/schedule/list" 
                  className="btn btn-sm text-muted border-0 px-4 fw-bold hover-bg-light transition-all rounded-2 d-flex align-items-center"
                  style={{ fontSize: '14px' }}
                >
                  <i className="bi bi-list-ul me-2"></i> List
                </Link>
                <button 
                  className="btn btn-sm px-4 fw-bold rounded-2 transition-all d-flex align-items-center" 
                  style={{ backgroundColor: '#001835', color: 'white', fontSize: '14px' }}
                >
                  <i className="bi bi-calendar-range me-2"></i> Timeline
                </button>
              </div>
              <div className="bg-white border rounded-3 px-3 d-flex align-items-center shadow-sm gap-2" style={{ height: '46px' }}>
                <i className="bi bi-calendar3 text-muted"></i>
                <input 
                  type="date" 
                  className="border-0 fw-bold text-dark bg-transparent shadow-none focus-ring-none" 
                  style={{ fontSize: '14px' }}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>
          </div>
  
          {/* Timeline Grid */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white mb-5">
            <div className="d-flex">
              {/* Doctors Sidebar Column */}
              <div className="bg-light border-end" style={{ width: '280px', minWidth: '280px' }}>
                <div className="p-4 border-bottom d-flex align-items-center bg-white" style={{ height: '70px' }}>
                  <span className="fw-bold text-muted text-uppercase small" style={{ letterSpacing: '1px' }}>Medical Staff</span>
                </div>
                {loading ? (
                  <div className="p-4 text-center">Loading...</div>
                ) : filteredDoctors.length === 0 ? (
                  <div className="p-4 text-center text-muted small">No doctors scheduled</div>
                ) : filteredDoctors.map((doc) => (
                  <div key={doc.id} className="p-4 border-bottom d-flex align-items-center bg-white" style={{ height: '110px' }}>
                    <div className="d-flex align-items-center gap-3">
                      <div className="rounded-circle d-flex align-items-center justify-content-center fw-bolder text-white shadow-sm" 
                           style={{ width: '44px', height: '44px', backgroundColor: '#001835' }}>
                        {doc.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0" style={{ color: '#001835' }}>{doc.fullName}</h6>
                        <small className="text-muted fw-medium">ID: #{doc.id}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Time Slots Grid */}
              <div className="flex-grow-1 position-relative">
                {/* Time Headers */}
                <div className="d-flex border-bottom bg-white position-relative" style={{ height: '70px' }}>
                  {timeSlots.map((time, idx) => (
                    <div key={idx} className="flex-grow-1 border-end position-relative" style={{ minWidth: 0 }}>
                      <span 
                        className="text-muted fw-bold position-absolute" 
                        style={{ 
                          fontSize: '11px', 
                          top: '25px', 
                          left: '-15px', 
                          zIndex: 5,
                          backgroundColor: 'white',
                          padding: '0 5px'
                        }}
                      >
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
  
                {/* Grid Rows */}
                <div className="position-relative">
                   {/* Vertical Grid Lines */}
                  <div className="position-absolute top-0 bottom-0 w-100 d-flex pointer-events-none" style={{ zIndex: 0 }}>
                    {timeSlots.map((_, idx) => (
                      <div key={idx} className="flex-grow-1 border-end border-light"></div>
                    ))}
                  </div>
  
                  {/* Data Rows */}
                  {loading ? (
                    <div className="py-5 text-center w-100">Loading schedules...</div>
                  ) : filteredDoctors.length === 0 ? (
                    <div className="py-5 text-center w-100 text-muted">No schedules found for this date.</div>
                  ) : filteredDoctors.map((doc) => (
                    <div key={doc.id} className="position-relative border-bottom" style={{ height: '110px', zIndex: 1 }}>
                      {processShifts(schedules.filter(s => s.doctorId === doc.id)).map((shift, sIdx) => (
                        <div 
                          key={sIdx}
                          className="position-absolute top-50 translate-middle-y shadow-sm rounded-3 p-2 d-flex flex-column justify-content-center transition-all hover-scale" 
                          style={{ 
                            ...getShiftStyle(shift.start, shift.end),
                            height: '64px',
                            zIndex: 2,
                            cursor: 'default',
                            overflow: 'hidden',
                            marginLeft: '1px' // Fine-tuning to match the grid line
                          }}
                        >
                          <div className="d-flex align-items-center gap-1 mb-0">
                            <i className="bi bi-clock-fill" style={{ fontSize: '10px' }}></i>
                            <span className="fw-bold" style={{ fontSize: '12px' }}>{shift.type}</span>
                          </div>
                          <div className="fw-medium opacity-75" style={{ fontSize: '10px' }}>{shift.start}-{shift.end}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
  
              </div>
            </div>
          </div>

        {/* Legend */}
        <div className="d-flex gap-4 mb-5">
           <div className="d-flex align-items-center gap-2">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 24, 53, 0.1)', border: '1px solid #001835' }}></span>
              <small className="fw-bold text-muted text-uppercase" style={{ fontSize: '10px' }}>Morning Shift</small>
           </div>
           <div className="d-flex align-items-center gap-2">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'rgba(0, 106, 106, 0.1)', border: '1px solid #006a6a' }}></span>
              <small className="fw-bold text-muted text-uppercase" style={{ fontSize: '10px' }}>Afternoon Shift</small>
           </div>
           <div className="d-flex align-items-center gap-2">
              <span className="rounded-circle" style={{ width: '12px', height: '12px', backgroundColor: 'rgba(102, 16, 242, 0.1)', border: '1px solid #6610f2' }}></span>
              <small className="fw-bold text-muted text-uppercase" style={{ fontSize: '10px' }}>Late Shift</small>
           </div>
        </div>

      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hover-scale:hover { transform: translateY(-50%) scale(1.02); z-index: 10 !important; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1) !important; }
        .focus-ring-none:focus { box-shadow: none !important; }
      `}</style>
    </ReceptionLayout>
  );
};