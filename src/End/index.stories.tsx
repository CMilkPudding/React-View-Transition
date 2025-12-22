import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewTransitionEnd from './index';

const meta = {
  title: 'Components/ViewTransitionEnd',
  component: ViewTransitionEnd,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '唯一标识，与 ViewTransitionStart 的 id 对应',
    },
    duration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: '开始动画持续时间(ms)',
    },
    endDuration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: '结束动画持续时间(ms)',
    },
    maskClosable: {
      control: 'boolean',
      description: '是否可点击遮罩关闭',
    },
    maskClassName: {
      control: 'text',
      description: '遮罩层自定义 className',
    },
    maskStyle: {
      control: 'object',
      description: '遮罩层自定义样式',
    },
    contentClassName: {
      control: 'text',
      description: '内容区自定义 className',
    },
    contentStyle: {
      control: 'object',
      description: '内容区自定义样式',
    },
  },
} satisfies Meta<typeof ViewTransitionEnd>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicImage = (
  <img
    src="https://picsum.photos/seed/end1/600/600"
    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    alt="Demo"
  />
);

export const Default: Story = {
  args: {
    id: 'end-1',
    children: basicImage,
    maskClosable: true,
    onClose: () => console.log('Closed'),
  },
};

export const CustomDuration: Story = {
  args: {
    id: 'end-2',
    children: <img src="https://picsum.photos/seed/end2/600/600" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    duration: 800,
    endDuration: 600,
    maskClosable: true,
    onClose: () => console.log('Closed with custom duration'),
  },
};

export const SlowAnimation: Story = {
  args: {
    id: 'end-3',
    children: <img src="https://picsum.photos/seed/end3/600/600" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    duration: 1500,
    endDuration: 1500,
    maskClosable: true,
  },
};

export const FastAnimation: Story = {
  args: {
    id: 'end-4',
    children: <img src="https://picsum.photos/seed/end4/600/600" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    duration: 200,
    endDuration: 200,
    maskClosable: true,
  },
};

export const MaskNotClosable: Story = {
  args: {
    id: 'end-5',
    children: <img src="https://picsum.photos/seed/end5/600/600" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    maskClosable: false,
  },
};

export const CustomMaskStyle: Story = {
  args: {
    id: 'end-6',
    children: <img src="https://picsum.photos/seed/end6/600/600" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />,
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    maskClosable: true,
  },
};

export const RoundedContent: Story = {
  args: {
    id: 'end-8',
    children: <img src="https://picsum.photos/seed/end8/600/600" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    contentStyle: {
      borderRadius: '20px',
      overflow: 'hidden',
      maxWidth: '600px',
      maxHeight: '600px',
    },
    maskClosable: true,
  },
};

export const WithRichContent: Story = {
  args: {
    id: 'end-12',
    children: (
      <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px' }}>
        <img
          src="https://picsum.photos/seed/end12/600/400"
          style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
        />
        <h2 style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: '700' }}>标题</h2>
        <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
          这是一个包含丰富内容的示例，展示了如何在 ViewTransitionEnd 中使用复杂的内容结构。
        </p>
      </div>
    ),
    contentStyle: {
      maxWidth: '600px',
    },
    maskClosable: true,
  },
};