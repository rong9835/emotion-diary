import { test, expect } from '@playwright/test';

test.describe('Pictures Component - 강아지 사진 목록 조회 기능', () => {
  test.beforeEach(async ({ page }) => {
    // /pictures 페이지로 이동
    await page.goto('/pictures');

    // 페이지가 완전히 로드될 때까지 대기 (data-testid 사용)
    await page.waitForSelector('[data-testid="pictures-container"]', {
      timeout: 2000,
    });
  });

  test('페이지 로드 시 강아지 사진 목록이 표시되어야 함', async ({ page }) => {
    // 초기 6마리의 강아지 사진이 표시되는지 확인
    const pictureItems = page.locator('[data-testid^="picture-item-"]');
    await expect(pictureItems).toHaveCount(6);

    // 각 사진이 dog.ceo 도메인의 이미지를 사용하는지 확인
    for (let i = 0; i < 6; i++) {
      const image = page.locator(`[data-testid="picture-item-${i}"] img`);
      await expect(image).toBeVisible();

      const src = await image.getAttribute('src');
      expect(src).toContain('dog.ceo');
    }
  });

  test('로딩 중에는 스플래시 스크린이 표시되어야 함', async ({ page }) => {
    // 네트워크를 느리게 만들어 로딩 상태 확인
    await page.route(
      'https://dog.ceo/api/breeds/image/random/6',
      async (route) => {
        // 1초 지연 후 응답
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.continue();
      }
    );

    // 페이지 새로고침하여 로딩 상태 확인
    await page.reload();

    // 스플래시 스크린이 표시되는지 확인
    const splashScreens = page.locator('[data-testid^="splash-screen-"]');
    await expect(splashScreens).toHaveCount(6);

    // 스플래시 스크린이 사라지고 실제 이미지가 표시될 때까지 대기
    await expect(splashScreens.first()).toBeHidden({ timeout: 2000 });
  });

  test('무한스크롤로 추가 강아지 사진을 로드해야 함', async ({ page }) => {
    // 초기 6마리 확인
    await expect(page.locator('[data-testid^="picture-item-"]')).toHaveCount(6);

    // 스크롤하여 마지막 2마리만 남기기
    const lastPicture = page.locator('[data-testid="picture-item-5"]');
    await lastPicture.scrollIntoViewIfNeeded();

    // 추가 강아지 사진이 로드될 때까지 대기
    await expect(page.locator('[data-testid^="picture-item-"]')).toHaveCount(
      12,
      { timeout: 2000 }
    );

    // 새로 로드된 사진들도 dog.ceo 도메인을 사용하는지 확인
    const newImages = page
      .locator('[data-testid^="picture-item-"]')
      .nth(6)
      .locator('img');
    await expect(newImages).toBeVisible();

    const src = await newImages.getAttribute('src');
    expect(src).toContain('dog.ceo');
  });

  test('API 호출 실패 시 에러 처리가 되어야 함', async ({ page }) => {
    // API 호출을 실패하도록 모킹
    await page.route('https://dog.ceo/api/breeds/image/random/6', (route) => {
      route.abort('failed');
    });

    // 페이지 새로고침
    await page.reload();

    // 에러 메시지가 표시되는지 확인
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible({
      timeout: 2000,
    });
  });

  test('스플래시 스크린 애니메이션이 올바르게 작동해야 함', async ({
    page,
  }) => {
    // 네트워크를 느리게 만들어 로딩 상태 확인
    await page.route(
      'https://dog.ceo/api/breeds/image/random/6',
      async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await route.continue();
      }
    );

    await page.reload();

    // 스플래시 스크린의 애니메이션 클래스가 적용되는지 확인
    const splashScreen = page.locator('[data-testid="splash-screen-0"]');
    await expect(splashScreen).toBeVisible();

    // 애니메이션 관련 CSS 클래스가 있는지 확인
    const classList = await splashScreen.getAttribute('class');
    expect(classList).toContain('splashScreen');
  });
});
