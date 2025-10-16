'use client';

import { usePathname } from 'next/navigation';
import { getPageLayoutConfig, type LayoutConfig } from '../../constants/url';

// ========================================
// Area Hook Types
// ========================================

/**
 * 레이아웃 영역 노출 제어 훅의 반환 타입
 */
export interface UseAreaReturn {
  /** 헤더 영역 노출 여부 */
  showHeader: boolean;
  /** 헤더 내 로고 노출 여부 */
  showHeaderLogo: boolean;
  /** 헤더 내 다크모드 토글 노출 여부 */
  showHeaderDarkModeToggle: boolean;
  /** 배너 영역 노출 여부 */
  showBanner: boolean;
  /** 네비게이션 영역 노출 여부 */
  showNavigation: boolean;
  /** 푸터 영역 노출 여부 */
  showFooter: boolean;
  /** 현재 페이지의 레이아웃 설정 */
  layoutConfig: LayoutConfig;
}

// ========================================
// Area Hook
// ========================================

/**
 * URL 기반 레이아웃 영역 노출 제어 훅
 *
 * 현재 페이지 경로에 따라 각 레이아웃 영역의 노출 여부를 결정합니다.
 * url.ts의 PAGE_CONFIG에 정의된 설정을 기반으로 동작합니다.
 *
 * @returns {UseAreaReturn} 각 영역의 노출 여부와 레이아웃 설정
 *
 * @example
 * ```tsx
 * function Layout({ children }: LayoutProps) {
 *   const {
 *     showHeader,
 *     showHeaderLogo,
 *     showBanner,
 *     showNavigation,
 *     showFooter
 *   } = useArea();
 *
 *   return (
 *     <div>
 *       {showHeader && (
 *         <header>
 *           {showHeaderLogo && <Logo />}
 *         </header>
 *       )}
 *       {showBanner && <Banner />}
 *       {showNavigation && <Navigation />}
 *       <main>{children}</main>
 *       {showFooter && <Footer />}
 *     </div>
 *   );
 * }
 * ```
 */
export const useArea = (): UseAreaReturn => {
  const pathname = usePathname();

  // 현재 경로에 대한 레이아웃 설정 조회
  const layoutConfig = getPageLayoutConfig(pathname);

  return {
    showHeader: layoutConfig.header,
    showHeaderLogo: layoutConfig.headerLogo,
    showHeaderDarkModeToggle: layoutConfig.headerDarkModeToggle,
    showBanner: layoutConfig.banner,
    showNavigation: layoutConfig.navigation,
    showFooter: layoutConfig.footer,
    layoutConfig,
  };
};
