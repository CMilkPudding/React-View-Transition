import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewTransitionTrigger from './ViewTransitionTrigger'

const data = {
    id: 102,
    src: `https://picsum.photos/seed/${Math.random()}/200/200`,
}

const meta = {
    title: 'Example',
    component: ViewTransitionTrigger,
    args: {
        ...data
    },
    argTypes: {
        duration: {
            control: 'number'
        },
        endDuration: {
            control: 'number'
        }
    }
} satisfies Meta<typeof ViewTransitionTrigger>

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        ...data,
        mode: 'click',
    }
}

export const ClickMode: Story = {
    args: {
        mode: 'click',
    }
}

export const ObserveMode: Story = {
    args: {
        mode: 'observe',
    }
}

