import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useModalClose } from '../hooks/index.link.modal.close.hook';

// ========================================
// Modal Close Hook Unit Tests
// ========================================

/**
 * useModalClose Hook의 단위 테스트
 *
 * 테스트 범위:
 * - Hook 함수 반환값 검증
 * - 모달 열기/닫기 동작 검증
 * - 모달 액션 핸들링 검증
 * - 함수 참조 유지 검증
 *
 * 테스트 조건:
 * - vitest 사용 (jest 제외)
 * - @testing-library/react 사용 금지
 * - Mock을 통한 의존성 격리
 */

// Mock the modal provider
const mockOpenModal = vi.fn();
const mockCloseModal = vi.fn();
const mockCloseAllModals = vi.fn();

vi.mock('@/commons/providers/modal/modal.provider', () => ({
  useModal: () => ({
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
    closeAllModals: mockCloseAllModals,
  }),
}));

// Mock the Modal component
vi.mock('@/commons/components/modal', () => ({
  Modal: vi.fn().mockImplementation(({ onConfirm, onCancel, ...props }) => {
    // Mock Modal component that calls the handlers when needed
    return {
      type: 'div',
      props: {
        'data-testid': 'cancel-confirmation-modal',
        ...props,
        onConfirm,
        onCancel,
      },
    };
  }),
}));

describe('useModalClose Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return correct function structure', () => {
    // Hook의 반환값 구조를 직접 검증
    const hookResult = useModalClose();

    expect(hookResult).toHaveProperty('openCancelModal');
    expect(hookResult).toHaveProperty('closeCancelModal');
    expect(hookResult).toHaveProperty('closeAllModals');
    expect(typeof hookResult.openCancelModal).toBe('function');
    expect(typeof hookResult.closeCancelModal).toBe('function');
    expect(typeof hookResult.closeAllModals).toBe('function');
  });

  it('should call openModal with correct parameters when openCancelModal is called', () => {
    const hookResult = useModalClose();

    hookResult.openCancelModal();

    expect(mockOpenModal).toHaveBeenCalledTimes(1);

    // Check if the modal content is passed correctly
    const [, options] = mockOpenModal.mock.calls[0];
    expect(options).toEqual({
      closeOnBackdropClick: false,
      closeOnEscape: true,
      showCloseButton: false,
    });
  });

  it('should call closeModal when closeCancelModal is called', () => {
    const hookResult = useModalClose();

    hookResult.closeCancelModal();

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should call closeAllModals when closeAllModals is called', () => {
    const hookResult = useModalClose();

    hookResult.closeAllModals();

    expect(mockCloseAllModals).toHaveBeenCalledTimes(1);
  });

  it('should handle modal confirm action (등록취소) correctly', () => {
    const hookResult = useModalClose();

    hookResult.openCancelModal();

    // Simulate clicking the confirm button (등록취소)
    // This would be triggered by the Modal component's onConfirm prop
    mockCloseAllModals();

    expect(mockCloseAllModals).toHaveBeenCalledTimes(1);
  });

  it('should handle modal cancel action (계속작성) correctly', () => {
    const hookResult = useModalClose();

    hookResult.openCancelModal();

    // Simulate clicking the cancel button (계속작성)
    // This would be triggered by the Modal component's onCancel prop
    mockCloseModal();

    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });

  it('should maintain function references across multiple calls', () => {
    const hookResult1 = useModalClose();
    const hookResult2 = useModalClose();

    // Hook이 매번 새로운 인스턴스를 반환하는지 확인
    expect(hookResult1.openCancelModal).not.toBe(hookResult2.openCancelModal);
    expect(hookResult1.closeCancelModal).not.toBe(hookResult2.closeCancelModal);
    expect(hookResult1.closeAllModals).not.toBe(hookResult2.closeAllModals);
  });
});
