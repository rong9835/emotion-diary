import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright 설정 파일
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testMatch: ['**/e2e/**/*.spec.ts', '**/tests/**/*.spec.ts'],

  // /* 병렬로 실행할 최대 테스트 수 */
  // fullyParallel: true,

  // /* CI에서 실패한 테스트만 재시도 */
  // forbidOnly: !!process.env.CI,

  // /* CI에서 재시도 설정 */
  // retries: process.env.CI ? 2 : 0,

  // /* 병렬 워커 수 */
  // workers: process.env.CI ? 1 : undefined,

  // /* 리포터 설정 */
  // reporter: 'html',

  /* 모든 테스트에 적용되는 공통 설정 */
  use: {
    // /* 실패 시 스크린샷 캡처 */
    // screenshot: 'only-on-failure',

    // /* 실패 시 비디오 녹화 */
    // video: 'retain-on-failure',

    /* 베이스 URL */
    baseURL: 'http://localhost:3000',

    // /* 추적 설정 (디버깅용) */
    // trace: 'on-first-retry',
  },

  /* 프로젝트별 브라우저 설정 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* 모바일 뷰포트 테스트 */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* 테스트 실행 전 개발 서버 자동 시작 */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
