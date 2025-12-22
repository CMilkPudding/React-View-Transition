import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import ViewTransitionStart from './Start';
import ViewTransitionEnd from './End';

type GalleryProps = {
  gridColumns?: number;
  imageCount?: number;
  duration?: number;
  endDuration?: number;
  maskClosable?: boolean;
  startMode?: 'click' | 'observe';
};

function ViewTransitionGallery({
  gridColumns = 3,
  imageCount = 9,
  duration = 400,
  endDuration = 400,
  maskClosable = true,
  startMode = 'click',
}: GalleryProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const images = Array.from({ length: imageCount }, (_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/gallery${i}/400/400`,
  }));

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
          gap: '16px',
          padding: '20px',
          maxWidth: '800px',
        }}
      >
        {images.map((image) => (
          <ViewTransitionStart
            key={image.id}
            id={`gallery-${image.id}`}
            mode={startMode}
            style={{
              width: '100%',
              aspectRatio: '1',
              cursor: 'pointer',
              borderRadius: '8px',
              overflow: 'hidden',
              transition: 'transform 0.2s',
            }}
            onClick={() => setSelectedId(image.id)}
          >
            <img
              src={image.src}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt={`Gallery image ${image.id}`}
            />
          </ViewTransitionStart>
        ))}
      </div>

      {selectedId !== null && (
        <ViewTransitionEnd
          id={`gallery-${selectedId}`}
          duration={duration}
          endDuration={endDuration}
          maskClosable={maskClosable}
          contentStyle={{
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
          onClose={() => setSelectedId(null)}
        >
          <img
            src={images[selectedId].src}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            alt={`Gallery image ${selectedId}`}
          />
        </ViewTransitionEnd>
      )}
    </>
  );
}

const meta = {
  title: 'Examples/ViewTransition Gallery',
  component: ViewTransitionGallery,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    gridColumns: {
      control: { type: 'number', min: 2, max: 6, step: 1 },
      description: '网格列数',
    },
    imageCount: {
      control: { type: 'number', min: 3, max: 20, step: 1 },
      description: '图片数量',
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
  },
} satisfies Meta<typeof ViewTransitionGallery>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gridColumns: 3,
    imageCount: 9,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
  },
};

export const TwoColumns: Story = {
  args: {
    gridColumns: 2,
    imageCount: 6,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
  },
};

export const FourColumns: Story = {
  args: {
    gridColumns: 4,
    imageCount: 12,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'click',
  },
};

export const SlowAnimation: Story = {
  args: {
    gridColumns: 3,
    imageCount: 9,
    duration: 1000,
    endDuration: 1000,
    maskClosable: true,
    startMode: 'click',
  },
};

export const ObserveMode: Story = {
  args: {
    gridColumns: 3,
    imageCount: 9,
    duration: 400,
    endDuration: 400,
    maskClosable: true,
    startMode: 'observe',
  },
};
