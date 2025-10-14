/**
 * Emotion Enum Constants
 * 감정 다이어리 프로젝트에서 사용되는 감정 관련 enum 및 데이터
 */

import { COLOR_TOKENS } from './color';

/**
 * 감정 타입 enum
 */
export enum EmotionType {
  HAPPY = 'HAPPY',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  SURPRISE = 'SURPRISE',
  ETC = 'ETC',
}

/**
 * 감정 이미지 크기 타입
 */
export enum EmotionImageSize {
  MEDIUM = 'M',
  SMALL = 'S',
}

/**
 * 감정 데이터 인터페이스
 */
export interface EmotionData {
  type: EmotionType;
  label: string;
  color: string;
  images: {
    medium: string;
    small: string;
  };
}

/**
 * 감정별 상세 데이터 맵
 */
export const EMOTION_DATA_MAP: Record<EmotionType, EmotionData> = {
  [EmotionType.HAPPY]: {
    type: EmotionType.HAPPY,
    label: '행복해요',
    color: COLOR_TOKENS.red['60'],
    images: {
      medium: '/icons/emotion-happy-m.svg',
      small: '/icons/emotion-happy-s.svg',
    },
  },
  [EmotionType.SAD]: {
    type: EmotionType.SAD,
    label: '슬퍼요',
    color: COLOR_TOKENS.blue['60'],
    images: {
      medium: '/icons/emotion-sad-m.svg',
      small: '/icons/emotion-sad-s.svg',
    },
  },
  [EmotionType.ANGRY]: {
    type: EmotionType.ANGRY,
    label: '화나요',
    color: COLOR_TOKENS.gray['60'],
    images: {
      medium: '/icons/emotion-angry-m.svg',
      small: '/icons/emotion-angry-s.svg',
    },
  },
  [EmotionType.SURPRISE]: {
    type: EmotionType.SURPRISE,
    label: '놀랐어요',
    color: COLOR_TOKENS.yellow['60'],
    images: {
      medium: '/icons/emotion-surprise-m.svg',
      small: '/icons/emotion-surprise-s.svg',
    },
  },
  [EmotionType.ETC]: {
    type: EmotionType.ETC,
    label: '기타',
    color: COLOR_TOKENS.green['60'],
    images: {
      medium: '/icons/emotion-etc-m.svg',
      small: '/icons/emotion-etc-s.svg',
    },
  },
};

/**
 * 모든 감정 타입 배열
 */
export const ALL_EMOTION_TYPES = Object.values(EmotionType);

/**
 * 모든 감정 데이터 배열
 */
export const ALL_EMOTION_DATA = Object.values(EMOTION_DATA_MAP);

/**
 * 감정 타입으로 감정 데이터 조회
 * @param emotionType - 감정 타입
 * @returns 감정 데이터
 */
export const getEmotionData = (emotionType: EmotionType): EmotionData => {
  return EMOTION_DATA_MAP[emotionType];
};

/**
 * 감정 타입으로 라벨 조회
 * @param emotionType - 감정 타입
 * @returns 감정 라벨
 */
export const getEmotionLabel = (emotionType: EmotionType): string => {
  return EMOTION_DATA_MAP[emotionType].label;
};

/**
 * 감정 타입으로 색상 조회
 * @param emotionType - 감정 타입
 * @returns 감정 색상 (CSS 변수)
 */
export const getEmotionColor = (emotionType: EmotionType): string => {
  return EMOTION_DATA_MAP[emotionType].color;
};

/**
 * 감정 타입과 크기로 이미지 경로 조회
 * @param emotionType - 감정 타입
 * @param size - 이미지 크기
 * @returns 이미지 경로
 */
export const getEmotionImage = (
  emotionType: EmotionType,
  size: EmotionImageSize = EmotionImageSize.MEDIUM
): string => {
  const emotionData = EMOTION_DATA_MAP[emotionType];
  return size === EmotionImageSize.MEDIUM
    ? emotionData.images.medium
    : emotionData.images.small;
};

/**
 * 감정 타입 유효성 검사
 * @param value - 검사할 값
 * @returns 유효한 감정 타입인지 여부
 */
export const isValidEmotionType = (value: string): value is EmotionType => {
  return Object.values(EmotionType).includes(value as EmotionType);
};

/**
 * 문자열을 감정 타입으로 변환 (안전)
 * @param value - 변환할 문자열
 * @returns 감정 타입 또는 null
 */
export const parseEmotionType = (value: string): EmotionType | null => {
  return isValidEmotionType(value) ? (value as EmotionType) : null;
};
