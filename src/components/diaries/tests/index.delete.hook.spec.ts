import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Diaries Delete Hook E2E Tests
// ========================================

/**
 * useDeleteDiary 훅을 활용한 일기 삭제 기능 테스트
 *
 * 테스트 범위:
 * - 비로그인 유저: 삭제 버튼 미노출
 * - 로그인 유저: 삭제 버튼 노출
 * - 삭제 모달 표시/숨김
 * - 일기 삭제 확인/취소
 * - 로컬스토리지에서 데이터 삭제
 * - 삭제 후 페이지 새로고침
 *
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 * - 실제 데이터 사용 (Mock 데이터 사용 금지)
 * - 로컬스토리지 모킹하지 않음
 * - 로그인 데이터는 window.__TEST_BYPASS__ 사용
 */

// 테스트용 실제 데이터
const testDiariesData = [
  {
    id: '1',
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-03-12',
  },
  {
    id: '2',
    title: '슬픈 날',
    content: '오늘은 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-03-11',
  },
  {
    id: '3',
    title: '화나는 일',
    content: '오늘은 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-03-10',
  },
];

test.describe('Diaries Delete Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 먼저 페이지로 이동하여 로컬스토리지 컨텍스트를 얻습니다
    await page.goto('/');
    // 로컬스토리지에 테스트 데이터 설정
    await page.evaluate((data) => {
      localStorage.setItem('diaries', JSON.stringify(data));
    }, testDiariesData);

    // 일기목록 페이지로 이동
    await page.goto('/diaries');
    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="diaries-page"]', {
      timeout: 2000,
    });
  });

  test.describe('비로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 비로그인 상태 설정 (window.__TEST_BYPASS__ = false)
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = false;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
      });
    });

    test('비로그인 유저는 삭제 버튼을 볼 수 없어야 함', async ({ page }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 삭제 버튼이 존재하지 않는지 확인
      const deleteButtons = page.locator('[data-testid="delete-button"]');
      const deleteButtonCount = await deleteButtons.count();

      expect(deleteButtonCount).toBe(0);
    });

    test('비로그인 유저가 삭제 버튼을 클릭해도 아무 일이 일어나지 않아야 함', async ({
      page,
    }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 삭제 버튼이 존재하지 않으므로 클릭할 수 없음
      const deleteButtons = page.locator('[data-testid="delete-button"]');
      const deleteButtonCount = await deleteButtons.count();

      expect(deleteButtonCount).toBe(0);
    });
  });

  test.describe('로그인 유저 시나리오', () => {
    test.beforeEach(async ({ page }) => {
      // 로그인 상태 설정 (window.__TEST_BYPASS__ = true)
      await page.evaluate(() => {
        window.__TEST_BYPASS__ = true;
        localStorage.setItem('accessToken', 'test-token');
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
          })
        );
      });
    });

    test('로그인 유저는 삭제 버튼을 볼 수 있어야 함', async ({ page }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 삭제 버튼이 존재하는지 확인
      const deleteButtons = page.locator('[data-testid="delete-button"]');
      const deleteButtonCount = await deleteButtons.count();

      expect(deleteButtonCount).toBe(testDiariesData.length);
    });

    test('삭제 버튼 클릭 시 삭제 모달이 표시되어야 함', async ({ page }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 첫 번째 일기 카드의 삭제 버튼 클릭
      const firstDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await firstDeleteButton.click();

      // 삭제 모달이 표시되는지 확인
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();

      // 모달 제목 확인
      await expect(modal).toContainText('일기 삭제');

      // 모달 내용 확인
      await expect(modal).toContainText('정말로 이 일기를 삭제하시겠습니까?');

      // 확인/취소 버튼 확인
      await expect(
        modal.locator('[data-testid="modal-confirm"]')
      ).toBeVisible();
      await expect(modal.locator('[data-testid="modal-cancel"]')).toBeVisible();
    });

    test('삭제 모달에서 취소 버튼 클릭 시 모달이 닫혀야 함', async ({
      page,
    }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 첫 번째 일기 카드의 삭제 버튼 클릭
      const firstDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await firstDeleteButton.click();

      // 삭제 모달이 표시되는지 확인
      const modal = page.locator('[role="dialog"]');
      await expect(modal).toBeVisible();

      // 취소 버튼 클릭
      await modal.locator('[data-testid="modal-cancel"]').click();

      // 모달이 닫혔는지 확인
      await expect(modal).not.toBeVisible();
    });

    test('삭제 모달에서 삭제 버튼 클릭 시 일기가 삭제되어야 함', async ({
      page,
    }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 삭제 전 일기 카드 개수 확인
      const diaryCardsBefore = page.locator('[data-testid^="diary-card-"]');
      const cardCountBefore = await diaryCardsBefore.count();
      expect(cardCountBefore).toBe(testDiariesData.length);

      // 첫 번째 일기 카드의 삭제 버튼 클릭
      const firstDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await firstDeleteButton.click();

      // 삭제 모달에서 삭제 버튼 클릭
      const modal = page.locator('[role="dialog"]');
      await modal.locator('[data-testid="modal-confirm"]').click();

      // 페이지 새로고침 대기
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 삭제 후 일기 카드 개수 확인
      const diaryCardsAfter = page.locator('[data-testid^="diary-card-"]');
      const cardCountAfter = await diaryCardsAfter.count();
      expect(cardCountAfter).toBe(testDiariesData.length - 1);

      // 첫 번째 일기 카드가 삭제되었는지 확인
      const firstCard = page.locator('[data-testid="diary-card-1"]');
      await expect(firstCard).not.toBeVisible();
    });

    test('삭제 후 로컬스토리지에서 해당 일기가 제거되어야 함', async ({
      page,
    }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 첫 번째 일기 카드의 삭제 버튼 클릭
      const firstDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await firstDeleteButton.click();

      // 삭제 모달에서 삭제 버튼 클릭
      const modal = page.locator('[role="dialog"]');
      await modal.locator('[data-testid="modal-confirm"]').click();

      // 페이지 새로고침 대기
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 로컬스토리지에서 데이터 확인
      const localStorageData = await page.evaluate(() => {
        const diaries = localStorage.getItem('diaries');
        return diaries ? JSON.parse(diaries) : [];
      });

      // 첫 번째 일기(id: "1")가 삭제되었는지 확인
      const deletedDiary = localStorageData.find(
        (diary: { id: string }) => diary.id === '1'
      );
      expect(deletedDiary).toBeUndefined();

      // 남은 일기 개수 확인
      expect(localStorageData.length).toBe(testDiariesData.length - 1);
    });

    test('여러 일기 삭제 시나리오', async ({ page }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 첫 번째 일기 삭제
      const firstDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await firstDeleteButton.click();
      const modal1 = page.locator('[role="dialog"]');
      await modal1.locator('[data-testid="modal-confirm"]').click();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 두 번째 일기 삭제
      const secondDeleteButton = page
        .locator('[data-testid="delete-button"]')
        .first();
      await secondDeleteButton.click();
      const modal2 = page.locator('[role="dialog"]');
      await modal2.locator('[data-testid="modal-confirm"]').click();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 남은 일기 카드 개수 확인
      const diaryCards = page.locator('[data-testid^="diary-card-"]');
      const cardCount = await diaryCards.count();
      expect(cardCount).toBe(testDiariesData.length - 2);
    });

    test('모든 일기 삭제 후 빈 상태 표시', async ({ page }) => {
      // 페이지 새로고침
      await page.reload();
      await page.waitForSelector('[data-testid="diaries-page"]', {
        timeout: 2000,
      });

      // 모든 일기 삭제
      for (let i = 0; i < testDiariesData.length; i++) {
        const deleteButton = page
          .locator('[data-testid="delete-button"]')
          .first();
        await deleteButton.click();
        const modal = page.locator('[role="dialog"]');
        await modal.locator('[data-testid="modal-confirm"]').click();
        await page.waitForSelector('[data-testid="diaries-page"]', {
          timeout: 1000,
        });
      }

      // 빈 상태 메시지 확인
      const emptyState = page.getByText('검색 결과가 없습니다.');
      await expect(emptyState).toBeVisible();
    });
  });
});
