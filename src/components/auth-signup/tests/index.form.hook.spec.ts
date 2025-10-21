import { test, expect } from '@playwright/test';

// ========================================
// AuthSignup Form Hook Tests (TDD)
// ========================================

test.describe('회원가입 폼 기능 테스트', () => {
  test.beforeEach(async ({ page }) => {
    // 회원가입 페이지로 이동
    await page.goto('/auth/signup');

    // 페이지가 완전히 로드될 때까지 대기 (data-testid로 식별)
    await page.waitForSelector('[data-testid="signup-container"]');
  });

  // ========================================
  // 1. 폼 검증 테스트
  // ========================================

  test('1-1. 모든 필드가 비어있을 때 회원가입 버튼이 비활성화되어야 함', async ({
    page,
  }) => {
    const submitButton = page.locator('[data-testid="signup-submit-button"]');

    await expect(submitButton).toBeDisabled();
  });

  test('1-2. 모든 필드가 입력되면 회원가입 버튼이 활성화되어야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트');

    const submitButton = page.locator('[data-testid="signup-submit-button"]');
    await expect(submitButton).toBeEnabled();
  });

  test('1-3. 이메일에 @ 미포함 시 에러 메시지가 표시되어야 함', async ({
    page,
  }) => {
    await page.fill('[data-testid="signup-email-input"]', 'invalidemail');
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트');

    await page.click('[data-testid="signup-submit-button"]');

    const errorMessage = page.locator('[data-testid="signup-email-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('1-4. 비밀번호가 영문+숫자 8자리 미만일 때 에러 메시지가 표시되어야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'test'); // 짧은 비밀번호
    await page.fill('[data-testid="signup-password-confirm-input"]', 'test');
    await page.fill('[data-testid="signup-name-input"]', '테스트');

    await page.click('[data-testid="signup-submit-button"]');

    const errorMessage = page.locator('[data-testid="signup-password-error"]');
    await expect(errorMessage).toBeVisible();
  });

  test('1-5. 비밀번호와 비밀번호 확인이 다를 때 에러 메시지가 표시되어야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Different1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트');

    await page.click('[data-testid="signup-submit-button"]');

    const errorMessage = page.locator(
      '[data-testid="signup-password-confirm-error"]'
    );
    await expect(errorMessage).toBeVisible();
  });

  test('1-6. 이름이 1글자 미만일 때 에러 메시지가 표시되어야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', 'a'); // 1글자 입력 (zod 검증에서 실패)

    await page.click('[data-testid="signup-submit-button"]');

    const errorMessage = page.locator('[data-testid="signup-name-error"]');
    await expect(errorMessage).toBeVisible();
  });

  // ========================================
  // 2. API 성공 시나리오 테스트 (실제 데이터)
  // ========================================

  test('2-1. 회원가입 성공 시 가입완료 모달이 표시되어야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    // 유효한 정보 입력
    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자');

    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-submit-button"]');

    // 성공 모달 대기 (네트워크 통신이므로 2000ms 미만 timeout)
    const successModal = page
      .locator('[data-modal-component="true"]')
      .filter({ hasText: '가입이 완료되었습니다' });
    await expect(successModal).toBeVisible({ timeout: 1500 });
  });

  test('2-2. 가입완료 모달에서 확인 클릭 시 로그인 페이지로 이동해야 함', async ({
    page,
  }) => {
    const timestamp = Date.now();

    // 유효한 정보 입력
    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자');

    // 회원가입 버튼 클릭
    await page.click('[data-testid="signup-submit-button"]');

    // 성공 모달 대기
    const successModal = page
      .locator('[data-modal-component="true"]')
      .filter({ hasText: '가입이 완료되었습니다' });
    await expect(successModal).toBeVisible({ timeout: 1500 });

    // 모달의 확인 버튼 클릭
    const confirmButton = successModal.locator('button', { hasText: '확인' });
    await confirmButton.click();

    // 로그인 페이지로 이동되었는지 확인
    await expect(page).toHaveURL('/auth/login');
  });

  test('2-3. 같은 성공 모달은 한 번만 표시되어야 함', async ({ page }) => {
    const timestamp = Date.now();

    // 첫 번째 회원가입
    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자');

    await page.click('[data-testid="signup-submit-button"]');

    const successModal = page
      .locator('[data-modal-component="true"]')
      .filter({ hasText: '가입이 완료되었습니다' });
    await expect(successModal).toBeVisible({ timeout: 1500 });

    const confirmButton = successModal.locator('button', { hasText: '확인' });
    await confirmButton.click();

    // 로그인 페이지로 이동 확인
    await expect(page).toHaveURL('/auth/login');

    // 다시 회원가입 페이지로 돌아가기
    await page.goto('/auth/signup');
    await page.waitForSelector('[data-testid="signup-container"]');

    // 두 번째 회원가입 시도 (다른 이메일)
    const timestamp2 = Date.now();
    await page.fill(
      '[data-testid="signup-email-input"]',
      `test${timestamp2}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자2');

    await page.click('[data-testid="signup-submit-button"]');

    // 성공 모달이 다시 표시되어야 함 (새로운 회원가입이므로)
    await expect(successModal).toBeVisible({ timeout: 1500 });
  });

  // ========================================
  // 3. API 실패 시나리오 테스트 (Mock)
  // ========================================

  test('3-1. 이메일 중복 시 가입실패 모달이 표시되어야 함', async ({
    page,
  }) => {
    // 네트워크 요청 모니터링
    page.on('request', (request) => {
      console.log('Request:', request.url(), request.method());
    });

    page.on('response', (response) => {
      console.log('Response:', response.url(), response.status());
    });

    // GraphQL API를 mocking하여 에러 응답 반환
    await page.route('**/graphql', async (route) => {
      console.log('Intercepted request to:', route.request().url());
      const postData = route.request().postData();
      console.log('Post data:', postData);

      if (postData && postData.includes('createUser')) {
        console.log('Mocking createUser error response');
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [
              {
                message: 'Email already exists',
              },
            ],
          }),
        });
      } else {
        await route.continue();
      }
    });

    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `duplicate${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자');

    // 브라우저 콘솔 로그 확인
    page.on('console', (msg) => {
      console.log('Browser console:', msg.text());
    });

    await page.click('[data-testid="signup-submit-button"]');

    // 잠시 대기하여 콘솔 로그 확인
    await page.waitForTimeout(1000);

    // 실패 모달 대기
    const failureModal = page
      .locator('[data-modal-component="true"]')
      .filter({ hasText: '회원가입에 실패했습니다' });
    await expect(failureModal).toBeVisible({ timeout: 1500 });
  });

  test('3-2. 가입실패 모달에서 확인 클릭 시 모달만 닫히고 페이지는 유지되어야 함', async ({
    page,
  }) => {
    // GraphQL API를 mocking하여 에러 응답 반환
    await page.route('**/graphql', async (route) => {
      const postData = route.request().postData();

      if (postData && postData.includes('createUser')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            errors: [
              {
                message: 'Server error',
              },
            ],
          }),
        });
      } else {
        await route.continue();
      }
    });

    const timestamp = Date.now();

    await page.fill(
      '[data-testid="signup-email-input"]',
      `error${timestamp}@example.com`
    );
    await page.fill('[data-testid="signup-password-input"]', 'Test1234');
    await page.fill(
      '[data-testid="signup-password-confirm-input"]',
      'Test1234'
    );
    await page.fill('[data-testid="signup-name-input"]', '테스트사용자');

    // 브라우저 콘솔 로그 확인
    page.on('console', (msg) => {
      console.log('Browser console:', msg.text());
    });

    await page.click('[data-testid="signup-submit-button"]');

    // 잠시 대기하여 콘솔 로그 확인
    await page.waitForTimeout(1000);

    // 실패 모달 대기
    const failureModal = page
      .locator('[data-modal-component="true"]')
      .filter({ hasText: '회원가입에 실패했습니다' });
    await expect(failureModal).toBeVisible({ timeout: 1500 });

    // 모달의 확인 버튼 클릭
    const confirmButton = failureModal.locator('button', { hasText: '확인' });
    await confirmButton.click();

    // 모달이 닫혔는지 확인
    await expect(failureModal).not.toBeVisible();

    // 여전히 회원가입 페이지에 있는지 확인
    await expect(page).toHaveURL('/auth/signup');
  });
});
