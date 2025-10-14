import { COLOR_TOKENS } from './color';

// ========================================
// Emotion Enum System
// 프롬프트 룰 기반 감정 시스템 구현
// ========================================

/**
 * 감정 타입 정의
 */
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

/**
 * 이미지 사이즈 타입
 */
export enum ImageSize {
  MEDIUM = 'M',
  SMALL = 'S',
}

/**
 * 감정별 메타데이터 인터페이스
 */
export interface EmotionMetadata {
  /** 화면에 표시될 텍스트 */
  label: string;
  /** 색상 토큰 (COLOR_TOKENS 기반) */
  color: string;
  /** 이미지 파일명 (확장자 제외) */
  imageBase: string;
}

/**
 * 감정별 설정 매핑
 * 프롬프트 룰에 따른 정확한 매핑:
 * - Happy: "행복해요", red60, emotion-happy-*.svg
 * - Sad: "슬퍼요", blue60, emotion-sad-*.svg
 * - Angry: "화나요", gray60, emotion-angry-*.svg
 * - Surprise: "놀랐어요", yellow60, emotion-surprise-*.svg
 * - Etc: "기타", green60, emotion-etc-*.svg
 */
export const EMOTION_CONFIG: Record<EmotionType, EmotionMetadata> = {
  [EmotionType.HAPPY]: {
    label: '행복해요',
    color: COLOR_TOKENS.red['60'],
    imageBase: 'emotion-happy',
  },
  [EmotionType.SAD]: {
    label: '슬퍼요',
    color: COLOR_TOKENS.blue['60'],
    imageBase: 'emotion-sad',
  },
  [EmotionType.ANGRY]: {
    label: '화나요',
    color: COLOR_TOKENS.gray['60'],
    imageBase: 'emotion-angry',
  },
  [EmotionType.SURPRISE]: {
    label: '놀랐어요',
    color: COLOR_TOKENS.yellow['60'],
    imageBase: 'emotion-surprise',
  },
  [EmotionType.ETC]: {
    label: '기타',
    color: COLOR_TOKENS.green['60'],
    imageBase: 'emotion-etc',
  },
} as const;

// ========================================
// Utility Functions
// ========================================

/**
 * 감정 타입에 따른 라벨 반환
 */
export const getEmotionLabel = (emotion: EmotionType): string => {
  return EMOTION_CONFIG[emotion].label;
};

/**
 * 감정 타입에 따른 색상 반환
 */
export const getEmotionColor = (emotion: EmotionType): string => {
  return EMOTION_CONFIG[emotion].color;
};

/**
 * 감정 타입과 사이즈에 따른 이미지 경로 반환
 * @param emotion 감정 타입
 * @param size 이미지 사이즈 (M: medium, S: small)
 * @param format 이미지 포맷 (기본값: 'svg')
 * @returns 완전한 이미지 경로
 */
export const getEmotionImagePath = (
  emotion: EmotionType,
  size: ImageSize = ImageSize.MEDIUM,
  format: 'svg' | 'png' = 'svg'
): string => {
  const baseImageName = EMOTION_CONFIG[emotion].imageBase;
  const sizeString = size.toLowerCase();

  if (format === 'svg') {
    return `/icons/${baseImageName}-${sizeString}.svg`;
  } else {
    return `/images/${baseImageName}-${sizeString}.${format}`;
  }
};

/**
 * 모든 감정 타입 배열 반환
 */
export const getAllEmotionTypes = (): EmotionType[] => {
  return Object.values(EmotionType);
};

/**
 * 감정 타입 검증
 */
export const isValidEmotionType = (value: string): value is EmotionType => {
  return Object.values(EmotionType).includes(value as EmotionType);
};

// ========================================
// Type Exports
// ========================================

export { EmotionType as default };
