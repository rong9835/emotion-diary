'use client';

import { useAuth } from '@/commons/providers/auth/auth.provider';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Types & Interfaces
// ========================================

/**
 * 인증 훅 반환 타입
 */
export interface UseAuthLayoutReturn {
  /**
   * 로그인 상태
   */
  isLoggedIn: boolean;

  /**
   * 사용자 이름
   */
  userName: string | null;

  /**
   * 로그인 페이지로 이동하는 함수
   */
  handleLogin: () => void;

  /**
   * 로그아웃 함수
   */
  handleLogout: () => void;
}

// ========================================
// Hooks
// ========================================

/**
 * Layout 컴포넌트에서 사용하는 인증 훅
 *
 * AuthProvider의 인증 상태를 기반으로 레이아웃에서 필요한
 * 로그인/로그아웃 기능을 제공합니다.
 *
 * 기능:
 * - 로그인 상태 확인
 * - 사용자 이름 조회
 * - 로그인 페이지로 이동
 * - 로그아웃 처리
 *
 * @returns {UseAuthLayoutReturn} 인증 상태 및 로그인/로그아웃 함수
 *
 * @example
 * ```tsx
 * function Layout({ children }: LayoutProps) {
 *   const { isLoggedIn, userName, handleLogin, handleLogout } = useAuthLayout();
 *
 *   return (
 *     <header>
 *       {isLoggedIn ? (
 *         <>
 *           <span>{userName}님</span>
 *           <button onClick={handleLogout}>로그아웃</button>
 *         </>
 *       ) : (
 *         <button onClick={handleLogin}>로그인</button>
 *       )}
 *     </header>
 *   );
 * }
 * ```
 */
export const useAuthLayout = (): UseAuthLayoutReturn => {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();

  /**
   * 로그인 페이지로 이동
   */
  const handleLogin = () => {
    router.push(ROUTES.AUTH.LOGIN);
  };

  /**
   * 로그아웃 처리
   */
  const handleLogout = () => {
    logout();
  };

  return {
    isLoggedIn,
    userName: user?.name || null,
    handleLogin,
    handleLogout,
  };
};

// ========================================
// Export Default
// ========================================

export default useAuthLayout;
