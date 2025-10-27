'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EmotionType } from '@/commons/constants/enum';
import { DiaryData } from '../index';

// ========================================
// Zod 스키마 정의
// ========================================

const updateDiarySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  emotion: z.nativeEnum(EmotionType),
});

export type UpdateDiaryFormData = z.infer<typeof updateDiarySchema>;

// ========================================
// Custom Hook: 일기 수정 기능
// ========================================

export interface UseUpdateDiaryReturn {
  isEditMode: boolean;
  register: ReturnType<typeof useForm<UpdateDiaryFormData>>['register'];
  handleSubmit: ReturnType<typeof useForm<UpdateDiaryFormData>>['handleSubmit'];
  handleEdit: () => void;
  handleCancel: () => void;
  onSubmit: (data: UpdateDiaryFormData) => void;
  isValid: boolean;
  watch: ReturnType<typeof useForm<UpdateDiaryFormData>>['watch'];
  setValue: ReturnType<typeof useForm<UpdateDiaryFormData>>['setValue'];
}

/**
 * 일기 수정 기능을 위한 커스텀 훅
 * @param diaryData 현재 일기 데이터
 * @param diaryId 일기 ID
 */
export const useUpdateDiary = (
  diaryData: DiaryData | null,
  diaryId: string
): UseUpdateDiaryReturn => {
  const [isEditMode, setIsEditMode] = useState(false);

  // react-hook-form 설정
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<UpdateDiaryFormData>({
    resolver: zodResolver(updateDiarySchema),
    mode: 'onChange',
    defaultValues: {
      title: diaryData?.title || '',
      content: diaryData?.content || '',
      emotion: diaryData?.emotion || EmotionType.HAPPY,
    },
  });

  /**
   * 수정 버튼 클릭 핸들러
   * 수정 모드로 전환하고 현재 데이터를 폼에 설정
   */
  const handleEdit = () => {
    if (diaryData) {
      reset({
        title: diaryData.title,
        content: diaryData.content,
        emotion: diaryData.emotion,
      });
      setIsEditMode(true);
    }
  };

  /**
   * 취소 버튼 클릭 핸들러
   * 수정 모드를 종료하고 원래 데이터로 복구
   */
  const handleCancel = () => {
    if (diaryData) {
      reset({
        title: diaryData.title,
        content: diaryData.content,
        emotion: diaryData.emotion,
      });
    }
    setIsEditMode(false);
  };

  /**
   * 폼 제출 핸들러
   * 로컬스토리지의 일기 데이터를 업데이트
   */
  const onSubmit = (data: UpdateDiaryFormData) => {
    try {
      // 로컬스토리지에서 일기 목록 가져오기
      const diariesJson = localStorage.getItem('diaries');
      if (!diariesJson) {
        console.error('일기 목록을 찾을 수 없습니다.');
        return;
      }

      const diaries: DiaryData[] = JSON.parse(diariesJson);

      // 현재 일기 찾기 및 업데이트
      const diaryIndex = diaries.findIndex(
        (diary) => diary.id === parseInt(diaryId, 10)
      );

      if (diaryIndex === -1) {
        console.error('해당 일기를 찾을 수 없습니다.');
        return;
      }

      // 업데이트된 일기 데이터
      const updatedDiary: DiaryData = {
        ...diaries[diaryIndex],
        title: data.title,
        content: data.content,
        emotion: data.emotion,
      };

      // 일기 목록 업데이트
      diaries[diaryIndex] = updatedDiary;

      // 로컬스토리지에 저장
      localStorage.setItem('diaries', JSON.stringify(diaries));

      // 수정 모드 종료 및 페이지 새로고침
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error('일기 수정 중 오류 발생:', error);
    }
  };

  return {
    isEditMode,
    register,
    handleSubmit,
    handleEdit,
    handleCancel,
    onSubmit,
    isValid,
    watch,
    setValue,
  };
};
