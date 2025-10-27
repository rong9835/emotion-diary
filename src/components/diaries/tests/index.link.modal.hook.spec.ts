import { test, expect } from '@playwright/test';

// ========================================
// Diaries Modal Hook Auth E2E Tests
// ========================================

/**
 * useNewDiaryModal 훅을 활용한 권한 검증 테스트
 *
 * 테스트 범위:
 * - 비로그인 유저: 일기쓰기버튼 클릭 시 로그인 요청 모달 노출
 * - 로그인 유저: 일기쓰기버튼 클릭 시 일기쓰기 모달 노출
 *
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 * - 실제 데이터 사용 (Mock 데이터 사용 금지)
 * - 로그인 데이터는 전역변수(window.__TEST_BYPASS__) 사용
 */

test.describe('Diaries Modal Hook Auth Tests', () => {
  test.describe('비로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태로 설정
      await page.goto('/');
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
        // 로그인 상태를 명시적으로 false로 설정
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
    });

    test('일기쓰기버튼 클릭 시 로그인 요청 모달이 노출되어야 함', async ({
      page,
    }) => {
      // 1. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 400,
      });

      // 페이지 이동 후 다시 테스트 환경 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });

      // 2. 일기쓰기버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await writeButton.click();

      // 3. 로그인요청모달 노출여부 확인
      // 모달 컨테이너 확인
      const modal = page.locator('[data-testid="modal-container"]');
      await expect(modal).toBeVisible({ timeout: 400 });

      // 모달 제목 확인
      const modalTitle = page.locator('[data-testid="modal-title"]');
      await expect(modalTitle).toHaveText('로그인이 필요합니다');

      // 모달 내용 확인
      const modalContent = page.locator('[data-testid="modal-content"]');
      await expect(modalContent).toContainText(
        '일기를 쓰려면 로그인이 필요합니다.'
      );

      // 확인 버튼 확인
      const confirmButton = page.locator('[data-testid="modal-confirm"]');
      await expect(confirmButton).toBeVisible();
      await expect(confirmButton).toHaveText('로그인');

      // 취소 버튼 확인
      const cancelButton = page.locator('[data-testid="modal-cancel"]');
      await expect(cancelButton).toBeVisible();
      await expect(cancelButton).toHaveText('취소');
    });

    test('로그인 요청 모달에서 확인 버튼 클릭 시 로그인 페이지로 이동해야 함', async ({
      page,
    }) => {
      // /diaries에 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 400,
      });

      // 페이지 이동 후 다시 테스트 환경 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });

      // 일기쓰기버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await writeButton.click();

      // 로그인 모달 노출 확인
      const modal = page.locator('[data-testid="modal-container"]');
      await expect(modal).toBeVisible({ timeout: 400 });

      // 확인 버튼 클릭
      const confirmButton = page.locator('[data-testid="modal-confirm"]');
      await confirmButton.click();

      // 로그인 페이지로 이동 확인
      await expect(page).toHaveURL('/auth/login', { timeout: 400 });
    });

    test('로그인 요청 모달에서 취소 버튼 클릭 시 모달이 닫혀야 함', async ({
      page,
    }) => {
      // /diaries에 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 400,
      });

      // 페이지 이동 후 다시 테스트 환경 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });

      // 일기쓰기버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await writeButton.click();

      // 로그인 모달 노출 확인
      const modal = page.locator('[data-testid="modal-container"]');
      await expect(modal).toBeVisible({ timeout: 400 });

      // 취소 버튼 클릭
      const cancelButton = page.locator('[data-testid="modal-cancel"]');
      await cancelButton.click();

      // 모달이 닫혀야 함
      await expect(modal).not.toBeVisible({ timeout: 400 });

      // /diaries 페이지에 그대로 있어야 함
      await expect(page).toHaveURL('/diaries');
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 상태로 설정
      await page.goto('/');
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
        // 로그인 상태를 명시적으로 설정
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem(
          'user',
          JSON.stringify({
            _id: 'test-user-id',
            email: 'test@example.com',
            name: '테스트사용자',
          })
        );
      });
    });

    test('일기쓰기버튼 클릭 시 일기쓰기 페이지 모달이 노출되어야 함', async ({
      page,
    }) => {
      // 1. /diaries에 접속하여 페이지 로드 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 400,
      });

      // 페이지 이동 후 다시 테스트 환경 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem(
          'user',
          JSON.stringify({
            _id: 'test-user-id',
            email: 'test@example.com',
            name: '테스트사용자',
          })
        );
      });

      // 2. 일기쓰기버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await writeButton.click();

      // 3. 일기쓰기 페이지 모달 노출여부 확인
      // DiariesNew 컴포넌트의 고유 식별자 확인
      const diaryNewModal = page.locator('[data-testid="diaries-new"]');
      await expect(diaryNewModal).toBeVisible({ timeout: 400 });

      // 일기쓰기 제목 입력 필드 확인
      const titleInput = page.locator('[data-testid="diary-title-input"]');
      await expect(titleInput).toBeVisible();

      // 일기쓰기 내용 입력 필드 확인
      const contentInput = page.locator(
        '[data-testid="diary-content-textarea"]'
      );
      await expect(contentInput).toBeVisible();
    });

    test('로그인 유저는 로그인 요청 모달이 노출되지 않아야 함', async ({
      page,
    }) => {
      // /diaries에 접속
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 400,
      });

      // 페이지 이동 후 다시 테스트 환경 설정
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem(
          'user',
          JSON.stringify({
            _id: 'test-user-id',
            email: 'test@example.com',
            name: '테스트사용자',
          })
        );
      });

      // 일기쓰기버튼 클릭
      const writeButton = page.locator('[data-testid="diary-write-button"]');
      await writeButton.click();

      // 로그인 모달이 아닌 일기쓰기 모달이 노출되어야 함
      const diaryNewModal = page.locator('[data-testid="diaries-new"]');
      await expect(diaryNewModal).toBeVisible({ timeout: 400 });

      // 로그인 모달 제목이 노출되지 않아야 함
      const loginModalTitle = page
        .locator('[data-testid="modal-title"]')
        .filter({ hasText: '로그인이 필요합니다' });
      await expect(loginModalTitle).not.toBeVisible();
    });
  });
});
