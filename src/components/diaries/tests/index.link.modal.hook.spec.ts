import { test, expect } from '@playwright/test';

// ========================================
// Link Modal Hook E2E Tests
// ========================================

/**
 * useModal 훅을 활용한 일기쓰기 모달 기능 테스트
 *
 * 테스트 범위:
 * - 일기쓰기 버튼 클릭 시 모달 오픈
 * - 모달이 페이지 위 중앙에 overlay로 표시
 * - 모달 내부 컨텐츠 렌더링 확인
 * - 모달 닫기 기능 (닫기 버튼, Backdrop, ESC 키)
 *
 * 테스트 조건:
 * - timeout: 500ms 미만
 * - 페이지 로드 식별: data-testid 대기 방법 사용
 * - networkidle 대기 방법 사용 금지
 */

test.describe('Link Modal Hook Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 일기목록 페이지로 이동
    await page.goto('/diaries');
    // 페이지 로드 완료 대기 (data-testid 기반, timeout 500ms 미만)
    await page.waitForSelector('[data-testid="nav-diaries"]', { timeout: 400 });
  });

  test('일기쓰기 버튼이 정상적으로 렌더링되어야 함', async ({ page }) => {
    // 일기쓰기 버튼 찾기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });

    // 버튼이 보여야 함
    await expect(newDiaryButton).toBeVisible();

    // 버튼 텍스트 확인
    await expect(newDiaryButton).toContainText('일기쓰기');
  });

  test('일기쓰기 버튼 클릭 시 모달이 열려야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달 배경 (backdrop) 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 모달이 중앙에 표시되는지 확인 (flex items-center justify-center)
    await expect(backdrop).toHaveClass(/flex/);
    await expect(backdrop).toHaveClass(/items-center/);
    await expect(backdrop).toHaveClass(/justify-center/);

    // 모달 배경이 반투명 검정색인지 확인
    await expect(backdrop).toHaveClass(/bg-black/);
    await expect(backdrop).toHaveClass(/bg-opacity-50/);
  });

  test('모달 내부에 일기쓰기 컴포넌트가 렌더링되어야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달 내부 확인
    const modal = page.locator('.fixed.inset-0.z-50');
    await expect(modal).toBeVisible();

    // 일기쓰기 폼 요소 확인
    const diaryForm = modal.locator('h1', { hasText: '일기 쓰기' });
    await expect(diaryForm).toBeVisible();

    // 감정 선택 섹션 확인
    const emotionSection = modal.locator('h3', { hasText: '오늘 기분은 어땠나요?' });
    await expect(emotionSection).toBeVisible();

    // 제목 입력 필드 확인
    const titleLabel = modal.locator('label', { hasText: '제목' });
    await expect(titleLabel).toBeVisible();

    // 내용 입력 필드 확인
    const contentLabel = modal.locator('label', { hasText: '내용' });
    await expect(contentLabel).toBeVisible();
  });

  test('모달 닫기 버튼 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 모달 내부의 닫기 버튼 클릭
    const closeButton = page.locator('button', { hasText: '닫기' });
    await closeButton.click();

    // 모달이 사라졌는지 확인
    await expect(backdrop).not.toBeVisible();
  });

  test('모달 X 버튼(상단 우측) 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // X 버튼 (aria-label="닫기") 클릭 - DiariesNew 컴포넌트 내부의 닫기 버튼
    const xButton = page.locator('button[aria-label="닫기"]');
    await xButton.click();

    // 모달이 사라졌는지 확인
    await expect(backdrop).not.toBeVisible();
  });

  test('모달 backdrop 클릭 시 모달이 닫혀야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // backdrop 클릭 (모달 컨텐츠가 아닌 배경 클릭)
    // position을 이용해 backdrop의 왼쪽 상단 클릭
    await backdrop.click({ position: { x: 10, y: 10 } });

    // 모달이 사라졌는지 확인
    await expect(backdrop).not.toBeVisible();
  });

  test('ESC 키 입력 시 모달이 닫혀야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // ESC 키 입력
    await page.keyboard.press('Escape');

    // 모달이 사라졌는지 확인
    await expect(backdrop).not.toBeVisible();
  });

  test('모달이 열려있을 때 배경 스크롤이 방지되어야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // body의 overflow 스타일이 hidden인지 확인
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflow).toBe('hidden');

    // 모달 닫기
    const closeButton = page.locator('button', { hasText: '닫기' });
    await closeButton.click();

    // 모달이 닫히고 나서 body의 overflow가 원래대로 돌아왔는지 확인
    const bodyOverflowAfterClose = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });
    expect(bodyOverflowAfterClose).not.toBe('hidden');
  });

  test('모달이 z-index 50으로 페이지 위에 overlay 되어야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달 backdrop의 z-index 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();
    await expect(backdrop).toHaveClass(/z-50/);

    // 모달이 fixed position인지 확인
    await expect(backdrop).toHaveClass(/fixed/);
    await expect(backdrop).toHaveClass(/inset-0/);
  });

  test('모달 내부 컨텐츠 클릭 시 모달이 닫히지 않아야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 모달 내부 컨텐츠 (제목 입력 필드) 클릭
    const titleLabel = page.locator('label', { hasText: '제목' });
    await titleLabel.click();

    // 모달이 여전히 열려있어야 함
    await expect(backdrop).toBeVisible();
  });

  test('모달 내부에서 감정 선택이 가능해야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 감정 라디오 버튼들이 렌더링되었는지 확인
    const emotionRadios = page.locator('input[type="radio"][name="emotion"]');
    const emotionCount = await emotionRadios.count();
    expect(emotionCount).toBeGreaterThan(0);

    // 첫 번째 감정이 기본 선택되어 있는지 확인
    const firstRadio = emotionRadios.first();
    await expect(firstRadio).toBeChecked();
  });

  test('모달 내부에서 제목과 내용 입력이 가능해야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 제목 입력 필드에 텍스트 입력
    const titleInput = page.locator('input[placeholder="제목을 입력합니다."]');
    await titleInput.fill('테스트 제목');
    await expect(titleInput).toHaveValue('테스트 제목');

    // 내용 입력 필드에 텍스트 입력
    const contentTextarea = page.locator('textarea[placeholder="내용을 입력합니다."]');
    await contentTextarea.fill('테스트 내용입니다.');
    await expect(contentTextarea).toHaveValue('테스트 내용입니다.');
  });

  test('모달 등록하기 버튼이 렌더링되어야 함', async ({ page }) => {
    // 일기쓰기 버튼 클릭하여 모달 열기
    const newDiaryButton = page.locator('button', { hasText: '일기쓰기' });
    await newDiaryButton.click();

    // 모달이 열렸는지 확인
    const backdrop = page.locator('.fixed.inset-0.z-50');
    await expect(backdrop).toBeVisible();

    // 등록하기 버튼 확인
    const submitButton = page.locator('button', { hasText: '등록하기' });
    await expect(submitButton).toBeVisible();
  });
});
