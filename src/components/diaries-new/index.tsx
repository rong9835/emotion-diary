import React, { useState } from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import {
  EmotionType,
  EMOTION_CONFIG,
  getAllEmotionTypes,
} from '@/commons/constants/enum';
import { useModalClose } from './hooks/index.link.modal.close.hook';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface DiariesNewProps {
  /** 테마 (라이트/다크 모드) */
  theme?: 'light' | 'dark';
  /** 일기 저장 콜백 */
  onSave?: (data: DiaryData) => void;
  /** 취소 콜백 */
  onCancel?: () => void;
}

export interface DiaryData {
  emotion: EmotionType;
  title: string;
  content: string;
}

// ========================================
// Emotion Selection Component
// ========================================

interface EmotionBoxProps {
  selectedEmotion: EmotionType | null;
  onEmotionSelect: (emotion: EmotionType) => void;
  theme?: 'light' | 'dark';
}

const EmotionBox: React.FC<EmotionBoxProps> = ({
  selectedEmotion,
  onEmotionSelect,
  theme = 'light',
}) => {
  const emotions = getAllEmotionTypes();

  return (
    <div className={styles.emotionSection}>
      <h3 className={styles.emotionTitle}>오늘 기분은 어땠나요?</h3>
      <div className={styles.emotionRadioGroup}>
        {emotions.map((emotion) => {
          const config = EMOTION_CONFIG[emotion];
          const isSelected = selectedEmotion === emotion;

          return (
            <label
              key={emotion}
              className={`${styles.emotionRadio} ${
                isSelected ? styles.emotionRadioSelected : ''
              } ${styles[`emotionRadio--${theme}`]}`}
            >
              <input
                type="radio"
                name="emotion"
                value={emotion}
                checked={isSelected}
                onChange={() => onEmotionSelect(emotion)}
                className={styles.emotionRadioInput}
              />
              <span className={styles.emotionRadioIcon}>
                {isSelected ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="12" cy="12" r="6" fill="currentColor" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                )}
              </span>
              <span className={styles.emotionRadioLabel}>{config.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

// ========================================
// DiariesNew Component
// ========================================

export const DiariesNew: React.FC<DiariesNewProps> = ({
  theme = 'light',
  onSave,
}) => {
  // ========================================
  // State Management
  // ========================================

  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(
    EmotionType.HAPPY
  );
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // ========================================
  // Hooks
  // ========================================

  const { openCancelModal } = useModalClose();

  // ========================================
  // Event Handlers
  // ========================================

  const handleSave = () => {
    if (selectedEmotion && title.trim() && content.trim()) {
      const diaryData: DiaryData = {
        emotion: selectedEmotion,
        title: title.trim(),
        content: content.trim(),
      };
      onSave?.(diaryData);
    }
  };

  const handleCancel = () => {
    openCancelModal();
  };

  // ========================================
  // Validation
  // ========================================

  const isFormValid = selectedEmotion && title.trim() && content.trim();

  // ========================================
  // Render
  // ========================================

  return (
    <div
      className={`${styles.wrapper} ${styles[`wrapper--${theme}`]}`}
      data-testid="diary-write-modal"
    >
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>일기 쓰기</h1>
        <button
          onClick={handleCancel}
          className={styles.closeButton}
          aria-label="닫기"
          data-testid="diary-write-close-button"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Emotion Selection Box */}
        <EmotionBox
          selectedEmotion={selectedEmotion}
          onEmotionSelect={setSelectedEmotion}
          theme={theme}
        />

        {/* Text Area */}
        <div className={styles.textArea}>
          {/* Title Input */}
          <div className={styles.inputTitleSection}>
            <Input
              label="제목"
              placeholder="제목을 입력합니다."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              theme={theme}
              size="medium"
              variant="primary"
            />
          </div>

          {/* Content Input */}
          <div className={styles.inputContentSection}>
            <div className={styles.textareaContainer}>
              <label className={styles.textareaLabel}>내용</label>
              <textarea
                className={`${styles.textarea} ${styles[`textarea--${theme}`]}`}
                placeholder="내용을 입력합니다."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            size="medium"
            theme={theme}
            onClick={handleCancel}
            data-testid="diary-write-close-button-footer"
          >
            닫기
          </Button>
          <Button
            variant="primary"
            size="medium"
            theme={theme}
            onClick={handleSave}
            disabled={!isFormValid}
          >
            등록하기
          </Button>
        </div>
      </footer>
    </div>
  );
};

// ========================================
// Export
// ========================================

export default DiariesNew;
