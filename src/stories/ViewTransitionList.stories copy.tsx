import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ViewTransitionStart from '../Start';
import ViewTransitionEnd from '..//End';

type ListItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  content: string;
};

type ListProps = {
  itemCount?: number;
  duration?: number;
  endDuration?: number;
  maskClosable?: boolean;
  startMode?: 'click' | 'observe';
  listLayout?: 'vertical' | 'horizontal';
};

function ViewTransitionList({
  itemCount = 5,
  duration = 400,
  endDuration = 400,
  maskClosable = true,
  startMode = 'click',
  listLayout = 'vertical',
}: ListProps) {
  const [selectedItem, setSelectedItem] = useState<ListItem | null>(null);

  const items: ListItem[] = Array.from({ length: itemCount }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}`,
    image: `https://picsum.photos/seed/list${i}/400/300`,
    content: `Detailed content for item ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  }));

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: listLayout === 'vertical' ? 'column' : 'row',
          gap: '16px',
          padding: '20px',
          maxWidth: listLayout === 'vertical' ? '600px' : '100%',
          overflowX: listLayout === 'horizontal' ? 'auto' : 'visible',
        }}
      >
        {items.map((item) => (
          <ViewTransitionStart
            key={item.id}
            id={`list-item-${item.id}`}
            mode={startMode}
            style={{
              display: 'flex',
              gap: '12px',
              padding: '12px',
              backgroundColor: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #e5e7eb',
              minWidth: listLayout === 'horizontal' ? '300px' : 'auto',
              transition: 'box-shadow 0.2s',
            }}
            onClick={() => setSelectedItem(item)}
          >
            <>
              <img
                src={item.image}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  flexShrink: 0,
                }}
                alt={item.title}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#6b7280',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.description}
                </p>
              </div>
            </>
          </ViewTransitionStart>
        ))}
      </div>

      {selectedItem && (
        <ViewTransitionEnd
          id={`list-item-${selectedItem.id}`}
          duration={duration}
          endDuration={endDuration}
          maskClosable={maskClosable}
          contentStyle={{
            maxWidth: '600px',
            maxHeight: '80vh',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#fff',
          }}
          onClose={() => setSelectedItem(null)}
        >
          <div style={{ padding: '24px' }}>
            <img
              src={selectedItem.image}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
              alt={selectedItem.title}
            />
            <h2
              style={{
                margin: '0 0 12px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
              }}
            >
              {selectedItem.title}
            </h2>
            <p
              style={{
                margin: '0 0 16px 0',
                fontSize: '16px',
                color: '#6b7280',
              }}
            >
              {selectedItem.description}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#374151',
              }}
            >
              {selectedItem.content}
            </p>
          </div>
        </ViewTransitionEnd>
      )}
    </>
  );
}

const meta = {
  title: 'Examples/ViewTransition List',
  component: ViewTransitionList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    itemCount: {
      control: { type: 'number', min: 3, max: 10, step: 1 },
      description: '列表项数量',
    },
    duration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: '打开动画持续时间(ms)',
    },
    endDuration: {
      control: { type: 'number', min: 100, max: 2000, step: 100 },
      description: '关闭动画持续时间(ms)',
    },
    maskClosable: {
      control: 'boolean',
      description: '是否可点击遮罩关闭',
    },
    startMode: {
      control: 'radio',
      options: ['click', 'observe'],
      description: '触发模式',
    },
    listLayout: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
      description: '列表布局方向',
    },
  },
} satisfies Meta<typeof ViewTransitionList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    itemCount: 5,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
    listLayout: 'vertical',
  },
};

export const VerticalList: Story = {
  args: {
    itemCount: 6,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
    listLayout: 'vertical',
  },
};

export const HorizontalList: Story = {
  args: {
    itemCount: 8,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
    listLayout: 'horizontal',
  },
};

export const ObserveMode: Story = {
  args: {
    itemCount: 5,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'observe',
    listLayout: 'vertical',
  },
};

export const SlowAnimation: Story = {
  args: {
    itemCount: 5,
    duration: 1200,
    endDuration: 1000,
    maskClosable: true,
    startMode: 'click',
    listLayout: 'vertical',
  },
};

export const FastAnimation: Story = {
  args: {
    itemCount: 5,
    duration: 200,
    endDuration: 200,
    maskClosable: true,
    startMode: 'click',
    listLayout: 'vertical',
  },
};
