import { test, expect } from '@playwright/test';

// ========================================
// Layout Link Routing Tests
// ========================================

test.describe('Layout Link Routing', () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동하여 테스트 시작
    await page.goto('/diaries');
    // 페이지 로드 완료 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="nav-diaries"]');
  });

  test('일기보관함 네비게이션이 활성 상태로 표시되어야 함', async ({
    page,
  }) => {
    // 일기보관함 탭이 활성 상태인지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/activeTab/);

    // 사진보관함 탭은 비활성 상태인지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).not.toHaveClass(/activeTab/);
  });

  test.skip('사진보관함 네비게이션 클릭 시 페이지 이동 및 활성 상태 변경', async ({
    page,
  }) => {
    // /pictures 경로는 테스트 skip 대상
    // 사진보관함 탭 클릭
    await page.click('[data-testid="nav-pictures"]');

    // URL이 /pictures로 변경되었는지 확인
    await expect(page).toHaveURL('/pictures');

    // 사진보관함 탭이 활성 상태로 변경되었는지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).toHaveClass(/activeTab/);

    // 일기보관함 탭은 비활성 상태로 변경되었는지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).not.toHaveClass(/activeTab/);
  });

  test('일기보관함 네비게이션 클릭 시 페이지 이동 및 활성 상태 변경', async ({
    page,
  }) => {
    // 홈 페이지로 이동 후 일기보관함 탭 클릭 테스트
    await page.goto('/');
    await page.waitForSelector('[data-testid="nav-diaries"]');

    // 일기보관함 탭 클릭
    await page.click('[data-testid="nav-diaries"]');

    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');

    // 일기보관함 탭이 활성 상태로 변경되었는지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/activeTab/);
  });

  test('헤더 로고 클릭 시 일기목록 페이지로 이동', async ({ page }) => {
    // 홈 페이지에서 시작
    await page.goto('/');
    await page.waitForSelector('[data-testid="header-logo"]');

    // 헤더 로고 클릭
    await page.click('[data-testid="header-logo"]');

    // URL이 /diaries로 변경되었는지 확인
    await expect(page).toHaveURL('/diaries');

    // 일기보관함 탭이 활성 상태로 변경되었는지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/activeTab/);
  });

  test('일기 상세 페이지에서도 일기보관함이 활성 상태로 표시되어야 함', async ({
    page,
  }) => {
    // 일기 상세 페이지로 직접 이동 (예: /diaries/1)
    await page.goto('/diaries/1');

    // 페이지 로드 완료 대기
    await page.waitForSelector('[data-testid="nav-diaries"]');

    // 일기보관함 탭이 활성 상태인지 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/activeTab/);

    // 사진보관함 탭은 비활성 상태인지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).not.toHaveClass(/activeTab/);
  });

  test('네비게이션 탭에 cursor pointer 스타일이 적용되어야 함', async ({
    page,
  }) => {
    // 일기보관함 탭의 cursor 스타일 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    const diariesCursor = await diariesTab.evaluate(
      (el) => window.getComputedStyle(el).cursor
    );
    expect(diariesCursor).toBe('pointer');

    // 사진보관함 탭의 cursor 스타일 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    const picturesCursor = await picturesTab.evaluate(
      (el) => window.getComputedStyle(el).cursor
    );
    expect(picturesCursor).toBe('pointer');
  });

  test('헤더 로고에 cursor pointer 스타일이 적용되어야 함', async ({
    page,
  }) => {
    // 헤더 로고의 cursor 스타일 확인
    const headerLogo = page.locator('[data-testid="header-logo"]');
    const logoCursor = await headerLogo.evaluate(
      (el) => window.getComputedStyle(el).cursor
    );
    expect(logoCursor).toBe('pointer');
  });
});
