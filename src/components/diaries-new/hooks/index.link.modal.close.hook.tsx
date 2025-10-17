import { useCallback } from 'react';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

// ========================================
// Types & Interfaces
// ========================================

export interface UseModalCloseReturn {
  /** 등록취소 모달 열기 */
  openCancelModal: () => void;
  /** 등록취소 모달 닫기 (계속작성 버튼) */
  closeCancelModal: () => void;
  /** 모든 모달 닫기 (등록취소 버튼) */
  closeAllModals: () => void;
}

// ========================================
// useModalClose Hook
// ========================================

/**
 * 일기쓰기 모달의 닫기 기능을 제공하는 Hook
 *
 * 등록취소 모달을 열고, 계속작성/등록취소 버튼의 동작을 처리합니다.
 * 2중 모달 구조로 등록취소 모달이 일기쓰기 모달 위에 overlay됩니다.
 *
 * @returns {UseModalCloseReturn} 모달 닫기 관련 함수들
 *
 * @example
 * ```tsx
 * const { openCancelModal } = useModalClose();
 *
 * <button onClick={openCancelModal}>닫기</button>
 * ```
 */
export const useModalClose = (): UseModalCloseReturn => {
  const { openModal, closeModal, closeAllModals: closeAll } = useModal();

  // 등록취소 모달 열기
  const openCancelModal = useCallback(() => {
    const cancelModalContent = (
      <Modal
        variant="info"
        actions="dual"
        title="등록을 취소하시겠습니까?"
        content="작성 중인 내용이 사라집니다."
        confirmText="등록취소"
        cancelText="계속작성"
        onConfirm={() => {
          // 등록취소 버튼 클릭 시 모든 모달 닫기
          closeAll();
        }}
        onCancel={() => {
          // 계속작성 버튼 클릭 시 등록취소 모달만 닫기
          closeModal();
        }}
        data-testid="cancel-confirmation-modal"
      />
    );

    openModal(cancelModalContent, {
      closeOnBackdropClick: false,
      closeOnEscape: true,
      showCloseButton: false,
      className: '!p-0 !rounded-none !bg-transparent !shadow-none', // Modal provider의 모든 스타일 제거 (Modal 컴포넌트만 사용)
    });
  }, [openModal, closeModal, closeAll]);

  // 등록취소 모달 닫기 (계속작성 버튼)
  const closeCancelModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  // 모든 모달 닫기 (등록취소 버튼)
  const closeAllModals = useCallback(() => {
    closeAll();
  }, [closeAll]);

  return {
    openCancelModal,
    closeCancelModal,
    closeAllModals,
  };
};

// ========================================
// Export
// ========================================

export default useModalClose;
