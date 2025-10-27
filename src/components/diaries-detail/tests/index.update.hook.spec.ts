import { test, expect } from '@playwright/test';

// ========================================
// 일기 수정 기능 테스트
// ========================================

test.describe('일기 수정 기능 테스트 (로그인 유저)', () => {
  // 테스트 전에 로그인 상태 및 테스트 데이터 설정
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

    // 테스트 일기 데이터 추가
    await page.evaluate(() => {
      const testDiary = {
        id: 1,
        title: '테스트 일기',
        content: '테스트 내용',
        emotion: 'HAPPY',
        createdAt: '2025-01-20T00:00:00.000Z',
      };
      localStorage.setItem('diaries', JSON.stringify([testDiary]));
    });
  });

  test('일기 수정 전체 플로우 테스트', async ({ page }) => {
    // 1. 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 초기 데이터 확인
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText(
      '테스트 일기'
    );
    await expect(page.locator('[data-testid="diary-content"]')).toHaveText(
      '테스트 내용'
    );
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText(
      '행복해요'
    );

    // 2. 수정 버튼 클릭
    const editButton = page.locator('button:has-text("수정")');
    await expect(editButton).toBeVisible();
    await editButton.click();

    // 3. 수정 모드로 전환 확인 - 입력 필드들이 표시되어야 함
    const titleInput = page.locator('input[name="title"]');
    const contentTextarea = page.locator('textarea[name="content"]');
    await expect(titleInput).toBeVisible();
    await expect(contentTextarea).toBeVisible();

    // 기존 값이 입력 필드에 채워져 있어야 함
    await expect(titleInput).toHaveValue('테스트 일기');
    await expect(contentTextarea).toHaveValue('테스트 내용');

    // 감정 라디오 버튼들이 표시되어야 함
    const emotionRadioHappy = page.locator(
      'input[name="emotion"][value="HAPPY"]'
    );
    await expect(emotionRadioHappy).toBeChecked();

    // 4. 회고 입력창이 비활성화되어야 함
    const retrospectInput = page.locator('[data-testid="retrospect-input"]');
    await expect(retrospectInput).toBeDisabled();

    // 5. 수정 모드에서 값 변경
    await titleInput.fill('수정된 제목');
    await contentTextarea.fill('수정된 내용');

    // 감정 변경 (HAPPY -> SAD)
    // 라디오 버튼은 display: none이므로 라벨을 클릭
    const emotionLabelSad = page.locator('label:has-text("슬퍼요")');
    await emotionLabelSad.click();

    // 라디오 버튼이 체크되었는지 확인
    const emotionRadioSad = page.locator('input[name="emotion"][value="SAD"]');
    await expect(emotionRadioSad).toBeChecked();

    // 6. 수정 하기 버튼 클릭
    const submitButton = page.locator(
      'button[type="submit"]:has-text("수정 하기")'
    );
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // 7. 수정 완료 후 읽기 모드로 돌아가고 리프레시 확인
    // 입력 필드가 사라지고 읽기 모드로 전환
    await expect(titleInput).not.toBeVisible();
    await expect(contentTextarea).not.toBeVisible();

    // 변경된 데이터가 표시되어야 함
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText(
      '수정된 제목'
    );
    await expect(page.locator('[data-testid="diary-content"]')).toHaveText(
      '수정된 내용'
    );
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText(
      '슬퍼요'
    );

    // 8. 회고 입력창이 다시 활성화되어야 함
    await expect(retrospectInput).not.toBeDisabled();

    // 9. 로컬스토리지에 변경사항이 저장되었는지 확인
    const updatedDiary = await page.evaluate(() => {
      const diaries = localStorage.getItem('diaries');
      return diaries ? JSON.parse(diaries)[0] : null;
    });

    expect(updatedDiary).toMatchObject({
      id: 1,
      title: '수정된 제목',
      content: '수정된 내용',
      emotion: 'SAD',
    });
  });

  test('수정 취소 시 원래 데이터로 복구되어야 함', async ({ page }) => {
    // 1. 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 2. 수정 버튼 클릭
    const editButton = page.locator('button:has-text("수정")');
    await editButton.click();

    // 3. 값 변경
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill('변경할 제목');

    // 4. 취소 버튼 클릭 (수정 모드에는 취소 버튼이 있어야 함)
    const cancelButton = page.locator('button:has-text("취소")');
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();

    // 5. 읽기 모드로 돌아가고 원래 데이터가 표시되어야 함
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText(
      '테스트 일기'
    );
  });

  test('필수 필드가 비어있으면 제출 버튼이 비활성화되어야 함', async ({
    page,
  }) => {
    // 1. 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 2. 수정 버튼 클릭
    const editButton = page.locator('button:has-text("수정")');
    await editButton.click();

    // 3. 제목 필드를 비움
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill('');

    // 4. 제출 버튼이 비활성화되어야 함
    // 수정 하기 버튼만 선택 (회고 입력 버튼 제외)
    const submitButton = page.locator(
      'button[type="submit"]:has-text("수정 하기")'
    );
    await expect(submitButton).toBeDisabled();

    // 5. 제목을 다시 입력하면 제출 버튼이 활성화되어야 함
    await titleInput.fill('새 제목');
    await expect(submitButton).not.toBeDisabled();
  });
});
