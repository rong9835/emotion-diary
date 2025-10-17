import React, { forwardRef, useEffect, useRef } from 'react';

import { Button } from '../button';
import styles from './styles.module.css';

// ========================================
// Modal Component Types
// ========================================

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * 모달의 시각적 스타일 variant
   * - info: 정보성 모달 (기본값)
   * - danger: 경고/위험 모달
   */
  variant?: 'info' | 'danger';

  /**
   * 모달의 액션 버튼 구성
   * - single: 단일 버튼 (확인)
   * - dual: 이중 버튼 (취소, 확인)
   */
  actions?: 'single' | 'dual';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 모달 제목
   */
  title: string;

  /**
   * 모달 내용
   */
  content: string;

  /**
   * 확인 버튼 텍스트
   */
  confirmText?: string;

  /**
   * 취소 버튼 텍스트 (dual actions일 때만 사용)
   */
  cancelText?: string;

  /**
   * 확인 버튼 클릭 핸들러
   */
  onConfirm?: () => void;

  /**
   * 취소 버튼 클릭 핸들러 (dual actions일 때만 사용)
   */
  onCancel?: () => void;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;
}

// ========================================
// Modal Component
// ========================================

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      variant = 'info',
      actions = 'single',
      theme = 'light',
      title,
      content,
      confirmText = '확인',
      cancelText = '취소',
      onConfirm,
      onCancel,
      disabled = false,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    // 참조
    const modalRef = useRef<HTMLDivElement>(null);

    // 클래스명 조합
    const modalClasses = [
      styles.modal,
      styles[`variant--${variant}`],
      styles[`actions--${actions}`],
      styles[`theme--${theme}`],
      disabled && styles.disabled,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // 키보드 이벤트 처리
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'Enter':
          event.preventDefault();
          if (actions === 'single') {
            onConfirm?.();
          }
          break;
        case 'Escape':
          event.preventDefault();
          onCancel?.();
          break;
        case 'Tab':
          // Tab 키로 버튼 간 이동 허용
          break;
      }
    };

    // 포커스 관리
    useEffect(() => {
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }, []);

    const handleConfirm = () => {
      if (!disabled) {
        onConfirm?.();
      }
    };

    const handleCancel = () => {
      if (!disabled) {
        onCancel?.();
      }
    };

    return (
      <div
        ref={ref || modalRef}
        className={modalClasses}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-content"
        data-modal-component="true"
        {...props}
      >
        {/* 모달 헤더 */}
        <div className={styles.header}>
          <h2
            id="modal-title"
            className={`${styles.title} typography-headline-medium`}
          >
            {title}
          </h2>
          <p
            id="modal-content"
            className={`${styles.content} typography-headline-small`}
          >
            {content}
          </p>
        </div>

        {/* 모달 액션 버튼 영역 */}
        <div className={styles.actions}>
          {actions === 'single' ? (
            <Button
              variant="primary"
              theme="light"
              size="large"
              fullWidth
              onClick={handleConfirm}
              disabled={disabled}
              className={styles['button--single']}
            >
              {confirmText}
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                theme="light"
                size="small"
                onClick={handleCancel}
                disabled={disabled}
                className={styles['button--dual']}
                data-testid="continue-writing-button"
              >
                {cancelText}
              </Button>
              <Button
                variant="primary"
                theme="light"
                size="small"
                onClick={handleConfirm}
                disabled={disabled}
                className={styles['button--dual']}
                data-testid="cancel-registration-button"
              >
                {confirmText}
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }
);

// ========================================
// Display Name
// ========================================

Modal.displayName = 'Modal';

// ========================================
// Export Default
// ========================================

export default Modal;
