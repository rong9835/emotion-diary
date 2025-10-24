import { useModal } from '@/commons/providers/modal/modal.provider';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import { DiariesNew } from '@/components/diaries-new';

// ========================================
// Types & Interfaces
// ========================================

export interface UseNewDiaryModalReturn {
  openNewDiaryModal: () => void;
  closeModal: () => void;
}

// ========================================
// useNewDiaryModal Hook
// ========================================

/**
 * 일기쓰기 모달을 열고 닫는 기능을 제공하는 Hook
 * 권한 검증을 통해 로그인 유저만 일기쓰기 모달을 열 수 있습니다.
 *
 * @returns {UseNewDiaryModalReturn} 모달 열기/닫기 함수들
 *
 * @example
 * ```tsx
 * const { openNewDiaryModal, closeModal } = useNewDiaryModal();
 *
 * <button onClick={openNewDiaryModal}>일기쓰기</button>
 * ```
 */
export const useNewDiaryModal = (): UseNewDiaryModalReturn => {
  const { openModal, closeModal } = useModal();
  const { checkAuth } = useAuthGuard();

  /**
   * 일기쓰기 모달 열기 (권한 검증 포함)
   */
  const openNewDiaryModal = () => {
    // 권한 검증
    if (!checkAuth()) {
      // 권한이 없는 경우, checkAuth()에서 로그인 모달을 자동으로 표시함
      return;
    }

    // 권한이 있는 경우, 일기쓰기 모달 열기
    openModal(
      <DiariesNew
        onSave={(data) => {
          console.log('Diary saved:', data);
          closeModal();
          // TODO: 실제 저장 로직 추가 예정
        }}
        onCancel={() => {
          closeModal();
        }}
      />,
      {
        closeOnBackdropClick: true,
        closeOnEscape: true,
        showCloseButton: false, // DiariesNew 컴포넌트 자체에 닫기 버튼 포함
        className: '!bg-transparent !rounded-none !shadow-none !p-0', // 모달 wrapper 스타일 제거
      }
    );
  };

  return {
    openNewDiaryModal,
    closeModal,
  };
};

// ========================================
// Export
// ========================================

export default useNewDiaryModal;
