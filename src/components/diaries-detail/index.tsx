'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/commons/components/button';
import { Input } from '@/commons/components/input';
import {
  EmotionType,
  getEmotionLabel,
  getEmotionImagePath,
  ImageSize,
} from '@/commons/constants/enum';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface DiaryData {
  id: string;
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
  id: string;
  content: string;
  createdAt: string;
}

// ========================================
// Mock Data
// ========================================

const mockDiaryData: DiaryData = {
  id: '1',
  title: '이것은 타이틀 입니다.',
  content:
    '내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다내용이 들어갑니다',
  emotion: EmotionType.HAPPY,
  createdAt: '2024. 07. 12',
};

const mockRetrospectData: RetrospectData[] = [
  {
    id: '1',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24',
  },
  {
    id: '2',
    content: '3년이 지나고 다시 보니 이때가 그립다.',
    createdAt: '2024. 09. 24',
  },
];

// ========================================
// DiariesDetail Component
// ========================================

export const DiariesDetail: React.FC<DiariesDetailProps> = ({
  className,
  diaryId,
}) => {
  // Mock 데이터 사용 (실제로는 diaryId로 데이터를 가져와야 함)
  // TODO: diaryId를 사용하여 실제 데이터 fetch 구현 예정
  console.log('Diary ID:', diaryId);
  const diaryData = mockDiaryData;

  // 회고 관련 상태
  const [retrospectInput, setRetrospectInput] = useState('');
  const [retrospectList, setRetrospectList] =
    useState<RetrospectData[]>(mockRetrospectData);

  const handleEdit = () => {
    console.log('수정 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제 버튼 클릭');
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(diaryData.content);
    console.log('내용 복사됨');
  };

  const handleRetrospectSubmit = () => {
    if (retrospectInput.trim()) {
      const newRetrospect: RetrospectData = {
        id: Date.now().toString(),
        content: retrospectInput.trim(),
        createdAt: new Date()
          .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          .replace(/\. /g, '. '),
      };
      setRetrospectList([newRetrospect, ...retrospectList]);
      setRetrospectInput('');
      console.log('회고 추가됨:', newRetrospect);
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Gap 영역: 1168 * 64 */}
      <div className={styles.gap64}></div>

      {/* Detail Title 영역: 1168 * 84 */}
      <section className={styles.detailTitle}>
        {/* 타이틀 프레임: 1168 * 36 */}
        <div className={styles.titleFrame}>
          <h1 className={styles.title}>{diaryData.title}</h1>
        </div>
        {/* 감정&날짜 프레임: 1168 * 32 */}
        <div className={styles.emotionDateFrame}>
          {/* 감정 정보 (Frame 84): 109 * 32 */}
          <div className={styles.emotionFrame}>
            <div className={styles.emotionIcon}>
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
            <span className={styles.emotionText}>
              {getEmotionLabel(diaryData.emotion)}
            </span>
          </div>
          {/* 날짜 정보 (Frame): 107 * 20 */}
          <div className={styles.dateFrame}>
            <span className={styles.dateText}>{diaryData.createdAt}</span>
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
          <p className={styles.contentText}>{diaryData.content}</p>
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
        <div className={styles.retrospectInputFrame}>
          <Input
            variant="primary"
            size="medium"
            theme="light"
            placeholder="회고를 남겨보세요."
            value={retrospectInput}
            onChange={(e) => setRetrospectInput(e.target.value)}
            className={styles.retrospectInputField}
          />
          <Button
            variant="primary"
            size="small"
            theme="light"
            onClick={handleRetrospectSubmit}
            className={styles.retrospectSubmitButton}
          >
            입력
          </Button>
        </div>
      </section>

      {/* Gap 영역: 1168 * 16 */}
      <div className={styles.gap16}></div>

      {/* Retrospect List 영역: 1168 * 72 */}
      <section className={styles.retrospectList}>
        {retrospectList.map((retrospect) => (
          <div key={retrospect.id} className={styles.retrospectItem}>
            <span className={styles.retrospectText}>{retrospect.content}</span>
            <span className={styles.retrospectDate}>
              [{retrospect.createdAt}]
            </span>
          </div>
        ))}
      </section>
    </div>
  );
};

export default DiariesDetail;
