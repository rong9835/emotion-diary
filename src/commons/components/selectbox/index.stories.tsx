import type { Meta, StoryObj } from '@storybook/nextjs';
import { SelectBox } from './index';

// ========================================
// Meta Configuration
// ========================================

const meta: Meta<typeof SelectBox> = {
  title: 'Commons/Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
SelectBox 컴포넌트는 사용자가 여러 옵션 중 하나를 선택할 수 있는 드롭다운 선택 요소입니다.

## Features
- 3가지 variant (primary, secondary, tertiary)
- 3가지 size (small, medium, large)
- 2가지 theme (light, dark)
- 검색 기능 지원
- 비활성화 상태 지원
- 에러 상태 지원
- Full width 옵션
- 키보드 네비게이션 지원
- 접근성 준수

## Design System
Figma 디자인 시스템을 기반으로 구현되었습니다.
        `,
      },
    },
  },
  argTypes: {
    options: {
      control: { type: 'object' },
      description: '선택 가능한 옵션들',
      table: {
        type: { summary: 'SelectOption[]' },
      },
    },
    value: {
      control: { type: 'text' },
      description: '현재 선택된 값',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: { type: 'text' },
      description: '기본 선택된 값',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
      description: '셀렉트박스의 시각적 스타일 variant',
      table: {
        type: { summary: 'primary | secondary | tertiary' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '셀렉트박스 크기',
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
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '선택하세요' },
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
    error: {
      control: { type: 'boolean' },
      description: '에러 상태',
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
    searchable: {
      control: { type: 'boolean' },
      description: '검색 기능 활성화',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: '검색 플레이스홀더',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '검색...' },
      },
    },
    maxHeight: {
      control: { type: 'number' },
      description: '드롭다운 최대 높이',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '200' },
      },
    },
    onChange: {
      action: 'changed',
      description: '값 변경 시 호출되는 콜백',
    },
  },
  args: {
    options: [
      { value: 'option1', label: '옵션 1' },
      { value: 'option2', label: '옵션 2' },
      { value: 'option3', label: '옵션 3' },
      { value: 'option4', label: '옵션 4', disabled: true },
      { value: 'option5', label: '옵션 5' },
    ],
    variant: 'primary',
    size: 'medium',
    theme: 'light',
    placeholder: '선택하세요',
    disabled: false,
    error: false,
    fullWidth: false,
    searchable: false,
    searchPlaceholder: '검색...',
    maxHeight: 200,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========================================
// Basic Stories
// ========================================

export const Default: Story = {
  args: {
    options: [
      { value: 'seoul', label: '서울' },
      { value: 'busan', label: '부산' },
      { value: 'daegu', label: '대구' },
      { value: 'incheon', label: '인천' },
      { value: 'gwangju', label: '광주' },
    ],
    placeholder: '도시를 선택하세요',
  },
};

export const Playground: Story = {
  args: {
    options: [
      { value: 'apple', label: '사과' },
      { value: 'banana', label: '바나나' },
      { value: 'orange', label: '오렌지' },
      { value: 'grape', label: '포도' },
      { value: 'strawberry', label: '딸기' },
    ],
    placeholder: '과일을 선택하세요',
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
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <SelectBox
        variant="primary"
        options={[
          { value: 'primary1', label: 'Primary 1' },
          { value: 'primary2', label: 'Primary 2' },
          { value: 'primary3', label: 'Primary 3' },
        ]}
        placeholder="Primary"
      />
      <SelectBox
        variant="secondary"
        options={[
          { value: 'secondary1', label: 'Secondary 1' },
          { value: 'secondary2', label: 'Secondary 2' },
          { value: 'secondary3', label: 'Secondary 3' },
        ]}
        placeholder="Secondary"
      />
      <SelectBox
        variant="tertiary"
        options={[
          { value: 'tertiary1', label: 'Tertiary 1' },
          { value: 'tertiary2', label: 'Tertiary 2' },
          { value: 'tertiary3', label: 'Tertiary 3' },
        ]}
        placeholder="Tertiary"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '셀렉트박스의 3가지 variant를 보여줍니다.',
      },
    },
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ],
    placeholder: 'Primary SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story:
          '주요 선택용 셀렉트박스입니다. 흰색 배경과 회색 테두리를 가집니다.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    options: [
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
    ],
    placeholder: 'Secondary SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story: '보조 선택용 셀렉트박스입니다. 회색 배경을 가집니다.',
      },
    },
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    options: [
      { value: 'beginner', label: '초급' },
      { value: 'intermediate', label: '중급' },
      { value: 'advanced', label: '고급' },
      { value: 'expert', label: '전문가' },
    ],
    placeholder: 'Tertiary SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 셀렉트박스입니다. 연한 회색 톤을 가집니다.',
      },
    },
  },
};

// ========================================
// Size Stories
// ========================================

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <SelectBox
        size="small"
        options={[
          { value: 'small1', label: 'Small 1' },
          { value: 'small2', label: 'Small 2' },
        ]}
        placeholder="Small"
      />
      <SelectBox
        size="medium"
        options={[
          { value: 'medium1', label: 'Medium 1' },
          { value: 'medium2', label: 'Medium 2' },
        ]}
        placeholder="Medium"
      />
      <SelectBox
        size="large"
        options={[
          { value: 'large1', label: 'Large 1' },
          { value: 'large2', label: 'Large 2' },
        ]}
        placeholder="Large"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '셀렉트박스의 3가지 크기를 보여줍니다.',
      },
    },
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
    ],
    placeholder: 'Small SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story: '작은 크기 셀렉트박스 (80px 너비)',
      },
    },
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    options: [
      { value: 'morning', label: '오전' },
      { value: 'afternoon', label: '오후' },
      { value: 'evening', label: '저녁' },
      { value: 'night', label: '밤' },
    ],
    placeholder: 'Medium SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story: '중간 크기 셀렉트박스 (120px 너비) - 기본값',
      },
    },
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    options: [
      { value: 'frontend', label: '프론트엔드 개발자' },
      { value: 'backend', label: '백엔드 개발자' },
      { value: 'fullstack', label: '풀스택 개발자' },
      { value: 'devops', label: 'DevOps 엔지니어' },
    ],
    placeholder: 'Large SelectBox',
  },
  parameters: {
    docs: {
      description: {
        story: '큰 크기 셀렉트박스 (200px 너비)',
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
          border: '1px solid #e0e0e0',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#000' }}>Light Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <SelectBox
            variant="primary"
            theme="light"
            options={[
              { value: 'light1', label: 'Primary Light' },
              { value: 'light2', label: 'Option 2' },
            ]}
            placeholder="Primary Light"
          />
          <SelectBox
            variant="secondary"
            theme="light"
            options={[
              { value: 'light3', label: 'Secondary Light' },
              { value: 'light4', label: 'Option 2' },
            ]}
            placeholder="Secondary Light"
          />
          <SelectBox
            variant="tertiary"
            theme="light"
            options={[
              { value: 'light5', label: 'Tertiary Light' },
              { value: 'light6', label: 'Option 2' },
            ]}
            placeholder="Tertiary Light"
          />
        </div>
      </div>
      <div
        style={{
          padding: '20px',
          backgroundColor: '#1a1a1a',
          borderRadius: '8px',
          border: '1px solid #333333',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', color: '#fff' }}>Dark Theme</h4>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
          <SelectBox
            variant="primary"
            theme="dark"
            options={[
              { value: 'dark1', label: 'Primary Dark' },
              { value: 'dark2', label: 'Option 2' },
            ]}
            placeholder="Primary Dark"
          />
          <SelectBox
            variant="secondary"
            theme="dark"
            options={[
              { value: 'dark3', label: 'Secondary Dark' },
              { value: 'dark4', label: 'Option 2' },
            ]}
            placeholder="Secondary Dark"
          />
          <SelectBox
            variant="tertiary"
            theme="dark"
            options={[
              { value: 'dark5', label: 'Tertiary Dark' },
              { value: 'dark6', label: 'Option 2' },
            ]}
            placeholder="Tertiary Dark"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '라이트 테마와 다크 테마에서의 셀렉트박스 모습을 보여줍니다.',
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    theme: 'light',
    options: [
      { value: 'sunny', label: '맑음' },
      { value: 'cloudy', label: '흐림' },
      { value: 'rainy', label: '비' },
      { value: 'snowy', label: '눈' },
    ],
    placeholder: 'Light Theme SelectBox',
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: '라이트 테마 셀렉트박스',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    theme: 'dark',
    options: [
      { value: 'moon', label: '달' },
      { value: 'stars', label: '별' },
      { value: 'galaxy', label: '은하수' },
      { value: 'nebula', label: '성운' },
    ],
    placeholder: 'Dark Theme SelectBox',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: '다크 테마 셀렉트박스',
      },
    },
  },
};

// ========================================
// State Stories
// ========================================

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <SelectBox
        options={[
          { value: 'normal1', label: 'Normal 1' },
          { value: 'normal2', label: 'Normal 2' },
        ]}
        placeholder="Normal"
      />
      <SelectBox
        disabled
        options={[
          { value: 'disabled1', label: 'Disabled 1' },
          { value: 'disabled2', label: 'Disabled 2' },
        ]}
        placeholder="Disabled"
      />
      <SelectBox
        error
        options={[
          { value: 'error1', label: 'Error 1' },
          { value: 'error2', label: 'Error 2' },
        ]}
        placeholder="Error"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '셀렉트박스의 다양한 상태를 보여줍니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    options: [
      { value: 'option1', label: '비활성화된 옵션 1' },
      { value: 'option2', label: '비활성화된 옵션 2' },
    ],
    placeholder: '비활성화된 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화된 상태의 셀렉트박스입니다. 클릭할 수 없습니다.',
      },
    },
  },
};

export const Error: Story = {
  args: {
    error: true,
    options: [
      { value: 'option1', label: '에러 옵션 1' },
      { value: 'option2', label: '에러 옵션 2' },
    ],
    placeholder: '에러 상태 셀렉트박스',
  },
  parameters: {
    docs: {
      description: {
        story: '에러 상태의 셀렉트박스입니다. 빨간색 테두리가 표시됩니다.',
      },
    },
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'available1', label: '사용 가능한 옵션 1' },
      { value: 'disabled1', label: '비활성화된 옵션 1', disabled: true },
      { value: 'available2', label: '사용 가능한 옵션 2' },
      { value: 'disabled2', label: '비활성화된 옵션 2', disabled: true },
      { value: 'available3', label: '사용 가능한 옵션 3' },
    ],
    placeholder: '일부 옵션이 비활성화됨',
  },
  parameters: {
    docs: {
      description: {
        story: '일부 옵션이 비활성화된 셀렉트박스입니다.',
      },
    },
  },
};

// ========================================
// Feature Stories
// ========================================

export const Searchable: Story = {
  args: {
    searchable: true,
    options: [
      { value: 'afghanistan', label: '아프가니스탄' },
      { value: 'albania', label: '알바니아' },
      { value: 'algeria', label: '알제리' },
      { value: 'argentina', label: '아르헨티나' },
      { value: 'australia', label: '호주' },
      { value: 'austria', label: '오스트리아' },
      { value: 'bangladesh', label: '방글라데시' },
      { value: 'belgium', label: '벨기에' },
      { value: 'brazil', label: '브라질' },
      { value: 'canada', label: '캐나다' },
      { value: 'china', label: '중국' },
      { value: 'france', label: '프랑스' },
      { value: 'germany', label: '독일' },
      { value: 'india', label: '인도' },
      { value: 'japan', label: '일본' },
      { value: 'korea', label: '대한민국' },
      { value: 'usa', label: '미국' },
    ],
    placeholder: '국가를 검색하세요',
    searchPlaceholder: '국가명을 입력하세요...',
  },
  parameters: {
    docs: {
      description: {
        story:
          '검색 기능이 활성화된 셀렉트박스입니다. 드롭다운에서 옵션을 검색할 수 있습니다.',
      },
    },
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    options: [
      { value: 'fullwidth1', label: '전체 너비 옵션 1' },
      { value: 'fullwidth2', label: '전체 너비 옵션 2' },
      { value: 'fullwidth3', label: '전체 너비 옵션 3' },
    ],
    placeholder: '전체 너비 셀렉트박스',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '컨테이너의 전체 너비를 사용하는 셀렉트박스입니다.',
      },
    },
  },
};

export const CustomMaxHeight: Story = {
  args: {
    maxHeight: 120,
    options: [
      { value: 'item1', label: '아이템 1' },
      { value: 'item2', label: '아이템 2' },
      { value: 'item3', label: '아이템 3' },
      { value: 'item4', label: '아이템 4' },
      { value: 'item5', label: '아이템 5' },
      { value: 'item6', label: '아이템 6' },
      { value: 'item7', label: '아이템 7' },
      { value: 'item8', label: '아이템 8' },
      { value: 'item9', label: '아이템 9' },
      { value: 'item10', label: '아이템 10' },
    ],
    placeholder: '최대 높이 제한',
  },
  parameters: {
    docs: {
      description: {
        story:
          '드롭다운의 최대 높이가 120px로 제한된 셀렉트박스입니다. 스크롤이 생깁니다.',
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
        backgroundColor: '#fafafa',
      }}
    >
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600' }}>
        사용자 정보 입력
      </h3>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          국가 *
        </label>
        <SelectBox
          fullWidth
          variant="primary"
          searchable
          options={[
            { value: 'kr', label: '대한민국' },
            { value: 'us', label: '미국' },
            { value: 'jp', label: '일본' },
            { value: 'cn', label: '중국' },
            { value: 'de', label: '독일' },
          ]}
          placeholder="국가를 선택하세요"
          searchPlaceholder="국가명 검색..."
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          직업
        </label>
        <SelectBox
          fullWidth
          variant="secondary"
          options={[
            { value: 'developer', label: '개발자' },
            { value: 'designer', label: '디자이너' },
            { value: 'manager', label: '매니저' },
            { value: 'student', label: '학생' },
            { value: 'other', label: '기타' },
          ]}
          placeholder="직업을 선택하세요"
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          경력 수준
        </label>
        <SelectBox
          fullWidth
          variant="primary"
          size="small"
          options={[
            { value: 'junior', label: '주니어 (1-3년)' },
            { value: 'mid', label: '미드레벨 (3-7년)' },
            { value: 'senior', label: '시니어 (7년 이상)' },
          ]}
          placeholder="경력을 선택하세요"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '실제 폼에서 사용되는 셀렉트박스 예시입니다.',
      },
    },
  },
};

export const FilterExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-end',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}
    >
      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#666',
          }}
        >
          카테고리
        </label>
        <SelectBox
          size="small"
          variant="secondary"
          options={[
            { value: 'all', label: '전체' },
            { value: 'electronics', label: '전자제품' },
            { value: 'clothing', label: '의류' },
            { value: 'books', label: '도서' },
            { value: 'sports', label: '스포츠' },
          ]}
          defaultValue="all"
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#666',
          }}
        >
          정렬
        </label>
        <SelectBox
          size="small"
          variant="secondary"
          options={[
            { value: 'newest', label: '최신순' },
            { value: 'oldest', label: '오래된순' },
            { value: 'price_low', label: '가격 낮은순' },
            { value: 'price_high', label: '가격 높은순' },
            { value: 'popular', label: '인기순' },
          ]}
          defaultValue="newest"
        />
      </div>

      <div>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '12px',
            color: '#666',
          }}
        >
          개수
        </label>
        <SelectBox
          size="small"
          variant="secondary"
          options={[
            { value: '10', label: '10개' },
            { value: '20', label: '20개' },
            { value: '50', label: '50개' },
            { value: '100', label: '100개' },
          ]}
          defaultValue="20"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '필터링 UI에서 사용되는 셀렉트박스 예시입니다.',
      },
    },
  },
};

export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      <h4 style={{ marginBottom: '16px' }}>반응형 셀렉트박스</h4>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        <SelectBox
          options={[
            { value: 'mobile', label: '모바일' },
            { value: 'tablet', label: '태블릿' },
            { value: 'desktop', label: '데스크톱' },
          ]}
          placeholder="기기 선택"
        />
        <SelectBox
          options={[
            { value: 'chrome', label: 'Chrome' },
            { value: 'firefox', label: 'Firefox' },
            { value: 'safari', label: 'Safari' },
            { value: 'edge', label: 'Edge' },
          ]}
          placeholder="브라우저 선택"
        />
        <SelectBox
          options={[
            { value: 'windows', label: 'Windows' },
            { value: 'macos', label: 'macOS' },
            { value: 'linux', label: 'Linux' },
            { value: 'android', label: 'Android' },
            { value: 'ios', label: 'iOS' },
          ]}
          placeholder="OS 선택"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '반응형 그리드 레이아웃에서 사용되는 셀렉트박스 예시입니다.',
      },
    },
  },
};
