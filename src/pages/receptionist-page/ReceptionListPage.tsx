import React from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';

export const ReceptionListPage: React.FC = () => {
  return (
    <ReceptionLayout onOpenBookingModal={() => {}}>
      <div className="mx-auto font-manrope" style={{ maxWidth: '1400px' }}>
        
        {/* Page Header & View Toggle */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
          <div>
            <h2 className="fw-bolder mb-1" style={{ color: '#001835' }}>Daily Schedule</h2>
            <p className="text-muted mb-0">Manage and track patient appointments for today.</p>
          </div>
          <div className="bg-light p-1 rounded-3 d-flex border shadow-sm">
            <button className="btn btn-sm bg-white text-dark shadow-sm px-4 fw-bold" style={{ color: '#001835' }}>
              <i className="bi bi-list-ul me-2"></i> List View
            </button>
            <Link to="/reception/schedule/timeline" className="btn btn-sm btn-light text-muted border-0 px-4 fw-bold hover-bg-white transition-all">
              <i className="bi bi-calendar-range me-2"></i> Timeline
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label fw-bold text-muted small mb-2 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Search</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
                <input type="text" className="form-control bg-light border-0 py-2.5" placeholder="Patient name or ID" />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-muted small mb-2 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Doctor</label>
              <select className="form-select bg-light border-0 py-2.5 fw-medium">
                <option>All Doctors</option>
                <option>Dr. Sarah Jenkins</option>
                <option>Dr. Michael Chen</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label fw-bold text-muted small mb-2 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Status</label>
              <select className="form-select bg-light border-0 py-2.5 fw-medium">
                <option>All Statuses</option>
                <option>Checked In</option>
                <option>Scheduled</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn text-white fw-bold w-100 py-2.5 rounded-3 shadow-sm" style={{ backgroundColor: '#001835' }}>Apply Filters</button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#001835' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-people-fill fs-4" style={{ color: '#001835' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Total Appointments</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>48</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4" style={{ borderColor: '#006a6a' }}>
              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-check-circle-fill fs-4" style={{ color: '#006a6a' }}></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Checked In</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>12</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4 border-warning">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Pending</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>8</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4 p-4 d-flex flex-row align-items-center gap-3 bg-white border-start border-4 border-danger">
              <div className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                <i className="bi bi-x-circle-fill fs-4"></i>
              </div>
              <div>
                <p className="text-muted fw-bold mb-0 text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>Canceled</p>
                <h3 className="fw-bolder mb-0" style={{ color: '#001835' }}>2</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr className="text-uppercase small fw-bold text-muted" style={{ letterSpacing: '1px' }}>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Patient Info</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>09:00 AM</td>
                  <td className="px-4 py-4">
                    <div className="fw-bold text-dark">Alice Schmidt</div>
                    <small className="text-muted">ID: #PT-1029</small>
                  </td>
                  <td className="px-4 py-4 fw-medium text-dark">Dr. Sarah Jenkins</td>
                  <td className="px-4 py-4"><span className="badge bg-success-subtle text-success rounded-pill px-3 py-2 fw-bold">Checked In</span></td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-sm btn-outline-secondary fw-bold px-3 rounded-3">Details</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 fw-bold" style={{ color: '#001835' }}>09:30 AM</td>
                  <td className="px-4 py-4">
                    <div className="fw-bold text-dark">Bob Martin</div>
                    <small className="text-muted">ID: #PT-1030</small>
                  </td>
                  <td className="px-4 py-4 fw-medium text-dark">Dr. Michael Chen</td>
                  <td className="px-4 py-4"><span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2 fw-bold">Scheduled</span></td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-sm text-white fw-bold px-3 rounded-3 shadow-sm" style={{ backgroundColor: '#001835' }}>Check In</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 fw-bold text-muted text-decoration-line-through">10:00 AM</td>
                  <td className="px-4 py-4">
                    <div className="fw-bold text-muted">Charlie Davis</div>
                    <small className="text-muted">ID: #PT-1031</small>
                  </td>
                  <td className="px-4 py-4 text-muted">Dr. Sarah Jenkins</td>
                  <td className="px-4 py-4"><span className="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 fw-bold">Canceled</span></td>
                  <td className="px-4 py-4 text-end">
                    <button className="btn btn-sm btn-outline-secondary fw-bold px-3 rounded-3">Details</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </ReceptionLayout>
  );
};