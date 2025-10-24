import { useState, useMemo } from 'react';
import { SelectOption } from '@/commons/components/selectbox';

// ========================================
// Types & Interfaces
// ========================================

export type PictureSizeFilter = 'basic' | 'landscape' | 'portrait';

export interface PictureSize {
  width: number;
  height: number;
}

export interface UsePicturesFilterReturn {
  /**
   * 필터 옵션들
   */
  filterOptions: SelectOption[];

  /**
   * 현재 선택된 필터 값
   */
  selectedFilter: PictureSizeFilter;

  /**
   * 현재 필터에 따른 사진 크기
   */
  pictureSize: PictureSize;

  /**
   * 필터 변경 핸들러
   */
  handleFilterChange: (value: string) => void;

  /**
   * 필터에 따른 CSS 클래스명
   */
  filterClassName: string;
}

// ========================================
// Constants
// ========================================

const PICTURE_SIZES: Record<PictureSizeFilter, PictureSize> = {
  basic: { width: 640, height: 640 },
  landscape: { width: 640, height: 480 },
  portrait: { width: 480, height: 640 },
};

const FILTER_OPTIONS: SelectOption[] = [
  { value: 'basic', label: '기본' },
  { value: 'landscape', label: '가로형' },
  { value: 'portrait', label: '세로형' },
];

// ========================================
// Custom Hook
// ========================================

/**
 * 강아지 사진 필터 기능을 제공하는 훅
 *
 * @description
 * 사진의 크기를 변경할 수 있는 필터 기능을 제공합니다.
 * - 기본: 640x640
 * - 가로형: 640x480
 * - 세로형: 480x640
 *
 * @returns {UsePicturesFilterReturn} 필터 관련 상태와 핸들러
 *
 * @example
 * ```tsx
 * const { filterOptions, selectedFilter, pictureSize, handleFilterChange, filterClassName } = usePicturesFilter();
 *
 * return (
 *   <div>
 *     <SelectBox options={filterOptions} value={selectedFilter} onChange={handleFilterChange} />
 *     <div className={filterClassName}>
 *       {pictures.map(picture => (
 *         <img key={picture.id} src={picture.src} alt={picture.alt} />
 *       ))}
 *     </div>
 *   </div>
 * );
 * ```
 */
export const usePicturesFilter = (): UsePicturesFilterReturn => {
  // ========================================
  // State
  // ========================================

  const [selectedFilter, setSelectedFilter] =
    useState<PictureSizeFilter>('basic');

  // ========================================
  // Computed Values
  // ========================================

  const pictureSize = useMemo<PictureSize>(
    () => PICTURE_SIZES[selectedFilter],
    [selectedFilter]
  );

  const filterClassName = useMemo<string>(
    () => `filter-${selectedFilter}`,
    [selectedFilter]
  );

  // ========================================
  // Handlers
  // ========================================

  const handleFilterChange = (value: string): void => {
    if (
      value === 'basic' ||
      value === 'landscape' ||
      value === 'portrait'
    ) {
      setSelectedFilter(value);
    }
  };

  // ========================================
  // Return
  // ========================================

  return {
    filterOptions: FILTER_OPTIONS,
    selectedFilter,
    pictureSize,
    handleFilterChange,
    filterClassName,
  };
};
