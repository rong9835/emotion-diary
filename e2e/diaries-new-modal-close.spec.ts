import { test, expect } from '@playwright/test';

// ========================================
// Modal Close E2E Tests
// ========================================

/**
 * 일기쓰기 모달 닫기 기능의 E2E 테스트
 *
 * 테스트 범위:
 * - 닫기 버튼 클릭 시 등록취소 모달 표시
 * - 계속작성 버튼 클릭 시 등록취소 모달만 닫기
 * - 등록취소 버튼 클릭 시 모든 모달 닫기
 * - 2중 모달 overlay 구조 검증
 *
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 */

test.describe('일기쓰기 모달 닫기 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /diaries 페이지로 이동
    await page.goto('/diaries');

    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diaries-page"]', {
      timeout: 500,
    });

    // 일기쓰기 버튼 클릭
    await page.click('[data-testid="diary-write-button"]');

    // 일기쓰기 모달이 열릴 때까지 대기
    await page.waitForSelector('[data-testid="diary-write-modal"]', {
      timeout: 500,
    });
  });

  test('닫기 버튼 클릭 시 등록취소 모달이 표시되어야 함', async ({ page }) => {
    // 닫기 버튼 클릭
    await page.click('[data-testid="diary-write-close-button"]');

    // 등록취소 모달이 표시되는지 확인
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"]')
    ).toBeVisible();

    // 등록취소 모달의 제목과 내용 확인
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"] h2')
    ).toHaveText('등록을 취소하시겠습니까?');
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"] p')
    ).toHaveText('작성 중인 내용이 사라집니다.');
  });

  test('등록취소 모달에서 계속작성 버튼 클릭 시 등록취소 모달만 닫혀야 함', async ({
    page,
  }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-write-close-button"]');
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"]')
    ).toBeVisible();

    // 계속작성 버튼 클릭
    await page.click('[data-testid="continue-writing-button"]');

    // 등록취소 모달은 닫히고 일기쓰기 모달은 유지되어야 함
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"]')
    ).not.toBeVisible();
    await expect(
      page.locator('[data-testid="diary-write-modal"]')
    ).toBeVisible();
  });

  test('등록취소 모달에서 등록취소 버튼 클릭 시 모든 모달이 닫혀야 함', async ({
    page,
  }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-write-close-button"]');
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"]')
    ).toBeVisible();

    // 등록취소 버튼 클릭
    await page.click('[data-testid="cancel-registration-button"]');

    // 모든 모달이 닫혀야 함
    await expect(
      page.locator('[data-testid="cancel-confirmation-modal"]')
    ).not.toBeVisible();
    await expect(
      page.locator('[data-testid="diary-write-modal"]')
    ).not.toBeVisible();

    // /diaries 페이지로 돌아왔는지 확인
    await expect(page.locator('[data-testid="diaries-page"]')).toBeVisible();
  });

  test('등록취소 모달이 일기쓰기 모달 위에 중앙에 표시되어야 함', async ({
    page,
  }) => {
    // 닫기 버튼 클릭하여 등록취소 모달 열기
    await page.click('[data-testid="diary-write-close-button"]');

    // 등록취소 모달이 표시되는지 확인 (제목으로 확인)
    await expect(
      page.locator('h2', { hasText: '등록을 취소하시겠습니까?' })
    ).toBeVisible();

    // 일기쓰기 모달도 여전히 표시되어야 함
    await expect(
      page.locator('[data-testid="diary-write-modal"]')
    ).toBeVisible();

    // 등록취소 모달의 내용이 올바른지 확인
    await expect(
      page.locator('p', { hasText: '작성 중인 내용이 사라집니다.' })
    ).toBeVisible();

    // 계속작성과 등록취소 버튼이 모두 표시되는지 확인
    await expect(page.locator('button', { hasText: '계속작성' })).toBeVisible();
    await expect(page.locator('button', { hasText: '등록취소' })).toBeVisible();
  });
});
