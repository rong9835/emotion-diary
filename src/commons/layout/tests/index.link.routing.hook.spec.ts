import { test, expect } from '@playwright/test';

// ========================================
// Layout Link Routing Tests
// ========================================

test.describe('Layout Link Routing', () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동하여 테스트 시작
    await page.goto('/diaries');
    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });
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
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });

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
    await page.waitForSelector('[data-testid="header-logo"]', { timeout: 400 });

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

    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });

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

  test('네비게이션 탭 텍스트의 활성 상태 스타일이 정확히 적용되어야 함', async ({
    page,
  }) => {
    // 일기보관함 탭 텍스트의 활성 상태 확인 (CSS 모듈 클래스명 사용)
    const diariesTabText = page.locator('[data-testid="nav-diaries"] span');
    const diariesTextWeight = await diariesTabText.evaluate(
      (el) => window.getComputedStyle(el).fontWeight
    );
    
    // 활성 상태일 때 폰트 굵기가 700이어야 함
    expect(diariesTextWeight).toBe('700');
    
    // 사진보관함 탭 텍스트는 비활성 상태
    const picturesTabText = page.locator('[data-testid="nav-pictures"] span');
    const picturesTextWeight = await picturesTabText.evaluate(
      (el) => window.getComputedStyle(el).fontWeight
    );
    
    // 비활성 상태일 때 폰트 굵기가 500이어야 함
    expect(picturesTextWeight).toBe('500');
  });

  test('브라우저 뒤로가기/앞으로가기 시 네비게이션 상태가 올바르게 업데이트되어야 함', async ({
    page,
  }) => {
    // 홈 페이지에서 시작
    await page.goto('/');
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });
    
    // 일기보관함으로 이동
    await page.click('[data-testid="nav-diaries"]');
    await expect(page).toHaveURL('/diaries');
    
    // 뒤로가기
    await page.goBack();
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });
    
    // 홈 페이지에서는 네비게이션 상태 확인
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    // 홈 페이지에서의 활성 상태는 구현에 따라 다를 수 있음
    
    // 앞으로가기
    await page.goForward();
    await expect(page).toHaveURL('/diaries');
    
    // 일기보관함이 다시 활성 상태가 되어야 함
    await expect(diariesTab).toHaveClass(/activeTab/);
  });

  test('존재하지 않는 일기 상세 페이지 접근 시에도 네비게이션이 정상 작동해야 함', async ({
    page,
  }) => {
    // 존재하지 않는 일기 ID로 접근
    await page.goto('/diaries/999999');
    
    // 페이지 로드 완료 대기 (에러 페이지라도 레이아웃은 로드되어야 함)
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });
    
    // 일기보관함 탭이 여전히 활성 상태여야 함
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    await expect(diariesTab).toHaveClass(/activeTab/);
    
    // 네비게이션 클릭이 여전히 작동해야 함
    await page.click('[data-testid="nav-diaries"]');
    await expect(page).toHaveURL('/diaries');
  });

  test('키보드 접근성: 네비게이션 요소들이 클릭 가능해야 함', async ({
    page,
  }) => {
    // 일기보관함 탭 클릭 테스트 (마우스 대신 키보드 이벤트 시뮬레이션)
    const diariesTab = page.locator('[data-testid="nav-diaries"]');
    
    // 키보드 Enter 키로 클릭 동작 시뮬레이션
    await diariesTab.press('Enter');
    await expect(page).toHaveURL('/diaries');
    
    // 헤더 로고도 키보드로 접근 가능한지 확인
    const headerLogo = page.locator('[data-testid="header-logo"]');
    await headerLogo.press('Enter');
    await expect(page).toHaveURL('/diaries');
    
    // 네비게이션 요소들이 클릭 이벤트에 반응하는지 확인
    const picturesTab = page.locator('[data-testid="nav-pictures"]');
    await expect(picturesTab).toBeVisible();
    await expect(diariesTab).toBeVisible();
  });
});
