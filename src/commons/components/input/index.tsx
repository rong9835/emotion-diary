import React, { forwardRef, InputHTMLAttributes } from 'react';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Input 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (라이트/다크 모드) */
  theme?: 'light' | 'dark';
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 헬퍼 텍스트 */
  helperText?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 좌측 아이콘 */
  leftIcon?: React.ReactNode;
  /** 우측 아이콘 */
  rightIcon?: React.ReactNode;
}

// ========================================
// Input Component
// ========================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      error = false,
      errorMessage,
      helperText,
      label,
      required = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // ========================================
    // CSS Classes
    // ========================================

    const inputClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      error && styles['input--error'],
      disabled && styles['input--disabled'],
      fullWidth && styles['input--full-width'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const containerClasses = [
      styles.container,
      fullWidth && styles['container--full-width'],
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.wrapper,
      styles[`wrapper--${variant}`],
      styles[`wrapper--${size}`],
      styles[`wrapper--${theme}`],
      error && styles['wrapper--error'],
      disabled && styles['wrapper--disabled'],
      leftIcon && styles['wrapper--with-left-icon'],
      rightIcon && styles['wrapper--with-right-icon'],
    ]
      .filter(Boolean)
      .join(' ');

    // ========================================
    // Render
    // ========================================

    return (
      <div className={containerClasses}>
        {/* Label */}
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        {/* Input Wrapper */}
        <div className={wrapperClasses}>
          {/* Left Icon */}
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

          {/* Input Field */}
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && <div className={styles.rightIcon}>{rightIcon}</div>}
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || errorMessage) && (
          <div className={styles.helperText}>
            {error && errorMessage ? (
              <span className={styles.errorText}>{errorMessage}</span>
            ) : (
              <span className={styles.helperTextContent}>{helperText}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// ========================================
// Export
// ========================================

export default Input;
