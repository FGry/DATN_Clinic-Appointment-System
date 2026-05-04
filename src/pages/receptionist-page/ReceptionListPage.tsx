import React from 'react';
import { ReceptionLayout } from '../../components/layout/ReceptionLayout';
import { Link } from 'react-router-dom';

export const ReceptionListPage: React.FC = () => {
  return (
    <ReceptionLayout onOpenBookingModal={() => {}}>
      <div className="container-fluid px-0">
        
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold mb-1">Daily Schedule</h2>
            <p className="text-muted mb-0">Manage and track patient appointments for today.</p>
          </div>
          <div className="bg-light p-1 rounded-3 d-flex border">
            <button className="btn btn-sm btn-white text-primary shadow-sm px-3 fw-semibold">
              <i className="bi bi-list-ul me-2"></i> List View
            </button>
            <Link to="/reception/schedule/timeline" className="btn btn-sm btn-light text-secondary border-0 px-3 fw-semibold">
              <i className="bi bi-calendar-range me-2"></i> Timeline
            </Link>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="card border-0 shadow-sm p-3 mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label text-muted small fw-semibold">Date</label>
              <input type="date" className="form-control" defaultValue="2023-10-24" />
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted small fw-semibold">Doctor</label>
              <select className="form-select">
                <option>All Doctors</option>
                <option>Dr. Sarah Jenkins</option>
                <option>Dr. Michael Chen</option>
                <option>Dr. Elena Rodriguez</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label text-muted small fw-semibold">Specialty</label>
              <select className="form-select">
                <option>All Specialties</option>
                <option>General Practice</option>
                <option>Cardiology</option>
                <option>Pediatrics</option>
              </select>
            </div>
            <div className="col-md-3">
              <button className="btn btn-light border fw-semibold w-100 hover-bg-light">
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table Container */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 border-top-0">
              <thead className="bg-light text-muted">
                <tr>
                  <th className="py-3 px-3 fw-semibold border-bottom-0" style={{ width: '130px' }}>TIME</th>
                  <th className="py-3 px-3 fw-semibold border-bottom-0">PATIENT</th>
                  <th className="py-3 px-3 fw-semibold border-bottom-0">SERVICE</th>
                  <th className="py-3 px-3 fw-semibold border-bottom-0">DOCTOR</th>
                  <th className="py-3 px-3 fw-semibold border-bottom-0">STATUS</th>
                  <th className="py-3 px-3 fw-semibold border-bottom-0 text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="border-top-0">
                {/* Row 1 */}
                <tr>
                  <td className="px-3 py-3">
                    <span className="fw-bold fs-5 text-primary d-block">09:00</span>
                    <small className="text-muted">30 min</small>
                  </td>
                  <td className="px-3">
                    <div className="fw-bold text-dark">James Wilson</div>
                    <small className="text-muted">PID: #882190</small>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-normal">Annual Checkup</span>
                  </td>
                  <td className="px-3 text-dark">Dr. Sarah Jenkins</td>
                  <td className="px-3">
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <span className="bg-primary rounded-circle" style={{ width: '6px', height: '6px' }}></span> Confirmed
                    </span>
                  </td>
                  <td className="px-3 text-end">
                    <button className="btn btn-link text-primary fw-semibold text-decoration-none p-0 me-3">Check-in</button>
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0">Edit</button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td className="px-3 py-3">
                    <span className="fw-bold fs-5 text-secondary d-block">09:30</span>
                    <small className="text-muted">15 min</small>
                  </td>
                  <td className="px-3">
                    <div className="fw-bold text-dark">Maria Garcia</div>
                    <small className="text-muted">PID: #771204</small>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-normal">Follow-up</span>
                  </td>
                  <td className="px-3 text-dark">Dr. Michael Chen</td>
                  <td className="px-3">
                    <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px' }}></span> Completed
                    </span>
                  </td>
                  <td className="px-3 text-end">
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0 opacity-50 me-3" disabled>Checked</button>
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0">View</button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td className="px-3 py-3">
                    <span className="fw-bold fs-5 text-primary d-block">10:15</span>
                    <small className="text-muted">45 min</small>
                  </td>
                  <td className="px-3">
                    <div className="fw-bold text-dark">Robert Taylor</div>
                    <small className="text-muted">PID: #901122</small>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-light text-dark border rounded-pill px-3 py-2 fw-normal">Cardiology Consult</span>
                  </td>
                  <td className="px-3 text-dark">Dr. Elena Rodriguez</td>
                  <td className="px-3">
                    <span className="badge bg-warning-subtle text-warning border border-warning-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <span className="bg-warning rounded-circle" style={{ width: '6px', height: '6px' }}></span> Pending
                    </span>
                  </td>
                  <td className="px-3 text-end">
                    <button className="btn btn-link text-primary fw-semibold text-decoration-none p-0 me-3">Check-in</button>
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0 me-3">Edit</button>
                    <button className="btn btn-link text-danger fw-semibold text-decoration-none p-0">Cancel</button>
                  </td>
                </tr>
                
                {/* Row 4 */}
                <tr className="opacity-75 bg-light">
                  <td className="px-3 py-3">
                    <span className="fw-bold fs-5 text-secondary d-block">11:00</span>
                    <small className="text-muted">30 min</small>
                  </td>
                  <td className="px-3">
                    <div className="fw-bold text-dark">Linda Henderson</div>
                    <small className="text-muted">PID: #665431</small>
                  </td>
                  <td className="px-3">
                    <span className="badge bg-white text-dark border rounded-pill px-3 py-2 fw-normal">Skin Screening</span>
                  </td>
                  <td className="px-3 text-dark">Dr. Sarah Jenkins</td>
                  <td className="px-3">
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2">
                      <span className="bg-danger rounded-circle" style={{ width: '6px', height: '6px' }}></span> No-Show
                    </span>
                  </td>
                  <td className="px-3 text-end">
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0 me-3">Reschedule</button>
                    <button className="btn btn-link text-muted fw-semibold text-decoration-none p-0">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Table Footer */}
          <div className="card-footer bg-light border-top d-flex justify-content-between align-items-center py-3 px-3">
            <span className="text-muted small">Showing 4 of 24 appointments</span>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-white border"><i className="bi bi-chevron-left"></i></button>
              <button className="btn btn-sm btn-white border"><i className="bi bi-chevron-right"></i></button>
            </div>
          </div>
        </div>

        {/* Summary Chips Footer */}
        <div className="row g-4 mt-2">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-people-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Total Patients</p>
                <h4 className="fw-bold mb-0">24</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-check-circle-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Checked In</p>
                <h4 className="fw-bold mb-0">12</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-hourglass-split fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Pending</p>
                <h4 className="fw-bold mb-0">8</h4>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow-sm p-3 d-flex flex-row align-items-center gap-3">
              <div className="bg-danger-subtle text-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-x-circle-fill fs-5"></i>
              </div>
              <div>
                <p className="text-muted fw-semibold mb-0 text-uppercase" style={{ fontSize: '10px' }}>Cancellations</p>
                <h4 className="fw-bold mb-0">4</h4>
              </div>
            </div>
          </div>
        </div>

      </div>
    </ReceptionLayout>
  );
};