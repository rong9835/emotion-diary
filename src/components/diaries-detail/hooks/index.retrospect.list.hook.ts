import { useState, useEffect } from 'react';

// ========================================
// Types & Interfaces
// ========================================

export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

export interface UseRetrospectListReturn {
  retrospectList: RetrospectData[];
  isLoading: boolean;
  error: string | null;
}

// ========================================
// Hook Implementation
// ========================================

/**
 * 회고 목록 훅
 * 로컬스토리지에서 특정 일기의 회고 목록을 가져옵니다.
 */
export const useRetrospectList = (diaryId: string): UseRetrospectListReturn => {
  const [retrospectList, setRetrospectList] = useState<RetrospectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      setError(null);

      // 로컬스토리지에서 retrospects 데이터 가져오기
      const retrospectsJson = localStorage.getItem('retrospects');
      
      if (!retrospectsJson) {
        setRetrospectList([]);
        setIsLoading(false);
        return;
      }

      const allRetrospects: RetrospectData[] = JSON.parse(retrospectsJson);
      const diaryIdNumber = parseInt(diaryId, 10);

      // 현재 일기에 해당하는 회고만 필터링
      const filteredRetrospects = allRetrospects.filter(
        (retrospect) => retrospect.diaryId === diaryIdNumber
      );

      setRetrospectList(filteredRetrospects);
    } catch (err) {
      console.error('회고 목록 로드 중 오류 발생:', err);
      setError('회고 목록을 불러오는 중 오류가 발생했습니다.');
      setRetrospectList([]);
    } finally {
      setIsLoading(false);
    }
  }, [diaryId]);

  // 로컬스토리지 변경 감지를 위한 이벤트 리스너
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const retrospectsJson = localStorage.getItem('retrospects');
        
        if (!retrospectsJson) {
          setRetrospectList([]);
          return;
        }

        const allRetrospects: RetrospectData[] = JSON.parse(retrospectsJson);
        const diaryIdNumber = parseInt(diaryId, 10);

        const filteredRetrospects = allRetrospects.filter(
          (retrospect) => retrospect.diaryId === diaryIdNumber
        );

        setRetrospectList(filteredRetrospects);
      } catch (err) {
        console.error('회고 목록 업데이트 중 오류 발생:', err);
      }
    };

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [diaryId]);

  return {
    retrospectList,
    isLoading,
    error,
  };
};

