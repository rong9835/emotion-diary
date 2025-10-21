import React from 'react';
import { Input } from '../../commons/components/input';
import { Button } from '../../commons/components/button';
import styles from './styles.module.css';

// ========================================
// AuthLogin Component
// ========================================

export const AuthLogin: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>로그인</h1>
          <p className={styles.subtitle}>감정 일기에 오신 것을 환영합니다</p>
        </div>

        {/* Form */}
        <form className={styles.form}>
          {/* Email Input */}
          <div className={styles.inputGroup}>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              variant="primary"
              theme="light"
              size="medium"
              className={styles.input}
            />
          </div>

          {/* Password Input */}
          <div className={styles.inputGroup}>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              variant="primary"
              theme="light"
              size="medium"
              className={styles.input}
            />
          </div>

          {/* Login Button */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              theme="light"
              size="large"
              className={styles.loginButton}
            >
              로그인
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.signupText}>
            아직 계정이 없으신가요?{' '}
            <a href="/auth/signup" className={styles.signupLink}>
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

// ========================================
// Export
// ========================================

export default AuthLogin;
