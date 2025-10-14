/**
 * URL Constants
 * 감정 다이어리 프로젝트에서 사용되는 모든 URL 경로 관리
 *
 * 다이나믹 라우팅 지원 및 Link 컴포넌트에서 사용 가능하도록 설계
 * 각 경로별 접근 권한 및 UI 컴포넌트 노출 설정 포함
 */

// ========================================
// URL Path Constants
// ========================================

/**
 * 기본 URL 경로 상수
 */
export const URL_PATHS = {
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
} as const;

// ========================================
// Access Permission Types
// ========================================

/**
 * 페이지 접근 권한 타입
 */
export enum AccessPermission {
  PUBLIC = 'PUBLIC',      // 누구나 접근 가능
  MEMBER_ONLY = 'MEMBER_ONLY', // 회원 전용
}

// ========================================
// UI Component Visibility Types
// ========================================

/**
 * UI 컴포넌트 노출 설정 인터페이스
 */
export interface UIComponentVisibility {
  header: {
    visible: boolean;
    logo: boolean;
    darkModeToggle: boolean;
  };
  banner: boolean;
  navigation: boolean;
  footer: boolean;
}

// ========================================
// Page Configuration Interface
// ========================================

/**
 * 페이지 설정 인터페이스
 */
export interface PageConfig {
  path: string;
  accessPermission: AccessPermission;
  uiVisibility: UIComponentVisibility;
  isDynamic?: boolean; // 다이나믹 라우팅 여부
}

// ========================================
// Page Configurations
// ========================================

/**
 * 페이지별 상세 설정
 */
export const PAGE_CONFIGS: Record<string, PageConfig> = {
  // 로그인 페이지
  LOGIN: {
    path: URL_PATHS.AUTH.LOGIN,
    accessPermission: AccessPermission.PUBLIC,
    uiVisibility: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },

  // 회원가입 페이지
  SIGNUP: {
    path: URL_PATHS.AUTH.SIGNUP,
    accessPermission: AccessPermission.PUBLIC,
    uiVisibility: {
      header: {
        visible: false,
        logo: false,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: false,
    },
  },

  // 일기 목록 페이지
  DIARIES_LIST: {
    path: URL_PATHS.DIARIES.LIST,
    accessPermission: AccessPermission.PUBLIC,
    uiVisibility: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },

  // 일기 상세 페이지
  DIARIES_DETAIL: {
    path: URL_PATHS.DIARIES.DETAIL,
    accessPermission: AccessPermission.MEMBER_ONLY,
    isDynamic: true,
    uiVisibility: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: false,
      navigation: false,
      footer: true,
    },
  },

  // 사진 목록 페이지
  PICTURES_LIST: {
    path: URL_PATHS.PICTURES.LIST,
    accessPermission: AccessPermission.PUBLIC,
    uiVisibility: {
      header: {
        visible: true,
        logo: true,
        darkModeToggle: false,
      },
      banner: true,
      navigation: true,
      footer: true,
    },
  },
} as const;

// ========================================
// Helper Functions
// ========================================

/**
 * 다이나믹 라우팅 URL 생성 함수
 * @param template - URL 템플릿 (예: '/diaries/[id]')
 * @param params - 파라미터 객체 (예: { id: '123' })
 * @returns 완성된 URL 경로
 *
 * @example
 * generateDynamicUrl('/diaries/[id]', { id: '123' }) // '/diaries/123'
 */
export const generateDynamicUrl = (
  template: string,
  params: Record<string, string | number>
): string => {
  let url = template;
  
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`[${key}]`, String(value));
  });
  
  return url;
};

/**
 * 일기 상세 페이지 URL 생성
 * @param diaryId - 일기 ID
 * @returns 일기 상세 페이지 URL
 */
export const getDiaryDetailUrl = (diaryId: string | number): string => {
  return generateDynamicUrl(URL_PATHS.DIARIES.DETAIL, { id: diaryId });
};

/**
 * 페이지 설정 조회 함수
 * @param pageKey - 페이지 키 (PAGE_CONFIGS의 키)
 * @returns 페이지 설정 객체
 */
export const getPageConfig = (pageKey: string): PageConfig | null => {
  return PAGE_CONFIGS[pageKey] || null;
};

/**
 * 현재 경로로 페이지 설정 조회 함수
 * @param currentPath - 현재 경로
 * @returns 페이지 설정 객체
 */
export const getPageConfigByPath = (currentPath: string): PageConfig | null => {
  // 정확한 경로 매칭 먼저 시도
  const exactMatch = Object.values(PAGE_CONFIGS).find(
    config => config.path === currentPath
  );
  
  if (exactMatch) return exactMatch;
  
  // 다이나믹 라우팅 매칭
  const dynamicMatch = Object.values(PAGE_CONFIGS).find(config => {
    if (!config.isDynamic) return false;
    
    // [id] 패턴을 정규식으로 변환
    const pattern = config.path.replace(/\[([^\]]+)\]/g, '([^/]+)');
    const regex = new RegExp(`^${pattern}$`);
    
    return regex.test(currentPath);
  });
  
  return dynamicMatch || null;
};

/**
 * 페이지 접근 권한 확인 함수
 * @param pageKey - 페이지 키
 * @param isLoggedIn - 로그인 상태
 * @returns 접근 가능 여부
 */
export const canAccessPage = (
  pageKey: string,
  isLoggedIn: boolean = false
): boolean => {
  const config = getPageConfig(pageKey);
  
  if (!config) return false;
  
  switch (config.accessPermission) {
    case AccessPermission.PUBLIC:
      return true;
    case AccessPermission.MEMBER_ONLY:
      return isLoggedIn;
    default:
      return false;
  }
};

/**
 * 경로로 페이지 접근 권한 확인 함수
 * @param currentPath - 현재 경로
 * @param isLoggedIn - 로그인 상태
 * @returns 접근 가능 여부
 */
export const canAccessPageByPath = (
  currentPath: string,
  isLoggedIn: boolean = false
): boolean => {
  const config = getPageConfigByPath(currentPath);
  
  if (!config) return false;
  
  switch (config.accessPermission) {
    case AccessPermission.PUBLIC:
      return true;
    case AccessPermission.MEMBER_ONLY:
      return isLoggedIn;
    default:
      return false;
  }
};

/**
 * UI 컴포넌트 노출 설정 조회 함수
 * @param pageKey - 페이지 키
 * @returns UI 컴포넌트 노출 설정
 */
export const getUIVisibility = (pageKey: string): UIComponentVisibility | null => {
  const config = getPageConfig(pageKey);
  return config?.uiVisibility || null;
};

/**
 * 경로로 UI 컴포넌트 노출 설정 조회 함수
 * @param currentPath - 현재 경로
 * @returns UI 컴포넌트 노출 설정
 */
export const getUIVisibilityByPath = (currentPath: string): UIComponentVisibility | null => {
  const config = getPageConfigByPath(currentPath);
  return config?.uiVisibility || null;
};

/**
 * 특정 UI 컴포넌트 노출 여부 확인 함수
 * @param pageKey - 페이지 키
 * @param component - 확인할 컴포넌트 ('header', 'banner', 'navigation', 'footer')
 * @returns 컴포넌트 노출 여부
 */
export const shouldShowComponent = (
  pageKey: string,
  component: 'header' | 'banner' | 'navigation' | 'footer'
): boolean => {
  const visibility = getUIVisibility(pageKey);
  
  if (!visibility) return false;
  
  if (component === 'header') {
    return visibility.header.visible;
  }
  
  return visibility[component];
};

/**
 * 헤더 내부 요소 노출 여부 확인 함수
 * @param pageKey - 페이지 키
 * @param element - 확인할 헤더 요소 ('logo', 'darkModeToggle')
 * @returns 헤더 요소 노출 여부
 */
export const shouldShowHeaderElement = (
  pageKey: string,
  element: 'logo' | 'darkModeToggle'
): boolean => {
  const visibility = getUIVisibility(pageKey);
  
  if (!visibility || !visibility.header.visible) return false;
  
  return visibility.header[element];
};

/**
 * 다이나믹 라우팅 여부 확인 함수
 * @param pageKey - 페이지 키
 * @returns 다이나믹 라우팅 여부
 */
export const isDynamicRoute = (pageKey: string): boolean => {
  const config = getPageConfig(pageKey);
  return config?.isDynamic || false;
};

/**
 * URL 템플릿에서 파라미터 추출 함수
 * @param template - URL 템플릿 (예: '/diaries/[id]')
 * @returns 파라미터 키 배열 (예: ['id'])
 */
export const extractUrlParams = (template: string): string[] => {
  const matches = template.match(/\[([^\]]+)\]/g);
  
  if (!matches) return [];
  
  return matches.map(match => match.slice(1, -1)); // [id] -> id
};

/**
 * 현재 경로에서 다이나믹 파라미터 값 추출 함수
 * @param template - URL 템플릿 (예: '/diaries/[id]')
 * @param currentPath - 현재 경로 (예: '/diaries/123')
 * @returns 파라미터 객체 (예: { id: '123' })
 */
export const extractParamsFromPath = (
  template: string,
  currentPath: string
): Record<string, string> => {
  const paramKeys = extractUrlParams(template);
  
  if (paramKeys.length === 0) return {};
  
  // 템플릿을 정규식으로 변환
  const pattern = template.replace(/\[([^\]]+)\]/g, '([^/]+)');
  const regex = new RegExp(`^${pattern}$`);
  const matches = currentPath.match(regex);
  
  if (!matches) return {};
  
  const params: Record<string, string> = {};
  paramKeys.forEach((key, index) => {
    params[key] = matches[index + 1]; // matches[0]은 전체 매칭이므로 +1
  });
  
  return params;
};

// ========================================
// Validation Functions
// ========================================

/**
 * URL 경로 유효성 검사 함수
 * @param path - 검사할 경로
 * @returns 유효한 경로인지 여부
 */
export const isValidUrlPath = (path: string): boolean => {
  // 기본 URL 패턴 검사 (/, /path, /path/subpath 등)
  const urlPattern = /^\/[a-zA-Z0-9\-_\/\[\]]*$/;
  return urlPattern.test(path);
};

/**
 * 페이지 키 유효성 검사 함수
 * @param pageKey - 검사할 페이지 키
 * @returns 유효한 페이지 키인지 여부
 */
export const isValidPageKey = (pageKey: string): boolean => {
  return pageKey in PAGE_CONFIGS;
};

// ========================================
// Constants Export
// ========================================

/**
 * 모든 URL 경로 배열
 */
export const ALL_URL_PATHS = Object.values(URL_PATHS).flatMap(category => 
  Object.values(category)
);

/**
 * 모든 페이지 키 배열
 */
export const ALL_PAGE_KEYS = Object.keys(PAGE_CONFIGS);

/**
 * 공개 페이지 키 배열
 */
export const PUBLIC_PAGE_KEYS = ALL_PAGE_KEYS.filter(key => 
  PAGE_CONFIGS[key].accessPermission === AccessPermission.PUBLIC
);

/**
 * 회원 전용 페이지 키 배열
 */
export const MEMBER_ONLY_PAGE_KEYS = ALL_PAGE_KEYS.filter(key => 
  PAGE_CONFIGS[key].accessPermission === AccessPermission.MEMBER_ONLY
);

/**
 * 다이나믹 라우팅 페이지 키 배열
 */
export const DYNAMIC_PAGE_KEYS = ALL_PAGE_KEYS.filter(key => 
  PAGE_CONFIGS[key].isDynamic
);

// ========================================
// Type Exports
// ========================================

export type UrlPaths = typeof URL_PATHS;
export type PageConfigKey = keyof typeof PAGE_CONFIGS;
export type UrlPathValue = string;
