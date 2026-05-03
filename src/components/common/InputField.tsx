import React, { useState } from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ label, icon, type, id, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  return (
    <div className="mb-3">
      {label && <label htmlFor={id} className="form-label fw-semibold">{label}</label>}
      <div className="input-group">
        {icon && (
          <span className="input-group-text bg-white text-secondary">
            <i className={`bi bi-${icon} fs-6`}></i>
          </span>
        )}
        <input
          id={id}
          type={inputType}
          className="form-control py-2"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="btn btn-outline-secondary d-flex align-items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi bi-eye${showPassword ? '' : '-slash'} fs-6`}></i>
          </button>
        )}
      </div>
    </div>
  );
};