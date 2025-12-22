import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewTransitionStart from './index'

const meta = {
    title: 'Example/ViewTransitionStart',
    component: ViewTransitionStart,
    args: {
        id: 101,
        children: <img src={`https://picsum.photos/seed/${Math.random()}/200/200`} />
    }
} satisfies Meta<typeof ViewTransitionStart>

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        id: 102,
        mode: 'click',
        children: <img src={`https://picsum.photos/seed/${Math.random()}/200/200`} />
    }
}

export const Observe: Story = {
    args: {
        id: 103,
        mode: 'observe',
        children: <img src={`https://picsum.photos/seed/${Math.random()}/200/200`} />
    }
}

