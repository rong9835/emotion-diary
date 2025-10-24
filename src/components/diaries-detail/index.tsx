'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import {
  EmotionType,
  getEmotionLabel,
  getEmotionImagePath,
  ImageSize,
} from '@/commons/constants/enum';
import { useDiaryBinding } from './hooks/index.binding.hook';
import { useRetrospectForm } from './hooks/index.retrospect.form.hook';
import { useRetrospectList } from './hooks/index.retrospect.list.hook';
import styles from './styles.module.css';

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

  // 회고 폼 훅
  const { register, handleSubmit, isValid } = useRetrospectForm();

  // 회고 목록 훅
  const { retrospectList } = useRetrospectList(diaryId || '');

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
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

      {/* Detail Title 영역: 1168 * 84 */}
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
            <div className={styles.emotionIcon} data-testid="emotion-icon">
              <Image
                src={getEmotionImagePath(
                  diaryData.emotion,
                  ImageSize.SMALL,
                  'png'
                )}
                alt={getEmotionLabel(diaryData.emotion)}
                width={32}
                height={32}
              />
            </div>
            <span className={styles.emotionText} data-testid="emotion-text">
              {getEmotionLabel(diaryData.emotion)}
            </span>
          </div>
          {/* 날짜 정보 (Frame): 107 * 20 */}
          <div className={styles.dateFrame}>
            <span className={styles.dateText} data-testid="diary-date">
              {new Date(diaryData.createdAt)
                .toLocaleDateString('ko-KR')
                .replace(/\.$/, '')}
            </span>
            <span className={styles.createdText}>작성</span>
          </div>
        </div>
      </section>

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Content 영역: 1168 * 169 */}
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

      {/* Gap 영역: 1168 * 24 */}
      <div className={styles.gap24}></div>

      {/* Detail Footer 영역: 1168 * 56 */}
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
            >
              삭제
            </Button>
          </div>
        </div>
      </section>

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
            placeholder="회고를 남겨보세요."
            {...register('content')}
            className={styles.retrospectInputField}
            data-testid="retrospect-input"
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            type="submit"
            disabled={!isValid}
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
              <span className={styles.retrospectText}>{retrospect.content}</span>
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
