import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// ========================================
// SelectBox Component Types
// ========================================

export interface SelectOption {
  /**
   * 옵션의 고유 값
   */
  value: string;

  /**
   * 화면에 표시될 라벨
   */
  label: string;

  /**
   * 옵션 비활성화 여부
   */
  disabled?: boolean;
}

export interface SelectBoxProps {
  /**
   * 선택 가능한 옵션들
   */
  options: SelectOption[];

  /**
   * 현재 선택된 값
   */
  value?: string;

  /**
   * 기본 선택된 값
   */
  defaultValue?: string;

  /**
   * 값 변경 시 호출되는 콜백
   */
  onChange?: (value: string) => void;

  /**
   * 셀렉트박스의 시각적 스타일 variant
   * - primary: 주요 셀렉트박스 (흰색 배경, 회색 테두리)
   * - secondary: 보조 셀렉트박스 (회색 배경)
   * - tertiary: 비활성화된 상태 (연한 회색)
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * 셀렉트박스 크기
   * - small: 80px 너비
   * - medium: 120px 너비 (기본값)
   * - large: 200px 너비
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 테마 모드
   * - light: 라이트 모드 (기본값)
   * - dark: 다크 모드
   */
  theme?: 'light' | 'dark';

  /**
   * 플레이스홀더 텍스트
   */
  placeholder?: string;

  /**
   * 비활성화 상태
   */
  disabled?: boolean;

  /**
   * 에러 상태
   */
  error?: boolean;

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;

  /**
   * 추가 클래스명
   */
  className?: string;

  /**
   * 드롭다운 최대 높이
   */
  maxHeight?: number;

  /**
   * 검색 기능 활성화
   */
  searchable?: boolean;

  /**
   * 검색 플레이스홀더
   */
  searchPlaceholder?: string;
}

// ========================================
// SelectBox Component
// ========================================

export const SelectBox: React.FC<SelectBoxProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  variant = 'primary',
  size = 'medium',
  theme = 'light',
  placeholder = '선택하세요',
  disabled = false,
  error = false,
  fullWidth = false,
  className,
  maxHeight = 200,
  searchable = false,
  searchPlaceholder = '검색...',
}) => {
  // 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || ''
  );
  const [searchTerm, setSearchTerm] = useState('');

  // 참조
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // 선택된 옵션 찾기
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  // 필터링된 옵션들
  const filteredOptions =
    searchable && searchTerm
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 검색 입력 포커스
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // 키보드 이벤트 처리
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          // 다음 옵션으로 이동 로직 (추후 구현 가능)
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        // 이전 옵션으로 이동 로직 (추후 구현 가능)
        break;
    }
  };

  // 옵션 선택 처리
  const handleOptionSelect = (optionValue: string) => {
    if (disabled) return;

    const option = options.find((opt) => opt.value === optionValue);
    if (option && !option.disabled) {
      setSelectedValue(optionValue);
      onChange?.(optionValue);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // 토글 처리
  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  // 클래스명 조합
  const selectClasses = [
    styles.selectBox,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`theme-${theme}`],
    isOpen && styles.open,
    disabled && styles.disabled,
    error && styles.error,
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const dropdownClasses = [
    styles.dropdown,
    styles[`theme-${theme}`],
    isOpen && styles.open,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={selectRef}
      className={selectClasses}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-disabled={disabled}
    >
      {/* 선택된 값 표시 영역 */}
      <div
        className={styles.trigger}
        onClick={handleToggle}
        role="button"
        tabIndex={-1}
      >
        <span className={styles.value}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span
          className={`${styles.arrow} ${
            isOpen ? styles.arrowUp : styles.arrowDown
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
          </svg>
        </span>
      </div>

      {/* 드롭다운 옵션 목록 */}
      {isOpen && (
        <div
          className={dropdownClasses}
          style={{ maxHeight: `${maxHeight}px` }}
          role="listbox"
        >
          {/* 검색 입력 */}
          {searchable && (
            <div className={styles.searchContainer}>
              <input
                ref={searchInputRef}
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* 옵션 목록 */}
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${
                    option.value === selectedValue ? styles.selected : ''
                  } ${option.disabled ? styles.optionDisabled : ''}`}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={option.value === selectedValue}
                  aria-disabled={option.disabled}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>
                {searchTerm ? '검색 결과가 없습니다' : '옵션이 없습니다'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// Export Default
// ========================================

export default SelectBox;
