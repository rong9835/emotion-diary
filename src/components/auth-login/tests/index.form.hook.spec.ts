import { test, expect } from '@playwright/test';

// ========================================
// 로그인 폼 테스트
// ========================================

test.describe('로그인 폼 기능 테스트', () => {
  // ========================================
  // 1. 폼 입력 및 버튼 활성화 테스트
  // ========================================
  test('모든 인풋이 입력되면 로그인 버튼이 활성화되어야 한다', async ({
    page,
  }) => {
    // 페이지 이동
    await page.goto('/auth/login');

    // 페이지 로드 대기 (data-testid 기반)
    await page.waitForSelector('[data-testid="login-form"]');

    // 초기 상태: 버튼 비활성화
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeDisabled();

    // 이메일 입력
    const emailInput = page.locator('[data-testid="login-email-input"]');
    await emailInput.fill('qwer@qwer.com');

    // 비밀번호 입력 전: 버튼 여전히 비활성화
    await expect(submitButton).toBeDisabled();

    // 비밀번호 입력
    const passwordInput = page.locator('[data-testid="login-password-input"]');
    await passwordInput.fill('qwer1234');

    // 모든 필드 입력 후: 버튼 활성화
    await expect(submitButton).toBeEnabled();
  });

  // ========================================
  // 2. 로그인 성공 시나리오 (실제 API)
  // ========================================
  test('로그인에 성공하면 accessToken과 사용자 정보를 받아와야 한다', async ({
    page,
  }) => {
    // 페이지 이동
    await page.goto('/auth/login');

    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="login-form"]');

    // 로그인 정보 입력
    await page
      .locator('[data-testid="login-email-input"]')
      .fill('qwer@qwer.com');
    await page.locator('[data-testid="login-password-input"]').fill('qwer1234');

    // 로그인 버튼 클릭
    await page.locator('[data-testid="login-submit-button"]').click();

    // 모달 표시 검증
    const modal = page.locator('[data-modal-component="true"]');
    await expect(modal).toBeVisible({ timeout: 15000 });

    // 모달 내용 검증 (로그인 완료)
    const modalTitle = page.locator('[data-testid="modal-title"]');
    await expect(modalTitle).toHaveText('로그인 완료');

    const modalContent = page.locator('[data-testid="modal-content"]');
    await expect(modalContent).toHaveText('로그인이 완료되었습니다');

    // 로컬스토리지 검증
    const accessToken = await page.evaluate(() =>
      localStorage.getItem('accessToken')
    );
    const userStr = await page.evaluate(() => localStorage.getItem('user'));

    expect(accessToken).toBeTruthy();
    expect(userStr).toBeTruthy();

    if (userStr) {
      const user = JSON.parse(userStr);
      expect(user.id).toBeTruthy();
      expect(user.name).toBeTruthy();
    }

    // 확인 버튼 클릭
    await page.locator('button:has-text("확인")').click();

    // 일기목록 페이지로 이동 확인
    await expect(page).toHaveURL('/diaries', { timeout: 15000 });
  });

  // ========================================
  // 3. 로그인 실패 시나리오 (모킹)
  // ========================================
  test('로그인에 실패하면 에러 모달이 표시되어야 한다', async ({ page }) => {
    // API 모킹 (실패 응답)
    await page.route('**/graphql', async (route) => {
      const request = route.request();
      const postData = request.postDataJSON();

      if (postData?.query?.includes('loginUser')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [
              {
                message: '이메일 또는 비밀번호가 일치하지 않습니다.',
              },
            ],
          }),
        });
      } else {
        await route.continue();
      }
    });

    // 페이지 이동
    await page.goto('/auth/login');

    // 페이지 로드 대기
    await page.waitForSelector('[data-testid="login-form"]');

    // 로그인 정보 입력 (잘못된 정보)
    await page
      .locator('[data-testid="login-email-input"]')
      .fill('wrong@test.com');
    await page
      .locator('[data-testid="login-password-input"]')
      .fill('wrongpass');

    // 로그인 버튼 클릭
    await page.locator('[data-testid="login-submit-button"]').click();

    // 에러 모달 표시 확인
    await expect(page.locator('[data-modal-component="true"]')).toBeVisible();

    // 모달 내용 검증 (로그인 실패)
    await expect(page.locator('text=로그인 실패')).toBeVisible();

    // 확인 버튼 클릭
    await page.locator('button:has-text("확인")').click();

    // 모달이 닫히는지 확인
    await expect(
      page.locator('[data-modal-component="true"]')
    ).not.toBeVisible();

    // 로그인 페이지에 그대로 있는지 확인
    await expect(page).toHaveURL('/auth/login');
  });

  // ========================================
  // 4. Zod 검증 테스트
  // ========================================
  test('이메일에 @가 없으면 검증 에러가 발생해야 한다', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForSelector('[data-testid="login-form"]');

    // @가 없는 이메일 입력
    await page
      .locator('[data-testid="login-email-input"]')
      .fill('invalidemail');
    await page.locator('[data-testid="login-password-input"]').fill('qwer1234');

    // 버튼은 활성화되어야 함 (모든 필드 입력됨)
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeEnabled();

    // 제출 시도
    await submitButton.click();

    // 에러 메시지가 표시되어야 함
    await expect(page.locator('text=이메일에 @를 포함해주세요')).toBeVisible();
  });

  test('비밀번호가 비어있으면 버튼이 비활성화되어야 한다', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForSelector('[data-testid="login-form"]');

    // 이메일만 입력
    await page
      .locator('[data-testid="login-email-input"]')
      .fill('test@test.com');

    // 버튼은 비활성화 상태
    const submitButton = page.locator('[data-testid="login-submit-button"]');
    await expect(submitButton).toBeDisabled();
  });
});
