// ========================================
// URL Management System
// 프롬프트 룰 기반 중앙집중식 URL 관리
// ========================================

/**
 * 사용자 접근 권한 타입
 */
export enum AccessLevel {
  /** 누구나 접근 가능 */
  PUBLIC = 'PUBLIC',
  /** 회원만 접근 가능 */
  MEMBER_ONLY = 'MEMBER_ONLY',
}

/**
 * 레이아웃 컴포넌트 노출 설정
 */
export interface LayoutConfig {
  /** 헤더 노출 여부 */
  header: boolean;
  /** 헤더 내 로고 노출 여부 */
  headerLogo: boolean;
  /** 헤더 내 다크모드 토글 노출 여부 */
  headerDarkModeToggle: boolean;
  /** 배너 노출 여부 */
  banner: boolean;
  /** 네비게이션 노출 여부 */
  navigation: boolean;
  /** 푸터 노출 여부 */
  footer: boolean;
}

/**
 * 페이지 메타데이터 인터페이스
 */
export interface PageMetadata {
  /** 페이지 경로 */
  path: string;
  /** 접근 권한 */
  accessLevel: AccessLevel;
  /** 레이아웃 설정 */
  layout: LayoutConfig;
  /** 페이지 제목 (선택사항) */
  title?: string;
  /** 페이지 설명 (선택사항) */
  description?: string;
}

// ========================================
// URL Constants
// ========================================

/**
 * 정적 URL 경로
 */
export const ROUTES = {
  // 인증 관련
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },

  // 일기 관련
  DIARIES: {
    LIST: '/diaries',
    DETAIL: '/diaries/[id]', // 다이나믹 라우팅
  },

  // 사진 관련
  PICTURES: {
    LIST: '/pictures',
  },

  // 기타
  HOME: '/',
} as const;

// ========================================
// Page Configuration
// 프롬프트 룰에 따른 정확한 설정
// ========================================

/**
 * 페이지별 설정 매핑
 */
export const PAGE_CONFIG: Record<string, PageMetadata> = {
  // 1) 로그인 페이지
  [ROUTES.AUTH.LOGIN]: {
    path: ROUTES.AUTH.LOGIN,
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
    title: '로그인',
    description: '감정 일기 로그인 페이지',
  },

  // 2) 회원가입 페이지
  [ROUTES.AUTH.SIGNUP]: {
    path: ROUTES.AUTH.SIGNUP,
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: false,
      headerLogo: false,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
    title: '회원가입',
    description: '감정 일기 회원가입 페이지',
  },

  // 3) 일기목록 페이지
  [ROUTES.DIARIES.LIST]: {
    path: ROUTES.DIARIES.LIST,
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
    title: '일기 목록',
    description: '감정 일기 목록 페이지',
  },

  // 4) 일기상세 페이지 (다이나믹 라우팅)
  [ROUTES.DIARIES.DETAIL]: {
    path: ROUTES.DIARIES.DETAIL,
    accessLevel: AccessLevel.MEMBER_ONLY,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: false,
      navigation: false,
      footer: false,
    },
    title: '일기 상세',
    description: '감정 일기 상세 페이지',
  },

  // 5) 사진목록 페이지
  [ROUTES.PICTURES.LIST]: {
    path: ROUTES.PICTURES.LIST,
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: false,
      banner: true,
      navigation: true,
      footer: true,
    },
    title: '사진 보관함',
    description: '감정 일기 사진 보관함',
  },

  // 홈 페이지
  [ROUTES.HOME]: {
    path: ROUTES.HOME,
    accessLevel: AccessLevel.PUBLIC,
    layout: {
      header: true,
      headerLogo: true,
      headerDarkModeToggle: true,
      banner: true,
      navigation: true,
      footer: true,
    },
    title: '감정 일기',
    description: '나의 감정을 기록하는 일기장',
  },
} as const;

// ========================================
// Utility Functions
// ========================================

/**
 * 다이나믹 라우팅 URL 생성
 * @param route 기본 라우트 (예: '/diaries/[id]')
 * @param params 파라미터 객체 (예: { id: '123' })
 * @returns 완성된 URL (예: '/diaries/123')
 */
export const generateDynamicRoute = (
  route: string,
  params: Record<string, string | number>
): string => {
  let generatedRoute = route;

  Object.entries(params).forEach(([key, value]) => {
    generatedRoute = generatedRoute.replace(`[${key}]`, String(value));
  });

  return generatedRoute;
};

/**
 * 일기 상세 페이지 URL 생성
 * @param diaryId 일기 ID
 * @returns 일기 상세 페이지 URL
 */
export const getDiaryDetailUrl = (diaryId: string | number): string => {
  return generateDynamicRoute(ROUTES.DIARIES.DETAIL, { id: diaryId });
};

/**
 * 페이지 설정 조회
 * @param path 페이지 경로
 * @returns 페이지 메타데이터 (없으면 기본값)
 */
export const getPageConfig = (path: string): PageMetadata => {
  // 다이나믹 라우팅 처리
  if (path.startsWith('/diaries/') && path !== '/diaries') {
    return PAGE_CONFIG[ROUTES.DIARIES.DETAIL];
  }

  return PAGE_CONFIG[path] || PAGE_CONFIG[ROUTES.HOME];
};

/**
 * 페이지 접근 권한 확인
 * @param path 페이지 경로
 * @returns 접근 권한 레벨
 */
export const getPageAccessLevel = (path: string): AccessLevel => {
  const config = getPageConfig(path);
  return config.accessLevel;
};

/**
 * 페이지 레이아웃 설정 조회
 * @param path 페이지 경로
 * @returns 레이아웃 설정
 */
export const getPageLayoutConfig = (path: string): LayoutConfig => {
  const config = getPageConfig(path);
  return config.layout;
};

/**
 * 회원 전용 페이지 여부 확인
 * @param path 페이지 경로
 * @returns 회원 전용 페이지 여부
 */
export const isMemberOnlyPage = (path: string): boolean => {
  return getPageAccessLevel(path) === AccessLevel.MEMBER_ONLY;
};

// ========================================
// Type Exports
// ========================================

export { ROUTES as default };
