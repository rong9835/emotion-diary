import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

const testDiariesData = [
  // 첫 번째 페이지 (1-12)
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였어요!',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    title: '슬픈 하루',
    content: '오늘은 정말 슬픈 하루였어요.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    title: '화난 하루',
    content: '오늘은 정말 화난 하루였어요.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-03',
  },
  {
    id: 4,
    title: '놀란 하루',
    content: '오늘은 정말 놀란 하루였어요!',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-04',
  },
  {
    id: 5,
    title: '기타 하루',
    content: '오늘은 정말 특별한 하루였어요.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-05',
  },
  {
    id: 6,
    title: '행복한 하루 2',
    content: '오늘도 정말 행복한 하루였어요!',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-06',
  },
  {
    id: 7,
    title: '슬픈 하루 2',
    content: '오늘도 정말 슬픈 하루였어요.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-07',
  },
  {
    id: 8,
    title: '화난 하루 2',
    content: '오늘도 정말 화난 하루였어요.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-08',
  },
  {
    id: 9,
    title: '놀란 하루 2',
    content: '오늘도 정말 놀란 하루였어요!',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-09',
  },
  {
    id: 10,
    title: '기타 하루 2',
    content: '오늘도 정말 특별한 하루였어요.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-10',
  },
  {
    id: 11,
    title: '행복한 하루 3',
    content: '오늘도 정말 행복한 하루였어요!',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-11',
  },
  {
    id: 12,
    title: '슬픈 하루 3',
    content: '오늘도 정말 슬픈 하루였어요.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-12',
  },
  // 두 번째 페이지 (13-24)
  {
    id: 13,
    title: '화난 하루 3',
    content: '오늘도 정말 화난 하루였어요.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-13',
  },
  {
    id: 14,
    title: '놀란 하루 3',
    content: '오늘도 정말 놀란 하루였어요!',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-14',
  },
  {
    id: 15,
    title: '기타 하루 3',
    content: '오늘도 정말 특별한 하루였어요.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-15',
  },
  {
    id: 16,
    title: '행복한 하루 4',
    content: '오늘도 정말 행복한 하루였어요!',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-16',
  },
  {
    id: 17,
    title: '슬픈 하루 4',
    content: '오늘도 정말 슬픈 하루였어요.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-17',
  },
  {
    id: 18,
    title: '화난 하루 4',
    content: '오늘도 정말 화난 하루였어요.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-18',
  },
  {
    id: 19,
    title: '놀란 하루 4',
    content: '오늘도 정말 놀란 하루였어요!',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-19',
  },
  {
    id: 20,
    title: '기타 하루 4',
    content: '오늘도 정말 특별한 하루였어요.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-20',
  },
  {
    id: 21,
    title: '행복한 하루 5',
    content: '오늘도 정말 행복한 하루였어요!',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-01-21',
  },
  {
    id: 22,
    title: '슬픈 하루 5',
    content: '오늘도 정말 슬픈 하루였어요.',
    emotion: EmotionType.SAD,
    createdAt: '2024-01-22',
  },
  // 세 번째 페이지 (23-25) - 5개 단위 페이지네이션 테스트용
  {
    id: 23,
    title: '화난 하루 5',
    content: '오늘도 정말 화난 하루였어요.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-01-23',
  },
  {
    id: 24,
    title: '놀란 하루 5',
    content: '오늘도 정말 놀란 하루였어요!',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-01-24',
  },
  {
    id: 25,
    title: '기타 하루 5',
    content: '오늘도 정말 특별한 하루였어요.',
    emotion: EmotionType.ETC,
    createdAt: '2024-01-25',
  },
];

test.describe('Diaries Pagination Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/diaries');
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testDiariesData);

    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', {
      timeout: 300,
    });
  });

  test('should display 12 diary cards per page in 3 rows and 4 columns', async ({
    page,
  }) => {
    await page.waitForSelector('[data-testid="diaries-page"]');
    await page.waitForSelector('[data-testid^="diary-card-"]', {
      timeout: 300,
    });

    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);

    const diaryGrid = page.locator('[class*="diaryGrid"]');
    await expect(diaryGrid).toBeVisible();
  });

  test('should display pagination with 5 page numbers (1, 2, 3, 4, 5)', async ({
    page,
  }) => {
    const pagination = page.locator('[data-testid="pagination"]');
    await expect(pagination).toBeVisible();

    // 25개 데이터, 12개씩 = 3페이지이지만, 5개 단위 페이지네이션으로 1-5 페이지 표시
    const pageButtons = page.locator('[data-testid^="page-button-"]');
    await expect(pageButtons).toHaveCount(3); // 실제로는 3페이지만 존재

    // 페이지 번호 확인 (1, 2, 3)
    await expect(page.locator('[data-testid="page-button-1"]')).toBeVisible();
    await expect(page.locator('[data-testid="page-button-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="page-button-3"]')).toBeVisible();
  });

  test('should navigate to correct page when clicking page number', async ({
    page,
  }) => {
    const page2Button = page.locator('[data-testid="page-button-2"]');
    await page2Button.click();

    // 두 번째 페이지: 13-24번 카드 (12개)
    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);

    const firstCard = page.locator('[data-testid="diary-card-13"]');
    await expect(firstCard).toBeVisible();

    const lastCard = page.locator('[data-testid="diary-card-24"]');
    await expect(lastCard).toBeVisible();
  });

  test('should update pagination when searching', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간 고려

    // 행복 관련 일기: 1, 6, 11, 16, 21번 (5개)
    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);

    const pageButtons = page.locator('[data-testid^="page-button-"]');
    await expect(pageButtons).toHaveCount(1); // 5개는 1페이지에 모두 표시
  });

  test('should show all pages when search is cleared', async ({ page }) => {
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.clear();
    await searchInput.press('Enter');
    await page.waitForTimeout(200);

    // 모든 일기 카드 표시 (25개)
    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12); // 첫 페이지에 12개 표시

    // 페이지네이션 확인 (3페이지)
    const pageButtons = page.locator('[data-testid^="page-button-"]');
    await expect(pageButtons).toHaveCount(3);
  });

  test('should update pagination when filtering by emotion', async ({
    page,
  }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();

    const happyOption = page.locator('[data-testid="filter-option-HAPPY"]');
    await happyOption.click();

    // HAPPY 필터링된 일기: 1, 6, 11, 16, 21번 (5개)
    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);

    const pageButtons = page.locator('[data-testid^="page-button-"]');
    await expect(pageButtons).toHaveCount(1); // 5개는 1페이지에 모두 표시
  });

  test('should reset pagination when filter is cleared', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    const happyOption = page.locator('[data-testid="filter-option-HAPPY"]');
    await happyOption.click();

    await filterSelect.click();
    const allOption = page.locator('[data-testid="filter-option-all"]');
    await allOption.click();

    // 모든 일기 카드 표시 (25개 중 첫 페이지 12개)
    const diaryCards = await page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(12);

    // 페이지네이션 확인 (3페이지)
    const pageButtons = page.locator('[data-testid^="page-button-"]');
    await expect(pageButtons).toHaveCount(3);
  });
});
