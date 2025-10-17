'use client';

import React, { useState } from 'react';

import { Button } from '@/commons/components/button';
import { Pagination } from '@/commons/components/pagination';
import { Searchbar } from '@/commons/components/searchbar';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import { EmotionType, getEmotionLabel } from '@/commons/constants/enum';

import { useNewDiaryModal } from './hooks/index.link.modal.hook';
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
  // Mock Data
  // ========================================

  const mockDiaries: DiaryEntry[] = [
    // 첫 번째 행
    {
      id: '1',
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      emotion: EmotionType.SAD,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '2',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '3',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '4',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-happy-m.png',
    },
    // 두 번째 행
    {
      id: '5',
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      emotion: EmotionType.ETC,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '6',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '7',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '8',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-happy-m.png',
    },
    // 세 번째 행
    {
      id: '9',
      title: '타이틀 영역 입니다. 한줄까지만 노출 됩니다.',
      emotion: EmotionType.SAD,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '10',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '11',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '12',
      title: '타이틀 영역 입니다.',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 12',
      imageUrl: '/images/emotion-happy-m.png',
    },
    // 네 번째 행 (페이지네이션 테스트용)
    {
      id: '13',
      title: '네 번째 행 첫 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 13',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '14',
      title: '네 번째 행 두 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 13',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '15',
      title: '네 번째 행 세 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 13',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '16',
      title: '네 번째 행 네 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 13',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    // 다섯 번째 행 (2페이지용)
    {
      id: '17',
      title: '다섯 번째 행 첫 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 14',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '18',
      title: '다섯 번째 행 두 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 14',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '19',
      title: '다섯 번째 행 세 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 14',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '20',
      title: '다섯 번째 행 네 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 14',
      imageUrl: '/images/emotion-angry-m.png',
    },
    // 여섯 번째 행 (2페이지용)
    {
      id: '21',
      title: '여섯 번째 행 첫 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 15',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '22',
      title: '여섯 번째 행 두 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 15',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '23',
      title: '여섯 번째 행 세 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 15',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '24',
      title: '여섯 번째 행 네 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 15',
      imageUrl: '/images/emotion-sad-m.png',
    },
    // 일곱 번째 행 (3페이지용)
    {
      id: '25',
      title: '일곱 번째 행 첫 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 16',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '26',
      title: '일곱 번째 행 두 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 16',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '27',
      title: '일곱 번째 행 세 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 16',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '28',
      title: '일곱 번째 행 네 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 16',
      imageUrl: '/images/emotion-happy-m.png',
    },
    // 여덟 번째 행 (3페이지용)
    {
      id: '29',
      title: '여덟 번째 행 첫 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 17',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '30',
      title: '여덟 번째 행 두 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 17',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '31',
      title: '여덟 번째 행 세 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 17',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '32',
      title: '여덟 번째 행 네 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 17',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    // 아홉 번째 행 (3페이지용)
    {
      id: '33',
      title: '아홉 번째 행 첫 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 18',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '34',
      title: '아홉 번째 행 두 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 18',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '35',
      title: '아홉 번째 행 세 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 18',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '36',
      title: '아홉 번째 행 네 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 18',
      imageUrl: '/images/emotion-angry-m.png',
    },
    // 4페이지 시작
    {
      id: '37',
      title: '4페이지 첫 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 19',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '38',
      title: '4페이지 두 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 19',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '39',
      title: '4페이지 세 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 19',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '40',
      title: '4페이지 네 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 19',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '41',
      title: '4페이지 다섯 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 20',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '42',
      title: '4페이지 여섯 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 20',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '43',
      title: '4페이지 일곱 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 20',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '44',
      title: '4페이지 여덟 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 20',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '45',
      title: '4페이지 아홉 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 21',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '46',
      title: '4페이지 열 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 21',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '47',
      title: '4페이지 열한 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 21',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '48',
      title: '4페이지 열두 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 21',
      imageUrl: '/images/emotion-etc-m.png',
    },
    // 5페이지 시작
    {
      id: '49',
      title: '5페이지 첫 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 22',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '50',
      title: '5페이지 두 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 22',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '51',
      title: '5페이지 세 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 22',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '52',
      title: '5페이지 네 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 22',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '53',
      title: '5페이지 다섯 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 23',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '54',
      title: '5페이지 여섯 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 23',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '55',
      title: '5페이지 일곱 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 23',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '56',
      title: '5페이지 여덟 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 23',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '57',
      title: '5페이지 아홉 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 24',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '58',
      title: '5페이지 열 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 24',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '59',
      title: '5페이지 열한 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 24',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '60',
      title: '5페이지 열두 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 24',
      imageUrl: '/images/emotion-sad-m.png',
    },
    // 6페이지 시작 (5페이지 초과 테스트용)
    {
      id: '61',
      title: '6페이지 첫 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 25',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '62',
      title: '6페이지 두 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 25',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '63',
      title: '6페이지 세 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 25',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '64',
      title: '6페이지 네 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 25',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '65',
      title: '6페이지 다섯 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 26',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '66',
      title: '6페이지 여섯 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 26',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '67',
      title: '6페이지 일곱 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 26',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '68',
      title: '6페이지 여덟 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 26',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '69',
      title: '6페이지 아홉 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 27',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '70',
      title: '6페이지 열 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 27',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '71',
      title: '6페이지 열한 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 27',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '72',
      title: '6페이지 열두 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 27',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    // 7페이지 시작
    {
      id: '73',
      title: '7페이지 첫 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 28',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '74',
      title: '7페이지 두 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 28',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '75',
      title: '7페이지 세 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 28',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '76',
      title: '7페이지 네 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 28',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '77',
      title: '7페이지 다섯 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 29',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '78',
      title: '7페이지 여섯 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 29',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '79',
      title: '7페이지 일곱 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 29',
      imageUrl: '/images/emotion-happy-m.png',
    },
    {
      id: '80',
      title: '7페이지 여덟 번째 일기',
      emotion: EmotionType.SAD,
      date: '2024. 03. 29',
      imageUrl: '/images/emotion-sad-m.png',
    },
    {
      id: '81',
      title: '7페이지 아홉 번째 일기',
      emotion: EmotionType.ANGRY,
      date: '2024. 03. 30',
      imageUrl: '/images/emotion-angry-m.png',
    },
    {
      id: '82',
      title: '7페이지 열 번째 일기',
      emotion: EmotionType.SURPRISE,
      date: '2024. 03. 30',
      imageUrl: '/images/emotion-surprise-m.png',
    },
    {
      id: '83',
      title: '7페이지 열한 번째 일기',
      emotion: EmotionType.ETC,
      date: '2024. 03. 30',
      imageUrl: '/images/emotion-etc-m.png',
    },
    {
      id: '84',
      title: '7페이지 열두 번째 일기',
      emotion: EmotionType.HAPPY,
      date: '2024. 03. 30',
      imageUrl: '/images/emotion-happy-m.png',
    },
  ];

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

  const handleDeleteDiary = (id: string): void => {
    console.log('Delete diary:', id);
    // 일기 삭제 로직 추가 예정
  };

  // ========================================
  // Filtered Data
  // ========================================

  const filteredDiaries = mockDiaries.filter((diary) => {
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
      <div key={diary.id} className={styles.diaryCard}>
        <div className={styles.cardImage}>
          <img
            src={diary.imageUrl}
            alt={diary.title}
            className={styles.cardImageImg}
          />
          <button
            className={styles.deleteButton}
            onClick={() => handleDeleteDiary(diary.id)}
            aria-label="일기 삭제"
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
            >
              {emotionLabel}
            </span>
            <span className={styles.dateText}>{diary.date}</span>
          </div>
          <div className={styles.cardTitle}>{diary.title}</div>
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
          <div className={styles.emptyState}>
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
