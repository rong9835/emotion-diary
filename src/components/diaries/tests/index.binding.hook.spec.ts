import { test, expect } from '@playwright/test';
import { EmotionType } from '@/commons/constants/enum';

// ========================================
// Diaries Binding Hook E2E Tests
// ========================================

/**
 * useDiariesBinding 훅을 활용한 일기 데이터 바인딩 테스트
 *
 * 테스트 범위:
 * - 로컬스토리지에서 일기 데이터 로드
 * - 일기 카드에 실제 데이터 바인딩
 * - 감정별 이미지 및 텍스트 매핑
 * - 제목 ellipsis 처리
 * - 작성일 포맷 표시
 *
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 * - 실제 데이터 사용 (Mock 데이터 사용 금지)
 * - 로컬스토리지 모킹하지 않음
 */

// 테스트용 실제 데이터
const testDiariesData = [
  {
    id: 1,
    title: '행복한 하루',
    content: '오늘은 정말 행복한 하루였다.',
    emotion: EmotionType.HAPPY,
    createdAt: '2024-03-12',
  },
  {
    id: 2,
    title: '슬픈 날',
    content: '오늘은 슬픈 일이 있었다.',
    emotion: EmotionType.SAD,
    createdAt: '2024-03-11',
  },
  {
    id: 3,
    title: '화나는 일',
    content: '오늘은 화가 났다.',
    emotion: EmotionType.ANGRY,
    createdAt: '2024-03-10',
  },
  {
    id: 4,
    title: '놀라운 경험',
    content: '오늘은 놀라운 경험을 했다.',
    emotion: EmotionType.SURPRISE,
    createdAt: '2024-03-09',
  },
  {
    id: 5,
    title: '기타 감정',
    content: '오늘은 복잡한 감정이었다.',
    emotion: EmotionType.ETC,
    createdAt: '2024-03-08',
  },
];

// 긴 제목 테스트 데이터
const longTitleDiary = {
  id: 6,
  title:
    '이것은 매우 긴 제목입니다. 일기카드 사이즈를 넘어가는 제목이므로 말줄임표로 표시되어야 합니다.',
  content: '긴 제목 테스트',
  emotion: EmotionType.HAPPY,
  createdAt: '2024-03-07',
};

test.describe('Diaries Binding Hook Tests', () => {
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
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });
  });

  test('로컬스토리지에서 일기 데이터를 로드하여 표시해야 함', async ({
    page,
  }) => {
    // 일기 카드들이 렌더링되었는지 확인
    const diaryCards = page.locator('[data-testid^="diary-card-"]');
    const cardCount = await diaryCards.count();

    // 테스트 데이터 개수만큼 카드가 렌더링되어야 함
    expect(cardCount).toBe(testDiariesData.length);
  });

  test('각 일기 카드에 제목이 올바르게 바인딩되어야 함', async ({ page }) => {
    // 첫 번째 일기 카드 확인
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard.locator('[data-testid="diary-title"]')).toHaveText(
      testDiariesData[0].title
    );

    // 두 번째 일기 카드 확인
    const secondCard = page.locator('[data-testid="diary-card-2"]');
    await expect(secondCard.locator('[data-testid="diary-title"]')).toHaveText(
      testDiariesData[1].title
    );
  });

  test('각 일기 카드에 감정 텍스트가 올바르게 바인딩되어야 함', async ({
    page,
  }) => {
    // HAPPY 감정 확인
    const happyCard = page.locator('[data-testid="diary-card-1"]');
    await expect(
      happyCard.locator('[data-testid="emotion-text"]')
    ).toHaveText('행복해요');

    // SAD 감정 확인
    const sadCard = page.locator('[data-testid="diary-card-2"]');
    await expect(sadCard.locator('[data-testid="emotion-text"]')).toHaveText(
      '슬퍼요'
    );

    // ANGRY 감정 확인
    const angryCard = page.locator('[data-testid="diary-card-3"]');
    await expect(angryCard.locator('[data-testid="emotion-text"]')).toHaveText(
      '화나요'
    );

    // SURPRISE 감정 확인
    const surpriseCard = page.locator('[data-testid="diary-card-4"]');
    await expect(
      surpriseCard.locator('[data-testid="emotion-text"]')
    ).toHaveText('놀랐어요');

    // ETC 감정 확인
    const etcCard = page.locator('[data-testid="diary-card-5"]');
    await expect(etcCard.locator('[data-testid="emotion-text"]')).toHaveText(
      '기타'
    );
  });

  test('각 일기 카드에 감정별 이미지가 올바르게 바인딩되어야 함', async ({
    page,
  }) => {
    // HAPPY 감정 이미지 확인
    const happyCard = page.locator('[data-testid="diary-card-1"]');
    const happyImage = happyCard.locator('[data-testid="emotion-image"]');
    await expect(happyImage).toHaveAttribute('src', /emotion-happy/);

    // SAD 감정 이미지 확인
    const sadCard = page.locator('[data-testid="diary-card-2"]');
    const sadImage = sadCard.locator('[data-testid="emotion-image"]');
    await expect(sadImage).toHaveAttribute('src', /emotion-sad/);

    // ANGRY 감정 이미지 확인
    const angryCard = page.locator('[data-testid="diary-card-3"]');
    const angryImage = angryCard.locator('[data-testid="emotion-image"]');
    await expect(angryImage).toHaveAttribute('src', /emotion-angry/);

    // SURPRISE 감정 이미지 확인
    const surpriseCard = page.locator('[data-testid="diary-card-4"]');
    const surpriseImage = surpriseCard.locator('[data-testid="emotion-image"]');
    await expect(surpriseImage).toHaveAttribute('src', /emotion-surprise/);

    // ETC 감정 이미지 확인
    const etcCard = page.locator('[data-testid="diary-card-5"]');
    const etcImage = etcCard.locator('[data-testid="emotion-image"]');
    await expect(etcImage).toHaveAttribute('src', /emotion-etc/);
  });

  test('각 일기 카드에 작성일이 올바르게 바인딩되어야 함', async ({
    page,
  }) => {
    // 첫 번째 일기 카드의 날짜 확인
    const firstCard = page.locator('[data-testid="diary-card-1"]');
    await expect(firstCard.locator('[data-testid="diary-date"]')).toContainText(
      '2024. 03. 12'
    );

    // 두 번째 일기 카드의 날짜 확인
    const secondCard = page.locator('[data-testid="diary-card-2"]');
    await expect(secondCard.locator('[data-testid="diary-date"]')).toContainText(
      '2024. 03. 11'
    );
  });

  test('긴 제목은 ellipsis로 처리되어야 함', async ({ page }) => {
    // 긴 제목 데이터를 추가
    await page.evaluate((data) => {
      const existingDiaries = JSON.parse(
        localStorage.getItem('diaries') || '[]'
      );
      localStorage.setItem(
        'diaries',
        JSON.stringify([...existingDiaries, data])
      );
    }, longTitleDiary);

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });

    // 긴 제목 카드 확인
    const longTitleCard = page.locator('[data-testid="diary-card-6"]');
    const titleElement = longTitleCard.locator('[data-testid="diary-title"]');

    // CSS에서 text-overflow: ellipsis가 적용되었는지 확인
    await expect(titleElement).toHaveCSS('text-overflow', 'ellipsis');
    await expect(titleElement).toHaveCSS('overflow', 'hidden');
    await expect(titleElement).toHaveCSS('white-space', 'nowrap');
  });

  test('로컬스토리지에 데이터가 없는 경우 빈 상태를 표시해야 함', async ({
    page,
  }) => {
    // 로컬스토리지 비우기
    await page.evaluate(() => {
      localStorage.removeItem('diaries');
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });

    // 빈 상태 메시지 확인 (텍스트로 찾기)
    const emptyState = page.getByText('검색 결과가 없습니다.');
    await expect(emptyState).toBeVisible();
  });

  test('로컬스토리지에 빈 배열이 있는 경우 빈 상태를 표시해야 함', async ({
    page,
  }) => {
    // 로컬스토리지에 빈 배열 설정
    await page.evaluate(() => {
      localStorage.setItem('diaries', JSON.stringify([]));
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });

    // 빈 상태 메시지 확인 (텍스트로 찾기)
    const emptyState = page.getByText('검색 결과가 없습니다.');
    await expect(emptyState).toBeVisible();
  });

  test('잘못된 형식의 로컬스토리지 데이터 처리', async ({ page }) => {
    // 잘못된 형식의 데이터 설정
    await page.evaluate(() => {
      localStorage.setItem('diaries', 'invalid-json');
    });

    // 페이지 새로고침
    await page.reload();
    await page.waitForSelector('[data-testid="diaries-page"]', { timeout: 400 });

    // 빈 상태 또는 에러 핸들링 확인 (텍스트로 찾기)
    const emptyState = page.getByText('검색 결과가 없습니다.');
    await expect(emptyState).toBeVisible();
  });
});
