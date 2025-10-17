import React from 'react';
import styles from './styles.module.css';

// ========================================
// Pagination Component Types
// ========================================

export interface PaginationProps {
  /**
   * 현재 페이지 번호 (1부터 시작)
   */
  currentPage: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 페이지 변경 시 호출되는 콜백
   */
  onPageChange: (page: number) => void;

  /**
   * 시각적 스타일 variant
   * - primary: 기본 스타일 (회색 선택, 흰색 비선택)
   * - secondary: 보조 스타일
   * - tertiary: 비활성화된 상태
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * 컴포넌트 크기
   * - small: 작은 크기
   * - medium: 중간 크기 (기본값)
   * - large: 큰 크기
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 한 번에 표시할 페이지 번호 개수
   */
  maxVisiblePages?: number;

  /**
   * 이전/다음 버튼 표시 여부
   */
  showArrows?: boolean;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 추가 클래스명
   */
  className?: string;
}

// ========================================
// Pagination Component
// ========================================

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  maxVisiblePages = 5,
  showArrows = true,
  disabled = false,
  className,
}) => {
  // 페이지 범위 계산
  const getVisiblePages = (): number[] => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 끝 페이지가 총 페이지보다 작으면 시작 페이지 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    onPageChange(page);
  };

  // 이전 페이지로 이동
  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // 클래스명 조합
  const paginationClasses = [
    styles.pagination,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const visiblePages = getVisiblePages();
  const canGoPrevious = currentPage > 1 && !disabled;
  const canGoNext = currentPage < totalPages && !disabled;

  return (
    <div className={paginationClasses}>
      {/* 이전 버튼 */}
      {showArrows && (
        <button
          className={`${styles.arrowButton} ${styles.previousButton} ${
            !canGoPrevious ? styles.arrowDisabled : ''
          }`}
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          aria-label="이전 페이지"
        >
          <img
            src={
              canGoPrevious
                ? '/icons/leftenable_outline_light_m.svg'
                : '/icons/leftdisabled_outline_light_m.svg'
            }
            alt={canGoPrevious ? '이전' : '이전(비활성)'}
            className={styles.arrowIcon}
            onError={(e) => {
              console.error('Arrow icon failed to load:', e.currentTarget.src);
            }}
          />
        </button>
      )}

      {/* 페이지 번호들 */}
      <div className={styles.pageNumbers}>
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.currentPage : styles.otherPage
            }`}
            onClick={() => handlePageChange(page)}
            disabled={disabled}
            aria-label={`페이지 ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 버튼 */}
      {showArrows && (
        <button
          className={`${styles.arrowButton} ${styles.nextButton} ${
            !canGoNext ? styles.arrowDisabled : ''
          }`}
          onClick={handleNext}
          disabled={!canGoNext}
          aria-label="다음 페이지"
        >
          <img
            src={
              canGoNext
                ? '/icons/rightenable_outline_light_m.svg'
                : '/icons/rightdisabled_outline_light_m.svg'
            }
            alt={canGoNext ? '다음' : '다음(비활성)'}
            className={styles.arrowIcon}
            onError={(e) => {
              console.error('Arrow icon failed to load:', e.currentTarget.src);
            }}
          />
        </button>
      )}
    </div>
  );
};

// ========================================
// Pagination Info Component
// ========================================

export interface PaginationInfoProps {
  /**
   * 현재 페이지 번호
   */
  currentPage: number;

  /**
   * 전체 페이지 수
   */
  totalPages: number;

  /**
   * 페이지당 항목 수
   */
  itemsPerPage: number;

  /**
   * 전체 항목 수
   */
  totalItems: number;

  /**
   * 추가 클래스명
   */
  className?: string;
}

export const PaginationInfo: React.FC<PaginationInfoProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  className,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`${styles.paginationInfo} ${className || ''}`}>
      <span>
        {totalItems > 0
          ? `${startItem}-${endItem} / 총 ${totalItems}개`
          : '항목이 없습니다'}
      </span>
    </div>
  );
};

// ========================================
// Export Default
// ========================================

export default Pagination;
