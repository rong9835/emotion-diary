'use client';

import { useState, useMemo } from 'react';
import { EmotionType, getEmotionLabel } from '@/commons/constants/enum';
import { DiaryEntry } from '../index';

export interface FilterOption {
  value: string;
  label: string;
}

export interface UseFilterReturn {
  /**
   * 현재 선택된 필터 값
   */
  filterValue: string;

  /**
   * 필터 옵션 배열
   */
  filterOptions: FilterOption[];

  /**
   * 필터링된 일기 데이터 배열
   */
  filteredDiaries: DiaryEntry[];

  /**
   * 필터 변경 핸들러
   */
  handleFilterChange: (value: string) => void;

  /**
   * 필터 초기화 핸들러
   */
  resetFilter: () => void;
}

// ========================================
// Constants
// ========================================

/**
 * 필터 옵션 상수
 */
const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: '전체' },
  { value: EmotionType.HAPPY, label: getEmotionLabel(EmotionType.HAPPY) }, // 행복해요
  { value: EmotionType.SAD, label: getEmotionLabel(EmotionType.SAD) }, // 슬퍼요
  {
    value: EmotionType.SURPRISE,
    label: getEmotionLabel(EmotionType.SURPRISE),
  }, // 놀랐어요
  { value: EmotionType.ANGRY, label: getEmotionLabel(EmotionType.ANGRY) }, // 화나요
  { value: EmotionType.ETC, label: getEmotionLabel(EmotionType.ETC) }, // 기타
];

// ========================================
// Filter Hook
// ========================================

/**
 * 일기 필터링 기능을 제공하는 hook
 *
 * @description
 * 감정별로 일기를 필터링할 수 있는 기능을 제공합니다.
 * - 전체: 모든 일기 표시
 * - 행복해요, 슬퍼요, 놀랐어요, 화나요, 기타: 해당 감정의 일기만 표시
 *
 * @param {DiaryEntry[]} diaries - 필터링할 일기 데이터 배열
 * @returns {object} 필터 관련 상태와 핸들러
 *
 * @example
 * ```tsx
 * const { filterValue, filterOptions, filteredDiaries, handleFilterChange } = useFilter(diaries);
 *
 * return (
 *   <SelectBox options={filterOptions} value={filterValue} onChange={handleFilterChange} />
 * );
 * ```
 */
export const useFilter = (diaries: DiaryEntry[]): UseFilterReturn => {
  // ========================================
  // State
  // ========================================

  const [filterValue, setFilterValue] = useState<string>('all');

  // ========================================
  // Filter Options
  // ========================================

  const filterOptions: FilterOption[] = useMemo(() => {
    return FILTER_OPTIONS;
  }, []);

  // ========================================
  // Filtered Data
  // ========================================

  const filteredDiaries = useMemo(() => {
    if (filterValue === 'all') {
      return diaries;
    }

    return diaries.filter((diary) => {
      return diary.emotion === filterValue;
    });
  }, [diaries, filterValue]);

  // ========================================
  // Handlers
  // ========================================

  const handleFilterChange = (value: string): void => {
    setFilterValue(value);
  };

  const resetFilter = (): void => {
    setFilterValue('all');
  };

  // ========================================
  // Return
  // ========================================

  return {
    filterValue,
    filterOptions,
    filteredDiaries,
    handleFilterChange,
    resetFilter,
  };
};

// ========================================
// Export
// ========================================

export default useFilter;
