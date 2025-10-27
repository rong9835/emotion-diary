'use client';

import React, { useCallback, useState } from 'react';
import { useAuthGuard } from '@/commons/providers/auth/auth.guard.hook';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

// ========================================
// Types & Interfaces
// ========================================

/**
 * 삭제 훅 반환 타입
 */
interface UseDeleteDiaryReturn {
  /**
   * 삭제 모달 표시 여부
   */
  isDeleteModalOpen: boolean;
  /**
   * 삭제할 일기 ID
   */
  deleteTargetId: string | null;
  /**
   * 일기 삭제 함수
   * @param id 삭제할 일기 ID
   */
  handleDeleteDiary: (id: string) => void;
  /**
   * 삭제 모달 닫기 함수
   */
  closeDeleteModal: () => void;
  /**
   * 삭제 확인 함수
   */
  confirmDelete: () => void;
}

// ========================================
// Delete Diary Hook
// ========================================

/**
 * 일기 삭제 기능을 제공하는 훅
 *
 * 기능:
 * 1. 권한 검증 (로그인 유저만 삭제 가능)
 * 2. 삭제 모달 표시/숨김 관리
 * 3. 로컬스토리지에서 일기 데이터 삭제
 * 4. 삭제 후 페이지 새로고침
 *
 * @returns {UseDeleteDiaryReturn} 삭제 관련 함수들과 상태
 *
 * @example
 * ```tsx
 * function DiaryCard({ diary }) {
 *   const { handleDeleteDiary, isDeleteModalOpen, deleteTargetId, closeDeleteModal, confirmDelete } = useDeleteDiary();
 *
 *   return (
 *     <>
 *       <button onClick={() => handleDeleteDiary(diary.id)}>
 *         삭제
 *       </button>
 *       {isDeleteModalOpen && (
 *         <div>
 *           정말 삭제하시겠습니까?
 *           <button onClick={confirmDelete}>삭제</button>
 *           <button onClick={closeDeleteModal}>취소</button>
 *         </div>
 *       )}
 *     </>
 *   );
 * }
 * ```
 */
export function useDeleteDiary(): UseDeleteDiaryReturn {
  const { checkAuth } = useAuthGuard();
  const { openModal, closeAllModals } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  /**
   * 로컬스토리지에서 일기 삭제
   * @param id 삭제할 일기 ID
   */
  const deleteDiaryFromStorage = useCallback((id: string): void => {
    try {
      const diariesData = localStorage.getItem('diaries');
      if (!diariesData) {
        console.warn('삭제할 일기 데이터가 없습니다.');
        return;
      }

      const diaries = JSON.parse(diariesData);
      const updatedDiaries = diaries.filter(
        (diary: { id: string | number }) => String(diary.id) !== String(id)
      );

      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));
      console.log(`일기 ID ${id}가 삭제되었습니다.`);

      // 페이지 새로고침
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    } catch (error) {
      console.error('일기 삭제 중 오류가 발생했습니다:', error);
    }
  }, []);

  /**
   * 삭제 모달 표시
   * @param id 삭제할 일기 ID
   */
  const showDeleteModal = useCallback(
    (id: string): void => {
      const modalContent = (
        <Modal
          variant="danger"
          actions="dual"
          title="일기 삭제"
          content="정말로 이 일기를 삭제하시겠습니까?"
          confirmText="삭제"
          cancelText="취소"
          onConfirm={() => {
            deleteDiaryFromStorage(id);
            closeAllModals();
          }}
          onCancel={() => {
            closeAllModals();
          }}
        />
      );

      openModal(modalContent);
    },
    [openModal, closeAllModals, deleteDiaryFromStorage]
  );

  /**
   * 일기 삭제 핸들러
   * @param id 삭제할 일기 ID
   */
  const handleDeleteDiary = useCallback(
    (id: string): void => {
      // 권한 검증
      if (!checkAuth()) {
        return; // 권한이 없으면 삭제 모달을 표시하지 않음
      }

      // 삭제 모달 표시
      showDeleteModal(id);
    },
    [checkAuth, showDeleteModal]
  );

  /**
   * 삭제 모달 닫기
   */
  const closeDeleteModal = useCallback((): void => {
    setIsDeleteModalOpen(false);
    setDeleteTargetId(null);
  }, []);

  /**
   * 삭제 확인
   */
  const confirmDelete = useCallback((): void => {
    if (deleteTargetId) {
      deleteDiaryFromStorage(deleteTargetId);
    }
    closeDeleteModal();
  }, [deleteTargetId, deleteDiaryFromStorage, closeDeleteModal]);

  return {
    isDeleteModalOpen,
    deleteTargetId,
    handleDeleteDiary,
    closeDeleteModal,
    confirmDelete,
  };
}

// ========================================
// Export Default
// ========================================

export default useDeleteDiary;
