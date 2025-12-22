import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewTransitionStart from './index';

const meta = {
  title: 'Components/ViewTransitionStart',
  component: ViewTransitionStart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '唯一标识，用于关联起始和结束位置',
    },
    mode: {
      control: 'radio',
      options: ['click', 'observe'],
      description: '元素开始位置记录模式',
    },
    className: {
      control: 'text',
      description: '自定义 className',
    },
    style: {
      control: 'object',
      description: '自定义样式',
    },
  },
} satisfies Meta<typeof ViewTransitionStart>;

export default meta;

type Story = StoryObj<typeof meta>;

const basicImage = (
  <img
    src="https://picsum.photos/seed/start1/300/300"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    alt="Demo"
  />
);

export const Default: Story = {
  args: {
    id: 'start-1',
    mode: 'click',
    style: { width: '200px', height: '200px', cursor: 'pointer' },
    children: basicImage,
    onClick: () => console.log('Clicked!'),
  },
};

export const ClickMode: Story = {
  args: {
    id: 'start-2',
    mode: 'click',
    style: { width: '200px', height: '200px', cursor: 'pointer' },
    children: <img src="https://picsum.photos/seed/start2/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => alert('点击触发捕获位置'),
  },
};

export const ObserveMode: Story = {
  args: {
    id: 'start-3',
    mode: 'observe',
    style: { width: '200px', height: '200px' },
    children: <img src="https://picsum.photos/seed/start3/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  },
};

export const WithRoundedCorners: Story = {
  args: {
    id: 'start-4',
    mode: 'click',
    style: {
      width: '200px',
      height: '200px',
      cursor: 'pointer',
      borderRadius: '16px',
      overflow: 'hidden',
    },
    children: <img src="https://picsum.photos/seed/start4/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => console.log('Rounded corners clicked'),
  },
};

export const CircleShape: Story = {
  args: {
    id: 'start-5',
    mode: 'click',
    style: {
      width: '200px',
      height: '200px',
      cursor: 'pointer',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    children: <img src="https://picsum.photos/seed/start5/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => console.log('Circle clicked'),
  },
};

export const WithBorder: Story = {
  args: {
    id: 'start-6',
    mode: 'click',
    style: {
      width: '200px',
      height: '200px',
      cursor: 'pointer',
      border: '4px solid #3b82f6',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    children: <img src="https://picsum.photos/seed/start6/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => console.log('Bordered element clicked'),
  },
};

export const SmallSize: Story = {
  args: {
    id: 'start-7',
    mode: 'click',
    style: {
      width: '100px',
      height: '100px',
      cursor: 'pointer',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    children: <img src="https://picsum.photos/seed/start7/300/300" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => console.log('Small size clicked'),
  },
};

export const LargeSize: Story = {
  args: {
    id: 'start-8',
    mode: 'click',
    style: {
      width: '300px',
      height: '300px',
      cursor: 'pointer',
      borderRadius: '12px',
      overflow: 'hidden',
    },
    children: <img src="https://picsum.photos/seed/start8/400/400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    onClick: () => console.log('Large size clicked'),
  },
};

