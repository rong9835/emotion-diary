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

export interface UseRetrospectBindingReturn {
  retrospectList: RetrospectData[];
  isLoading: boolean;
  error: string | null;
}

// ========================================
// Hook Implementation
// ========================================

/**
 * 회고 바인딩 훅
 * 다이나믹 라우팅된 일기 상세 페이지의 [id]를 추출하여,
 * 로컬스토리지에 저장된 retrospects 배열에서 diaryId가 일치하는 객체들을 바인딩합니다.
 */
export const useRetrospectBinding = (
  diaryId: string
): UseRetrospectBindingReturn => {
  const [retrospectList, setRetrospectList] = useState<RetrospectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRetrospectData = () => {
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

        // diaryId가 일치하는 회고들만 필터링
        const filteredRetrospects = allRetrospects.filter(
          (retrospect) => retrospect.diaryId === diaryIdNumber
        );

        setRetrospectList(filteredRetrospects);
      } catch (err) {
        console.error('회고 데이터 로드 중 오류 발생:', err);
        setError('회고 데이터를 불러오는 중 오류가 발생했습니다.');
        setRetrospectList([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (diaryId) {
      loadRetrospectData();
    } else {
      setError('일기 ID가 제공되지 않았습니다.');
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
        console.error('회고 데이터 업데이트 중 오류 발생:', err);
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
