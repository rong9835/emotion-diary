import type { Meta, StoryObj } from '@storybook/nextjs';
import { Pagination, PaginationInfo } from './index';
import { useState } from 'react';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof Pagination> = {
  title: 'Commons/Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Pagination 컴포넌트는 페이지 네비게이션을 위한 컴포넌트입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- 이전/다음 버튼 지원
- 현재 페이지 표시
- 비활성화 상태 지원
- 접근성 지원 (ARIA)
- PaginationInfo 컴포넌트로 정보 표시

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
      description: '페이지네이션의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '페이지네이션 크기',
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
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)',
      table: {
        type: { summary: 'number' },
      },
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
      table: {
        type: { summary: 'number' },
      },
    },
    maxVisiblePages: {
      control: { type: 'number', min: 1, max: 10 },
      description: '한 번에 표시할 페이지 번호 개수',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
      },
    },
    showArrows: {
      control: { type: 'boolean' },
      description: '이전/다음 버튼 표시 여부',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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
    onPageChange: {
      action: 'page-changed',
      description: '페이지 변경 시 호출되는 콜백',
      table: {
        type: { summary: '(page: number) => void' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const WithCurrentPage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// ========================================
// Variant Stories
// ========================================

export const Primary: Story = {
  args: {
    variant: 'primary',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// ========================================
// Size Stories
// ========================================

export const Small: Story = {
  args: {
    size: 'small',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// ========================================
// Theme Stories
// ========================================

export const Light: Story = {
  args: {
    theme: 'light',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    currentPage: 3,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// ========================================
// State Stories
// ========================================

export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    disabled: true,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const WithoutArrows: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    showArrows: false,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LimitedVisiblePages: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
    maxVisiblePages: 3,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

// ========================================
// Interactive Stories
// ========================================

export const Interactive: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const InteractiveWithInfo: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
    const itemsPerPage = 10;
    const totalItems = 95;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <PaginationInfo
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
        />
      </div>
    );
  },
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

// ========================================
// Combination Stories
// ========================================

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Primary</h3>
        <Pagination
          variant="primary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Primary page:', page)}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Secondary</h3>
        <Pagination
          variant="secondary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Secondary page:', page)}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Tertiary</h3>
        <Pagination
          variant="tertiary"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Tertiary page:', page)}
        />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Small</h3>
        <Pagination
          size="small"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Small page:', page)}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Medium</h3>
        <Pagination
          size="medium"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Medium page:', page)}
        />
      </div>
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>Large</h3>
        <Pagination
          size="large"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Large page:', page)}
        />
      </div>
    </div>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '8px', textAlign: 'center' }}>
          Light Theme
        </h3>
        <Pagination
          theme="light"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Light page:', page)}
        />
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
        }}
      >
        <h3
          style={{ marginBottom: '8px', textAlign: 'center', color: 'white' }}
        >
          Dark Theme
        </h3>
        <Pagination
          theme="dark"
          currentPage={3}
          totalPages={10}
          onPageChange={(page) => console.log('Dark page:', page)}
        />
      </div>
    </div>
  ),
};

// ========================================
// Edge Cases Stories
// ========================================

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const ManyPagesAtEnd: Story = {
  args: {
    currentPage: 48,
    totalPages: 50,
    maxVisiblePages: 5,
    onPageChange: (page: number) => console.log('Page changed to:', page),
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
        키보드 네비게이션을 사용해보세요. Tab으로 이동하고 Enter/Space로 선택할
        수 있습니다.
      </p>
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={(page) => console.log('Accessible page:', page)}
      />
    </div>
  ),
};

// ========================================
// Responsive Stories
// ========================================

export const ResponsiveDemo: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <p
        style={{
          marginBottom: '16px',
          fontSize: '14px',
          color: '#666',
          textAlign: 'center',
        }}
      >
        모바일 화면에서의 페이지네이션
      </p>
      <Pagination
        currentPage={5}
        totalPages={20}
        maxVisiblePages={3}
        onPageChange={(page) => console.log('Responsive page:', page)}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
