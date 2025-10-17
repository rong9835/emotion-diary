import { test, expect } from '@playwright/test';

// 테스트용 실제 데이터
const testDiaryData = {
  id: 1,
  title: '테스트 일기 제목',
  content: '테스트 일기 내용입니다. 실제 데이터로 테스트합니다.',
  emotion: 'HAPPY',
  createdAt: '2024. 12. 25'
};

test.describe('DiariesDetail Binding Hook', () => {
  test.beforeEach(async ({ page }) => {
    // 먼저 페이지로 이동하여 로컬스토리지 컨텍스트를 얻습니다
    await page.goto('/');
    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify([data]));
    }, testDiaryData);
  });

  test('일기 상세 페이지에서 실제 데이터가 올바르게 바인딩되는지 확인', async ({ page }) => {
    // 데이터가 설정된 후 상세 페이지로 이동
    await page.goto('/diaries/1');
    // 페이지 로드 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="diary-detail-page"]');
    
    // 제목 확인
    await expect(page.locator('[data-testid="diary-title"]')).toHaveText(testDiaryData.title);
    
    // 감정 아이콘 확인
    await expect(page.locator('[data-testid="emotion-icon"]')).toBeVisible();
    
    // 감정 텍스트 확인
    await expect(page.locator('[data-testid="emotion-text"]')).toHaveText('행복해요');
    
    // 작성일 확인
    await expect(page.locator('[data-testid="diary-date"]')).toHaveText(testDiaryData.createdAt);
    
    // 내용 확인
    await expect(page.locator('[data-testid="diary-content"]')).toHaveText(testDiaryData.content);
  });

  test('존재하지 않는 ID로 접근 시 적절한 처리 확인', async ({ page }) => {
    // 존재하지 않는 ID로 페이지 접근
    await page.goto('/diaries/999');
    await page.waitForSelector('[data-testid="diary-detail-page"]');
    
    // 에러 메시지 또는 빈 상태 확인
    await expect(page.locator('[data-testid="diary-not-found"]')).toBeVisible();
  });

  test('로컬스토리지에 데이터가 없는 경우 처리 확인', async ({ page }) => {
    // 로컬스토리지 비우기
    await page.goto('/diaries/1');
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });
    
    await page.reload();
    await page.waitForSelector('[data-testid="diary-detail-page"]');
    
    // 빈 상태 또는 에러 메시지 확인
    await expect(page.locator('[data-testid="diary-not-found"]')).toBeVisible();
  });

  test('다양한 감정 타입의 데이터 바인딩 확인', async ({ page }) => {
    const emotionTestData = [
      { emotion: 'SAD', expectedText: '슬퍼요' },
      { emotion: 'ANGRY', expectedText: '화나요' },
      { emotion: 'SURPRISE', expectedText: '놀랐어요' },
      { emotion: 'ETC', expectedText: '기타' }
    ];

    for (const testCase of emotionTestData) {
      const testData = { ...testDiaryData, emotion: testCase.emotion };

      // 로컬스토리지에 테스트 데이터 설정
      await page.evaluate((data) => {
        localStorage.setItem('diaries', JSON.stringify([data]));
      }, testData);

      // 상세 페이지로 이동
      await page.goto('/diaries/1');
      await page.waitForSelector('[data-testid="diary-detail-page"]');

      // 감정 텍스트 확인
      await expect(page.locator('[data-testid="emotion-text"]')).toHaveText(testCase.expectedText);
    }
  });
});
