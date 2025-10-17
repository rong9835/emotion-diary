import { test, expect } from '@playwright/test';

test.describe('일기쓰기 폼 등록 기능', () => {
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

  test('모든 인풋이 입력되면 등록하기 버튼이 활성화된다', async ({ page }) => {
    // 초기 상태: 등록하기 버튼이 비활성화되어 있는지 확인
    const submitButton = page.locator('button:has-text("등록하기")');
    await expect(submitButton).toBeDisabled();

    // 감정 선택 (기본값이 HAPPY로 설정되어 있으므로 이미 선택됨)
    // 제목 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 제목');

    // 내용 입력
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '테스트 내용입니다.'
    );

    // 모든 필드가 입력되면 등록하기 버튼이 활성화되는지 확인
    await expect(submitButton).toBeEnabled();
  });

  test('등록하기 버튼 클릭시 로컬스토리지에 일기가 저장된다', async ({
    page,
  }) => {
    // 폼 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 제목');
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '테스트 내용입니다.'
    );

    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');

    // 로컬스토리지에 데이터가 저장되었는지 확인
    const diariesData = await page.evaluate(() => {
      return localStorage.getItem('diaries');
    });

    expect(diariesData).toBeTruthy();

    const diaries = JSON.parse(diariesData!);
    expect(diaries).toHaveLength(1);
    expect(diaries[0]).toMatchObject({
      id: 1,
      title: '테스트 제목',
      content: '테스트 내용입니다.',
      emotion: 'HAPPY',
      createdAt: expect.any(String),
    });
  });

  test('기존 일기가 있을 때 새 일기를 추가하면 id가 증가한다', async ({
    page,
  }) => {
    // 기존 일기 데이터를 로컬스토리지에 설정
    await page.evaluate(() => {
      localStorage.setItem(
        'diaries',
        JSON.stringify([
          {
            id: 1,
            title: '기존 일기',
            content: '기존 내용',
            emotion: 'SAD',
            createdAt: '2024-01-01T00:00:00.000Z',
          },
        ])
      );
    });

    // 폼 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '새로운 일기');
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '새로운 내용입니다.'
    );

    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');

    // 로컬스토리지에 기존 일기와 새 일기가 모두 있는지 확인
    const diariesData = await page.evaluate(() => {
      return localStorage.getItem('diaries');
    });

    const diaries = JSON.parse(diariesData!);
    expect(diaries).toHaveLength(2);
    expect(diaries[1]).toMatchObject({
      id: 2,
      title: '새로운 일기',
      content: '새로운 내용입니다.',
      emotion: 'HAPPY',
      createdAt: expect.any(String),
    });
  });

  test('등록 완료 후 등록완료 모달이 노출된다', async ({ page }) => {
    // 폼 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 제목');
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '테스트 내용입니다.'
    );

    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');

    // 등록완료 모달이 노출되는지 확인
    await expect(
      page.locator('[data-testid="diary-register-success-modal"]')
    ).toBeVisible();

    const modal = page.locator('[data-testid="diary-register-success-modal"]');
    await expect(modal).toBeVisible();
    await expect(modal).toContainText('일기가 성공적으로 등록되었습니다.');
  });

  test('등록완료 모달의 확인 버튼을 누르면 상세페이지로 이동하고 모든 모달이 닫힌다', async ({
    page,
  }) => {
    // 폼 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '테스트 제목');
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '테스트 내용입니다.'
    );

    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');

    // 등록완료 모달 확인 버튼 클릭
    await expect(
      page.locator('[data-testid="diary-register-success-modal"]')
    ).toBeVisible();
    await page.click(
      '[data-testid="diary-register-success-modal"] button:has-text("확인")'
    );

    // 상세페이지로 이동했는지 확인
    await expect(page).toHaveURL(/\/diaries\/1/);

    // 모든 모달이 닫혔는지 확인
    await expect(
      page.locator('[data-testid="diary-write-modal"]')
    ).not.toBeVisible();
    await expect(
      page.locator('[data-testid="diary-register-success-modal"]')
    ).not.toBeVisible();
  });

  test('감정을 변경할 수 있다', async ({ page }) => {
    // 슬퍼요 감정 선택
    await page.click('label:has-text("슬퍼요")');

    // 폼 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '슬픈 일기');
    await page.fill(
      'textarea[placeholder="내용을 입력합니다."]',
      '슬픈 내용입니다.'
    );

    // 등록하기 버튼 클릭
    await page.click('button:has-text("등록하기")');

    // 로컬스토리지에 SAD 감정으로 저장되었는지 확인
    const diariesData = await page.evaluate(() => {
      return localStorage.getItem('diaries');
    });

    const diaries = JSON.parse(diariesData!);
    expect(diaries[0].emotion).toBe('SAD');
  });

  test('빈 제목이나 내용이 있으면 등록하기 버튼이 비활성화된다', async ({
    page,
  }) => {
    const submitButton = page.locator('button:has-text("등록하기")');

    // 제목만 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '제목만');
    await expect(submitButton).toBeDisabled();

    // 내용만 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '내용만');
    await expect(submitButton).toBeDisabled();

    // 공백만 입력
    await page.fill('input[placeholder="제목을 입력합니다."]', '   ');
    await page.fill('textarea[placeholder="내용을 입력합니다."]', '   ');
    await expect(submitButton).toBeDisabled();
  });
});
