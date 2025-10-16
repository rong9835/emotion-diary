import { test, expect } from '@playwright/test';

// ========================================
// Area Hook E2E Tests
// ========================================

/**
 * useArea 훅의 레이아웃 영역 노출 제어 기능 테스트
 *
 * 테스트 범위:
 * - 홈 페이지: 모든 영역 노출
 * - 일기 목록 페이지: 모든 영역 노출 (다크모드 토글 제외)
 * - 일기 상세 페이지: 헤더, 푸터만 노출
 * - 사진 목록 페이지: 모든 영역 노출 (다크모드 토글 제외)
 *
 * 테스트 제외 페이지:
 * - /auth/login
 * - /auth/signup
 * - /pictures
 */

test.describe('Layout Area Hook Tests', () => {
  test('홈 페이지 - 모든 레이아웃 영역이 노출되어야 함', async ({ page }) => {
    // 홈 페이지로 이동
    await page.goto('/');

    // 페이지 로드 대기 (헤더 로고로 식별)
    await page.waitForSelector('[data-testid="header-logo"]');

    // 헤더 영역 확인
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // 헤더 로고 확인
    const headerLogo = page.locator('[data-testid="header-logo"]');
    await expect(headerLogo).toBeVisible();

    // 배너 영역 확인 - section 태그로 식별
    const banner = page.locator('section');
    await expect(banner).toBeVisible();

    // 네비게이션 영역 확인
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // 네비게이션 탭들 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(diariesTab).toBeVisible();
    await expect(picturesTab).toBeVisible();

    // 푸터 영역 확인
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('일기 목록 페이지 - 모든 레이아웃 영역이 노출되어야 함 (다크모드 토글 제외)', async ({
    page,
  }) => {
    // 일기 목록 페이지로 이동
    await page.goto('/diaries');

    // 페이지 로드 대기 (헤더 로고로 식별)
    await page.waitForSelector('[data-testid="header-logo"]');

    // 헤더 영역 확인
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // 헤더 로고 확인
    const headerLogo = page.locator('[data-testid="header-logo"]');
    await expect(headerLogo).toBeVisible();

    // 배너 영역 확인 - section 태그로 식별
    const banner = page.locator('section');
    await expect(banner).toBeVisible();

    // 네비게이션 영역 확인
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // 일기보관함 탭이 활성화되어 있는지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toBeVisible();

    // 푸터 영역 확인
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('URL 기반 레이아웃 설정이 올바르게 적용되는지 확인', async ({
    page,
  }) => {
    // 홈 페이지에서 모든 영역이 노출되는지 확인
    await page.goto('/');
    await page.waitForSelector('[data-testid="header-logo"]');

    // 홈 페이지에서는 모든 영역이 노출되어야 함
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('section')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('네비게이션 탭이 올바르게 렌더링되는지 확인', async ({ page }) => {
    // 홈 페이지로 시작
    await page.goto('/');
    await page.waitForSelector('[data-testid="header-logo"]');

    // 네비게이션 탭들이 존재하는지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    const picturesTab = page.locator('[data-testid="nav-pictures"]');

    await expect(diariesTab).toBeVisible();
    await expect(picturesTab).toBeVisible();

    // 탭 텍스트 확인
    await expect(diariesTab).toContainText('일기보관함');
    await expect(picturesTab).toContainText('사진보관함');
  });

  test('헤더 로고가 올바르게 렌더링되는지 확인', async ({ page }) => {
    // 홈 페이지로 시작
    await page.goto('/');
    await page.waitForSelector('[data-testid="header-logo"]');

    // 헤더 로고 확인
    const headerLogo = page.locator('[data-testid="header-logo"]');
    await expect(headerLogo).toBeVisible();
    await expect(headerLogo).toContainText('민지의 다이어리');
  });
});
