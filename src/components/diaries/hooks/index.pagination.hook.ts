import { useState, useMemo, useCallback } from 'react';

export interface PaginationHookProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export interface PaginationHookReturn<T> {
  currentPage: number;
  totalPages: number;
  paginatedData: T[];
  handlePageChange: (page: number) => void;
  paginationInfo: {
    startIndex: number;
    endIndex: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const usePagination = <T>({
  data,
  itemsPerPage = 12,
  initialPage = 1,
}: PaginationHookProps<T>): PaginationHookReturn<T> => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(data.length / itemsPerPage));
  }, [data.length, itemsPerPage]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const paginationInfo = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    const totalItems = data.length;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    return {
      startIndex,
      endIndex,
      totalItems,
      hasNextPage,
      hasPreviousPage,
    };
  }, [currentPage, itemsPerPage, data.length, totalPages]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  useMemo(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedData,
    handlePageChange,
    paginationInfo,
  };
};

export default usePagination;
