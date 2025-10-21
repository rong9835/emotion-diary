'use client';

import React, { useState } from 'react';

import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { Searchbar } from '@/commons/components/searchbar';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import { EmotionType, getEmotionLabel } from '@/commons/constants/enum';

import { useNewDiaryModal } from './hooks/index.link.modal.hook';
import { useDiariesBinding } from './hooks/index.binding.hook';
import { useDiaryRouting } from './hooks/index.link.routing.hook';
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

  const [filterValue, setFilterValue] = useState<string>('all');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
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
  // Routing Hook
  // ========================================

  const { navigateToDiaryDetail } = useDiaryRouting();

  // ========================================
  // Filter Options
  // ========================================

  const filterOptions: SelectOption[] = [
    { value: 'all', label: '전체' },
    { value: 'happy', label: '기쁨' },
    { value: 'sad', label: '슬픔' },
    { value: 'angry', label: '화남' },
    { value: 'surprise', label: '놀람' },
    { value: 'etc', label: '기타' },
  ];

  // ========================================
  // Handlers
  // ========================================

  const handleFilterChange = (value: string): void => {
    setFilterValue(value);
    console.log('Filter changed:', value);
  };

  const handleSearch = (value: string): void => {
    setSearchValue(value);
    console.log('Search:', value);
  };

  const handleNewDiary = (): void => {
    openNewDiaryModal();
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    console.log('Page change:', page);
  };

  const handleDeleteDiary = (event: React.MouseEvent, id: string): void => {
    event.stopPropagation(); // 이벤트 버블링 방지
    console.log('Delete diary:', id);
    // 일기 삭제 로직 추가 예정
  };

  const handleCardClick = (id: string): void => {
    navigateToDiaryDetail(id);
  };

  // ========================================
  // Filtered Data
  // ========================================

  const filteredDiaries = localStorageDiaries.filter((diary) => {
    const matchesFilter =
      filterValue === 'all' || diary.emotion.toLowerCase() === filterValue;
    const matchesSearch =
      searchValue === '' ||
      diary.title.toLowerCase().includes(searchValue.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDiaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDiaries = filteredDiaries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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
          <button
            className={styles.deleteButton}
            onClick={(e) => handleDeleteDiary(e, diary.id)}
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

      {/* Search Section */}
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
          />
        </div>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <Searchbar
            placeholder="검색어를 입력해 주세요."
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
