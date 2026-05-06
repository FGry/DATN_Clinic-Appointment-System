import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Import các Pages đã tạo
import { LoginPage } from './pages/auth-page/LoginPage';
import { DepartmentPage } from './pages/home-page/DepartmentPage';
// Giả sử bạn đã tạo các file này tương tự cấu trúc tôi đã hướng dẫn
import { RegisterPage } from './pages/auth-page/RegisterPage'; 
import { ForgotPasswordPage } from './pages/auth-page/ForgotPasswordPage';
import { HomePage } from './pages/home-page/HomePage';
import { DoctorListPage } from './pages/home-page/DoctorListPage';
import { ReceptionDashboardPage } from './pages/receptionist-page/ReceptionDashboardPage';
import { ReceptionListPage } from './pages/receptionist-page/ReceptionListPage';
import { ReceptionTimelinePage } from './pages/receptionist-page/ReceptionTimelinePage';
import { DoctorDashboardPage } from './pages/doctor-page/DoctorDashboardPage';
import { DoctorSchedulePage } from './pages/doctor-page/DoctorSchedulePage';
import { DoctorPatientsPage } from './pages/doctor-page/DoctorPatientsPage';
import { PatientDashboardPage } from './pages/patient-page/PatientDashboardPage';
import { PatientAppointmentsPage } from './pages/patient-page/PatientAppointmentsPage';
import { PatientAppointmentDetailsPage } from './pages/patient-page/PatientAppointmentDetailsPage';
import { PatientPastAppointmentPage } from './pages/patient-page/PatientPastAppointmentPage';
import { AdminDoctorsPage } from './pages/admin-page/AdminDoctorsPage';
import { AdminReceptionistsPage } from './pages/admin-page/AdminReceptionistsPage';
import { AdminSpecialtiesPage } from './pages/admin-page/AdminSpecialtiesPage';
import { AdminPatientsPage } from './pages/admin-page/AdminPatientsPage';
import { AdminDashboardPage } from './pages/admin-page/AdminDashboardPage';
import { ResetPasswordPage } from './pages/auth-page/ResetPasswordPage';
import { VerifyOtpPage } from './pages/auth-page/VerifyPage';

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
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
