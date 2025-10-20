'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

// ========================================
// Types & Interfaces
// ========================================

interface DogApiResponse {
  message: string[];
  status: string;
}

interface DogPicture {
  id: number;
  src: string;
  alt: string;
}

// ========================================
// API Functions
// ========================================

const fetchDogs = async (count: number = 6): Promise<DogPicture[]> => {
  const response = await fetch(
    `https://dog.ceo/api/breeds/image/random/${count}`,
    {
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `강아지 사진을 불러오는데 실패했습니다. (${response.status})`
    );
  }

  const data: DogApiResponse = await response.json();

  if (!data.message || !Array.isArray(data.message)) {
    throw new Error('잘못된 API 응답 형식입니다.');
  }

  return data.message.map((url, index) => ({
    id: Date.now() + index, // 고유 ID 생성
    src: url,
    alt: `강아지 사진 ${index + 1}`,
  }));
};

// ========================================
// Custom Hooks
// ========================================

export const useDogPicturesBinding = () => {
  // ========================================
  // State
  // ========================================

  const [pictures, setPictures] = useState<DogPicture[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ========================================
  // React Query
  // ========================================

  // 초기 데이터 로드
  const {
    data: initialData,
    isLoading: isInitialLoading,
    error: initialError,
    refetch: refetchInitial,
  } = useQuery({
    queryKey: ['dogs', 'initial'],
    queryFn: () => fetchDogs(6),
    staleTime: 5 * 60 * 1000, // 5분
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });

  // ========================================
  // Effects
  // ========================================

  // 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
      setPictures(initialData);
      setHasError(false);
      setErrorMessage('');
    }
  }, [initialData]);

  // 초기 에러 처리
  useEffect(() => {
    if (initialError) {
      setHasError(true);
      setErrorMessage('강아지 사진을 불러오는데 실패했습니다.');
    }
  }, [initialError]);

  // ========================================
  // Functions
  // ========================================

  // 추가 데이터 로드 함수
  const loadMorePictures = useCallback(async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    setHasError(false);
    setErrorMessage('');

    try {
      const newPictures = await fetchDogs(6);
      setPictures((prev) => [...prev, ...newPictures]);
    } catch {
      setHasError(true);
      setErrorMessage('추가 강아지 사진을 불러오는데 실패했습니다.');
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore]);

  // ========================================
  // Intersection Observer
  // ========================================

  // 무한스크롤 관찰자 설정
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isLoadingMore && !isInitialLoading) {
          // 마지막 2개의 사진이 보일 때 추가 로드
          const currentPictures = containerRef.current?.querySelectorAll(
            '[data-testid^="picture-item-"]'
          );
          if (currentPictures && currentPictures.length >= 4) {
            loadMorePictures();
          }
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    // 마지막 2개 사진을 관찰 대상으로 설정
    const pictureElements = containerRef.current.querySelectorAll(
      '[data-testid^="picture-item-"]'
    );
    if (pictureElements.length >= 2) {
      const lastTwoElements = Array.from(pictureElements).slice(-2);
      lastTwoElements.forEach((element) => observer.observe(element));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pictures, isLoadingMore, isInitialLoading, loadMorePictures]);

  // 무한스크롤 관찰자 업데이트
  useEffect(() => {
    if (!containerRef.current || !observerRef.current) return;

    const pictureElements = containerRef.current.querySelectorAll(
      '[data-testid^="picture-item-"]'
    );
    if (pictureElements.length >= 2) {
      const lastTwoElements = Array.from(pictureElements).slice(-2);
      lastTwoElements.forEach((element) =>
        observerRef.current?.observe(element)
      );
    }
  }, [pictures]);

  // 에러 재시도 함수
  const retry = useCallback(() => {
    setHasError(false);
    setErrorMessage('');
    if (pictures.length === 0) {
      refetchInitial();
    } else {
      loadMorePictures();
    }
  }, [pictures.length, refetchInitial, loadMorePictures]);

  return {
    pictures,
    isLoading: isInitialLoading,
    isLoadingMore,
    hasError,
    errorMessage,
    containerRef,
    retry,
    loadMorePictures,
  };
};
