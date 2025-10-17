import React from 'react';
import { Input } from '@/commons/components/input';
import { Button } from '@/commons/components/button';
import {
  EmotionType,
  EMOTION_CONFIG,
  getAllEmotionTypes,
} from '@/commons/constants/enum';
import { useModalClose } from './hooks/index.link.modal.close.hook';
import { useDiaryForm } from './hooks/index.form.hook';
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
}) => {
  const emotions = getAllEmotionTypes();

  return (
    <div className={styles.emotionSection}>
      <h3 className={`${styles.emotionTitle} typography-headline-small`}>
        오늘 기분은 어땠나요?
      </h3>
      <div className={styles.emotionRadioGroup}>
        {emotions.map((emotion) => {
          const config = EMOTION_CONFIG[emotion];
          const isSelected = selectedEmotion === emotion;

          return (
            <label
              key={emotion}
              className={`${styles.emotionRadio} ${
                isSelected ? styles.emotionRadioSelected : ''
              }`}
            >
              <input
                type="radio"
                name="emotion"
                value={emotion}
                checked={isSelected}
                onChange={() => onEmotionSelect(emotion)}
                className={styles.emotionRadioInput}
                aria-label={`${config.label} 감정 선택`}
                data-testid={`emotion-radio-${emotion}`}
              />
              <span className={styles.emotionRadioIcon} aria-hidden="true">
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
              <span
                className={`${styles.emotionRadioLabel} typography-title-large`}
              >
                {config.label}
              </span>
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
  // Hooks
  // ========================================

  const { openCancelModal } = useModalClose();
  const { form, onSubmit, isFormValid, watchedValues } = useDiaryForm();

  const { register, handleSubmit, setValue } = form;

  // ========================================
  // Event Handlers
  // ========================================

  const handleFormSubmit = (data: DiaryData) => {
    onSave?.(data);
    onSubmit();
  };

  const handleCancel = () => {
    openCancelModal();
  };

  const handleEmotionChange = (emotion: EmotionType) => {
    setValue('emotion', emotion);
  };

  // ========================================
  // Render
  // ========================================

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div
        className={`${styles.wrapper} ${styles[`wrapper--theme-${theme}`]}`}
        data-testid="diary-write-modal"
      >
        {/* Header */}
        <header className={styles.header}>
          <h1 className={`${styles.headerTitle} typography-headline-medium`}>
            일기 쓰기
          </h1>
          <button
            type="button"
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
              aria-hidden="true"
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
            selectedEmotion={watchedValues.emotion}
            onEmotionSelect={handleEmotionChange}
          />

          {/* Text Area */}
          <div className={styles.textArea}>
            {/* Title Input */}
            <div className={styles.inputTitleSection}>
              <Input
                label="제목"
                placeholder="제목을 입력합니다."
                {...register('title')}
                fullWidth
                theme={theme}
                size="medium"
                variant="primary"
                data-testid="diary-title-input"
              />
            </div>

            {/* Content Input */}
            <div className={styles.inputContentSection}>
              <div className={styles.textareaContainer}>
                <label
                  className={`${styles.textareaLabel} typography-label-large`}
                >
                  내용
                </label>
                <textarea
                  className={`${styles.textarea} typography-body-large ${
                    styles[`textarea--theme-${theme}`]
                  }`}
                  placeholder="내용을 입력합니다."
                  {...register('content')}
                  rows={5}
                  aria-label="일기 내용 입력"
                  data-testid="diary-content-textarea"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.buttonGroup}>
            <Button
              type="button"
              variant="secondary"
              size="medium"
              theme={theme}
              onClick={handleCancel}
              data-testid="diary-write-close-button-footer"
            >
              닫기
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="medium"
              theme={theme}
              disabled={!isFormValid}
              data-testid="diary-submit-button"
            >
              등록하기
            </Button>
          </div>
        </footer>
      </div>
    </form>
  );
};

// ========================================
// Export
// ========================================

export default DiariesNew;
