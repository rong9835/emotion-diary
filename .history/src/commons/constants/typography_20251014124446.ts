/**
 * Typography Design Tokens
 * 한국어/영문 및 모바일/데스크톱을 지원하는 타이포그래피 시스템
 *
 * Figma Foundation 기반으로 구현됨
 * - SUIT Variable 폰트 패밀리 사용
 * - 모바일과 데스크톱 반응형 지원
 * - 한국어와 영문 분기 지원
 * - CSS 변수로 정의되어 일관된 스타일링 제공
 */

// ========================================
// Font Family Tokens
// ========================================

export const FONT_FAMILY_TOKENS = {
  primary: 'var(--font-family-primary)', // SUIT Variable
  secondary: 'var(--font-family-secondary)', // 영문용 대체 폰트
  mono: 'var(--font-family-mono)', // 모노스페이스 폰트
} as const;

// ========================================
// Font Weight Tokens
// ========================================

export const FONT_WEIGHT_TOKENS = {
  thin: 100,
  extraLight: 200,
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

// ========================================
// Typography Scale Tokens
// ========================================

export const TYPOGRAPHY_TOKENS = {
  // ========================================
  // Display Typography (큰 제목용)
  // ========================================
  display: {
    // Display Large
    large: {
      mobile: {
        fontSize: 'var(--typography-display-large-mobile-size)',
        lineHeight: 'var(--typography-display-large-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing: 'var(--typography-display-large-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-display-large-desktop-size)',
        lineHeight: 'var(--typography-display-large-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing: 'var(--typography-display-large-desktop-letter-spacing)',
      },
    },
    // Display Medium
    medium: {
      mobile: {
        fontSize: 'var(--typography-display-medium-mobile-size)',
        lineHeight: 'var(--typography-display-medium-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing: 'var(--typography-display-medium-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-display-medium-desktop-size)',
        lineHeight: 'var(--typography-display-medium-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing:
          'var(--typography-display-medium-desktop-letter-spacing)',
      },
    },
    // Display Small
    small: {
      mobile: {
        fontSize: 'var(--typography-display-small-mobile-size)',
        lineHeight: 'var(--typography-display-small-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing: 'var(--typography-display-small-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-display-small-desktop-size)',
        lineHeight: 'var(--typography-display-small-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.extraBold,
        letterSpacing: 'var(--typography-display-small-desktop-letter-spacing)',
      },
    },
  },

  // ========================================
  // Headline Typography (섹션 제목용)
  // ========================================
  headline: {
    // Headline Large
    large: {
      mobile: {
        fontSize: 'var(--typography-headline-large-mobile-size)',
        lineHeight: 'var(--typography-headline-large-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing: 'var(--typography-headline-large-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-headline-large-desktop-size)',
        lineHeight: 'var(--typography-headline-large-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing:
          'var(--typography-headline-large-desktop-letter-spacing)',
      },
    },
    // Headline Medium
    medium: {
      mobile: {
        fontSize: 'var(--typography-headline-medium-mobile-size)',
        lineHeight: 'var(--typography-headline-medium-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing:
          'var(--typography-headline-medium-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-headline-medium-desktop-size)',
        lineHeight: 'var(--typography-headline-medium-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing:
          'var(--typography-headline-medium-desktop-letter-spacing)',
      },
    },
    // Headline Small
    small: {
      mobile: {
        fontSize: 'var(--typography-headline-small-mobile-size)',
        lineHeight: 'var(--typography-headline-small-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing: 'var(--typography-headline-small-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-headline-small-desktop-size)',
        lineHeight: 'var(--typography-headline-small-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.bold,
        letterSpacing:
          'var(--typography-headline-small-desktop-letter-spacing)',
      },
    },
  },

  // ========================================
  // Title Typography (카드/컴포넌트 제목용)
  // ========================================
  title: {
    // Title Large
    large: {
      mobile: {
        fontSize: 'var(--typography-title-large-mobile-size)',
        lineHeight: 'var(--typography-title-large-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-large-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-title-large-desktop-size)',
        lineHeight: 'var(--typography-title-large-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-large-desktop-letter-spacing)',
      },
    },
    // Title Medium
    medium: {
      mobile: {
        fontSize: 'var(--typography-title-medium-mobile-size)',
        lineHeight: 'var(--typography-title-medium-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-medium-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-title-medium-desktop-size)',
        lineHeight: 'var(--typography-title-medium-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-medium-desktop-letter-spacing)',
      },
    },
    // Title Small
    small: {
      mobile: {
        fontSize: 'var(--typography-title-small-mobile-size)',
        lineHeight: 'var(--typography-title-small-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-small-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-title-small-desktop-size)',
        lineHeight: 'var(--typography-title-small-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.semiBold,
        letterSpacing: 'var(--typography-title-small-desktop-letter-spacing)',
      },
    },
  },

  // ========================================
  // Body Typography (본문용)
  // ========================================
  body: {
    // Body Large
    large: {
      mobile: {
        fontSize: 'var(--typography-body-large-mobile-size)',
        lineHeight: 'var(--typography-body-large-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-large-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-body-large-desktop-size)',
        lineHeight: 'var(--typography-body-large-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-large-desktop-letter-spacing)',
      },
    },
    // Body Medium
    medium: {
      mobile: {
        fontSize: 'var(--typography-body-medium-mobile-size)',
        lineHeight: 'var(--typography-body-medium-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-medium-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-body-medium-desktop-size)',
        lineHeight: 'var(--typography-body-medium-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-medium-desktop-letter-spacing)',
      },
    },
    // Body Small
    small: {
      mobile: {
        fontSize: 'var(--typography-body-small-mobile-size)',
        lineHeight: 'var(--typography-body-small-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-small-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-body-small-desktop-size)',
        lineHeight: 'var(--typography-body-small-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.regular,
        letterSpacing: 'var(--typography-body-small-desktop-letter-spacing)',
      },
    },
  },

  // ========================================
  // Label Typography (라벨/버튼용)
  // ========================================
  label: {
    // Label Large
    large: {
      mobile: {
        fontSize: 'var(--typography-label-large-mobile-size)',
        lineHeight: 'var(--typography-label-large-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-large-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-label-large-desktop-size)',
        lineHeight: 'var(--typography-label-large-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-large-desktop-letter-spacing)',
      },
    },
    // Label Medium
    medium: {
      mobile: {
        fontSize: 'var(--typography-label-medium-mobile-size)',
        lineHeight: 'var(--typography-label-medium-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-medium-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-label-medium-desktop-size)',
        lineHeight: 'var(--typography-label-medium-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-medium-desktop-letter-spacing)',
      },
    },
    // Label Small
    small: {
      mobile: {
        fontSize: 'var(--typography-label-small-mobile-size)',
        lineHeight: 'var(--typography-label-small-mobile-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-small-mobile-letter-spacing)',
      },
      desktop: {
        fontSize: 'var(--typography-label-small-desktop-size)',
        lineHeight: 'var(--typography-label-small-desktop-line-height)',
        fontWeight: FONT_WEIGHT_TOKENS.medium,
        letterSpacing: 'var(--typography-label-small-desktop-letter-spacing)',
      },
    },
  },
} as const;

// ========================================
// Language-specific Typography Tokens
// ========================================

export const TYPOGRAPHY_LANGUAGE_TOKENS = {
  // 한국어용 타이포그래피
  korean: TYPOGRAPHY_TOKENS,

  // 영문용 타이포그래피 (추후 다른 값으로 설정 가능)
  english: {
    ...TYPOGRAPHY_TOKENS,
    // 영문용 특별한 설정이 필요한 경우 여기에 오버라이드
  },
} as const;

// ========================================
// Type Definitions
// ========================================

export type FontFamilyToken = typeof FONT_FAMILY_TOKENS;
export type FontWeightToken = typeof FONT_WEIGHT_TOKENS;
export type TypographyToken = typeof TYPOGRAPHY_TOKENS;
export type TypographyLanguageToken = typeof TYPOGRAPHY_LANGUAGE_TOKENS;

export type TypographyScale =
  | 'display'
  | 'headline'
  | 'title'
  | 'body'
  | 'label';
export type TypographySize = 'large' | 'medium' | 'small';
export type TypographyDevice = 'mobile' | 'desktop';
export type TypographyLanguage = 'korean' | 'english';

// ========================================
// Helper Functions
// ========================================

/**
 * 타이포그래피 토큰을 가져오는 헬퍼 함수
 * @param scale - 타이포그래피 스케일 (display, headline, title, body, label)
 * @param size - 크기 (large, medium, small)
 * @param device - 디바이스 타입 (mobile, desktop)
 * @param language - 언어 (korean, english)
 * @returns 타이포그래피 스타일 객체
 */
export const getTypographyToken = (
  scale: TypographyScale,
  size: TypographySize,
  device: TypographyDevice,
  language: TypographyLanguage = 'korean'
) => {
  return TYPOGRAPHY_LANGUAGE_TOKENS[language][scale][size][device];
};

/**
 * CSS 클래스명을 생성하는 헬퍼 함수
 * @param scale - 타이포그래피 스케일
 * @param size - 크기
 * @param device - 디바이스 타입 (선택사항, 반응형인 경우)
 * @returns CSS 클래스명
 */
export const getTypographyClassName = (
  scale: TypographyScale,
  size: TypographySize,
  device?: TypographyDevice
): string => {
  const baseClass = `typography-${scale}-${size}`;
  return device ? `${baseClass}-${device}` : baseClass;
};

/**
 * 현재 디바이스 타입을 감지하는 함수
 * @param breakpoint - 모바일/데스크톱 구분 기준 (기본값: 768px)
 * @returns 현재 디바이스 타입
 */
export const getCurrentDevice = (
  breakpoint: number = 768
): TypographyDevice => {
  if (typeof window === 'undefined') return 'desktop';
  return window.innerWidth < breakpoint ? 'mobile' : 'desktop';
};

/**
 * 반응형 타이포그래피 스타일을 생성하는 함수
 * @param scale - 타이포그래피 스케일
 * @param size - 크기
 * @param language - 언어
 * @returns 반응형 CSS 스타일 객체
 */
export const getResponsiveTypographyStyle = (
  scale: TypographyScale,
  size: TypographySize,
  language: TypographyLanguage = 'korean'
) => {
  const mobileStyle = getTypographyToken(scale, size, 'mobile', language);
  const desktopStyle = getTypographyToken(scale, size, 'desktop', language);

  return {
    // 모바일 기본 스타일
    fontSize: mobileStyle.fontSize,
    lineHeight: mobileStyle.lineHeight,
    fontWeight: mobileStyle.fontWeight,
    letterSpacing: mobileStyle.letterSpacing,
    fontFamily: FONT_FAMILY_TOKENS.primary,

    // 데스크톱 미디어 쿼리
    '@media (min-width: 768px)': {
      fontSize: desktopStyle.fontSize,
      lineHeight: desktopStyle.lineHeight,
      fontWeight: desktopStyle.fontWeight,
      letterSpacing: desktopStyle.letterSpacing,
    },
  };
};

/**
 * 폰트 패밀리 토큰을 가져오는 함수
 * @param type - 폰트 타입 (primary, secondary, mono)
 * @returns CSS 변수 문자열
 */
export const getFontFamilyToken = (type: keyof FontFamilyToken): string => {
  return FONT_FAMILY_TOKENS[type];
};

/**
 * 폰트 웨이트 값을 가져오는 함수
 * @param weight - 폰트 웨이트 키
 * @returns 폰트 웨이트 숫자 값
 */
export const getFontWeightToken = (weight: keyof FontWeightToken): number => {
  return FONT_WEIGHT_TOKENS[weight];
};
