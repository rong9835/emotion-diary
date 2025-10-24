'use client';

import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './auth.provider';
import { useModal } from '../modal/modal.provider';
import { Modal } from '@/commons/components/modal';
import {
  ROUTES,
  getPageAccessLevel,
  AccessLevel,
} from '@/commons/constants/url';

// ========================================
// Types & Interfaces
// ========================================

interface AuthGuardProps {
  children: ReactNode;
}

// ========================================
// Constants
// ========================================

const TEST_ENV = 'test';

/**
 * 전역 테스트 바이패스 변수 타입 확장
 */
declare global {
  interface Window {
    __TEST_BYPASS__?: boolean;
  }
}

// ========================================
// AuthGuard Component
// ========================================

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const { openModal, closeAllModals } = useModal();

  const [isInitialized, setIsInitialized] = useState(false);
  const [showChildren, setShowChildren] = useState(false);

  // 테스트 환경 확인
  const isTestEnv = process.env.NEXT_PUBLIC_TEST_ENV === TEST_ENV;

  // 페이지 접근 권한 확인
  const pageAccessLevel = getPageAccessLevel(pathname);
  const isMemberOnlyPage = pageAccessLevel === AccessLevel.MEMBER_ONLY;

  // 테스트 바이패스 플래그 확인
  // window.__TEST_BYPASS__가 true인 경우 권한 검사 완전 우회
  const isTestBypass =
    typeof window !== 'undefined' && window.__TEST_BYPASS__ === true;
  const shouldCheckAuth =
    typeof window !== 'undefined' && window.__TEST_BYPASS__ === false;

  // 로그인 상태 확인
  const shouldBeLoggedIn = shouldCheckAuth ? checkAuthStatus() : true;

  // 권한 검증 로직
  // 테스트 바이패스가 활성화된 경우 권한 검사 완전 우회
  const hasPermission =
    isTestBypass || isTestEnv || !isMemberOnlyPage || shouldBeLoggedIn;

  // 로그인 모달 표시
  const showLoginModal = useCallback(() => {
    const modalContent = (
      <Modal
        variant="info"
        actions="single"
        title="로그인 필요"
        content="로그인이 필요한 페이지입니다. 로그인 페이지로 이동하시겠습니까?"
        confirmText="로그인하기"
        onConfirm={() => {
          closeAllModals();
          router.push(ROUTES.AUTH.LOGIN);
        }}
      />
    );

    openModal(modalContent);
  }, [openModal, closeAllModals, router]);

  // 권한 검증 및 UI 업데이트
  useEffect(() => {
    // AuthProvider 초기화 대기
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    // 권한이 있는 경우
    if (hasPermission) {
      setShowChildren(true);
    } else {
      // 권한이 없는 경우
      setShowChildren(false);

      // 로그인 모달 표시 (한 번만)
      if (!isTestEnv && isMemberOnlyPage && !shouldBeLoggedIn) {
        showLoginModal();
      }
    }
  }, [
    isInitialized,
    hasPermission,
    isTestEnv,
    isMemberOnlyPage,
    shouldBeLoggedIn,
    showLoginModal,
  ]);

  // 로그인 상태 변경 감지
  useEffect(() => {
    if (isInitialized) {
      const currentPermission =
        isTestEnv || !isMemberOnlyPage || checkAuthStatus();

      if (currentPermission) {
        setShowChildren(true);
      } else {
        setShowChildren(false);
      }
    }
  }, [isLoggedIn, isInitialized, isTestEnv, isMemberOnlyPage, checkAuthStatus]);

  // 초기화 전까지는 빈 화면 표시
  if (!isInitialized) {
    return <div style={{ display: 'none' }} />;
  }

  // 권한이 있는 경우에만 children 표시
  if (showChildren) {
    return <>{children}</>;
  }

  // 권한이 없는 경우 빈 화면 표시
  return <div style={{ display: 'none' }} />;
}

export default AuthGuard;
