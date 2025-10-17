import type { Meta, StoryObj } from '@storybook/nextjs';
import { Modal } from './index';

// ========================================
// Storybook Meta Configuration
// ========================================

const meta: Meta<typeof Modal> = {
  title: 'Commons/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Modal 컴포넌트는 사용자에게 중요한 정보를 전달하거나 확인을 받기 위한 팝업 창입니다.

## Features
- 2가지 variant (info, danger)
- 2가지 actions (single, dual)
- 2가지 theme (light, dark)
- 접근성 지원 (ARIA, 키보드 네비게이션)
- Disabled 상태 지원
- Full width 옵션
- 커스텀 버튼 텍스트 지원

## Design System
Figma 디자인 시스템을 기반으로 구현되었습니다.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'danger'],
      description: '모달의 시각적 스타일 variant',
      table: {
        type: { summary: 'info | danger' },
        defaultValue: { summary: 'info' },
      },
    },
    actions: {
      control: { type: 'select' },
      options: ['single', 'dual'],
      description: '모달의 액션 버튼 구성',
      table: {
        type: { summary: 'single | dual' },
        defaultValue: { summary: 'single' },
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
    title: {
      control: { type: 'text' },
      description: '모달 제목',
    },
    content: {
      control: { type: 'text' },
      description: '모달 내용',
    },
    confirmText: {
      control: { type: 'text' },
      description: '확인 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    cancelText: {
      control: { type: 'text' },
      description: '취소 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '취소' },
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
    onConfirm: {
      action: 'confirmed',
      description: '확인 버튼 클릭 핸들러',
    },
    onCancel: {
      action: 'cancelled',
      description: '취소 버튼 클릭 핸들러',
    },
  },
  args: {
    variant: 'info',
    actions: 'single',
    theme: 'light',
    title: '기본 모달',
    content: '이것은 기본 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
    disabled: false,
    fullWidth: false,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', minHeight: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// ========================================
// Story Types
// ========================================

type Story = StoryObj<typeof meta>;

// ========================================
// Default Story
// ========================================

export const Default: Story = {
  args: {
    title: '기본 모달',
    content: '이것은 기본 모달입니다.',
  },
};

export const Playground: Story = {
  args: {
    title: '플레이그라운드',
    content: '모든 props를 자유롭게 조작해볼 수 있는 모달입니다.',
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
    <div style={{ display: 'flex', gap: '32px' }}>
      <Modal
        variant="info"
        title="정보 모달"
        content="정보를 확인해주세요."
        actions="single"
        confirmText="확인"
      />
      <Modal
        variant="danger"
        title="경고 모달"
        content="이 작업은 되돌릴 수 없습니다."
        actions="dual"
        confirmText="삭제"
        cancelText="취소"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달의 2가지 variant를 보여줍니다.',
      },
    },
  },
};

export const InfoVariant: Story = {
  args: {
    variant: 'info',
    title: '정보 모달',
    content: '정보를 확인해주세요.',
  },
  parameters: {
    docs: {
      description: {
        story: '정보성 모달입니다. 일반적인 정보 전달에 사용됩니다.',
      },
    },
  },
};

export const DangerVariant: Story = {
  args: {
    variant: 'danger',
    title: '경고 모달',
    content: '이 작업은 되돌릴 수 없습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '경고/위험 모달입니다. 중요한 작업 확인에 사용됩니다.',
      },
    },
  },
};

// ========================================
// Actions Stories
// ========================================

export const Actions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Modal
        actions="single"
        title="단일 액션"
        content="확인 버튼만 있는 모달입니다."
        confirmText="확인"
      />
      <Modal
        actions="dual"
        title="이중 액션"
        content="취소와 확인 버튼이 있는 모달입니다."
        confirmText="확인"
        cancelText="취소"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달의 2가지 액션 구성을 보여줍니다.',
      },
    },
  },
};

export const SingleAction: Story = {
  args: {
    actions: 'single',
    title: '단일 액션 모달',
    content: '확인 버튼만 있는 모달입니다.',
    confirmText: '확인',
  },
  parameters: {
    docs: {
      description: {
        story: '단일 액션 모달입니다. 간단한 확인에 사용됩니다.',
      },
    },
  },
};

export const DualAction: Story = {
  args: {
    actions: 'dual',
    title: '이중 액션 모달',
    content: '취소와 확인 버튼이 있는 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story:
          '이중 액션 모달입니다. 사용자가 선택할 수 있는 옵션을 제공합니다.',
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
        <Modal
          theme="light"
          title="라이트 테마"
          content="라이트 테마로 표시되는 모달입니다."
          actions="single"
          confirmText="확인"
        />
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#000000',
          borderRadius: '8px',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <Modal
          theme="dark"
          title="다크 테마"
          content="다크 테마로 표시되는 모달입니다."
          actions="single"
          confirmText="확인"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마에서의 모달 모습을 보여줍니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    title: '라이트 테마 모달',
    content: '라이트 테마로 표시되는 모달입니다.',
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: '라이트 테마 모달',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    title: '다크 테마 모달',
    content: '다크 테마로 표시되는 모달입니다.',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마 모달',
      },
    },
  },
};

// ========================================
// State Stories
// ========================================

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Modal
        title="일반 상태"
        content="정상적으로 작동하는 모달입니다."
        actions="single"
        confirmText="확인"
      />
      <Modal
        disabled
        title="비활성화 상태"
        content="이 모달은 비활성화 상태입니다."
        actions="single"
        confirmText="확인"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모달의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    title: '비활성화 모달',
    content: '이 모달은 비활성화 상태입니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 모달입니다. 클릭할 수 없습니다.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    title: '전체 너비 모달',
    content: '전체 너비를 사용하는 모달입니다.',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '컨테이너의 전체 너비를 사용하는 모달입니다.',
      },
    },
  },
};

// ========================================
// Combination Stories
// ========================================

export const DangerDualAction: Story = {
  args: {
    variant: 'danger',
    actions: 'dual',
    title: '삭제 확인',
    content: '정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    confirmText: '삭제',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story:
          '위험한 작업을 확인하는 모달입니다. danger variant와 dual action을 조합했습니다.',
      },
    },
  },
};

export const InfoDualActionDark: Story = {
  args: {
    variant: 'info',
    actions: 'dual',
    theme: 'dark',
    title: '정보 확인',
    content: '다크 테마의 이중 액션 모달입니다.',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마의 정보 확인 모달입니다.',
      },
    },
  },
};

// ========================================
// Long Content Story
// ========================================

export const LongContent: Story = {
  args: {
    title: '긴 내용 모달',
    content:
      '이것은 매우 긴 내용을 포함하는 모달입니다. 여러 줄의 텍스트가 포함되어 있어서 모달의 높이가 늘어날 수 있습니다. 이런 경우에도 모달이 적절하게 표시되는지 확인할 수 있습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '긴 내용을 포함하는 모달입니다. 높이가 자동으로 조정됩니다.',
      },
    },
  },
};

// ========================================
// Custom Button Text Story
// ========================================

export const CustomButtonText: Story = {
  args: {
    actions: 'dual',
    title: '커스텀 버튼 텍스트',
    content: '버튼 텍스트를 커스터마이징한 모달입니다.',
    confirmText: '저장',
    cancelText: '닫기',
  },
  parameters: {
    docs: {
      description: {
        story: '버튼 텍스트를 커스터마이징한 모달입니다.',
      },
    },
  },
};

// ========================================
// Interactive Story
// ========================================

export const Interactive: Story = {
  args: {
    title: '인터랙티브 모달',
    content: '이 모달은 Storybook 컨트롤을 통해 실시간으로 조작할 수 있습니다.',
    actions: 'dual',
    confirmText: '확인',
    cancelText: '취소',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Controls 패널을 사용하여 모달의 모든 속성을 실시간으로 변경할 수 있습니다.',
      },
    },
  },
};
