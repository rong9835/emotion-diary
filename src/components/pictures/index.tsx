'use client';

import React, { useState } from 'react';

import { SelectBox, SelectOption } from '@/commons/components/selectbox';

import { useDogPicturesBinding } from './hooks/index.binding.hook';
import { usePicturesFilter } from './hooks/index.filter.hook';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface PicturesProps {
  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 컴포넌트의 시각적 스타일 variant
   * - default: 기본 스타일
   * - compact: 컴팩트 스타일
   */
  variant?: 'default' | 'compact';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 필터 옵션들
   */
  filterOptions?: SelectOption[];

  /**
   * 기본 선택된 필터 값
   */
  defaultFilter?: string;

  /**
   * 필터 변경 시 호출되는 콜백
   */
  onFilterChange?: (value: string) => void;

  /**
   * 사진 클릭 시 호출되는 콜백
   */
  onPictureClick?: (picture: { id: number; src: string; alt: string }) => void;

  /**
   * 로딩 상태
   */
  loading?: boolean;

  /**
   * 에러 상태
   */
  error?: boolean;

  /**
   * 에러 메시지
   */
  errorMessage?: string;

  /**
   * 에러 재시도 핸들러
   */
  onRetry?: () => void;
}

// ========================================
// Pictures Component
// ========================================

const Pictures: React.FC<PicturesProps> = ({
  className,
  variant = 'default',
  theme = 'light',
  filterOptions: customFilterOptions,
  defaultFilter = 'all',
  onFilterChange,
  onPictureClick,
  loading: externalLoading,
  error: externalError,
  errorMessage: externalErrorMessage,
  onRetry,
}) => {
  // ========================================
  // State
  // ========================================

  const [, setSelectedFilter] = useState<string>(defaultFilter);

  // ========================================
  // Data Binding Hook
  // ========================================

  const {
    pictures,
    isLoading: internalLoading,
    isLoadingMore,
    hasError: internalError,
    errorMessage: internalErrorMessage,
    containerRef,
    retry: internalRetry,
  } = useDogPicturesBinding();

  // ========================================
  // Filter Hook
  // ========================================

  const {
    filterOptions: defaultPictureSizeFilterOptions,
    selectedFilter: selectedPictureSizeFilter,
    handleFilterChange: handlePictureSizeFilterChange,
    filterClassName,
  } = usePicturesFilter();

  // ========================================
  // Computed Values
  // ========================================

  const isLoading = externalLoading !== undefined ? externalLoading : internalLoading;
  const hasError = externalError !== undefined ? externalError : internalError;
  const errorMessage = externalErrorMessage || internalErrorMessage;
  const retry = onRetry || internalRetry;

  // ========================================
  // Filter Options
  // ========================================

  const filterOptions =
    customFilterOptions || defaultPictureSizeFilterOptions;

  // ========================================
  // Handlers
  // ========================================

  const handleFilterChange = (value: string): void => {
    handlePictureSizeFilterChange(value);
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  const handlePictureClick = (picture: { id: number; src: string; alt: string }): void => {
    onPictureClick?.(picture);
  };

  // ========================================
  // Render Splash Screen Component
  // ========================================

  const SplashScreen: React.FC<{ index: number }> = ({ index }) => (
    <div className={styles.splashScreen} data-testid={`splash-screen-${index}`}>
      <div className={styles.splashLine}></div>
    </div>
  );

  // ========================================
  // CSS Classes
  // ========================================

  const containerClasses: string = [
    styles.container,
    styles[`variant-${variant}`],
    styles[`theme-${theme}`],
    styles[filterClassName],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ========================================
  // Render
  // ========================================

  return (
    <div className={containerClasses} data-testid="pictures-container">
      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Filter Section */}
      <div className={styles.filter}>
        <SelectBox
          options={filterOptions}
          value={selectedPictureSizeFilter}
          onChange={handleFilterChange}
          variant="primary"
          theme="light"
          size="medium"
          className={styles.filterSelect}
          data-testid="pictures-filter-select"
        />
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Main Content */}
      <div className={styles.main}>
        {/* Error Message */}
        {hasError && (
          <div className={styles.errorContainer} data-testid="error-message">
            <p className={styles.errorMessage}>{errorMessage}</p>
            <button onClick={retry} className={styles.retryButton}>
              다시 시도
            </button>
          </div>
        )}

        {/* Loading Splash Screens */}
        {isLoading && (
          <div className={styles.pictureGrid}>
            {Array.from({ length: 6 }, (_, index) => (
              <SplashScreen key={`splash-${index}`} index={index} />
            ))}
          </div>
        )}

        {/* Picture Grid */}
        {!isLoading && (
          <div className={styles.pictureGrid} ref={containerRef}>
            {pictures.map((picture, index) => (
              <div
                key={picture.id}
                className={styles.pictureItem}
                data-testid={`picture-item-${index}`}
                onClick={() => handlePictureClick(picture)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePictureClick(picture);
                  }
                }}
              >
                <img
                  src={picture.src}
                  alt={picture.alt}
                  className={styles.pictureImage}
                />
              </div>
            ))}

            {/* Additional Loading Splash Screens */}
            {isLoadingMore && (
              <>
                <SplashScreen index={pictures.length} />
                <SplashScreen index={pictures.length + 1} />
                <SplashScreen index={pictures.length + 2} />
                <SplashScreen index={pictures.length + 3} />
                <SplashScreen index={pictures.length + 4} />
                <SplashScreen index={pictures.length + 5} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ========================================
// Export
// ========================================

export default Pictures;
