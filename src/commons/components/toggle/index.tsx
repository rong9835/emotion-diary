import React, { useState, useCallback } from 'react';
import styles from './styles.module.css';

// ========================================
// Toggle Component Types
// ========================================

export interface ToggleProps {
  /**
   * 토글의 시각적 스타일 variant
   * - primary: 주요 토글 (파란색 활성화)
   * - secondary: 보조 토글 (회색 활성화)
   * - tertiary: 비활성화된 상태 (연한 회색)
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * 토글 크기
   * - small: 32px 너비
   * - medium: 44px 너비 (기본값)
   * - large: 56px 너비
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 토글 상태 (제어 컴포넌트)
   */
  checked?: boolean;

  /**
   * 기본 토글 상태 (비제어 컴포넌트)
   */
  defaultChecked?: boolean;

  /**
   * 토글 상태 변경 시 호출되는 콜백
   */
  onChange?: (checked: boolean) => void;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 토글 라벨 (접근성용)
   */
  'aria-label'?: string;

  /**
   * 토글 설명 (접근성용)
   */
  'aria-describedby'?: string;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 토글 ID
   */
  id?: string;

  /**
   * 로딩 상태
   */
  loading?: boolean;

  /**
   * 토글 왼쪽 라벨
   */
  labelLeft?: string;

  /**
   * 토글 오른쪽 라벨
   */
  labelRight?: string;

  /**
   * 라벨 위치
   */
  labelPosition?: 'left' | 'right' | 'both';
}

// ========================================
// Toggle Component
// ========================================

export const Toggle: React.FC<ToggleProps> = ({
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  loading = false,
  labelLeft,
  labelRight,
  labelPosition = 'right',
  className,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  // 상태 관리 (제어/비제어 컴포넌트 지원)
  const [internalChecked, setInternalChecked] = useState(
    checked !== undefined ? checked : defaultChecked
  );

  const isChecked = checked !== undefined ? checked : internalChecked;

  // 토글 상태 변경 핸들러
  const handleToggle = useCallback(() => {
    if (disabled || loading) return;

    const newChecked = !isChecked;

    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  }, [disabled, loading, isChecked, checked, onChange]);

  // 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  // 클래스명 조합
  const toggleClasses = [
    styles.toggle,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    isChecked && styles.checked,
    disabled && styles.disabled,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const switchClasses = [
    styles.switch,
    styles[`switch-${size}`],
    isChecked && styles.switchChecked,
  ]
    .filter(Boolean)
    .join(' ');

  const thumbClasses = [
    styles.thumb,
    styles[`thumb-${size}`],
    isChecked && styles.thumbChecked,
    loading && styles.thumbLoading,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.toggleContainer}>
      {/* 왼쪽 라벨 */}
      {labelLeft && (labelPosition === 'left' || labelPosition === 'both') && (
        <label htmlFor={id} className={styles.labelLeft}>
          {labelLeft}
        </label>
      )}

      {/* 토글 스위치 */}
      <div
        className={toggleClasses}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role="switch"
        aria-checked={isChecked}
        aria-disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        tabIndex={disabled ? -1 : 0}
        id={id}
      >
        <div className={switchClasses}>
          <div className={thumbClasses}>
            {loading && (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 오른쪽 라벨 */}
      {labelRight && (labelPosition === 'right' || labelPosition === 'both') && (
        <label htmlFor={id} className={styles.labelRight}>
          {labelRight}
        </label>
      )}
    </div>
  );
};

// ========================================
// Toggle Group Component
// ========================================

export interface ToggleGroupProps {
  /**
   * 토글 그룹의 자식 요소들
   */
  children: React.ReactNode;

  /**
   * 토글 간격
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

  /**
   * 그룹 라벨
   */
  label?: string;

  /**
   * 그룹 설명
   */
  description?: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  spacing = 'medium',
  direction = 'vertical',
  align = 'left',
  className,
  label,
  description,
}) => {
  const groupClasses = [
    styles.toggleGroup,
    styles[`spacing-${spacing}`],
    styles[`direction-${direction}`],
    styles[`align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses} role="group" aria-label={label}>
      {label && <div className={styles.groupLabel}>{label}</div>}
      {description && <div className={styles.groupDescription}>{description}</div>}
      <div className={styles.groupContent}>{children}</div>
    </div>
  );
};

// ========================================
// Export Default
// ========================================

export default Toggle;
