import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    // 기본 단위 테스트 설정
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**', '**/commons/layout/tests/**'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
