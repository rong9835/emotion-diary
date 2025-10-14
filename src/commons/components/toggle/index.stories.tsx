import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toggle, ToggleGroup } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Toggle> = {
  title: 'Commons/Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Toggle 컴포넌트는 on/off 상태를 전환할 수 있는 스위치 요소입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- 제어/비제어 컴포넌트 지원
- Loading 상태 지원
- Disabled 상태 지원
- 좌측/우측 라벨 지원
- ToggleGroup으로 그룹화 가능
- 접근성 지원 (ARIA)

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
      description: '토글의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '토글 크기',
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
    checked: {
      control: { type: 'boolean' },
      description: '토글 상태 (제어 컴포넌트)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    defaultChecked: {
      control: { type: 'boolean' },
      description: '기본 토글 상태 (비제어 컴포넌트)',
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
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    labelLeft: {
      control: { type: 'text' },
      description: '토글 왼쪽 라벨',
    },
    labelRight: {
      control: { type: 'text' },
      description: '토글 오른쪽 라벨',
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'both'],
      description: '라벨 위치',
      table: {
        type: { summary: 'left | right | both' },
        defaultValue: { summary: 'right' },
      },
    },
    onChange: {
      action: 'toggled',
      description: '토글 상태 변경 시 호출되는 콜백',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    disabled: false,
    loading: false,
    defaultChecked: false,
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {},
};

export const Playground: Story = {
  args: {
    labelRight: '토글 라벨',
  },
  parameters: {
    docs: {
      description: {
        story: '모든 props를 자유롭게 조작해볼 수 있는 플레이그라운드입니다.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    labelRight: '알림 받기',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '라벨이 있는 토글입니다.',
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
      <Toggle variant="primary" labelRight="Primary" defaultChecked />
      <Toggle variant="secondary" labelRight="Secondary" defaultChecked />
      <Toggle variant="tertiary" labelRight="Tertiary" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '토글의 3가지 variant를 보여줍니다.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    labelRight: 'Primary Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '주요 토글입니다. 파란색 활성화 상태를 가집니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    labelRight: 'Secondary Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '보조 토글입니다. 회색 활성화 상태를 가집니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    labelRight: 'Tertiary Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 토글입니다. 연한 회색 톤을 가집니다.',
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
      <Toggle size="small" labelRight="Small" defaultChecked />
      <Toggle size="medium" labelRight="Medium" defaultChecked />
      <Toggle size="large" labelRight="Large" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '토글의 3가지 크기를 보여줍니다.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    labelRight: 'Small Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '작은 크기 토글 (32px 너비)',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    labelRight: 'Medium Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '중간 크기 토글 (44px 너비) - 기본값',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    labelRight: 'Large Toggle',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '큰 크기 토글 (56px 너비)',
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
          <Toggle
            variant="primary"
            theme="light"
            labelRight="Primary Light"
            defaultChecked
          />
          <Toggle
            variant="secondary"
            theme="light"
            labelRight="Secondary Light"
            defaultChecked
          />
          <Toggle
            variant="tertiary"
            theme="light"
            labelRight="Tertiary Light"
            defaultChecked
          />
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
          <Toggle
            variant="primary"
            theme="dark"
            labelRight="Primary Dark"
            defaultChecked
          />
          <Toggle
            variant="secondary"
            theme="dark"
            labelRight="Secondary Dark"
            defaultChecked
          />
          <Toggle
            variant="tertiary"
            theme="dark"
            labelRight="Tertiary Dark"
            defaultChecked
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마에서의 토글 모습을 보여줍니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    labelRight: 'Light Theme Toggle',
    defaultChecked: true,
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: '라이트 테마 토글',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    labelRight: 'Dark Theme Toggle',
    defaultChecked: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마 토글',
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
      <Toggle labelRight="Normal" defaultChecked />
      <Toggle labelRight="Unchecked" defaultChecked={false} />
      <Toggle labelRight="Loading" loading />
      <Toggle labelRight="Disabled" disabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '토글의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    labelRight: '체크된 토글',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '체크된 상태의 토글입니다.',
      },
    },
  },
};

export const Unchecked: Story = {
  args: {
    labelRight: '체크 안 된 토글',
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '체크 안 된 상태의 토글입니다.',
      },
    },
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    labelRight: '로딩 중...',
  },
  parameters: {
    docs: {
      description: {
        story: '로딩 상태의 토글입니다. 스피너가 표시됩니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    labelRight: '비활성화된 토글',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 토글입니다. 클릭할 수 없습니다.',
      },
    },
  },
};

export const DisabledUnchecked: Story = {
  args: {
    disabled: true,
    labelRight: '비활성화된 토글 (체크 안 됨)',
    defaultChecked: false,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화되고 체크 안 된 상태의 토글입니다.',
      },
    },
  },
};

// ========================================
// Label Stories
// ========================================

export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Toggle labelLeft="왼쪽 라벨" labelPosition="left" defaultChecked />
      <Toggle labelRight="오른쪽 라벨" labelPosition="right" defaultChecked />
      <Toggle
        labelLeft="왼쪽"
        labelRight="오른쪽"
        labelPosition="both"
        defaultChecked
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라벨 위치를 다르게 설정한 토글입니다.',
      },
    },
  },
};

export const LeftLabel: Story = {
  args: {
    labelLeft: '알림 설정',
    labelPosition: 'left',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '왼쪽에 라벨이 있는 토글입니다.',
      },
    },
  },
};

export const RightLabel: Story = {
  args: {
    labelRight: '알림 설정',
    labelPosition: 'right',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '오른쪽에 라벨이 있는 토글입니다. (기본값)',
      },
    },
  },
};

export const BothLabels: Story = {
  args: {
    labelLeft: 'OFF',
    labelRight: 'ON',
    labelPosition: 'both',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: '양쪽에 라벨이 있는 토글입니다.',
      },
    },
  },
};

// ========================================
// Controlled vs Uncontrolled
// ========================================

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Toggle
          checked={checked}
          onChange={setChecked}
          labelRight="제어 컴포넌트"
        />
        <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
          현재 상태: {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '제어 컴포넌트로 사용하는 토글입니다. 상태가 외부에서 관리됩니다.',
      },
    },
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultChecked: true,
    labelRight: '비제어 컴포넌트',
  },
  parameters: {
    docs: {
      description: {
        story:
          '비제어 컴포넌트로 사용하는 토글입니다. 내부적으로 상태를 관리합니다.',
      },
    },
  },
};

// ========================================
// ToggleGroup Stories
// ========================================

type ToggleGroupStory = StoryObj<Meta<typeof ToggleGroup>>;

export const ToggleGroupDefault: ToggleGroupStory = {
  render: () => (
    <ToggleGroup label="알림 설정">
      <Toggle labelRight="이메일 알림" defaultChecked />
      <Toggle labelRight="푸시 알림" defaultChecked />
      <Toggle labelRight="SMS 알림" defaultChecked={false} />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '기본 ToggleGroup 예시입니다. 여러 토글을 그룹화하여 배치할 때 사용합니다.',
      },
    },
  },
};

export const ToggleGroupVertical: ToggleGroupStory = {
  render: () => (
    <ToggleGroup label="설정" direction="vertical" spacing="medium">
      <Toggle labelRight="다크 모드" defaultChecked />
      <Toggle labelRight="자동 저장" defaultChecked />
      <Toggle labelRight="알림 소리" defaultChecked={false} />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '수직 방향으로 배치된 ToggleGroup입니다.',
      },
    },
  },
};

export const ToggleGroupHorizontal: ToggleGroupStory = {
  render: () => (
    <ToggleGroup label="필터" direction="horizontal" spacing="medium">
      <Toggle labelRight="필터 1" defaultChecked />
      <Toggle labelRight="필터 2" defaultChecked={false} />
      <Toggle labelRight="필터 3" defaultChecked />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '수평 방향으로 배치된 ToggleGroup입니다.',
      },
    },
  },
};

export const ToggleGroupSpacing: ToggleGroupStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Small Spacing</h4>
        <ToggleGroup spacing="small">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
          <Toggle labelRight="옵션 3" defaultChecked />
        </ToggleGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Medium Spacing</h4>
        <ToggleGroup spacing="medium">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
          <Toggle labelRight="옵션 3" defaultChecked />
        </ToggleGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Large Spacing</h4>
        <ToggleGroup spacing="large">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
          <Toggle labelRight="옵션 3" defaultChecked />
        </ToggleGroup>
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

export const ToggleGroupAlignment: ToggleGroupStory = {
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
        <ToggleGroup align="left">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
        </ToggleGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Center Align</h4>
        <ToggleGroup align="center">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
        </ToggleGroup>
      </div>
      <div>
        <h4 style={{ margin: '0 0 16px 0' }}>Right Align</h4>
        <ToggleGroup align="right">
          <Toggle labelRight="옵션 1" defaultChecked />
          <Toggle labelRight="옵션 2" defaultChecked />
        </ToggleGroup>
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

export const ToggleGroupWithDescription: ToggleGroupStory = {
  render: () => (
    <ToggleGroup
      label="알림 설정"
      description="받고 싶은 알림을 선택하세요"
      direction="vertical"
      spacing="medium"
    >
      <Toggle labelRight="이메일 알림" defaultChecked />
      <Toggle labelRight="푸시 알림" defaultChecked />
      <Toggle labelRight="SMS 알림" defaultChecked={false} />
      <Toggle labelRight="데스크톱 알림" defaultChecked={false} />
    </ToggleGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: '설명이 있는 ToggleGroup입니다.',
      },
    },
  },
};

// ========================================
// Complex Examples
// ========================================

export const SettingsExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        maxWidth: '500px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0' }}>설정</h3>

      <ToggleGroup label="일반 설정" direction="vertical" spacing="small">
        <Toggle labelRight="다크 모드" defaultChecked />
        <Toggle labelRight="자동 저장" defaultChecked />
        <Toggle labelRight="애니메이션 효과" defaultChecked={false} />
      </ToggleGroup>

      <ToggleGroup label="알림 설정" direction="vertical" spacing="small">
        <Toggle labelRight="이메일 알림" defaultChecked />
        <Toggle labelRight="푸시 알림" defaultChecked />
        <Toggle labelRight="SMS 알림" defaultChecked={false} />
      </ToggleGroup>

      <ToggleGroup label="프라이버시 설정" direction="vertical" spacing="small">
        <Toggle labelRight="프로필 공개" defaultChecked />
        <Toggle labelRight="검색 허용" defaultChecked={false} />
      </ToggleGroup>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 설정 페이지에서 사용되는 토글 예시입니다.',
      },
    },
  },
};

export const FilterExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0' }}>필터</h3>

      <ToggleGroup label="카테고리" direction="vertical" spacing="small">
        <Toggle labelRight="전자제품" defaultChecked />
        <Toggle labelRight="의류" defaultChecked={false} />
        <Toggle labelRight="도서" defaultChecked />
        <Toggle labelRight="스포츠" defaultChecked={false} />
      </ToggleGroup>

      <ToggleGroup label="가격 범위" direction="vertical" spacing="small">
        <Toggle labelRight="10,000원 이하" defaultChecked={false} />
        <Toggle labelRight="10,000원 - 50,000원" defaultChecked />
        <Toggle labelRight="50,000원 이상" defaultChecked={false} />
      </ToggleGroup>

      <ToggleGroup label="배송" direction="vertical" spacing="small">
        <Toggle labelRight="무료 배송" defaultChecked />
        <Toggle labelRight="당일 배송" defaultChecked={false} />
        <Toggle labelRight="해외 배송" defaultChecked={false} />
      </ToggleGroup>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '필터링 UI에서 사용되는 토글 예시입니다.',
      },
    },
  },
};

export const FeatureToggleExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0' }}>기능 활성화</h3>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        <div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            실시간 알림
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            새로운 메시지가 도착하면 즉시 알림을 받습니다
          </div>
        </div>
        <Toggle defaultChecked />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        <div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            자동 백업
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            매일 자동으로 데이터를 백업합니다
          </div>
        </div>
        <Toggle defaultChecked />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
        }}
      >
        <div>
          <div style={{ fontWeight: '500', marginBottom: '4px' }}>
            위치 기반 서비스
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            현재 위치를 기반으로 맞춤 정보를 제공합니다
          </div>
        </div>
        <Toggle defaultChecked={false} />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '기능 활성화 UI에서 사용되는 토글 예시입니다.',
      },
    },
  },
};

// ========================================
// Accessibility Stories
// ========================================

export const AccessibilityDemo: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'center',
      }}
    >
      <p
        style={{
          textAlign: 'center',
          maxWidth: '400px',
          fontSize: '14px',
          color: '#666',
        }}
      >
        키보드 네비게이션을 사용해보세요. Tab으로 이동하고 Enter/Space로 토글할
        수 있습니다.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Toggle
          labelRight="키보드로 토글 가능"
          defaultChecked
          aria-label="키보드로 토글 가능한 토글"
        />
        <Toggle
          labelRight="접근성 준수"
          defaultChecked
          aria-label="접근성 준수 토글"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '접근성 기능을 보여주는 토글입니다.',
      },
    },
  },
};
