import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button, ButtonGroup } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Button> = {
  title: 'Commons/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Button 컴포넌트는 사용자 인터랙션을 위한 기본 버튼 요소입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- Loading 상태 지원
- Disabled 상태 지원
- Full width 옵션
- ButtonGroup으로 그룹화 가능

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
      description: '버튼의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
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
    children: {
      control: { type: 'text' },
      description: '버튼 텍스트',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
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
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    loading: false,
    disabled: false,
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
    children: '기본 버튼',
  },
};

export const Playground: Story = {
  args: {
    children: '플레이그라운드',
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
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 3가지 variant를 보여줍니다.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
  parameters: {
    docs: {
      description: {
        story: '주요 액션용 버튼입니다. 밝은 배경색을 가집니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
  parameters: {
    docs: {
      description: {
        story: '보조 액션용 버튼입니다. 어두운 배경색과 테두리를 가집니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Tertiary Button',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 버튼입니다. 회색 톤을 가집니다.',
      },
    },
  },
};

// ========================================
// Size Stories
// ========================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 3가지 크기를 보여줍니다.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
  parameters: {
    docs: {
      description: {
        story: '작은 크기 버튼 (104px 너비)',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium Button',
  },
  parameters: {
    docs: {
      description: {
        story: '중간 크기 버튼 (224px 너비) - 기본값',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
  parameters: {
    docs: {
      description: {
        story: '큰 크기 버튼 (432px 너비)',
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
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Button variant="primary" theme="light">
            Primary Light
          </Button>
          <Button variant="secondary" theme="light">
            Secondary Light
          </Button>
          <Button variant="tertiary" theme="light">
            Tertiary Light
          </Button>
        </div>
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#000000',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <Button variant="primary" theme="dark">
            Primary Dark
          </Button>
          <Button variant="secondary" theme="dark">
            Secondary Dark
          </Button>
          <Button variant="tertiary" theme="dark">
            Tertiary Dark
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마에서의 버튼 모습을 보여줍니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    children: 'Light Theme Button',
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: '라이트 테마 버튼',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    children: 'Dark Theme Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마 버튼',
      },
    },
  },
};

// ========================================
// State Stories
// ========================================

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button>Normal</Button>
      <Button loading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: '로딩 중...',
  },
  parameters: {
    docs: {
      description: {
        story:
          '로딩 상태의 버튼입니다. 스피너와 함께 "로딩 중..." 텍스트가 표시됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화된 버튼',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 버튼입니다. 클릭할 수 없습니다.',
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
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '컨테이너의 전체 너비를 사용하는 버튼입니다.',
      },
    },
  },
};

// ========================================
// ButtonGroup Stories
// ========================================

type ButtonGroupStory = StoryObj<Meta<typeof ButtonGroup>>;

export const ButtonGroupDefault: ButtonGroupStory = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">확인</Button>
      <Button variant="secondary">취소</Button>
    </ButtonGroup>
  ),
  args: {
    spacing: 'medium',
    direction: 'horizontal',
    align: 'left',
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 ButtonGroup 예시입니다. 여러 버튼을 그룹화하여 배치할 때 사용합니다.',
      },
    },
  },
};

export const ButtonGroupVertical: ButtonGroupStory = {
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="primary">첫 번째 버튼</Button>
      <Button variant="secondary">두 번째 버튼</Button>
      <Button variant="tertiary">세 번째 버튼</Button>
    </ButtonGroup>
  ),
  args: {
    direction: 'vertical',
    spacing: 'medium',
    align: 'center',
  },
  parameters: {
    docs: {
      description: {
        story: '수직 방향으로 배치된 ButtonGroup입니다.',
      },
    },
  },
};

export const ButtonGroupSpacing: ButtonGroupStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Small Spacing</h4>
        <ButtonGroup spacing="small">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
          <Button size="small">버튼 3</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Medium Spacing</h4>
        <ButtonGroup spacing="medium">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
          <Button size="small">버튼 3</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Large Spacing</h4>
        <ButtonGroup spacing="large">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
          <Button size="small">버튼 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 간격 옵션을 보여줍니다.',
      },
    },
  },
};

export const ButtonGroupAlignment: ButtonGroupStory = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '400px',
      }}
    >
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Left Align</h4>
        <ButtonGroup align="left">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Center Align</h4>
        <ButtonGroup align="center">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
        </ButtonGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Right Align</h4>
        <ButtonGroup align="right">
          <Button size="small">버튼 1</Button>
          <Button size="small">버튼 2</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '다양한 정렬 옵션을 보여줍니다.',
      },
    },
  },
};

// ========================================
// Complex Examples
// ========================================

export const ComplexExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        maxWidth: '600px',
      }}
    >
      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>폼 액션 버튼</h3>
        <ButtonGroup align="right">
          <Button variant="secondary">취소</Button>
          <Button variant="primary">저장</Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>네비게이션 버튼</h3>
        <ButtonGroup align="center">
          <Button variant="secondary" size="small">
            이전
          </Button>
          <Button variant="tertiary" size="small" disabled>
            1
          </Button>
          <Button variant="secondary" size="small">
            2
          </Button>
          <Button variant="secondary" size="small">
            3
          </Button>
          <Button variant="secondary" size="small">
            다음
          </Button>
        </ButtonGroup>
      </div>

      <div>
        <h3 style={{ margin: '0 0 16px 0' }}>액션 메뉴</h3>
        <ButtonGroup direction="vertical" spacing="small" align="left">
          <Button variant="secondary" fullWidth>
            편집
          </Button>
          <Button variant="secondary" fullWidth>
            복사
          </Button>
          <Button variant="secondary" fullWidth>
            삭제
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 사용 사례를 보여주는 복합 예시입니다.',
      },
    },
  },
};
