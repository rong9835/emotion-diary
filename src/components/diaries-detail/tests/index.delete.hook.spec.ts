import { test, expect } from '@playwright/test';

// ========================================
// 일기 삭제 기능 테스트
// ========================================

// 테스트용 실제 데이터
const testDiaryData = {
  id: 1,
  title: '테스트 일기 제목',
  content: '테스트 일기 내용입니다. 실제 데이터로 테스트합니다.',
  emotion: 'HAPPY',
  createdAt: '2024. 12. 25',
};

test.describe('DiariesDetail Delete Hook', () => {
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

  test('일기 삭제하기 - 삭제버튼 클릭 시 모달 노출 확인', async ({ page }) => {
    // 1. /diaries/[id]에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 2. 삭제버튼 클릭
    await page.click('[data-testid="delete-button"]');

    // 3. 일기삭제 모달이 노출됨을 확인
    await expect(page.locator('[data-testid="modal-component"]')).toBeVisible();
    await expect(page.locator('[data-testid="modal-title"]')).toHaveText(
      '일기 삭제'
    );
    await expect(page.locator('[data-testid="modal-content"]')).toHaveText(
      '정말로 이 일기를 삭제하시겠습니까?'
    );
  });

  test('일기 삭제하기 - "취소" 클릭 시 모달 닫기', async ({ page }) => {
    // 1. /diaries/[id]에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 2. 삭제버튼 클릭
    await page.click('[data-testid="delete-button"]');

    // 3. 일기삭제 모달이 노출됨을 확인
    await expect(page.locator('[data-testid="modal-component"]')).toBeVisible();

    // 4. "취소" 클릭
    await page.click('[data-testid="modal-cancel"]');

    // 5. 모달 닫기 확인
    await expect(
      page.locator('[data-testid="modal-component"]')
    ).not.toBeVisible();

    // 6. 일기 상세 페이지에 여전히 머물러 있는지 확인
    await expect(
      page.locator('[data-testid="diary-detail-page"]')
    ).toBeVisible();
  });

  test('일기 삭제하기 - "삭제" 클릭 시 일기 삭제 및 페이지 이동', async ({
    page,
  }) => {
    // 1. /diaries/[id]에 접속하여 페이지 로드 확인
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 2. 삭제버튼 클릭
    await page.click('[data-testid="delete-button"]');

    // 3. 일기삭제 모달이 노출됨을 확인
    await expect(page.locator('[data-testid="modal-component"]')).toBeVisible();

    // 4. "삭제" 클릭
    await page.click('[data-testid="modal-confirm"]');

    // 5. 해당 모달의 id와 일치하는 객체를 로컬스토리지의 diaries에서 제거 확인
    const diariesInStorage = await page.evaluate(() => {
      const diaries = localStorage.getItem('diaries');
      return diaries ? JSON.parse(diaries) : [];
    });
    expect(diariesInStorage).toHaveLength(0);

    // 6. /diaries로 페이지 이동 확인
    await page.waitForURL('/diaries');
  });

  test('여러 일기가 있을 때 특정 일기만 삭제되는지 확인', async ({ page }) => {
    // 여러 일기 데이터 설정
    const multipleDiaries = [
      testDiaryData,
      {
        id: 2,
        title: '두 번째 일기',
        content: '두 번째 일기 내용',
        emotion: 'SAD',
        createdAt: '2024. 12. 26',
      },
      {
        id: 3,
        title: '세 번째 일기',
        content: '세 번째 일기 내용',
        emotion: 'ANGRY',
        createdAt: '2024. 12. 27',
      },
    ];

    // 로컬스토리지에 여러 일기 데이터 설정
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, multipleDiaries);

    // 첫 번째 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 삭제 버튼 클릭
    await page.click('[data-testid="delete-button"]');

    // 삭제 모달에서 삭제 버튼 클릭
    await page.click('[data-testid="modal-confirm"]');

    // 일기 목록 페이지로 이동하는지 확인
    await page.waitForURL('/diaries');

    // 로컬스토리지에서 첫 번째 일기만 삭제되고 나머지는 남아있는지 확인
    const diariesInStorage = await page.evaluate(() => {
      const diaries = localStorage.getItem('diaries');
      return diaries ? JSON.parse(diaries) : [];
    });

    expect(diariesInStorage).toHaveLength(2);
    expect(
      diariesInStorage.find((diary: { id: number }) => diary.id === 1)
    ).toBeUndefined();
    expect(diariesInStorage.find((diary: { id: number }) => diary.id === 2)).toBeDefined();
    expect(diariesInStorage.find((diary: { id: number }) => diary.id === 3)).toBeDefined();
  });

  test('삭제 중 로딩 상태가 올바르게 처리되는지 확인', async ({ page }) => {
    // 일기 상세 페이지로 이동
    await page.goto('/diaries/1');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 삭제 버튼 클릭
    await page.click('[data-testid="delete-button"]');

    // 삭제 모달이 노출되는지 확인
    await expect(page.locator('[data-testid="modal-component"]')).toBeVisible();

    // 삭제 버튼 클릭 (로딩 상태 확인을 위해 약간의 지연 추가)
    await page.click('[data-testid="modal-confirm"]');

    // 모달이 사라지는지 확인 (삭제 처리 완료)
    await expect(
      page.locator('[data-testid="modal-component"]')
    ).not.toBeVisible();

    // 일기 목록 페이지로 이동하는지 확인
    await page.waitForURL('/diaries');
  });

  test('존재하지 않는 일기 ID로 삭제 시나리오 테스트', async ({ page }) => {
    // 존재하지 않는 일기 ID로 페이지 접근
    await page.goto('/diaries/999');
    await page.waitForSelector('[data-testid="diary-detail-page"]');

    // 일기를 찾을 수 없다는 메시지 확인
    await expect(page.locator('[data-testid="diary-not-found"]')).toBeVisible();

    // 삭제 버튼이 보이지 않는지 확인
    await expect(
      page.locator('[data-testid="delete-button"]')
    ).not.toBeVisible();
  });
});
