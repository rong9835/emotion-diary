import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Test Configuration
// ========================================

const BASE_URL = 'http://localhost:3000';
const DIARIES_URL = `${BASE_URL}/diaries`;

// ========================================
// Test Data
// ========================================

interface DiaryData {
  id: number;
  title: string;
  content: string;
  emotion: EmotionType;
  createdAt: string;
}

const testDiaries: DiaryData[] = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2025-10-17',
  },
  {
    id: 2,
    title: '슬픈 하루',
    content: '오늘은 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2025-10-16',
  },
  {
    id: 3,
    title: '화난 하루',
    content: '오늘은 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2025-10-15',
  },
];

// ========================================
// Test Suite: Diary Card Link Routing
// ========================================

test.describe('Diary Card Link Routing', () => {
  // ========================================
  // Before Each: Setup
  // ========================================

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 실제 데이터 저장
    await page.goto(DIARIES_URL);
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);
    await page.reload();

    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  // ========================================
  // Test: 일기 카드 클릭 시 상세 페이지로 이동
  // ========================================

  test('should navigate to detail page when clicking on diary card', async ({ page }) => {
    // Given: 일기 카드가 렌더링됨
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard).toBeVisible();

    // When: 일기 카드를 클릭
    await firstCard.click();

    // Then: 상세 페이지로 이동
    await expect(page).toHaveURL(`${DIARIES_URL}/1`);
  });

  // ========================================
  // Test: 여러 일기 카드 클릭 테스트
  // ========================================

  test('should navigate to correct detail page for each diary card', async ({ page }) => {
    // Test for diary card 2
    const secondCard = page.locator('[data-testid="diary-card-2"]');
    await expect(secondCard).toBeVisible();
    await secondCard.click();
    await expect(page).toHaveURL(`${DIARIES_URL}/2`);

    // Navigate back
    await page.goto(DIARIES_URL);
    await page.waitForSelector('[data-testid="diaries-page"]');

    // Test for diary card 3
    const thirdCard = page.locator('[data-testid="diary-card-3"]');
    await expect(thirdCard).toBeVisible();
    await thirdCard.click();
    await expect(page).toHaveURL(`${DIARIES_URL}/3`);
  });

  // ========================================
  // Test: 삭제 버튼 클릭 시 페이지 이동하지 않음
  // ========================================

  test('should not navigate when clicking delete button', async ({ page }) => {
    // Given: 일기 카드가 렌더링됨
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard).toBeVisible();

    // When: 삭제 버튼을 클릭
    const deleteButton = page.locator('[data-testid="delete-button"]').first();
    await deleteButton.click();

    // Then: 페이지 이동하지 않음 (여전히 diaries 페이지에 있음)
    await expect(page).toHaveURL(DIARIES_URL);
  });

  // ========================================
  // Test: 카드에 cursor: pointer 스타일 적용 확인
  // ========================================

  test('should have cursor pointer style on diary card', async ({ page }) => {
    // Given: 일기 카드가 렌더링됨
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard).toBeVisible();

    // Then: cursor: pointer 스타일이 적용되어 있음
    const cursor = await firstCard.evaluate((el) => {
      return window.getComputedStyle(el).cursor;
    });
    expect(cursor).toBe('pointer');
  });

  // ========================================
  // Test: 빈 로컬스토리지 시나리오
  // ========================================

  test('should handle empty localStorage gracefully', async ({ page }) => {
    // Given: 로컬스토리지 비움
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]');

    // Then: 빈 상태 메시지 표시
    const emptyState = page.locator('[data-testid="empty-state"]');
    await expect(emptyState).toBeVisible();
  });
});
