import React, {
  forwardRef,
  InputHTMLAttributes,
  useState,
  useCallback,
  useEffect,
} from 'react';
import styles from './styles.module.css';

// ========================================
// Types & Interfaces
// ========================================

export interface SearchbarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Searchbar variant 스타일 */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Searchbar 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 테마 (라이트/다크 모드) */
  theme?: 'light' | 'dark';
  /** 검색 실행 콜백 함수 */
  onSearch?: (value: string) => void;
  /** 검색어 클리어 콜백 함수 */
  onClear?: () => void;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 검색 아이콘 표시 여부 */
  showSearchIcon?: boolean;
  /** 클리어 버튼 표시 여부 */
  showClearButton?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 검색 결과 개수 */
  resultCount?: number;
  /** 최근 검색어 목록 */
  recentSearches?: string[];
  /** 자동완성 제안 목록 */
  suggestions?: string[];
  /** 자동완성 표시 여부 */
  showSuggestions?: boolean;
}

// ========================================
// Searchbar Component
// ========================================

export const Searchbar = forwardRef<HTMLInputElement, SearchbarProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme = 'light',
      onSearch,
      onClear,
      fullWidth = false,
      showSearchIcon = true,
      showClearButton = true,
      loading = false,
      resultCount,
      recentSearches = [],
      suggestions = [],
      showSuggestions = false,
      className,
      disabled,
      value,
      onChange,
      onKeyDown,
      onFocus,
      onBlur,
      placeholder = '검색어를 입력해 주세요.',
      ...props
    },
    ref
  ) => {
    // ========================================
    // State
    // ========================================

    const [inputValue, setInputValue] = useState<string>(
      (value as string) || ''
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // value prop이 변경될 때 내부 상태 동기화
    useEffect(() => {
      setInputValue((value as string) || '');
    }, [value]);

    // ========================================
    // Handlers
    // ========================================

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        onChange?.(e);

        // 실시간 검색 실행
        onSearch?.(newValue);

        // 자동완성 드롭다운 표시 조건
        if (showSuggestions && newValue.length > 0) {
          setShowDropdown(true);
        } else {
          setShowDropdown(false);
        }
      },
      [onChange, onSearch, showSuggestions]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !disabled && !loading) {
          e.preventDefault();
          onSearch?.(inputValue);
          setShowDropdown(false);
        }
        if (e.key === 'Escape') {
          setShowDropdown(false);
        }
        onKeyDown?.(e);
      },
      [inputValue, onSearch, onKeyDown, disabled, loading]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (
          showSuggestions &&
          (inputValue.length > 0 || recentSearches.length > 0)
        ) {
          setShowDropdown(true);
        }
        onFocus?.(e);
      },
      [onFocus, showSuggestions, inputValue, recentSearches]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        // 드롭다운 클릭을 위해 약간의 지연
        setTimeout(() => setShowDropdown(false), 150);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleSearchClick = useCallback(() => {
      if (!disabled && !loading) {
        onSearch?.(inputValue);
        setShowDropdown(false);
      }
    }, [inputValue, onSearch, disabled, loading]);

    const handleClearClick = useCallback(() => {
      setInputValue('');
      setShowDropdown(false);
      onClear?.();
      // Input에 포커스 유지
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    }, [onClear, ref]);

    const handleSuggestionClick = useCallback(
      (suggestion: string) => {
        setInputValue(suggestion);
        setShowDropdown(false);
        onSearch?.(suggestion);
      },
      [onSearch]
    );

    // ========================================
    // CSS Classes
    // ========================================

    const containerClasses = [
      styles.container,
      styles[`container--${variant}`], // variant 스타일 적용
      styles[`container--${size}`], // 사이즈별 너비 적용
      styles[`container--${theme}`], // theme 스타일 적용
      fullWidth && styles['container--full-width'],
      isFocused && styles['container--focused'],
      disabled && styles['container--disabled'],
      loading && styles['container--loading'],
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClasses = [
      styles.wrapper,
      styles[`wrapper--${variant}`],
      styles[`wrapper--${size}`],
      styles[`wrapper--${theme}`],
      isFocused && styles['wrapper--focused'],
      disabled && styles['wrapper--disabled'],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClasses = [
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      styles[`input--${theme}`],
      showSearchIcon && styles['input--with-search-icon'],
      showClearButton && inputValue && styles['input--with-clear-button'],
    ]
      .filter(Boolean)
      .join(' ');

    const dropdownClasses = [
      styles.dropdown,
      styles[`dropdown--${theme}`],
      showDropdown && styles['dropdown--visible'],
    ]
      .filter(Boolean)
      .join(' ');

    // ========================================
    // Filtered Suggestions
    // ========================================

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    const displayItems =
      inputValue.length > 0 ? filteredSuggestions : recentSearches;

    // ========================================
    // Render
    // ========================================

    return (
      <div className={containerClasses}>
        {/* Search Input Wrapper */}
        <div className={wrapperClasses}>
          {/* Search Icon */}
          {showSearchIcon && (
            <button
              type="button"
              className={styles.searchIcon}
              onClick={handleSearchClick}
              disabled={disabled || loading}
              aria-label="검색"
            >
              {loading ? (
                <div className={styles.loadingSpinner} />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            type="text"
            className={inputClasses}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            data-testid="search-input"
            {...props}
          />

          {/* Clear Button */}
          {showClearButton && inputValue && !loading && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearClick}
              disabled={disabled}
              aria-label="검색어 지우기"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4L4 12M4 4l8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Result Count */}
        {resultCount !== undefined && (
          <div className={styles.resultCount}>
            검색 결과 {resultCount.toLocaleString()}개
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && (
          <div className={dropdownClasses}>
            {displayItems.length > 0 ? (
              <ul className={styles.suggestionList}>
                {inputValue.length === 0 && recentSearches.length > 0 && (
                  <li className={styles.suggestionHeader}>최근 검색어</li>
                )}
                {displayItems.map((item, index) => (
                  <li key={index} className={styles.suggestionItem}>
                    <button
                      type="button"
                      className={styles.suggestionButton}
                      onClick={() => handleSuggestionClick(item)}
                    >
                      <span className={styles.suggestionText}>{item}</span>
                      {inputValue.length === 0 && (
                        <span className={styles.suggestionIcon}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 1v14M1 8h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noResults}>검색 결과가 없습니다</div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Searchbar.displayName = 'Searchbar';

// ========================================
// Export
// ========================================

export default Searchbar;
