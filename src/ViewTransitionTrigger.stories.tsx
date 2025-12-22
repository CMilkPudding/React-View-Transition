import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ViewTransitionStart from './Start';
import ViewTransitionEnd from './End';
import './ViewTransitionTrigger.scss';

type CombinedProps = {
  id: string | number;
  src: string;
  startMode?: 'click' | 'observe';
  startClassName?: string;
  startStyle?: React.CSSProperties;
  duration?: number;
  endDuration?: number;
  maskClosable?: boolean;
  maskClassName?: string;
  maskStyle?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
};

function ViewTransitionDemo({
  id,
  src,
  startMode = 'click',
  startClassName,
  startStyle,
  duration,
  endDuration,
  maskClosable,
  maskClassName,
  maskStyle,
  contentClassName,
  contentStyle,
}: CombinedProps) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="wrapper">
        <ViewTransitionStart
          id={id}
          mode={startMode}
          className={startClassName}
          style={{ width: '200px', height: '200px', cursor: 'pointer', ...startStyle }}
          onClick={() => setShow(true)}
        >
          <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </ViewTransitionStart>
      </div>

      {show && (
        <ViewTransitionEnd
          id={id}
          duration={duration}
          endDuration={endDuration}
          maskClosable={maskClosable}
          maskClassName={maskClassName}
          maskStyle={maskStyle}
          contentClassName={contentClassName}
          contentStyle={contentStyle}
          onClose={() => setShow(false)}
        >
          <img src={src} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </ViewTransitionEnd>
      )}
    </>
  );
}

const meta = {
  title: 'Examples/ViewTransition Combined',
  component: ViewTransitionDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: '唯一标识，用于关联起始和结束位置',
    },
    src: {
      control: 'text',
      description: '图片地址',
    },
    startMode: {
      control: 'radio',
      options: ['click', 'observe'],
      description: 'ViewTransitionStart 的触发模式',
    },
    startClassName: {
      control: 'text',
      description: 'ViewTransitionStart 的自定义类名',
    },
    startStyle: {
      control: 'object',
      description: 'ViewTransitionStart 的自定义样式',
    },
    duration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'ViewTransitionEnd 开始动画持续时间(ms)',
    },
    endDuration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: 'ViewTransitionEnd 结束动画持续时间(ms)',
    },
    maskClosable: {
      control: 'boolean',
      description: 'ViewTransitionEnd 是否可点击遮罩关闭',
    },
    maskClassName: {
      control: 'text',
      description: 'ViewTransitionEnd 遮罩层自定义类名',
    },
    maskStyle: {
      control: 'object',
      description: 'ViewTransitionEnd 遮罩层自定义样式',
    },
    contentClassName: {
      control: 'text',
      description: 'ViewTransitionEnd 内容区自定义类名',
    },
    contentStyle: {
      control: 'object',
      description: 'ViewTransitionEnd 内容区自定义样式',
    },
  },
} satisfies Meta<typeof ViewTransitionDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'demo-1',
    src: 'https://picsum.photos/seed/demo1/400/400',
    startMode: 'click',
    maskClosable: true,
  },
};

export const ClickMode: Story = {
  args: {
    id: 'demo-2',
    src: 'https://picsum.photos/seed/demo2/400/400',
    startMode: 'click',
    maskClosable: true,
  },
};

export const ObserveMode: Story = {
  args: {
    id: 'demo-3',
    src: 'https://picsum.photos/seed/demo3/400/400',
    startMode: 'observe',
    maskClosable: true,
  },
};

export const CustomDuration: Story = {
  args: {
    id: 'demo-4',
    src: 'https://picsum.photos/seed/demo4/400/400',
    startMode: 'click',
    duration: 800,
    endDuration: 600,
    maskClosable: true,
  },
};

export const SlowAnimation: Story = {
  args: {
    id: 'demo-5',
    src: 'https://picsum.photos/seed/demo5/400/400',
    startMode: 'click',
    duration: 1500,
    endDuration: 1500,
    maskClosable: true,
  },
};

export const FastAnimation: Story = {
  args: {
    id: 'demo-6',
    src: 'https://picsum.photos/seed/demo6/400/400',
    startMode: 'click',
    duration: 200,
    endDuration: 200,
    maskClosable: true,
  },
};

export const MaskNotClosable: Story = {
  args: {
    id: 'demo-7',
    src: 'https://picsum.photos/seed/demo7/400/400',
    startMode: 'click',
    maskClosable: false,
  },
};

export const CustomMaskStyle: Story = {
  args: {
    id: 'demo-8',
    src: 'https://picsum.photos/seed/demo8/400/400',
    startMode: 'click',
    maskStyle: {
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
    maskClosable: true,
  },
};

export const CustomContentStyle: Story = {
  args: {
    id: 'demo-9',
    src: 'https://picsum.photos/seed/demo9/400/400',
    startMode: 'click',
    contentStyle: {
      borderRadius: '20px',
      overflow: 'hidden',
      maxWidth: '600px',
      maxHeight: '600px',
    },
    maskClosable: true,
  },
};

export const RoundedStart: Story = {
  args: {
    id: 'demo-10',
    src: 'https://picsum.photos/seed/demo10/400/400',
    startMode: 'click',
    startStyle: {
      borderRadius: '50%',
      overflow: 'hidden',
    },
    contentStyle: {
      borderRadius: '20px',
      overflow: 'hidden',
    },
    maskClosable: true,
  },
};

export const FullCustomization: Story = {
  args: {
    id: 'demo-11',
    src: 'https://picsum.photos/seed/demo11/400/400',
    startMode: 'click',
    startStyle: {
      border: '4px solid #3b82f6',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    duration: 600,
    endDuration: 400,
    maskStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    },
    contentStyle: {
      borderRadius: '16px',
      overflow: 'hidden',
      border: '2px solid #fff',
      maxWidth: '80vw',
      maxHeight: '80vh',
    },
    maskClosable: true,
  },
};
