import { renderHook, act } from '@testing-library/react';
import { useFilter } from '../hooks/index.filter.hook';
import { EmotionType } from '@/commons/constants/enum';
import { DiaryEntry } from '../index';

// ========================================
// useFilter Hook 단위 테스트
// ========================================

/**
 * useFilter Hook을 위한 단위 테스트
 *
 * 테스트 범위:
 * - 초기 상태 확인
 * - 필터 옵션 생성 확인
 * - 감정별 필터링 기능
 * - 필터 초기화 기능
 * - 엣지 케이스 처리
 *
 * 테스트 조건:
 * - @testing-library/react 사용
 * - 실제 데이터 사용 (Mock 데이터 사용 안함)
 * - 모든 감정 타입 테스트
 */

// ========================================
// Test Data
// ========================================

const mockDiaries: DiaryEntry[] = [
  {
    id: '1',
    title: '행복한 하루',
    emotion: EmotionType.HAPPY,
    date: '2024-01-01',
    imageUrl: '/images/emotion-happy-m.png',
  },
  {
    id: '2',
    title: '슬픈 하루',
    emotion: EmotionType.SAD,
    date: '2024-01-02',
    imageUrl: '/images/emotion-sad-m.png',
  },
  {
    id: '3',
    title: '놀라운 하루',
    emotion: EmotionType.SURPRISE,
    date: '2024-01-03',
    imageUrl: '/images/emotion-surprise-m.png',
  },
  {
    id: '4',
    title: '화난 하루',
    emotion: EmotionType.ANGRY,
    date: '2024-01-04',
    imageUrl: '/images/emotion-angry-m.png',
  },
  {
    id: '5',
    title: '기타 하루',
    emotion: EmotionType.ETC,
    date: '2024-01-05',
    imageUrl: '/images/emotion-etc-m.png',
  },
];

// ========================================
// Test Suite
// ========================================

describe('useFilter Hook', () => {
  // ========================================
  // Initial State Tests
  // ========================================

  it('초기 상태에서 모든 일기가 표시되어야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    expect(result.current.filterValue).toBe('all');
    expect(result.current.filteredDiaries).toEqual(mockDiaries);
    expect(result.current.filteredDiaries).toHaveLength(5);
  });

  it('필터 옵션이 올바르게 생성되어야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    const expectedOptions = [
      { value: 'all', label: '전체' },
      { value: EmotionType.HAPPY, label: '행복해요' },
      { value: EmotionType.SAD, label: '슬퍼요' },
      { value: EmotionType.SURPRISE, label: '놀랐어요' },
      { value: EmotionType.ANGRY, label: '화나요' },
      { value: EmotionType.ETC, label: '기타' },
    ];

    expect(result.current.filterOptions).toEqual(expectedOptions);
  });

  // ========================================
  // Filter Functionality Tests
  // ========================================

  it('행복해요 필터가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange(EmotionType.HAPPY);
    });

    expect(result.current.filterValue).toBe(EmotionType.HAPPY);
    expect(result.current.filteredDiaries).toHaveLength(1);
    expect(result.current.filteredDiaries[0].emotion).toBe(EmotionType.HAPPY);
    expect(result.current.filteredDiaries[0].title).toBe('행복한 하루');
  });

  it('슬퍼요 필터가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange(EmotionType.SAD);
    });

    expect(result.current.filterValue).toBe(EmotionType.SAD);
    expect(result.current.filteredDiaries).toHaveLength(1);
    expect(result.current.filteredDiaries[0].emotion).toBe(EmotionType.SAD);
    expect(result.current.filteredDiaries[0].title).toBe('슬픈 하루');
  });

  it('놀랐어요 필터가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange(EmotionType.SURPRISE);
    });

    expect(result.current.filterValue).toBe(EmotionType.SURPRISE);
    expect(result.current.filteredDiaries).toHaveLength(1);
    expect(result.current.filteredDiaries[0].emotion).toBe(
      EmotionType.SURPRISE
    );
    expect(result.current.filteredDiaries[0].title).toBe('놀라운 하루');
  });

  it('화나요 필터가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange(EmotionType.ANGRY);
    });

    expect(result.current.filterValue).toBe(EmotionType.ANGRY);
    expect(result.current.filteredDiaries).toHaveLength(1);
    expect(result.current.filteredDiaries[0].emotion).toBe(EmotionType.ANGRY);
    expect(result.current.filteredDiaries[0].title).toBe('화난 하루');
  });

  it('기타 필터가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange(EmotionType.ETC);
    });

    expect(result.current.filterValue).toBe(EmotionType.ETC);
    expect(result.current.filteredDiaries).toHaveLength(1);
    expect(result.current.filteredDiaries[0].emotion).toBe(EmotionType.ETC);
    expect(result.current.filteredDiaries[0].title).toBe('기타 하루');
  });

  it('전체 필터로 돌아가면 모든 일기가 표시되어야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    // 먼저 특정 필터를 적용
    act(() => {
      result.current.handleFilterChange(EmotionType.HAPPY);
    });

    expect(result.current.filteredDiaries).toHaveLength(1);

    // 전체 필터로 돌아가기
    act(() => {
      result.current.handleFilterChange('all');
    });

    expect(result.current.filterValue).toBe('all');
    expect(result.current.filteredDiaries).toEqual(mockDiaries);
    expect(result.current.filteredDiaries).toHaveLength(5);
  });

  // ========================================
  // Reset Functionality Tests
  // ========================================

  it('resetFilter 함수가 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    // 먼저 특정 필터를 적용
    act(() => {
      result.current.handleFilterChange(EmotionType.SAD);
    });

    expect(result.current.filterValue).toBe(EmotionType.SAD);

    // 리셋
    act(() => {
      result.current.resetFilter();
    });

    expect(result.current.filterValue).toBe('all');
    expect(result.current.filteredDiaries).toEqual(mockDiaries);
  });

  // ========================================
  // Edge Cases Tests
  // ========================================

  it('빈 배열일 때도 올바르게 작동해야 한다', () => {
    const { result } = renderHook(() => useFilter([]));

    expect(result.current.filterValue).toBe('all');
    expect(result.current.filteredDiaries).toEqual([]);
    expect(result.current.filterOptions).toHaveLength(6); // 전체 + 5개 감정
  });

  it('존재하지 않는 감정으로 필터링하면 빈 배열을 반환해야 한다', () => {
    const { result } = renderHook(() => useFilter(mockDiaries));

    act(() => {
      result.current.handleFilterChange('NONEXISTENT');
    });

    expect(result.current.filterValue).toBe('NONEXISTENT');
    expect(result.current.filteredDiaries).toEqual([]);
  });

  it('같은 감정의 일기가 여러 개 있을 때 모두 필터링되어야 한다', () => {
    const diariesWithDuplicateEmotions = [
      ...mockDiaries,
      {
        id: '6',
        title: '또 다른 행복한 하루',
        emotion: EmotionType.HAPPY,
        date: '2024-01-06',
        imageUrl: '/images/emotion-happy-m.png',
      },
    ];

    const { result } = renderHook(() =>
      useFilter(diariesWithDuplicateEmotions)
    );

    act(() => {
      result.current.handleFilterChange(EmotionType.HAPPY);
    });

    expect(result.current.filteredDiaries).toHaveLength(2);
    expect(
      result.current.filteredDiaries.every(
        (diary) => diary.emotion === EmotionType.HAPPY
      )
    ).toBe(true);
  });
});
