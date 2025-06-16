import React, { useState, ChangeEvent } from 'react';
import './TextField.css';

interface TextFieldProps {
  variant?: 'outlined' | 'filled' | 'standard';
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
}

const TextFieldComponent: React.FC<TextFieldProps> = ({
  variant = 'outlined',
  value,
  onChange,
  label = '',
  required = false,
  type = 'text',
  placeholder = '',
  disabled = false,
  error = '',
  helperText = '',
  className = ''
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`textfield-container ${variant} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''} ${className}`}>
      <div className="textfield-wrapper">
        <input
          type={type}
          id={label}
          value={value}
          onChange={handleChange}
          required={required}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="input"
        />
        <label 
          htmlFor={label} 
          className={`label ${isFocused || hasValue ? 'active' : ''}`}
        >
          {label}
          {required && <span className="required">*</span>}
        </label>
        {variant === 'outlined' && <div className="outline" />}
      </div>
      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
      {error && (
        <span className="error-text">{error}</span>
      )}
    </div>
  );
};

export default TextFieldComponent;