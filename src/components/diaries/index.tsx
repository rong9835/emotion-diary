'use client';

import React from 'react';

import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { Searchbar } from '@/commons/components/searchbar';
import { SelectBox } from '@/commons/components/selectbox';
import { EmotionType, getEmotionLabel } from '@/commons/constants/enum';
import { useAuth } from '@/commons/providers/auth/auth.provider';

import { useNewDiaryModal } from './hooks/index.link.modal.hook';
import { useDiariesBinding } from './hooks/index.binding.hook';
import { useDiaryRouting } from './hooks/index.link.routing.hook';
import { useSearch } from './hooks/index.search.hook';
import { useFilter } from './hooks/index.filter.hook';
import { usePagination } from './hooks/index.pagination.hook';
import { useDeleteDiary } from './hooks/index.delete.hook';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface DiariesProps {
  className?: string;
}

export interface DiaryEntry {
  id: string;
  title: string;
  emotion: EmotionType;
  date: string;
  imageUrl: string;
}

// ========================================
// Diaries Component
// ========================================

export const Diaries: React.FC<DiariesProps> = ({ className }) => {
  // ========================================
  // State
  // ========================================

  const itemsPerPage = 12;

  // ========================================
  // Modal Hook
  // ========================================

  const { openNewDiaryModal } = useNewDiaryModal();

  // ========================================
  // Data Binding Hook
  // ========================================

  const localStorageDiaries = useDiariesBinding();

  // ========================================
  // Search Hook
  // ========================================

  const {
    searchValue,
    handleSearch,
    filteredDiaries: searchedDiaries,
  } = useSearch(localStorageDiaries);

  // ========================================
  // Filter Hook
  // ========================================

  const { filterValue, filterOptions, filteredDiaries, handleFilterChange } =
    useFilter(searchedDiaries);

  // ========================================
  // Pagination Hook
  // ========================================

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedDiaries,
    handlePageChange,
  } = usePagination({
    data: filteredDiaries,
    itemsPerPage,
    initialPage: 1,
  });

  // ========================================
  // Routing Hook
  // ========================================

  const { navigateToDiaryDetail } = useDiaryRouting();

  // ========================================
  // Delete Hook
  // ========================================

  const { handleDeleteDiary } = useDeleteDiary();

  // ========================================
  // Auth Hook
  // ========================================

  const { isLoggedIn } = useAuth();

  // ========================================
  // Handlers
  // ========================================

  const handleNewDiary = (): void => {
    openNewDiaryModal();
  };

  const handleDeleteDiaryClick = (
    event: React.MouseEvent,
    id: string
  ): void => {
    event.stopPropagation(); // 이벤트 버블링 방지
    handleDeleteDiary(id);
  };

  const handleCardClick = (id: string): void => {
    navigateToDiaryDetail(id);
  };

  // ========================================
  // Render Diary Card
  // ========================================

  const renderDiaryCard = (diary: DiaryEntry): JSX.Element => {
    const emotionLabel = getEmotionLabel(diary.emotion);

    return (
      <div
        key={diary.id}
        className={styles.diaryCard}
        data-testid={`diary-card-${diary.id}`}
        onClick={() => handleCardClick(diary.id)}
      >
        <div className={styles.cardImage}>
          <img
            src={diary.imageUrl}
            alt={diary.title}
            className={styles.cardImageImg}
            data-testid="emotion-image"
          />
          {isLoggedIn && (
            <button
              className={styles.deleteButton}
              onClick={(e) => handleDeleteDiaryClick(e, diary.id)}
              aria-label="일기 삭제"
              data-testid="delete-button"
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
          )}
        </div>
        <div className={styles.cardContent}>
          <div className={styles.cardHeader}>
            <span
              className={`${styles.emotionText} ${
                styles[`emotion${diary.emotion}`]
              }`}
              data-testid="emotion-text"
            >
              {emotionLabel}
            </span>
            <span className={styles.dateText} data-testid="diary-date">
              {diary.date}
            </span>
          </div>
          <div className={styles.cardTitle} data-testid="diary-title">
            {diary.title}
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // CSS Classes
  // ========================================

  const containerClasses: string = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  // ========================================
  // Render
  // ========================================

  return (
    <div className={containerClasses} data-testid="diaries-page">
      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Search Section - Desktop */}
      <div className={styles.search}>
        {/* Filter SelectBox */}
        <div className={styles.searchFilter}>
          <SelectBox
            options={filterOptions}
            value={filterValue}
            onChange={handleFilterChange}
            variant="primary"
            size="medium"
            theme="light"
            className={styles.filterSelectBox}
            data-testid="emotion-filter-select"
          />
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <Searchbar
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onSearch={handleSearch}
            variant="primary"
            size="medium"
            theme="light"
            className={styles.searchInput}
          />
        </div>

        {/* New Diary Button */}
        <div className={styles.searchButton}>
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleNewDiary}
            className={styles.newDiaryButton}
            data-testid="diary-write-button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '4px' }}
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            일기쓰기
          </Button>
        </div>
      </div>

      {/* Search Section - Mobile */}
      <div className={styles.searchMobile}>
        {/* Search Bar Row */}
        <div className={styles.searchMobileRow}>
          <Searchbar
            placeholder="검색어를 입력해 주세요."
            value={searchValue}
            onSearch={handleSearch}
            variant="primary"
            size="medium"
            theme="light"
            className={styles.searchInputMobile}
          />
        </div>

        {/* Filter & Button Row */}
        <div className={styles.searchMobileRow}>
          <SelectBox
            options={filterOptions}
            value={filterValue}
            onChange={handleFilterChange}
            variant="primary"
            size="medium"
            theme="light"
            className={styles.filterSelectBoxMobile}
            data-testid="emotion-filter-select-mobile"
          />
          <Button
            variant="primary"
            size="medium"
            theme="light"
            onClick={handleNewDiary}
            className={styles.newDiaryButtonMobile}
            data-testid="diary-write-button-mobile"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '4px' }}
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            일기쓰기
          </Button>
        </div>
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Main Content */}
      <div className={styles.main}>
        {paginatedDiaries.length > 0 ? (
          <div className={styles.diaryGrid}>
            {paginatedDiaries.map(renderDiaryCard)}
          </div>
        ) : (
          <div className={styles.emptyState} data-testid="empty-state">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          variant="primary"
          size="medium"
        />
      </div>

      {/* Gap */}
      <div className={styles.gap}></div>
    </div>
  );
};

// ========================================
// Export
// ========================================

export default Diaries;
