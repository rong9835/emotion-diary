'use client';

import { useRouter } from 'next/navigation';
import { getDiaryDetailUrl } from '@/commons/constants/url';

// ========================================
// Types & Interfaces
// ========================================

export interface UseDiaryRoutingReturn {
  /**
   * 일기 상세 페이지로 이동하는 함수
   * @param diaryId 일기 ID
   */
  navigateToDiaryDetail: (diaryId: string) => void;
}

// ========================================
// Custom Hook: useDiaryRouting
// ========================================

/**
 * 일기 카드 클릭 시 상세 페이지로 라우팅하는 커스텀 훅
 *
 * @returns {UseDiaryRoutingReturn} 라우팅 함수 객체
 *
 * @example
 * ```tsx
 * const { navigateToDiaryDetail } = useDiaryRouting();
 *
 * const handleCardClick = () => {
 *   navigateToDiaryDetail('123');
 * };
 * ```
 */
export const useDiaryRouting = (): UseDiaryRoutingReturn => {
  // ========================================
  // Next.js Router Hook
  // ========================================

  const router = useRouter();

  // ========================================
  // Handler: Navigate to Diary Detail
  // ========================================

  const navigateToDiaryDetail = (diaryId: string): void => {
    // url.ts에 정의된 함수를 사용하여 동적 경로 생성
    const detailUrl = getDiaryDetailUrl(diaryId);
    router.push(detailUrl);
  };

  // ========================================
  // Return
  // ========================================

  return {
    navigateToDiaryDetail,
  };
};

// ========================================
// Export
// ========================================

export default useDiaryRouting;
