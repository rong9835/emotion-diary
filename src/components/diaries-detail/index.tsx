'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import { Modal } from '@/commons/components/modal';
import { useModal } from '@/commons/providers/modal/modal.provider';
import {
  EmotionType,
  getEmotionLabel,
  getAllEmotionTypes,
} from '@/commons/constants/enum';
import { useDiaryBinding } from './hooks/index.binding.hook';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useRetrospectBinding } from './hooks/index.retrospect.binding.hook';
import { useUpdateDiary } from './hooks/index.update.hook';
import { useDeleteDiary } from './hooks/index.delete.hook';
import styles from './styles.module.css';

// ========================================
// Utility Functions
// ========================================

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅
 * ISO 형식 (2025-01-17T03:53:43.827Z) 또는 YYYY-MM-DD 형식을 YYYY. MM. DD로 변환
 */
const formatDateForDisplay = (dateString: string): string => {
  try {
    // ISO 형식인 경우 날짜 부분만 추출
    const dateOnly = dateString.split('T')[0];
    const parts = dateOnly.split('-');

    if (parts.length === 3) {
      return `${parts[0]}. ${parts[1]}. ${parts[2]}`;
    }

    // 이미 YYYY-MM-DD 형식인 경우
    return dateOnly.replace(/-/g, '. ');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

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

export interface DiariesDetailProps {
  className?: string;
  diaryId?: string;
}

export interface RetrospectData {
  id: number;
  content: string;
  diaryId: number;
  createdAt: string;
}

// ========================================
// Mock Data (회고용) - 제거됨, 실제 데이터 사용
// ========================================

// ========================================
// DiariesDetail Component
// ========================================

export const DiariesDetail: React.FC<DiariesDetailProps> = ({
  className,
  diaryId,
}) => {
  // 실제 데이터 바인딩
  const { diaryData, isLoading, error } = useDiaryBinding(diaryId || '');

  // 수정 훅
  const {
    isEditMode,
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    handleEdit,
    handleCancel,
    onSubmit: onUpdateSubmit,
    isValid: isUpdateValid,
  } = useUpdateDiary(diaryData, diaryId || '');

  // 회고 폼 훅
  const { register, handleSubmit, isValid } = useRetrospectForm();

  // 회고 바인딩 훅 (실제 데이터 사용)
  const { retrospectList } = useRetrospectBinding(diaryId || '');

  // 삭제 훅
  const { deleteDiary, isDeleting } = useDeleteDiary(diaryId || '');

  // 모달 훅
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    const modalId = openModal(
      <Modal
        variant="danger"
        actions="dual"
        theme="light"
        title="일기 삭제"
        content="정말로 이 일기를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          deleteDiary();
          closeModal(modalId);
        }}
        onCancel={() => closeModal(modalId)}
        disabled={isDeleting}
        data-testid="delete-modal"
      />
    );
  };

  const handleCopyContent = () => {
    if (diaryData) {
      navigator.clipboard.writeText(diaryData.content);
      console.log('내용 복사됨');
    }
  };

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div
        className={`${styles.container} ${className || ''}`}
        data-testid="diary-detail-page"
      >
        <div className={styles.gap64}></div>
        <div>로딩 중...</div>
      </div>
    );
  }

  // 에러 상태 처리
  if (error || !diaryData) {
    return (
      <div
        className={`${styles.container} ${className || ''}`}
        data-testid="diary-detail-page"
      >
        <div className={styles.gap64}></div>
        <div data-testid="diary-not-found">
          {error || '일기를 찾을 수 없습니다.'}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.container} ${className || ''}`}
      data-testid="diary-detail-page"
    >
      {/* Gap 영역: 1168 * 64 */}
      <div className={styles.gap64}></div>

      {/* Detail Title 영역 또는 수정 모드 영역 */}
      {isEditMode ? (
        <>
          {/* 수정 모드: 기분 선택 영역 */}
          <section className={styles.editMoodSection}>
            <h2 className={styles.editMoodTitle}>오늘 기분은 어땟나요?</h2>
            <div className={styles.emotionRadioGroup}>
              {getAllEmotionTypes().map((emotionType) => (
                <label key={emotionType} className={styles.emotionRadio}>
                  <input
                    type="radio"
                    value={emotionType}
                    {...registerUpdate('emotion')}
                    className={styles.emotionRadioInput}
                  />
                  <span className={styles.emotionRadioLabel}>
                    {getEmotionLabel(emotionType)}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Gap 영역: 1168 * 24 */}
          <div className={styles.gap24}></div>

          {/* 제목 입력 영역 */}
          <section className={styles.editTitleSection}>
            <label className={styles.editLabel}>제목</label>
            <input
              type="text"
              {...registerUpdate('title')}
              className={styles.editInput}
            />
          </section>
        </>
      ) : (
        <section className={styles.detailTitle}>
          {/* 타이틀 프레임: 1168 * 36 */}
          <div className={styles.titleFrame}>
            <h1 className={styles.title} data-testid="diary-title">
              {diaryData.title}
            </h1>
          </div>
          {/* 감정&날짜 프레임: 1168 * 32 */}
          <div className={styles.emotionDateFrame}>
            {/* 감정 정보 (Frame 84): 109 * 32 */}
            <div className={styles.emotionFrame}>
              <span className={styles.emotionText} data-testid="emotion-text">
                {getEmotionLabel(diaryData.emotion)}
              </span>
            </div>
            {/* 날짜 정보 (Frame): 107 * 20 */}
            <div className={styles.dateFrame}>
              <span className={styles.dateText} data-testid="diary-date">
                {formatDateForDisplay(diaryData.createdAt)}
              </span>
              <span className={styles.createdText}>작성</span>
            </div>
          </div>
        </section>
      )}

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Content 영역 또는 내용 입력 영역 */}
      {isEditMode ? (
        <section className={styles.editContentSection}>
          <label className={styles.editLabel}>내용</label>
          <textarea
            {...registerUpdate('content')}
            className={styles.editTextarea}
          />
        </section>
      ) : (
        <section className={styles.detailContent}>
          <div className={styles.contentArea}>
            <div className={styles.contentLabel}>내용</div>
            <p className={styles.contentText} data-testid="diary-content">
              {diaryData.content}
            </p>
          </div>
          <div className={styles.copySection}>
            <button className={styles.copyButton} onClick={handleCopyContent}>
              <Image
                src="/icons/copy_outline_light_xs.svg"
                alt="복사"
                width={24}
                height={24}
              />
              <span>내용 복사</span>
            </button>
          </div>
        </section>
      )}

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Footer 영역 또는 수정 버튼 영역 */}
      {isEditMode ? (
        <section className={styles.editButtonSection}>
          <form onSubmit={handleSubmitUpdate(onUpdateSubmit)}>
            <div className={styles.editButtonGroup}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.editCancelButton}
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!isUpdateValid}
                className={styles.editSubmitButton}
              >
                수정 하기
              </button>
            </div>
          </form>
        </section>
      ) : (
        <section className={styles.detailFooter}>
          <div className={styles.footerContent}>
            <div className={styles.buttonGroup}>
              <Button
                variant="secondary"
                size="small"
                theme="light"
                onClick={handleEdit}
                className={styles.editButton}
              >
                수정
              </Button>
              <Button
                variant="secondary"
                size="small"
                theme="light"
                onClick={handleDelete}
                className={styles.deleteButton}
                data-testid="delete-button"
              >
                삭제
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Retrospect Input 영역: 1168 * 85 */}
      <section className={styles.retrospectInput}>
        {/* 회고 라벨 */}
        <div className={styles.retrospectLabel}>회고</div>

        {/* 입력 영역 */}
        <form
          className={styles.retrospectInputFrame}
          onSubmit={handleSubmit(diaryId || '')}
        >
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder={
              isEditMode
                ? '수정중일땐 회고를 작성할 수 없어요.'
                : '회고를 남겨보세요.'
            }
            {...register('content')}
            className={styles.retrospectInputField}
            data-testid="retrospect-input"
            disabled={isEditMode}
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            disabled={!isValid || isEditMode}
            className={styles.retrospectSubmitButton}
            data-testid="retrospect-submit"
          >
            입력
          </Button>
        </form>
      </section>

      {/* Gap 영역: 1168 * 16 */}
      <div className={styles.gap16}></div>

      {/* Retrospect List 영역: 1168 * 72 */}
      <section className={styles.retrospectList}>
        {retrospectList.length > 0 ? (
          retrospectList.map((retrospect) => (
            <div key={retrospect.id} className={styles.retrospectItem}>
              <span className={styles.retrospectText}>
                {retrospect.content}
              </span>
              <span className={styles.retrospectDate}>
                [{retrospect.createdAt}]
              </span>
            </div>
          ))
        ) : (
          <div className={styles.retrospectEmpty}>
            아직 회고가 없습니다. 첫 번째 회고를 남겨보세요.
          </div>
        )}
      </section>
    </div>
  );
};

export default DiariesDetail;
