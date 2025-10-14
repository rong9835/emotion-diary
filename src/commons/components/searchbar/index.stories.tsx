import type { Meta, StoryObj } from '@storybook/nextjs';
import { Searchbar } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Searchbar> = {
  title: 'Commons/Components/Searchbar',
  component: Searchbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Searchbar 컴포넌트는 검색 기능을 제공하는 입력 필드입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- 검색 아이콘 및 클리어 버튼 지원
- 자동완성 및 최근 검색어 기능
- 로딩 상태 지원
- 검색 결과 개수 표시
- Full width 옵션

## Design System
Figma 디자인 시스템을 기반으로 구현되었습니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '검색바의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '검색바 크기',
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: 'medium' },
      },
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: '테마 모드',
      table: {
        type: { summary: 'light | dark' },
        defaultValue: { summary: 'light' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showSearchIcon: {
      control: { type: 'boolean' },
      description: '검색 아이콘 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showClearButton: {
      control: { type: 'boolean' },
      description: '클리어 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showSuggestions: {
      control: { type: 'boolean' },
      description: '자동완성 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    resultCount: {
      control: { type: 'number' },
      description: '검색 결과 개수',
    },
    onSearch: {
      action: 'searched',
      description: '검색 실행 콜백 함수',
    },
    onClear: {
      action: 'cleared',
      description: '검색어 클리어 콜백 함수',
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 콜백 함수',
    },
  },
  args: {
    placeholder: '검색어를 입력하세요',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    loading: false,
    fullWidth: false,
    showSearchIcon: true,
    showClearButton: true,
    showSuggestions: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  name: '기본',
  args: {},
};

export const WithValue: Story = {
  name: '입력값 있음',
  args: {
    value: '검색어 예시',
  },
};

export const Loading: Story = {
  name: '로딩 상태',
  args: {
    loading: true,
    value: '검색 중...',
  },
};

export const Disabled: Story = {
  name: '비활성화',
  args: {
    disabled: true,
    value: '비활성화된 검색바',
  },
};

export const FullWidth: Story = {
  name: '전체 너비',
  args: {
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Variant Stories
// ========================================

export const VariantPrimary: Story = {
  name: 'Variant - Primary',
  args: {
    variant: 'primary',
    value: 'Primary 검색바',
  },
};

export const VariantSecondary: Story = {
  name: 'Variant - Secondary',
  args: {
    variant: 'secondary',
    value: 'Secondary 검색바',
  },
};

export const VariantTertiary: Story = {
  name: 'Variant - Tertiary',
  args: {
    variant: 'tertiary',
    value: 'Tertiary 검색바',
  },
};

// ========================================
// Size Stories
// ========================================

export const SizeSmall: Story = {
  name: 'Size - Small',
  args: {
    size: 'small',
    value: 'Small 검색바',
  },
};

export const SizeMedium: Story = {
  name: 'Size - Medium',
  args: {
    size: 'medium',
    value: 'Medium 검색바',
  },
};

export const SizeLarge: Story = {
  name: 'Size - Large',
  args: {
    size: 'large',
    value: 'Large 검색바',
  },
};

// ========================================
// Theme Stories
// ========================================

export const ThemeLight: Story = {
  name: 'Theme - Light',
  args: {
    theme: 'light',
    value: 'Light 테마',
  },
};

export const ThemeDark: Story = {
  name: 'Theme - Dark',
  args: {
    theme: 'dark',
    value: 'Dark 테마',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ========================================
// Feature Stories
// ========================================

export const WithResultCount: Story = {
  name: '검색 결과 개수 표시',
  args: {
    value: '검색어',
    resultCount: 1234,
  },
};

export const WithoutSearchIcon: Story = {
  name: '검색 아이콘 없음',
  args: {
    showSearchIcon: false,
    value: '검색 아이콘이 없는 검색바',
  },
};

export const WithoutClearButton: Story = {
  name: '클리어 버튼 없음',
  args: {
    showClearButton: false,
    value: '클리어 버튼이 없는 검색바',
  },
};

export const WithSuggestions: Story = {
  name: '자동완성 기능',
  args: {
    showSuggestions: true,
    suggestions: [
      '리액트 컴포넌트',
      '리액트 훅스',
      '리액트 라우터',
      '리액트 상태관리',
      '리액트 테스팅',
    ],
    recentSearches: ['최근 검색어 1', '최근 검색어 2', '최근 검색어 3'],
  },
};

// ========================================
// Combination Stories
// ========================================

export const AllVariants: Story = {
  name: '모든 Variant',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Searchbar variant="primary" placeholder="Primary 검색바" />
      <Searchbar variant="secondary" placeholder="Secondary 검색바" />
      <Searchbar variant="tertiary" placeholder="Tertiary 검색바" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  name: '모든 Size',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Searchbar size="small" placeholder="Small 검색바" />
      <Searchbar size="medium" placeholder="Medium 검색바" />
      <Searchbar size="large" placeholder="Large 검색바" />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllThemes: Story = {
  name: '모든 Theme',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
        }}
      >
        <Searchbar theme="light" placeholder="Light 테마" />
      </div>
      <div
        style={{
          padding: '16px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
        }}
      >
        <Searchbar theme="dark" placeholder="Dark 테마" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const VariantSizeCombination: Story = {
  name: 'Variant × Size 조합',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          >
            {variant}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(['small', 'medium', 'large'] as const).map((size) => (
              <Searchbar
                key={size}
                variant={variant}
                size={size}
                placeholder={`${variant} ${size}`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Interactive Stories
// ========================================

export const Interactive: Story = {
  name: '인터랙티브',
  args: {
    showSuggestions: true,
    suggestions: ['자바스크립트', '자바', '자료구조', '자동화', '자연어처리'],
    recentSearches: ['리액트', '타입스크립트', '넥스트js'],
    resultCount: 42,
  },
};

export const SearchStates: Story = {
  name: '검색 상태들',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          기본 상태
        </h4>
        <Searchbar placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          입력 중
        </h4>
        <Searchbar value="검색어 입력 중" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          로딩 중
        </h4>
        <Searchbar value="검색 중..." loading />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          결과 있음
        </h4>
        <Searchbar value="검색 완료" resultCount={156} />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          비활성화
        </h4>
        <Searchbar value="비활성화됨" disabled />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

// ========================================
// Edge Cases
// ========================================

export const EdgeCases: Story = {
  name: '엣지 케이스',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          매우 긴 텍스트
        </h4>
        <Searchbar value="이것은 매우 긴 검색어입니다. 검색바의 너비를 초과할 수 있는 텍스트입니다." />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          특수문자
        </h4>
        <Searchbar value="!@#$%^&*()_+-=[]{}|" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          한글/영문 혼합
        </h4>
        <Searchbar value="React 리액트 컴포넌트 Component" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          숫자
        </h4>
        <Searchbar value="1234567890" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#666' }}>
          큰 결과 개수
        </h4>
        <Searchbar value="인기 검색어" resultCount={1234567} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
