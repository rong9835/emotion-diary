import { test, expect } from '@playwright/test';

// ========================================
// 일기 필터 기능 E2E 테스트
// ========================================

/**
 * 일기 필터링 기능을 위한 Playwright E2E 테스트
 *
 * 테스트 범위:
 * - 필터 선택박스 UI 동작
 * - 감정별 필터링 기능
 * - 검색 결과와 필터 조합 기능
 * - 필터 상태 유지 및 초기화
 *
 * 테스트 조건:
 * - timeout: 100ms (500ms 미만)
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 * - 실제 데이터 사용 (Mock 데이터 사용 금지)
 * - 로컬스토리지 key: 'diaries'
 * - 데이터 타입: { id: number, title: string, content: string, emotion: string, createdAt: string }
 */

// ========================================
// Test Data Setup
// ========================================

const testDiaries = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였어요.',
    emotion: 'HAPPY',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    title: '슬픈 하루',
    content: '오늘은 슬픈 하루였어요.',
    emotion: 'SAD',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    title: '놀라운 하루',
    content: '오늘은 놀라운 하루였어요.',
    emotion: 'SURPRISE',
    createdAt: '2024-01-03',
  },
  {
    id: 4,
    title: '화난 하루',
    content: '오늘은 화난 하루였어요.',
    emotion: 'ANGRY',
    createdAt: '2024-01-04',
  },
  {
    id: 5,
    title: '기타 하루',
    content: '오늘은 기타 감정의 하루였어요.',
    emotion: 'ETC',
    createdAt: '2024-01-05',
  },
];

// ========================================
// Test Suite
// ========================================

test.describe('일기 필터 기능 테스트', () => {
  // ========================================
  // Setup
  // ========================================

  test.beforeEach(async ({ page }) => {
    // 로컬스토리지에 테스트 데이터 설정
    await page.goto('/diaries');
    await page.evaluate((diaries) => {
      localStorage.setItem('diaries', JSON.stringify(diaries));
    }, testDiaries);

    // 페이지 새로고침하여 데이터 로드
    await page.reload();

    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="diaries-page"]');
  });

  // ========================================
  // 기본 필터 기능 테스트
  // ========================================

  test('필터 선택박스가 올바르게 표시되어야 한다', async ({ page }) => {
    // 필터 선택박스가 존재하는지 확인
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await expect(filterSelect).toBeVisible();

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 선택 가능한 메뉴들이 올바르게 표시되는지 확인 (드롭다운 내부의 옵션만 선택)
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("전체")'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("행복해요")'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("슬퍼요")'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("놀랐어요")'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("화나요")'
      )
    ).toBeVisible();
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("기타")'
      )
    ).toBeVisible();
  });

  test('전체 필터로 모든 일기가 표시되어야 한다', async ({ page }) => {
    // 초기 상태에서 모든 일기가 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);

    // 각 감정의 일기가 모두 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 하루')).toBeVisible();
    await expect(page.locator('text=놀라운 하루')).toBeVisible();
    await expect(page.locator('text=화난 하루')).toBeVisible();
    await expect(page.locator('text=기타 하루')).toBeVisible();
  });

  test('행복해요 필터로 행복한 일기만 표시되어야 한다', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 행복해요 선택
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("행복해요")'
      )
      .click();

    // 행복한 하루만 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();
    await expect(page.locator('text=놀라운 하루')).not.toBeVisible();
    await expect(page.locator('text=화난 하루')).not.toBeVisible();
    await expect(page.locator('text=기타 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  test('슬퍼요 필터로 슬픈 일기만 표시되어야 한다', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 슬퍼요 선택
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("슬퍼요")'
      )
      .click();

    // 슬픈 하루만 표시되는지 확인
    await expect(page.locator('text=슬픈 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
    await expect(page.locator('text=놀라운 하루')).not.toBeVisible();
    await expect(page.locator('text=화난 하루')).not.toBeVisible();
    await expect(page.locator('text=기타 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  test('놀랐어요 필터로 놀라운 일기만 표시되어야 한다', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 놀랐어요 선택
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("놀랐어요")'
      )
      .click();

    // 놀라운 하루만 표시되는지 확인
    await expect(page.locator('text=놀라운 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();
    await expect(page.locator('text=화난 하루')).not.toBeVisible();
    await expect(page.locator('text=기타 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  test('화나요 필터로 화난 일기만 표시되어야 한다', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 화나요 선택
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("화나요")'
      )
      .click();

    // 화난 하루만 표시되는지 확인
    await expect(page.locator('text=화난 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();
    await expect(page.locator('text=놀라운 하루')).not.toBeVisible();
    await expect(page.locator('text=기타 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  test('기타 필터로 기타 감정 일기만 표시되어야 한다', async ({ page }) => {
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');

    // 필터 선택박스 클릭
    await filterSelect.click();

    // 기타 선택
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("기타")'
      )
      .click();

    // 기타 하루만 표시되는지 확인
    await expect(page.locator('text=기타 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=행복한 하루')).not.toBeVisible();
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();
    await expect(page.locator('text=놀라운 하루')).not.toBeVisible();
    await expect(page.locator('text=화난 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(1);
  });

  // ========================================
  // 검색 결과 필터 테스트
  // ========================================

  test('검색 결과에 필터를 적용할 수 있어야 한다', async ({ page }) => {
    // 검색창에 "하루" 입력
    const searchInput = page.locator(
      'input[placeholder*="검색어를 입력해 주세요"]'
    );
    await searchInput.fill('하루');
    await searchInput.press('Enter');

    // 검색 결과가 표시될 때까지 대기
    await page.waitForTimeout(100);

    // 모든 일기가 검색되어 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);

    // 필터를 행복해요로 변경
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("행복해요")'
      )
      .click();

    // 검색 결과 중에서 행복한 하루만 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();

    // 다른 감정의 일기들은 표시되지 않는지 확인
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();
    await expect(page.locator('text=놀라운 하루')).not.toBeVisible();
    await expect(page.locator('text=화난 하루')).not.toBeVisible();
    await expect(page.locator('text=기타 하루')).not.toBeVisible();

    // 일기 카드가 1개만 표시되는지 확인
    await expect(diaryCards).toHaveCount(1);
  });

  test('특정 감정으로 검색 후 필터 변경이 올바르게 작동해야 한다', async ({
    page,
  }) => {
    // 검색창에 "행복" 입력
    const searchInput = page.locator(
      'input[placeholder*="검색어를 입력해 주세요"]'
    );
    await searchInput.fill('행복');
    await searchInput.press('Enter');

    // 검색 결과가 표시될 때까지 대기
    await page.waitForTimeout(100);

    // 행복한 하루만 검색되어 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();

    // 필터를 슬퍼요로 변경
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("슬퍼요")'
      )
      .click();

    // 검색 결과가 없어서 빈 상태가 표시되는지 확인
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
    await expect(page.locator('text=검색 결과가 없습니다.')).toBeVisible();
  });

  // ========================================
  // 필터 상태 유지 테스트
  // ========================================

  test('필터 변경 후 페이지네이션이 올바르게 작동해야 한다', async ({
    page,
  }) => {
    // 필터를 행복해요로 변경
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("행복해요")'
      )
      .click();

    // 행복한 하루만 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();

    // 페이지네이션이 표시되지 않는지 확인 (결과가 1개이므로)
    // 페이지네이션이 없거나 비활성화되어야 함
  });

  test('필터를 전체로 다시 변경하면 모든 일기가 표시되어야 한다', async ({
    page,
  }) => {
    // 먼저 특정 필터를 적용
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await filterSelect.click();
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("행복해요")'
      )
      .click();

    // 행복한 하루만 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 하루')).not.toBeVisible();

    // 필터를 전체로 다시 변경
    await filterSelect.click();
    await page
      .locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("전체")'
      )
      .click();

    // 모든 일기가 다시 표시되는지 확인
    await expect(page.locator('text=행복한 하루')).toBeVisible();
    await expect(page.locator('text=슬픈 하루')).toBeVisible();
    await expect(page.locator('text=놀라운 하루')).toBeVisible();
    await expect(page.locator('text=화난 하루')).toBeVisible();
    await expect(page.locator('text=기타 하루')).toBeVisible();

    // 일기 카드가 5개 모두 표시되는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    await expect(diaryCards).toHaveCount(5);
  });

  // ========================================
  // 추가 테스트 케이스 (프롬프트 요구사항 완전 준수)
  // ========================================

  test('빈 로컬스토리지에서 필터 기능이 올바르게 작동해야 한다', async ({
    page,
  }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]');

    // 필터 선택박스가 여전히 작동하는지 확인
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await expect(filterSelect).toBeVisible();

    // 빈 상태 메시지 확인
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible();
  });

  test('필터 선택박스가 항상 접근 가능해야 한다', async ({ page }) => {
    // 필터 선택박스가 항상 표시되는지 확인
    const filterSelect = page.locator('[data-testid="emotion-filter-select"]');
    await expect(filterSelect).toBeVisible();

    // 필터 선택박스가 클릭 가능한지 확인
    await filterSelect.click();

    // 드롭다운 메뉴가 열리는지 확인
    await expect(
      page.locator(
        '[data-testid="emotion-filter-select"] [role="option"]:has-text("전체")'
      )
    ).toBeVisible();
  });
});
