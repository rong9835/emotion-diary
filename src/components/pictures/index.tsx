'use client';

import React, { useState } from 'react';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import { useDogPicturesBinding } from './hooks/index.binding.hook';
import styles from './styles.module.css';

const Pictures: React.FC = () => {
  // 필터 옵션
  const filterOptions: SelectOption[] = [
    { value: 'all', label: '전체' },
    { value: 'recent', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'favorite', label: '즐겨찾기' },
  ];

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const {
    pictures,
    isLoading,
    isLoadingMore,
    hasError,
    errorMessage,
    containerRef,
    retry,
  } = useDogPicturesBinding();

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  // 스플래시 스크린 컴포넌트
  const SplashScreen: React.FC<{ index: number }> = ({ index }) => (
    <div className={styles.splashScreen} data-testid={`splash-screen-${index}`}>
      <div className={styles.splashLine}></div>
    </div>
  );

  return (
    <div className={styles.container} data-testid="pictures-container">
      {/* gap: 1168 x 32 */}
      <div className={styles.gap}></div>

      {/* filter: 1168 x 48 */}
      <div className={styles.filter}>
        <SelectBox
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          variant="primary"
          theme="light"
          size="medium"
          className={styles.filterSelect}
        />
      </div>

      {/* gap: 1168 x 42 */}
      <div className={styles.gap}></div>

      {/* main: 1168 x auto */}
      <div className={styles.main}>
        {/* 에러 메시지 */}
        {hasError && (
          <div className={styles.errorContainer} data-testid="error-message">
            <p className={styles.errorMessage}>{errorMessage}</p>
            <button onClick={retry} className={styles.retryButton}>
              다시 시도
            </button>
          </div>
        )}

        {/* 로딩 중 스플래시 스크린 */}
        {isLoading && (
          <div className={styles.pictureGrid}>
            {Array.from({ length: 6 }, (_, index) => (
              <SplashScreen key={`splash-${index}`} index={index} />
            ))}
          </div>
        )}

        {/* 사진 그리드 */}
        {!isLoading && (
          <div className={styles.pictureGrid} ref={containerRef}>
            {pictures.map((picture, index) => (
              <div
                key={picture.id}
                className={styles.pictureItem}
                data-testid={`picture-item-${index}`}
              >
                <img
                  src={picture.src}
                  alt={picture.alt}
                  className={styles.pictureImage}
                />
              </div>
            ))}

            {/* 추가 로딩 중 스플래시 스크린 */}
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

export default Pictures;
