'use client';

import { useState, useEffect } from 'react';
import { EmotionType, getEmotionImagePath, ImageSize } from '@/commons/constants/enum';

// ========================================
// Types & Interfaces
// ========================================

/**
 * 로컬스토리지에 저장되는 일기 데이터 타입
 */
export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

/**
 * UI에서 사용할 일기 카드 데이터 타입
 */
export interface DiaryCardData {
  id: string;
  title: string;
  emotion: EmotionType;
  date: string;
  imageUrl: string;
}

// ========================================
// Diaries Binding Hook
// ========================================

/**
 * 로컬스토리지에서 일기 데이터를 로드하고 UI에 맞게 변환하는 커스텀 훅
 *
 * 기능:
 * - 로컬스토리지에서 'diaries' 키로 데이터 로드
 * - 데이터 유효성 검증 및 에러 처리
 * - createdAt 날짜 포맷 변환 (YYYY-MM-DD → YYYY. MM. DD)
 * - 감정 타입에 따른 이미지 경로 매핑
 *
 * @returns {DiaryCardData[]} UI에 표시할 일기 카드 데이터 배열
 */
export const useDiariesBinding = (): DiaryCardData[] => {
  const [diaries, setDiaries] = useState<DiaryCardData[]>([]);

  useEffect(() => {
    try {
      // 로컬스토리지에서 데이터 로드
      const storedData = localStorage.getItem('diaries');

      // 데이터가 없는 경우
      if (!storedData) {
        setDiaries([]);
        return;
      }

      // JSON 파싱
      const parsedData: DiaryData[] = JSON.parse(storedData);

      // 배열이 아닌 경우
      if (!Array.isArray(parsedData)) {
        console.error('Invalid diaries data format: not an array');
        setDiaries([]);
        return;
      }

      // 데이터 변환
      const transformedData: DiaryCardData[] = parsedData.map((diary) => ({
        id: String(diary.id),
        title: diary.title,
        emotion: diary.emotion,
        date: formatDate(diary.createdAt),
        imageUrl: getEmotionImagePath(diary.emotion, ImageSize.MEDIUM, 'png'),
      }));

      setDiaries(transformedData);
    } catch (error) {
      console.error('Error loading diaries from localStorage:', error);
      setDiaries([]);
    }
  }, []);

  return diaries;
};

// ========================================
// Utility Functions
// ========================================

/**
 * 날짜 포맷 변환 함수
 * YYYY-MM-DD → YYYY. MM. DD
 *
 * @param {string} dateString - 변환할 날짜 문자열 (YYYY-MM-DD 형식)
 * @returns {string} 변환된 날짜 문자열 (YYYY. MM. DD 형식)
 */
const formatDate = (dateString: string): string => {
  try {
    // YYYY-MM-DD 형식을 YYYY. MM. DD 형식으로 변환
    const parts = dateString.split('-');
    if (parts.length === 3) {
      return `${parts[0]}. ${parts[1]}. ${parts[2]}`;
    }
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};
