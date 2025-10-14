/**
 * Color Design Tokens
 * 다크모드를 포함한 프로젝트 전체 컬러 시스템
 * 
 * Figma Foundation 기반으로 구현됨
 * - 모든 컬러는 CSS 변수로 정의되어 다크모드를 자동 지원
 * - 기본 팔레트와 시맨틱 토큰으로 구성
 */

export const COLOR_TOKENS = {
  // ========================================
  // Base Palette Colors
  // ========================================
  
  // Blue - Primary Color Scale
  blue: {
    '05': 'var(--color-blue-05)',
    '10': 'var(--color-blue-10)',
    '20': 'var(--color-blue-20)',
    '30': 'var(--color-blue-30)',
    '40': 'var(--color-blue-40)', // System color
    '50': 'var(--color-blue-50)',
    '60': 'var(--color-blue-60)', // System color
    '70': 'var(--color-blue-70)',
    '80': 'var(--color-blue-80)',
    '90': 'var(--color-blue-90)',
  },

  // Gray - Neutral Color Scale
  gray: {
    white: 'var(--color-gray-white)',
    '05': 'var(--color-gray-05)',
    '10': 'var(--color-gray-10)',
    '20': 'var(--color-gray-20)',
    '30': 'var(--color-gray-30)',
    '40': 'var(--color-gray-40)',
    '50': 'var(--color-gray-50)',
    '60': 'var(--color-gray-60)',
    '70': 'var(--color-gray-70)',
    '80': 'var(--color-gray-80)',
    '90': 'var(--color-gray-90)',
    black: 'var(--color-gray-black)',
  },

  // Red - Error/Alert Color Scale
  red: {
    '05': 'var(--color-red-05)',
    '10': 'var(--color-red-10)',
    '20': 'var(--color-red-20)',
    '30': 'var(--color-red-30)', // Error color
    '40': 'var(--color-red-40)',
    '50': 'var(--color-red-50)',
    '60': 'var(--color-red-60)',
  },

  // Green - Success Color Scale
  green: {
    '05': 'var(--color-green-05)',
    '10': 'var(--color-green-10)',
    '20': 'var(--color-green-20)',
    '30': 'var(--color-green-30)', // Success color
    '40': 'var(--color-green-40)',
    '50': 'var(--color-green-50)',
    '60': 'var(--color-green-60)',
  },

  // Yellow - Warning Color Scale
  yellow: {
    '05': 'var(--color-yellow-05)',
    '10': 'var(--color-yellow-10)',
    '20': 'var(--color-yellow-20)',
    '30': 'var(--color-yellow-30)',
    '40': 'var(--color-yellow-40)',
    '50': 'var(--color-yellow-50)',
    '60': 'var(--color-yellow-60)',
  },

  // Cool Gray - Alternative Neutral Scale
  coolGray: {
    '01': 'var(--color-cool-gray-01)',
    '05': 'var(--color-cool-gray-05)',
    '10': 'var(--color-cool-gray-10)',
    '20': 'var(--color-cool-gray-20)',
    '30': 'var(--color-cool-gray-30)',
    '40': 'var(--color-cool-gray-40)',
    '50': 'var(--color-cool-gray-50)',
    '60': 'var(--color-cool-gray-60)',
  },

  // ========================================
  // Semantic Tokens (자동 다크모드 지원)
  // ========================================

  // Background Colors
  background: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
    inverse: 'var(--color-bg-inverse)',
  },

  // Text Colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
    link: 'var(--color-text-link)',
    disabled: 'var(--color-text-disabled)',
  },

  // Border Colors
  border: {
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    focus: 'var(--color-border-focus)',
    error: 'var(--color-border-error)',
  },

  // Brand Colors
  brand: {
    primary: 'var(--color-brand-primary)',
    secondary: 'var(--color-brand-secondary)',
    hover: 'var(--color-brand-hover)',
    active: 'var(--color-brand-active)',
  },

  // Semantic Colors
  semantic: {
    success: 'var(--color-semantic-success)',
    warning: 'var(--color-semantic-warning)',
    error: 'var(--color-semantic-error)',
    info: 'var(--color-semantic-info)',
  },

  // State Colors
  state: {
    hover: 'var(--color-state-hover)',
    active: 'var(--color-state-active)',
    disabled: 'var(--color-state-disabled)',
    focus: 'var(--color-state-focus)',
  },

  // Gradient Colors
  gradient: {
    primary: 'var(--color-gradient-primary)',
    skeleton: 'var(--color-gradient-skeleton)',
  },
} as const;

export type ColorToken = typeof COLOR_TOKENS;

/**
 * 컬러 토큰 헬퍼 함수
 * @param path - 점(.)으로 구분된 토큰 경로 (예: 'text.primary', 'blue.60')
 * @returns CSS 변수 문자열
 * 
 * @example
 * getColorToken('text.primary') // 'var(--color-text-primary)'
 * getColorToken('blue.60') // 'var(--color-blue-60)'
 */
export const getColorToken = (path: string): string => {
  const keys = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = COLOR_TOKENS;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color token not found: ${path}`);
      return '';
    }
  }

  return value;
};

/**
 * 다크모드 여부 확인 함수
 * @returns 현재 다크모드 여부
 */
export const isDarkMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * 다크모드 변경 감지 함수
 * @param callback - 다크모드 변경 시 호출될 콜백
 * @returns cleanup 함수
 */
export const onDarkModeChange = (callback: (isDark: boolean) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => callback(e.matches);
  
  mediaQuery.addEventListener('change', handler);
  return () => mediaQuery.removeEventListener('change', handler);
};
