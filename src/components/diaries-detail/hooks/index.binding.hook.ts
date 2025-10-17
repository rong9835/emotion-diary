import { useState, useEffect } from 'react';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Types & Interfaces
// ========================================

export interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

export interface UseDiaryBindingReturn {
  diaryData: DiaryData | null;
  isLoading: boolean;
  error: string | null;
}

// ========================================
// Hook Implementation
// ========================================

/**
 * 일기 상세 데이터 바인딩 훅
 * 로컬스토리지에서 특정 ID의 일기 데이터를 가져옵니다.
 */
export const useDiaryBinding = (diaryId: string): UseDiaryBindingReturn => {
  const [diaryData, setDiaryData] = useState<DiaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDiaryData = () => {
      try {
        setIsLoading(true);
        setError(null);

        // 로컬스토리지에서 diaries 데이터 가져오기
        const diariesJson = localStorage.getItem('diaries');

        if (!diariesJson) {
          setError('일기 데이터를 찾을 수 없습니다.');
          setDiaryData(null);
          return;
        }

        const diaries: DiaryData[] = JSON.parse(diariesJson);

        // ID로 일기 찾기
        const foundDiary = diaries.find(
          (diary) => diary.id.toString() === diaryId
        );

        if (!foundDiary) {
          setError('해당 일기를 찾을 수 없습니다.');
          setDiaryData(null);
          return;
        }

        // 감정 타입 검증
        if (!Object.values(EmotionType).includes(foundDiary.emotion)) {
          setError('유효하지 않은 감정 타입입니다.');
          setDiaryData(null);
          return;
        }

        setDiaryData(foundDiary);
      } catch (err) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
        setDiaryData(null);
        console.error('Diary binding error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (diaryId) {
      loadDiaryData();
    } else {
      setError('일기 ID가 제공되지 않았습니다.');
      setIsLoading(false);
    }
  }, [diaryId]);

  return {
    diaryData,
    isLoading,
    error,
  };
};
