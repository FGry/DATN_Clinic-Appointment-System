import React, { useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string; // Bổ sung prop error
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon, type, id, error, className = '', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  // Nếu có lỗi, thêm viền đỏ (is-invalid của Bootstrap)
  const errorClass = error ? 'is-invalid border-danger' : '';

  return (
    <div className="mb-3">
      {label && <label htmlFor={id} className="form-label fw-semibold">{label}</label>}
      <div className="input-group">
        {icon && (
          <span className={`input-group-text bg-white text-secondary ${error ? 'border-danger' : ''}`}>
            <i className={`bi bi-${icon} fs-6`}></i>
          </span>
        )}
        <input
          id={id}
          type={inputType}
          className={`form-control py-2 ${errorClass} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className={`btn btn-outline-secondary d-flex align-items-center ${error ? 'border-danger' : ''}`}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi bi-eye${showPassword ? '' : '-slash'} fs-6`}></i>
          </button>
        )}
      </div>
      {/* Hiển thị message lỗi màu đỏ ngay dưới input */}
      {error && <div className="text-danger small mt-1 fw-medium">{error}</div>}
    </div>
  );
};