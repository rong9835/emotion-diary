import React from 'react';

import styles from './styles.module.css';

// ========================================
// Button Component Types
// ========================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼의 시각적 스타일 variant
   * - primary: 주요 액션용 (밝은 배경)
   * - secondary: 보조 액션용 (어두운 배경, 테두리)
   * - tertiary: 비활성화된 상태 (회색)
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * 버튼 크기
   * - small: 104px 너비 (피그마 디자인 기준)
   * - medium: 110px 너비 (피그마 디자인 기준)
   * - large: 224px 너비 (피그마 디자인 기준)
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 버튼 텍스트
   */
  children: React.ReactNode;

  /**
   * 로딩 상태
   */
  loading?: boolean;

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;
}

// ========================================
// Button Component
// ========================================

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium', // 피그마 디자인에 맞춘 기본 크기 (110px)
  theme = 'light',
  children,
  loading = false,
  fullWidth = false,
  disabled,
  className,
  ...props
}) => {
  // 클래스명 조합
  const buttonClasses = [
    styles.button,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled || loading} {...props}>
      {loading ? (
        <span className={styles.loadingSpinner}>
          <span className={styles.spinner} />
          로딩 중...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

// ========================================
// Button Group Component
// ========================================

export interface ButtonGroupProps {
  /**
   * 버튼 그룹의 자식 요소들
   */
  children: React.ReactNode;

  /**
   * 버튼 간격
   */
  spacing?: 'small' | 'medium' | 'large';

  /**
   * 정렬 방향
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * 정렬 위치
   */
  align?: 'left' | 'center' | 'right';

  /**
   * 추가 클래스명
   */
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  spacing = 'medium',
  direction = 'horizontal',
  align = 'left',
  className,
}) => {
  const groupClasses = [
    styles.buttonGroup,
    styles[`spacing-${spacing}`],
    styles[`direction-${direction}`],
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={groupClasses}>{children}</div>;
};

// ========================================
// Export Default
// ========================================

export default Button;
