/**
 * Color Design Tokens
 * 다크모드를 포함한 프로젝트 전체 컬러 시스템
 */

export const COLOR_TOKENS = {
  // Background Colors
  background: {
    primary: 'var(--color-bg-primary)',
    secondary: 'var(--color-bg-secondary)',
    tertiary: 'var(--color-bg-tertiary)',
    inverse: 'var(--color-bg-inverse)',
  },

  // Text Colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    tertiary: 'var(--color-text-tertiary)',
    inverse: 'var(--color-text-inverse)',
    link: 'var(--color-text-link)',
    disabled: 'var(--color-text-disabled)',
  },

  // Border Colors
  border: {
    primary: 'var(--color-border-primary)',
    secondary: 'var(--color-border-secondary)',
    focus: 'var(--color-border-focus)',
    error: 'var(--color-border-error)',
  },

  // Brand Colors
  brand: {
    primary: 'var(--color-brand-primary)',
    secondary: 'var(--color-brand-secondary)',
    hover: 'var(--color-brand-hover)',
    active: 'var(--color-brand-active)',
  },

  // Semantic Colors
  semantic: {
    success: 'var(--color-semantic-success)',
    warning: 'var(--color-semantic-warning)',
    error: 'var(--color-semantic-error)',
    info: 'var(--color-semantic-info)',
  },

  // State Colors
  state: {
    hover: 'var(--color-state-hover)',
    active: 'var(--color-state-active)',
    disabled: 'var(--color-state-disabled)',
    focus: 'var(--color-state-focus)',
  },
} as const;

export type ColorToken = typeof COLOR_TOKENS;

// Helper function to get color token
export const getColorToken = (path: string): string => {
  const keys = path.split('.');
  let value: any = COLOR_TOKENS;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color token not found: ${path}`);
      return '';
    }
  }

  return value;
};
