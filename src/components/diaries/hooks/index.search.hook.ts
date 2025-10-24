'use client';

import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { DiaryCardData } from './index.binding.hook';

export interface UseSearchReturn {
  searchValue: string;
  handleSearch: (value: string) => void;
  clearSearch: () => void;
  filteredDiaries: DiaryCardData[];
}

export const useSearch = (diaries: DiaryCardData[]): UseSearchReturn => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 디바운싱 로직
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 300); // 300ms 디바운싱

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [searchValue]);

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
    console.log('Search value changed:', value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchValue('');
    setDebouncedSearchValue('');
    console.log('Search cleared');
  }, []);

  const filteredDiaries = useMemo(() => {
    if (debouncedSearchValue === '') {
      return diaries;
    }
    return diaries.filter((diary) =>
      diary.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [diaries, debouncedSearchValue]);

  return {
    searchValue,
    handleSearch,
    clearSearch,
    filteredDiaries,
  };
};

export default useSearch;
