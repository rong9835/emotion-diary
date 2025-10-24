import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ========================================
// Types & Interfaces
// ========================================

export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

// ========================================
// Zod Schema
// ========================================

const retrospectFormSchema = z.object({
  content: z.string().min(1, '회고 내용을 입력해주세요.'),
});

export type RetrospectFormValues = z.infer<typeof retrospectFormSchema>;

export interface UseRetrospectFormReturn {
  register: ReturnType<typeof useForm<RetrospectFormValues>>['register'];
  handleSubmit: (diaryId: string) => () => void;
  isValid: boolean;
  reset: () => void;
}

// ========================================
// Hook Implementation
// ========================================

/**
 * 회고 폼 훅
 * 회고 입력 폼의 상태 관리 및 제출을 처리합니다.
 */
export const useRetrospectForm = (): UseRetrospectFormReturn => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { isValid },
    reset,
  } = useForm<RetrospectFormValues>({
    resolver: zodResolver(retrospectFormSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
    },
  });

  /**
   * 폼 제출 핸들러
   * @param diaryId - 연결된 일기 ID
   */
  const handleSubmit = (diaryId: string) => {
    return handleFormSubmit((data) => {
      try {
        const diaryIdNumber = parseInt(diaryId, 10);

        // 로컬스토리지에서 기존 retrospects 가져오기
        const retrospectsJson = localStorage.getItem('retrospects');
        const existingRetrospects: RetrospectData[] = retrospectsJson
          ? JSON.parse(retrospectsJson)
          : [];

        // 새로운 id 계산 (기존 배열의 최대 id + 1 또는 1)
        let newId = 1;
        if (existingRetrospects.length > 0) {
          const maxId = Math.max(
            ...existingRetrospects.map((item) => item.id)
          );
          newId = maxId + 1;
        }

        // 새로운 회고 데이터 생성
        const newRetrospect: RetrospectData = {
          id: newId,
          content: data.content.trim(),
          diaryId: diaryIdNumber,
          createdAt: new Date()
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '. ')
            .replace(/\.$/, ''),
        };

        // 기존 배열에 추가
        const updatedRetrospects = [...existingRetrospects, newRetrospect];

        // 로컬스토리지에 저장
        localStorage.setItem('retrospects', JSON.stringify(updatedRetrospects));

        // 폼 초기화
        reset();

        // 페이지 새로고침
        window.location.reload();
      } catch (error) {
        console.error('회고 등록 중 오류 발생:', error);
      }
    });
  };

  return {
    register,
    handleSubmit,
    isValid,
    reset,
  };
};
