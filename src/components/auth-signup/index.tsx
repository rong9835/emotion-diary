'use client';

import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import { useSignupForm } from './hooks/index.form.hook';
import styles from './styles.module.css';

// ========================================
// AuthSignup Component
// ========================================

export const AuthSignup: React.FC = () => {
  const { register, handleSubmit, errors, isValid, isLoading } = useSignupForm();

  return (
    <div className={styles.container} data-testid="signup-container">
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>
            감정 일기를 시작하기 위해 계정을 만들어보세요
          </p>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <Input
              {...register('email')}
              variant="primary"
              theme="light"
              size="large"
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              required
              fullWidth
              data-testid="signup-email-input"
              error={!!errors.email}
            />
            {errors.email && (
              <span
                className={styles.errorMessage}
                data-testid="signup-email-error"
              >
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <Input
              {...register('password')}
              variant="primary"
              theme="light"
              size="large"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
              fullWidth
              data-testid="signup-password-input"
              error={!!errors.password}
            />
            {errors.password && (
              <span
                className={styles.errorMessage}
                data-testid="signup-password-error"
              >
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className={styles.inputGroup}>
            <Input
              {...register('passwordConfirm')}
              variant="primary"
              theme="light"
              size="large"
              label="비밀번호 재입력"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              required
              fullWidth
              data-testid="signup-password-confirm-input"
              error={!!errors.passwordConfirm}
            />
            {errors.passwordConfirm && (
              <span
                className={styles.errorMessage}
                data-testid="signup-password-confirm-error"
              >
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>

          {/* Name Input */}
          <div className={styles.inputGroup}>
            <Input
              {...register('name')}
              variant="primary"
              theme="light"
              size="large"
              label="이름"
              type="text"
              placeholder="이름을 입력해주세요"
              required
              fullWidth
              data-testid="signup-name-input"
              error={!!errors.name}
            />
            {errors.name && (
              <span
                className={styles.errorMessage}
                data-testid="signup-name-error"
              >
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              type="submit"
              disabled={!isValid || isLoading}
              data-testid="signup-submit-button"
            >
              {isLoading ? '처리 중...' : '회원가입'}
            </Button>
          </div>

          {/* Login Link */}
          <div className={styles.loginLink}>
            <p className={styles.loginText}>
              이미 계정이 있으신가요?{' '}
              <a href="/auth/login" className={styles.loginAnchor}>
                로그인하기
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthSignup;
