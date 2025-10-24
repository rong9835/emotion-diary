import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

const testDiariesData = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-03-12',
  },
  {
    id: 2,
    title: '슬픈 날',
    content: '오늘은 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-03-11',
  },
  {
    id: 3,
    title: '화나는 일',
    content: '오늘은 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    title: '놀라운 경험',
    content: '오늘은 놀라운 경험을 했다.',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-03-09',
  },
  {
    id: 5,
    title: '기타 감정',
    content: '오늘은 복잡한 감정이었다.',
    emotion: EmotionType.ETC,
    createdAt: '2024-03-08',
  },
  {
    id: 6,
    title: '행복한 주말',
    content: '평범한 하루',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-03-07',
  },
];

test.describe('Diaries Search Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testDiariesData);

    await page.goto('/diaries');
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  test('should search by pressing Enter key', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('행복');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(2);

    await expect(
      diaryCards.first().locator('[data-testid="diary-title"]')
    ).toContainText('행복');
  });

  test('should search by clicking search button', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('슬픈');

    const searchButton = page.locator('button[aria-label="검색"]');
    await searchButton.click();
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(1);

    await expect(
      diaryCards.first().locator('[data-testid="diary-title"]')
    ).toHaveText('슬픈 날');
  });

  test('should search case-insensitively', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('화나');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(1);

    await expect(
      diaryCards.first().locator('[data-testid="diary-title"]')
    ).toContainText('화나');
  });

  test('should show all diaries when search is empty', async ({ page }) => {
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const initialCardCount = await diaryCards.count();
    expect(initialCardCount).toBe(testDiariesData.length);

    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('');
    await searchInput.press('Enter');
    await page.waitForTimeout(200);

    const afterSearchCardCount = await diaryCards.count();
    expect(afterSearchCardCount).toBe(testDiariesData.length);
  });

  test('should show empty state when no results', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('존재하지않는검색어12345');
    await searchInput.press('Enter');
    await page.waitForTimeout(200);

    const emptyState = page.getByText('검색 결과가 없습니다.');
    await expect(emptyState).toBeVisible();

    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(0);
  });

  test('should update results when search term changes', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );

    await searchInput.fill('행복');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    let diaryCards = page.locator('[data-testid^="diary-card-"]');
    let cardCount = await diaryCards.count();
    expect(cardCount).toBe(2);

    await searchInput.fill('주말');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    diaryCards = page.locator('[data-testid^="diary-card-"]');
    cardCount = await diaryCards.count();
    expect(cardCount).toBe(1);

    await expect(
      diaryCards.first().locator('[data-testid="diary-title"]')
    ).toHaveText('행복한 주말');
  });

  test('should work with filters', async ({ page }) => {
    const searchInput = page.locator(
      'input[placeholder="검색어를 입력해 주세요."]'
    );
    await searchInput.fill('하루');
    await searchInput.press('Enter');
    await page.waitForTimeout(400); // 디바운싱 시간(300ms) + 여유시간

    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();
    expect(cardCount).toBe(1);
  });
});
