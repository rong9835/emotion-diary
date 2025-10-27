'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Types & Interfaces
// ========================================

/**
 * 가드 훅 반환 타입
 */
interface UseAuthGuardReturn {
  /**
   * 권한 검증 함수
   * @returns 권한 통과 여부
   */
  checkAuth: () => boolean;
}

// ========================================
// Constants
// ========================================

/**
 * 테스트 환경 변수
 */
const TEST_ENV = process.env.NEXT_PUBLIC_TEST_ENV;

/**
 * 전역 테스트 바이패스 변수 타입 확장
 */
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

// ========================================
// Auth Guard Hook
// ========================================

/**
 * 권한 검증 GUARD 훅
 *
 * 기능:
 * 1. 액션 GUARD 구현 - 함수 요청시 인가
 * 2. 인증 프로바이더를 활용한 로그인 유/무 판단
 * 3. 인가 실패시 로그인 모달 노출
 * 4. 테스트 환경과 실제 환경 분리
 * 5. 모달 연동 및 페이지 이동 처리
 *
 * @returns {UseAuthGuardReturn} 권한 검증 함수
 *
 * @example
 * ```tsx
 * function ProtectedComponent() {
 *   const { checkAuth } = useAuthGuard();
 *
 *   const handleProtectedAction = () => {
 *     if (checkAuth()) {
 *       // 권한이 있는 경우에만 실행
 *       console.log('권한이 있는 사용자입니다.');
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleProtectedAction}>
 *       보호된 기능 실행
 *     </button>
 *   );
 * }
 * ```
 */
export function useAuthGuard(): UseAuthGuardReturn {
  const router = useRouter();
  const { checkAuthStatus } = useAuth();
  const { openModal, closeAllModals } = useModal();

  /**
   * 로그인 모달 확인 버튼 클릭 핸들러
   */
  const handleLoginConfirm = useCallback((): void => {
    // 1. 열려있는 모든 모달을 닫기
    closeAllModals();

    // 2. 로그인페이지로 이동
    router.push(ROUTES.AUTH.LOGIN);
  }, [closeAllModals, router]);

  /**
   * 로그인 모달 취소 버튼 클릭 핸들러
   */
  const handleLoginCancel = useCallback((): void => {
    // 1. 열려있는 모든 모달을 닫기
    closeAllModals();
  }, [closeAllModals]);

  /**
   * 로그인 모달 표시
   */
  const showLoginModal = useCallback((): void => {
    const modalContent = (
      <Modal
        variant="info"
        actions="dual"
        title="로그인이 필요합니다"
        content="일기를 쓰려면 로그인이 필요합니다."
        confirmText="로그인"
        cancelText="취소"
        onConfirm={handleLoginConfirm}
        onCancel={handleLoginCancel}
      />
    );

    openModal(modalContent);
  }, [openModal, handleLoginConfirm, handleLoginCancel]);

  /**
   * 권한 검증 함수
   * @returns 권한 통과 여부
   */
  const checkAuth = useCallback((): boolean => {
    // 테스트 환경 처리
    if (TEST_ENV === 'test') {
      // 테스트 환경: 기본적으로 로그인 유저로 처리
      // window.__TEST_BYPASS__가 false인 경우에만 로그인 검사 수행
      if (typeof window !== 'undefined' && window.__TEST_BYPASS__ === false) {
        // 비회원 가드테스트가 필요한 경우
        const isLoggedIn = checkAuthStatus();
        if (!isLoggedIn) {
          showLoginModal();
          return false;
        }
      }
      // 그 외의 경우는 로그인 검사를 패스
      return true;
    }

    // 실제 환경: 항상 로그인 검사 수행
    const isLoggedIn = checkAuthStatus();
    if (!isLoggedIn) {
      showLoginModal();
      return false;
    }

    return true;
  }, [checkAuthStatus, showLoginModal]);

  return {
    checkAuth,
  };
}

// ========================================
// Export Default
// ========================================

export default useAuthGuard;
