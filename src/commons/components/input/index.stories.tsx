import type { Meta, StoryObj } from '@storybook/nextjs';
import { Input } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Input> = {
  title: 'Commons/Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Input 컴포넌트는 사용자 입력을 받기 위한 기본 입력 필드입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- Error 상태 지원
- Disabled 상태 지원
- Full width 옵션
- 좌측/우측 아이콘 지원
- 라벨 및 헬퍼 텍스트 지원

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
      description: '입력 필드의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드 크기',
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
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    helperText: {
      control: { type: 'text' },
      description: '헬퍼 텍스트',
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: '비활성화 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부',
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
  },
  args: {
    placeholder: '텍스트를 입력하세요',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    error: false,
    disabled: false,
    required: false,
    fullWidth: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {
    placeholder: '기본 입력 필드',
  },
};

export const Playground: Story = {
  args: {
    placeholder: '플레이그라운드',
    label: '라벨',
    helperText: '헬퍼 텍스트입니다',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작해볼 수 있는 플레이그라운드입니다.',
      },
    },
  },
};

// ========================================
// Variant Stories
// ========================================

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input variant="primary" placeholder="Primary Input" />
      <Input variant="secondary" placeholder="Secondary Input" />
      <Input variant="tertiary" placeholder="Tertiary Input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 3가지 variant를 보여줍니다.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary Input',
    label: 'Primary 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '주요 입력용 필드입니다. 흰색 배경과 회색 테두리를 가집니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary Input',
    label: 'Secondary 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '보조 입력용 필드입니다. 회색 배경을 가집니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    placeholder: 'Tertiary Input',
    label: 'Tertiary 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '투명한 배경을 가진 입력 필드입니다.',
      },
    },
  },
};

// ========================================
// Size Stories
// ========================================

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input size="small" placeholder="Small Input" />
      <Input size="medium" placeholder="Medium Input" />
      <Input size="large" placeholder="Large Input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 3가지 크기를 보여줍니다.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small Input',
    label: '작은 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '작은 크기 입력 필드 (36px 높이)',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium Input',
    label: '중간 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '중간 크기 입력 필드 (48px 높이) - 기본값',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large Input',
    label: '큰 입력 필드',
  },
  parameters: {
    docs: {
      description: {
        story: '큰 크기 입력 필드 (56px 높이)',
      },
    },
  },
};

// ========================================
// Theme Stories
// ========================================

export const Themes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          width: '300px',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Input variant="primary" theme="light" placeholder="Primary Light" />
          <Input
            variant="secondary"
            theme="light"
            placeholder="Secondary Light"
          />
          <Input
            variant="tertiary"
            theme="light"
            placeholder="Tertiary Light"
          />
        </div>
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#000000',
          borderRadius: '8px',
          width: '300px',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Input variant="primary" theme="dark" placeholder="Primary Dark" />
          <Input
            variant="secondary"
            theme="dark"
            placeholder="Secondary Dark"
          />
          <Input variant="tertiary" theme="dark" placeholder="Tertiary Dark" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마에서의 입력 필드 모습을 보여줍니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    placeholder: 'Light Theme Input',
    label: '라이트 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: '라이트 테마 입력 필드',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    placeholder: 'Dark Theme Input',
    label: '다크 테마 입력 필드',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마 입력 필드',
      },
    },
  },
};

// ========================================
// State Stories
// ========================================

export const States: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input placeholder="Normal State" label="일반 상태" />
      <Input
        placeholder="Error State"
        label="에러 상태"
        error
        errorMessage="에러 메시지입니다"
      />
      <Input placeholder="Disabled State" label="비활성화 상태" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: '라벨이 있는 입력 필드입니다. 필수 입력 표시(*)도 포함됩니다.',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
    helperText: '8자 이상, 영문/숫자/특수문자 포함',
    type: 'password',
  },
  parameters: {
    docs: {
      description: {
        story: '헬퍼 텍스트가 있는 입력 필드입니다.',
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    error: true,
    errorMessage: '올바른 이메일 형식이 아닙니다',
    value: 'invalid-email',
  },
  parameters: {
    docs: {
      description: {
        story: '에러 상태의 입력 필드입니다. 에러 메시지가 표시됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화된 입력 필드',
    label: '비활성화 상태',
    value: '수정할 수 없습니다',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 입력 필드입니다. 입력할 수 없습니다.',
      },
    },
  },
};

// ========================================
// Layout Stories
// ========================================

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: '전체 너비 입력 필드',
    label: '전체 너비',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '컨테이너의 전체 너비를 사용하는 입력 필드입니다.',
      },
    },
  },
};

// ========================================
// Icon Stories
// ========================================

export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '300px',
      }}
    >
      <Input
        placeholder="검색어를 입력하세요"
        label="검색"
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        }
      />
      <Input
        placeholder="비밀번호를 입력하세요"
        label="비밀번호"
        type="password"
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
          </svg>
        }
      />
      <Input
        placeholder="금액을 입력하세요"
        label="금액"
        leftIcon={<span>₩</span>}
        rightIcon={<span>원</span>}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '좌측 및 우측 아이콘이 있는 입력 필드입니다.',
      },
    },
  },
};

// ========================================
// Complex Examples
// ========================================

export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '400px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0' }}>회원가입 폼</h3>

      <Input label="이름" placeholder="이름을 입력하세요" required fullWidth />

      <Input
        label="이메일"
        placeholder="example@email.com"
        type="email"
        required
        fullWidth
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        }
      />

      <Input
        label="비밀번호"
        placeholder="비밀번호를 입력하세요"
        type="password"
        required
        fullWidth
        helperText="8자 이상, 영문/숫자/특수문자 포함"
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
          </svg>
        }
      />

      <Input
        label="전화번호"
        placeholder="010-0000-0000"
        helperText="'-' 없이 입력해주세요"
        fullWidth
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 폼에서 사용되는 입력 필드들의 예시입니다.',
      },
    },
  },
};

export const SearchExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Input
        size="large"
        placeholder="검색어를 입력하세요"
        fullWidth
        leftIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '검색 기능을 위한 입력 필드 예시입니다.',
      },
    },
  },
};
