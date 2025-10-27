import { test, expect } from '@playwright/test';

// 테스트용 실제 데이터
const testDiaryData = {
  id: 1,
  title: '테스트 일기 제목',
  content: '테스트 일기 내용입니다. 실제 데이터로 테스트합니다.',
  emotion: 'HAPPY',
  createdAt: '2024. 12. 25',
};

test.describe('DiariesDetail Retrospect Form Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 페이지로 이동
    await page.goto('/auth/login');
    await page.waitForSelector('[data-testid="login-form"]');

    // 로그인 정보 입력
    await page.fill('input[name="email"]', 'qwer@qwer.com');
    await page.fill('input[name="password"]', 'qwer1234');
    await page.click('[data-testid="login-submit-button"]');

    // 로그인 성공 모달 확인 및 클릭
    const modalConfirmButton = page
      .locator('[data-modal-component="true"]')
      .locator('button:has-text("확인")');
    await expect(modalConfirmButton).toBeVisible();
    await modalConfirmButton.click();

    // 일기 목록 페이지로 이동 대기
    await page.waitForURL('/diaries');

    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify([data]));
    }, testDiaryData);
  });

  test('회고 입력이 비어있으면 등록 버튼이 비활성화되어 있는지 확인', async ({
    page,
  }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 초기 상태에서 입력이 비어있을 때 버튼이 비활성화되어 있는지 확인
    await expect(inputField).toHaveValue('');
    await expect(submitButton).toBeDisabled();
  });

  test('회고 입력이 있으면 등록 버튼이 활성화되는지 확인', async ({ page }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 입력하기
    await inputField.fill('3년이 지나고 다시 보니 이때가 그립다.');

    // 버튼이 활성화되었는지 확인
    await expect(submitButton).toBeEnabled();
  });

  test('로컬스토리지에 retrospects가 없을 때 회고를 등록하면 id를 1로 설정하여 저장', async ({
    page,
  }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 회고 입력
    const retrospectContent = '3년이 지나고 다시 보니 이때가 그립다.';
    await inputField.fill(retrospectContent);

    // 등록 버튼 클릭
    await submitButton.click();

    // 페이지 새로고침을 기다림
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });

    // 검증
    expect(retrospects).not.toBeNull();
    expect(Array.isArray(retrospects)).toBe(true);
    expect(retrospects.length).toBe(1);
    expect(retrospects[0]).toMatchObject({
      id: 1,
      content: retrospectContent,
      diaryId: 1,
    });
    expect(retrospects[0].createdAt).toBeDefined();
  });

  test('로컬스토리지에 retrospects가 이미 존재할 때 회고를 등록하면 기존 배열에 추가되고 id는 최대값+1로 설정', async ({
    page,
  }) => {
    // 기존 retrospects 데이터 설정
    await page.goto('/');
    await page.evaluate(() => {
      const existingRetrospects = [
        {
          id: 1,
          content: '첫 번째 회고',
          diaryId: 1,
          createdAt: '2024. 12. 24',
        },
        {
          id: 3,
          content: '세 번째 회고',
          diaryId: 1,
          createdAt: '2024. 12. 25',
        },
      ];
      localStorage.setItem('retrospects', JSON.stringify(existingRetrospects));
    });

    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 새로운 회고 입력
    const newRetrospectContent = '네 번째 회고';
    await inputField.fill(newRetrospectContent);

    // 등록 버튼 클릭
    await submitButton.click();

    // 페이지 새로고침을 기다림
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 로컬스토리지 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });

    // 검증
    expect(retrospects).not.toBeNull();
    expect(Array.isArray(retrospects)).toBe(true);
    expect(retrospects.length).toBe(3);

    // 마지막 항목 확인 (새로 추가된 항목)
    const newRetrospect = retrospects[retrospects.length - 1];
    expect(newRetrospect).toMatchObject({
      id: 4, // 최대값(3) + 1
      content: newRetrospectContent,
      diaryId: 1,
    });
    expect(newRetrospect.createdAt).toBeDefined();
  });

  test('회고 등록 후 입력 필드가 초기화되는지 확인', async ({ page }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 회고 입력
    await inputField.fill('테스트 회고 내용');

    // 등록 버튼 클릭
    await submitButton.click();

    // 페이지 새로고침 후 입력 필드가 비어있는지 확인
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 검증
    await expect(inputField).toHaveValue('');
  });

  test('회고 등록 시 현재 diaryId가 올바르게 저장되는지 확인', async ({
    page,
  }) => {
    // diaryId가 다른 일기 생성
    await page.goto('/');
    await page.evaluate(() => {
      const diaries = [
        {
          id: 1,
          title: '일기 1',
          content: '내용 1',
          emotion: 'HAPPY',
          createdAt: '2024. 12. 25',
        },
        {
          id: 2,
          title: '일기 2',
          content: '내용 2',
          emotion: 'SAD',
          createdAt: '2024. 12. 26',
        },
      ];
      localStorage.setItem('diaries', JSON.stringify(diaries));
    });

    // diaryId 2인 일기에 접속
    await page.goto('/diaries/2');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 회고 입력
    await inputField.fill('일기 2에 대한 회고');

    // 등록 버튼 클릭
    await submitButton.click();

    // 페이지 새로고침을 기다림
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 로컬스토리지에서 diaryId 확인
    const retrospects = await page.evaluate(() => {
      const data = localStorage.getItem('retrospects');
      return data ? JSON.parse(data) : null;
    });

    // 검증
    expect(retrospects).not.toBeNull();
    expect(retrospects[0].diaryId).toBe(2);
  });

  test('회고가 없을 때 빈 상태 메시지가 표시되는지 확인', async ({ page }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 회고 목록 영역에서 빈 상태 메시지 확인
    const emptyMessage = page.locator(
      'text=아직 회고가 없습니다. 첫 번째 회고를 남겨보세요.'
    );
    await expect(emptyMessage).toBeVisible();
  });

  test('회고 목록이 실시간으로 업데이트되는지 확인', async ({ page }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 초기에는 빈 상태 메시지가 보여야 함
    const emptyMessage = page.locator(
      'text=아직 회고가 없습니다. 첫 번째 회고를 남겨보세요.'
    );
    await expect(emptyMessage).toBeVisible();

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 첫 번째 회고 입력
    await inputField.fill('첫 번째 회고입니다.');
    await submitButton.click();

    // 페이지 새로고침 대기
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 빈 상태 메시지가 사라지고 회고 목록이 표시되어야 함
    await expect(emptyMessage).not.toBeVisible();

    const retrospectItem = page.locator('text=첫 번째 회고입니다.').first();
    await expect(retrospectItem).toBeVisible();

    // 두 번째 회고 추가
    const newInputField = page.locator('[data-testid="retrospect-input"]');
    const newSubmitButton = page.locator('[data-testid="retrospect-submit"]');

    await newInputField.fill('두 번째 회고입니다.');
    await newSubmitButton.click();

    // 페이지 새로고침 대기
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 두 개의 회고가 모두 표시되어야 함
    await expect(page.locator('text=첫 번째 회고입니다.')).toBeVisible();
    await expect(page.locator('text=두 번째 회고입니다.')).toBeVisible();
  });

  test('회고 입력 중 에러가 발생했을 때 적절한 처리가 되는지 확인', async ({
    page,
  }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 로컬스토리지 접근을 차단하여 에러 상황 시뮬레이션
    await page.evaluate(() => {
      localStorage.setItem = () => {
        throw new Error('Storage quota exceeded');
      };
    });

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 회고 입력
    await inputField.fill('에러 테스트 회고');
    await submitButton.click();

    // 에러가 발생해도 페이지가 정상적으로 동작해야 함
    await page.waitForLoadState('load');
    await expect(
      page.locator('[data-testid="diary-detail-page"]')
    ).toBeVisible();
  });

  test('회고 입력 시 로딩 상태가 적절히 처리되는지 확인', async ({ page }) => {
    // 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드와 버튼 찾기
    const inputField = page.locator('[data-testid="retrospect-input"]');
    const submitButton = page.locator('[data-testid="retrospect-submit"]');

    // 회고 입력
    await inputField.fill('로딩 테스트 회고');

    // 버튼이 활성화되어 있는지 확인
    await expect(submitButton).toBeEnabled();

    // 등록 버튼 클릭
    await submitButton.click();

    // 버튼이 일시적으로 비활성화될 수 있음 (제출 중 상태)
    // 페이지 새로고침 후 정상 상태로 돌아와야 함
    await page.waitForLoadState('load');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 입력 필드가 초기화되고 버튼이 다시 활성화되어야 함
    await expect(inputField).toHaveValue('');
    await expect(submitButton).toBeDisabled(); // 빈 입력이므로 비활성화
  });
});
