import type { Meta, StoryObj } from '@storybook/react-vite';

import ViewTransitionEnd from './index';

const meta = {
  title: 'Components/ViewTransitionEnd',
  component: ViewTransitionEnd,
} satisfies Meta<typeof ViewTransitionEnd>;

export default meta;

type Story = StoryObj<typeof meta>;


const basicArgs = {
  id: 101,
  children: <img style={{ width: '100%', height: '100%' }} src={`https://picsum.photos/seed/${Math.random()}/200/200`} />
}

export const Default: Story = {
  args: {
    children: <div style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>{basicArgs.children}</div>,
    id: 102,
    maskStyle: {},
    contentStyle: {}
  }
};