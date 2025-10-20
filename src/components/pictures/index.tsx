'use client';

import React, { useState } from 'react';
import { SelectBox, SelectOption } from '@/commons/components/selectbox';
import styles from './styles.module.css';

const Pictures: React.FC = () => {
  // Mock 데이터 - 강아지 사진 목록
  const mockPictures = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    src: '/images/dog-1.jpg', // 모든 사진을 동일한 Mock 사진으로 통일
    alt: `강아지 사진 ${index + 1}`,
  }));

  // 필터 옵션
  const filterOptions: SelectOption[] = [
    { value: 'all', label: '전체' },
    { value: 'recent', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'favorite', label: '즐겨찾기' },
  ];

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
  };

  return (
    <div className={styles.container}>
      {/* gap: 1168 x 32 */}
      <div className={styles.gap}></div>

      {/* filter: 1168 x 48 */}
      <div className={styles.filter}>
        <SelectBox
          options={filterOptions}
          value={selectedFilter}
          onChange={handleFilterChange}
          variant="primary"
          theme="light"
          size="medium"
          className={styles.filterSelect}
        />
      </div>

      {/* gap: 1168 x 42 */}
      <div className={styles.gap}></div>

      {/* main: 1168 x auto */}
      <div className={styles.main}>
        <div className={styles.pictureGrid}>
          {mockPictures.map((picture) => (
            <div key={picture.id} className={styles.pictureItem}>
              <img
                src={picture.src}
                alt={picture.alt}
                className={styles.pictureImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pictures;
