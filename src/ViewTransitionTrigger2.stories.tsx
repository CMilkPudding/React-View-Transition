import type { Meta, StoryObj } from '@storybook/react-vite';
import ViewTransitionStart from './Start';
import ViewTransitionEnd from './End';
import ViewTransitionTrigger from './ViewTransitionTrigger'

const data = {
    id: 102,
    src: `https://picsum.photos/seed/${Math.random()}/200/200`,
}

const basicArgs = {
    ...data
}


const meta = {
    title: 'Example2',
    component: ViewTransitionStart,
    subcomponents: {
        ViewTransitionEnd,
    },
    args: {
        ...basicArgs,
        
    },
    render: (...args) => (<>
        <ViewTransitionStart {...args} />
        <ViewTransitionEnd {...args} />
    </>)
} satisfies Meta<typeof ViewTransitionStart>

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        ...basicArgs,
        mode: 'click',
    }
}
