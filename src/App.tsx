import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Import các Pages đã tạo
import { LoginPage } from './pages/LoginPage';
import { DepartmentPage } from './pages/DepartmentPage';
// Giả sử bạn đã tạo các file này tương tự cấu trúc tôi đã hướng dẫn
import { RegisterPage } from './pages/RegisterPage'; 
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { HomePage } from './pages/HomePage';
import { DoctorListPage } from './pages/DoctorListPage';
import { ReceptionDashboardPage } from './pages/ReceptionDashboardPage';
import { ReceptionTimelinePage } from './pages/ReceptionTimelinePage';
import { ReceptionListPage } from './pages/ReceptionListPage';
import { DoctorDashboardPage } from './pages/DoctorDashboardPage';
import { DoctorSchedulePage } from './pages/DoctorSchedulePage';
import { DoctorPatientsPage } from './pages/DoctorPatientsPage';
import { PatientDashboardPage } from './pages/PatientDashboardPage';
import { PatientAppointmentsPage } from './pages/PatientAppointmentsPage';
import { PatientAppointmentDetailsPage } from './pages/PatientAppointmentDetailsPage';
import { PatientPastAppointmentPage } from './pages/PatientPastAppointmentPage';
import { AdminDoctorsPage } from './pages/AdminDoctorsPage';
import { AdminReceptionistsPage } from './pages/AdminReceptionistsPage';
import { AdminSpecialtiesPage } from './pages/AdminSpecialtiesPage';
import { AdminPatientsPage } from './pages/AdminPatientsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function App() {
  return (
  <BrowserRouter>
      <Routes>
        {/* Các trang Public (Không cần đăng nhập) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Trang danh sách bác sĩ/khoa */}
        <Route path="/department/:id" element={<DepartmentPage />} /> 
        {/* Dùng :id để sau này truyền ID của khoa, ví dụ /department/cardiology */}
        <Route path="/doctors" element={<DoctorListPage />} />
        {/* Xử lý đường dẫn không tồn tại (Lỗi 404) */}
        <Route path="/reception" element={<ReceptionDashboardPage />} />
        <Route path="/reception/schedule/list" element={<ReceptionListPage />} />
        <Route path="/reception/schedule/timeline" element={<ReceptionTimelinePage />} />
        <Route path="/doctor" element={<DoctorDashboardPage />} />
        <Route path="/doctor/schedule" element={<DoctorSchedulePage />} />
        <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
        <Route path="/patient" element={<PatientDashboardPage />} />
        <Route path="/patient/appointments" element={<PatientAppointmentsPage />} />
        <Route path="/patient/appointment-details" element={<PatientAppointmentDetailsPage />} />
        <Route path="/patient/appointments/history-detail" element={<PatientPastAppointmentPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/doctors" element={<AdminDoctorsPage />} />
        <Route path="/admin/patients" element={<AdminPatientsPage />} />
        <Route path="/admin/receptionists" element={<AdminReceptionistsPage />} />
        <Route path="/admin/specialties" element={<AdminSpecialtiesPage />} />
        <Route path="*" element={
          <div className="flex justify-center items-center h-screen text-2xl font-bold">
            404 - Không tìm thấy trang
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
