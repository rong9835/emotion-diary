'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { EmotionType } from '@/commons/constants/enum';
import { getDiaryDetailUrl } from '@/commons/constants/url';
import { useModal } from '@/commons/providers/modal/modal.provider';
import { Modal } from '@/commons/components/modal';

// ========================================
// Types & Interfaces
// ========================================

export interface DiaryFormData {
  emotion: EmotionType;
  title: string;
  content: string;
}

export interface DiaryStorageData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

// ========================================
// Validation Schema
// ========================================

const diaryFormSchema = z.object({
  emotion: z.nativeEnum(EmotionType),
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .max(100, '제목은 100자 이하로 입력해주세요.')
    .trim(),
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '내용은 1000자 이하로 입력해주세요.')
    .trim(),
});

// ========================================
// Local Storage Utilities
// ========================================

const DIARIES_STORAGE_KEY = 'diaries';

const getStoredDiaries = (): DiaryStorageData[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(DIARIES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse stored diaries:', error);
    return [];
  }
};

const saveDiaries = (diaries: DiaryStorageData[]): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(DIARIES_STORAGE_KEY, JSON.stringify(diaries));
  } catch (error) {
    console.error('Failed to save diaries:', error);
  }
};

const getNextDiaryId = (existingDiaries: DiaryStorageData[]): number => {
  if (existingDiaries.length === 0) return 1;

  const maxId = Math.max(...existingDiaries.map((diary) => diary.id));
  return maxId + 1;
};

// ========================================
// Custom Hook
// ========================================

export const useDiaryForm = () => {
  const router = useRouter();
  const { openModal, closeAllModals } = useModal();

  const form = useForm<DiaryFormData>({
    resolver: zodResolver(diaryFormSchema),
    defaultValues: {
      emotion: EmotionType.HAPPY,
      title: '',
      content: '',
    },
    mode: 'onChange',
  });

  const { handleSubmit, watch, formState } = form;
  const watchedValues = watch();

  // ========================================
  // Form Validation
  // ========================================

  const isFormValid = Boolean(
    watchedValues.emotion &&
      watchedValues.title?.trim() &&
      watchedValues.content?.trim() &&
      !formState.errors.emotion &&
      !formState.errors.title &&
      !formState.errors.content
  );

  // ========================================
  // Submit Handler
  // ========================================

  const onSubmit = handleSubmit(async (data: DiaryFormData) => {
    try {
      // 기존 일기 데이터 가져오기
      const existingDiaries = getStoredDiaries();

      // 새 일기 ID 생성
      const newId = getNextDiaryId(existingDiaries);

      // 새 일기 데이터 생성
      const newDiary: DiaryStorageData = {
        id: newId,
        title: data.title.trim(),
        content: data.content.trim(),
        emotion: data.emotion,
        createdAt: new Date().toISOString().split('T')[0], // 날짜만 저장 (YYYY-MM-DD)
      };

      // 일기 데이터 저장
      const updatedDiaries = [...existingDiaries, newDiary];
      saveDiaries(updatedDiaries);

      // 등록완료 모달 표시
      showSuccessModal(newId);
    } catch (error) {
      console.error('Failed to save diary:', error);
      // 에러 처리 (필요시 에러 모달 표시)
    }
  });

  // ========================================
  // Modal Handlers
  // ========================================

  const showSuccessModal = (diaryId: number) => {
    openModal(
      <Modal
        variant="info"
        actions="single"
        title="등록 완료"
        content="일기가 성공적으로 등록되었습니다."
        onConfirm={() => handleSuccessModalConfirm(diaryId)}
        confirmText="확인"
        data-testid="diary-register-success-modal"
      />,
      {
        closeOnBackdropClick: false,
        closeOnEscape: false,
        showCloseButton: false,
      }
    );
  };

  const handleSuccessModalConfirm = (diaryId: number) => {
    // 모든 모달 닫기
    closeAllModals();

    // 상세페이지로 이동
    const detailUrl = getDiaryDetailUrl(diaryId);
    router.push(detailUrl);
  };

  // ========================================
  // Return Values
  // ========================================

  return {
    form,
    onSubmit,
    isFormValid,
    watchedValues,
    formState,
  };
};
