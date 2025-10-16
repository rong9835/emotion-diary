import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ROUTES } from '../../constants/url';

// ========================================
// Layout Link Routing Hook
// ========================================

/**
 * 레이아웃 링크 라우팅 훅
 * 현재 경로를 추적하고 네비게이션 활성 상태를 관리하는 커스텀 훅
 * 
 * @returns {Object} 라우팅 관련 상태와 함수들
 * @returns {string} currentPath - 현재 경로
 * @returns {boolean} isDiariesActive - 일기보관함 활성 상태
 * @returns {boolean} isPicturesActive - 사진보관함 활성 상태
 * @returns {Function} navigateToDiaries - 일기보관함 페이지로 이동
 * @returns {Function} navigateToPictures - 사진보관함 페이지로 이동
 * @returns {Function} navigateToHome - 홈(일기목록) 페이지로 이동
 */
export const useLinkRouting = () => {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * 현재 경로가 일기보관함 페이지인지 확인
   */
  const isDiariesActive = useCallback(() => {
    return pathname === ROUTES.DIARIES.LIST || pathname.startsWith('/diaries/');
  }, [pathname]);

  /**
   * 현재 경로가 사진보관함 페이지인지 확인
   */
  const isPicturesActive = useCallback(() => {
    return pathname === ROUTES.PICTURES.LIST;
  }, [pathname]);

  /**
   * 일기보관함 페이지로 이동
   */
  const navigateToDiaries = useCallback(() => {
    router.push(ROUTES.DIARIES.LIST);
  }, [router]);

  /**
   * 사진보관함 페이지로 이동
   */
  const navigateToPictures = useCallback(() => {
    router.push(ROUTES.PICTURES.LIST);
  }, [router]);

  /**
   * 홈(일기목록) 페이지로 이동 (로고 클릭 시)
   */
  const navigateToHome = useCallback(() => {
    router.push(ROUTES.DIARIES.LIST);
  }, [router]);

  return {
    // 현재 경로 정보
    currentPath: pathname,

    // 활성 상태 확인
    isDiariesActive: isDiariesActive(),
    isPicturesActive: isPicturesActive(),

    // 네비게이션 함수
    navigateToDiaries,
    navigateToPictures,
    navigateToHome,
  };
};

// ========================================
// Export Default
// ========================================

export default useLinkRouting;
