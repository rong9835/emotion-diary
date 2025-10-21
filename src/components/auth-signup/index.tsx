import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import styles from './styles.module.css';

// ========================================
// AuthSignup Component
// ========================================

export const AuthSignup: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>회원가입</h1>
          <p className={styles.subtitle}>
            감정 일기를 시작하기 위해 계정을 만들어보세요
          </p>
        </div>

        {/* Form */}
        <form className={styles.form}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="large"
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="large"
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* Confirm Password Input */}
          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="large"
              label="비밀번호 재입력"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* Name Input */}
          <div className={styles.inputGroup}>
            <Input
              variant="primary"
              theme="light"
              size="large"
              label="이름"
              type="text"
              placeholder="이름을 입력해주세요"
              required
              fullWidth
            />
          </div>

          {/* Submit Button */}
          <div className={styles.buttonGroup}>
            <Button variant="primary" theme="light" size="large" fullWidth>
              회원가입
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
