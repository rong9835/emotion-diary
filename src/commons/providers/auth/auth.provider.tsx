'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/commons/constants/url';

// ========================================
// Types & Interfaces
// ========================================

/**
 * 사용자 정보 인터페이스
 */
export interface User {
  id: string;
  email: string;
  name: string;
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * 인증 컨텍스트 타입
 */
interface AuthContextType {
  // 로그인 상태
  isLoggedIn: boolean;
  // 사용자 정보
  user: User | null;
  // 로그인 함수
  login: (accessToken: string, user: User) => void;
  // 로그아웃 함수
  logout: () => void;
  // 로그인 상태 검증
  checkAuthStatus: () => boolean;
  // 사용자 정보 조회
  getUserInfo: () => User | null;
}

/**
 * AuthProvider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

// ========================================
// Constants
// ========================================

/**
 * 로컬스토리지 키 상수
 */
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  USER: 'user',
} as const;

// ========================================
// Context
// ========================================

/**
 * 인증 컨텍스트 생성
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ========================================
// Components
// ========================================

/**
 * 인증 프로바이더 컴포넌트
 * 로그인, 로그아웃, 상태검증, 유저정보조회 기능을 제공
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  /**
   * 로그인 상태 검증
   * 로컬스토리지에 저장된 accessToken이 있으면 로그인상태, 그렇지 않으면 비로그인상태로 처리
   * 추가적인 accessToken의 복호화없이 토큰 유/무만 확인
   */
  const checkAuthStatus = (): boolean => {
    if (typeof window === 'undefined') return false;

    const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    return !!accessToken;
  };

  /**
   * 사용자 정보 조회
   * 로컬스토리지에 저장된 user를 반환
   */
  const getUserInfo = (): User | null => {
    if (typeof window === 'undefined') return null;

    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('사용자 정보 조회 중 오류 발생:', error);
      return null;
    }
  };

  /**
   * 로그인 함수
   * @param accessToken 액세스 토큰
   * @param userData 사용자 정보
   */
  const login = (accessToken: string, userData: User): void => {
    if (typeof window === 'undefined') return;

    try {
      // 로컬스토리지에 토큰과 사용자 정보 저장
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));

      // 상태 업데이트
      setIsLoggedIn(true);
      setUser(userData);
    } catch (error) {
      console.error('로그인 처리 중 오류 발생:', error);
    }
  };

  /**
   * 로그아웃 함수
   * 로컬스토리지에 저장된 accessToken과 user를 제거하고 로그인 페이지로 이동
   */
  const logout = (): void => {
    if (typeof window === 'undefined') return;

    try {
      // 로컬스토리지에서 토큰과 사용자 정보 제거
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      // 상태 초기화
      setIsLoggedIn(false);
      setUser(null);

      // 로그인 페이지로 이동
      router.push(ROUTES.AUTH.LOGIN);
    } catch (error) {
      console.error('로그아웃 처리 중 오류 발생:', error);
    }
  };

  /**
   * 컴포넌트 마운트 시 인증 상태 초기화
   * 로그인 유/무를 모든 페이지에서 실시간으로 감지하여 최신 로그인상태를 유지
   */
  useEffect(() => {
    const authStatus = checkAuthStatus();
    const userInfo = getUserInfo();

    setIsLoggedIn(authStatus);
    setUser(userInfo);
  }, []);

  /**
   * 로컬스토리지 변경 감지
   * 다른 탭에서 로그인/로그아웃 시 실시간 동기화
   */
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ACCESS_TOKEN || e.key === STORAGE_KEYS.USER) {
        const authStatus = checkAuthStatus();
        const userInfo = getUserInfo();

        setIsLoggedIn(authStatus);
        setUser(userInfo);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    user,
    login,
    logout,
    checkAuthStatus,
    getUserInfo,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// ========================================
// Hooks
// ========================================

/**
 * 인증 컨텍스트 훅
 * AuthProvider 내부에서만 사용 가능
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }

  return context;
}
