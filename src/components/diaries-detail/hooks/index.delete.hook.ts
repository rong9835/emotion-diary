'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Types & Interfaces
// ========================================

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface UseDeleteDiaryReturn {
  /** 일기 삭제 실행 */
  deleteDiary: () => void;
  /** 삭제 중 로딩 상태 */
  isDeleting: boolean;
}

// ========================================
// Hook Implementation
// ========================================

/**
 * 일기 삭제 기능을 관리하는 커스텀 훅
 * 로컬스토리지에서 특정 ID의 일기를 삭제하고 일기 목록 페이지로 이동합니다.
 *
 * @param diaryId 삭제할 일기의 ID
 * @returns 삭제 관련 상태와 함수들
 */
export const useDeleteDiary = (diaryId: string): UseDeleteDiaryReturn => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * 일기 삭제 실행 함수
   * 로컬스토리지에서 해당 일기를 제거하고 일기 목록 페이지로 이동합니다.
   */
  const deleteDiary = () => {
    try {
      setIsDeleting(true);

      // 로컬스토리지에서 일기 목록 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        console.error('일기 목록을 찾을 수 없습니다.');
        return;
      }

      const diaries: DiaryData[] = JSON.parse(diariesJson);
      const diaryIdNumber = parseInt(diaryId, 10);

      // 해당 일기 ID와 일치하는 객체를 제거
      const updatedDiaries = diaries.filter(
        (diary) => diary.id !== diaryIdNumber
      );

      // 로컬스토리지에 업데이트된 데이터 저장
      localStorage.setItem('diaries', JSON.stringify(updatedDiaries));

      // 일기 목록 페이지로 이동
      router.push('/diaries');
    } catch (error) {
      console.error('일기 삭제 중 오류가 발생했습니다:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteDiary,
    isDeleting,
  };
};
