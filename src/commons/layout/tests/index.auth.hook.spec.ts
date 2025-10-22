import { test, expect } from '@playwright/test';

// ========================================
// Layout 인증 기능 테스트
// ========================================

test.describe('Layout 인증 기능 테스트', () => {
  // ========================================
  // 1. 비로그인 유저 테스트
  // ========================================
  test.describe('비로그인 유저', () => {
    test('로그인 버튼이 노출되고 클릭 시 로그인 페이지로 이동해야 함', async ({
      page,
    }) => {
      // 페이지 이동
      await page.goto('/diaries');

      // 페이지 로드 대기 (data-testid 기반)
      await page.waitForSelector('[data-testid="nav-diaries"]');

      // 로그인 버튼 노출 확인
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).toBeVisible();

      // 로그인 버튼 클릭 시 로그인 페이지로 이동
      await loginButton.click();
      await page.waitForURL('/auth/login');
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
    });
  });

  // ========================================
  // 2. 로그인 유저 테스트
  // ========================================
  test.describe('로그인 유저', () => {
    test('로그인 후 유저이름과 로그아웃 버튼이 노출되고 로그아웃 기능이 동작해야 함', async ({
      page,
    }) => {
      // 페이지 이동 및 로그인
      await page.goto('/auth/login');

      // 페이지 로드 대기
      await page.waitForSelector('[data-testid="login-form"]');

      // 로그인 정보 입력
      await page.fill('input[name="email"]', 'a@c.com');
      await page.fill('input[name="password"]', '1234qwer');
      await page.click('[data-testid="login-submit-button"]');

      // 로그인 성공 모달 확인 및 클릭
      const modalConfirmButton = page
        .locator('[data-modal-component="true"]')
        .locator('button:has-text("확인")');
      await expect(modalConfirmButton).toBeVisible();
      await modalConfirmButton.click();

      // 일기 목록 페이지로 이동 확인
      await page.waitForURL('/diaries');
      await page.waitForSelector('[data-testid="nav-diaries"]');

      // 유저 이름 노출 확인
      const userName = page.locator('[data-testid="user-name"]');
      await expect(userName).toBeVisible();
      await expect(userName).toContainText('님');

      // 로그아웃 버튼 노출 확인
      const logoutButton = page.locator('[data-testid="logout-button"]');
      await expect(logoutButton).toBeVisible();

      // 로그아웃 버튼 클릭
      await logoutButton.click();

      // 로그인 페이지로 이동 확인
      await page.waitForURL('/auth/login');
      await page.waitForSelector('[data-testid="login-form"]');

      // 로그아웃 후 일기 목록 페이지에서 로그인 버튼 노출 확인
      await page.goto('/diaries');
      await page.waitForSelector('[data-testid="nav-diaries"]');

      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).toBeVisible();
    });
  });
});
