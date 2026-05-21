import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
// Import các Pages đã tạo
import { LoginPage } from './pages/auth-page/LoginPage';
import { SpecialtyDetail } from './pages/home-page/SpeciatiesDetail';

// Giả sử bạn đã tạo các file này tương tự cấu trúc tôi đã hướng dẫn
import { RegisterPage } from './pages/auth-page/RegisterPage'; 
import { ForgotPasswordPage } from './pages/auth-page/ForgotPasswordPage';
import { HomePage } from './pages/home-page/HomePage';
import { DoctorListPage } from './pages/home-page/DoctorListPage';
import { ReceptionAppointmentPage } from './pages/receptionist-page/ReceptionAppointmentPage';
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
import { ResetPasswordPage } from './pages/auth-page/ResetPasswordPage';
import { VerifyOtpPage } from './pages/auth-page/VerifyPage';
import { DepartmentPage } from './pages/home-page/DepartmentPage';

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
        <Route path="/department" element={<DepartmentPage />} /> 
        <Route path="/department/:id" element={<SpecialtyDetail />} /> 
        {/* Dùng :id để sau này truyền ID của khoa, ví dụ /department/cardiology */}
        <Route path="/doctors" element={<DoctorListPage />} />
        {/* Reception Routes (ROLE_RECEPTIONIST) */}
        <Route path="/reception" element={<Navigate to="/reception/appointment" replace />} />
        <Route path="/reception/appointment" element={<ProtectedRoute requiredRole="ROLE_RECEPTIONIST"><ReceptionAppointmentPage /></ProtectedRoute>} />
        <Route path="/reception/schedule/list" element={<ProtectedRoute requiredRole="ROLE_RECEPTIONIST"><ReceptionListPage /></ProtectedRoute>} />
        <Route path="/reception/schedule/timeline" element={<ProtectedRoute requiredRole="ROLE_RECEPTIONIST"><ReceptionTimelinePage /></ProtectedRoute>} />
        
        {/* Doctor Routes (ROLE_DOCTOR) */}
        <Route path="/doctor" element={<ProtectedRoute requiredRole="ROLE_DOCTOR"><DoctorDashboardPage /></ProtectedRoute>} />
        <Route path="/doctor/schedule" element={<ProtectedRoute requiredRole="ROLE_DOCTOR"><DoctorSchedulePage /></ProtectedRoute>} />
        <Route path="/doctor/patients" element={<ProtectedRoute requiredRole="ROLE_DOCTOR"><DoctorPatientsPage /></ProtectedRoute>} />
        
        {/* Patient Routes (ROLE_PATIENT) */}
        <Route path="/patient" element={<ProtectedRoute requiredRole="ROLE_PATIENT"><PatientDashboardPage /></ProtectedRoute>} />
        <Route path="/patient/appointments" element={<ProtectedRoute requiredRole="ROLE_PATIENT"><PatientAppointmentsPage /></ProtectedRoute>} />
        <Route path="/patient/appointment-details" element={<ProtectedRoute requiredRole="ROLE_PATIENT"><PatientAppointmentDetailsPage /></ProtectedRoute>} />
        <Route path="/patient/appointments/:id" element={<ProtectedRoute requiredRole="ROLE_PATIENT"><PatientAppointmentDetailsPage /></ProtectedRoute>} />
        <Route path="/patient/appointments/history-detail" element={<ProtectedRoute requiredRole="ROLE_PATIENT"><PatientPastAppointmentPage /></ProtectedRoute>} />
        
        {/* Admin Routes (ROLE_ADMIN) */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminDoctorsPage /></ProtectedRoute>} />
        <Route path="/admin/doctors" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminDoctorsPage /></ProtectedRoute>} />
        <Route path="/admin/patients" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminPatientsPage /></ProtectedRoute>} />
        <Route path="/admin/receptionists" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminReceptionistsPage /></ProtectedRoute>} />
        <Route path="/admin/specialties" element={<ProtectedRoute requiredRole="ROLE_ADMIN"><AdminSpecialtiesPage /></ProtectedRoute>} />
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
