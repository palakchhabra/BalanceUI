import type { Meta, StoryObj } from '@storybook/react';
import { VideoTrimmer } from './VideoTrimmer';

const meta: Meta<typeof VideoTrimmer> = {
  title: 'Components/VideoTrimmer',
  component: VideoTrimmer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    format: {
      control: 'select',
      options: ['video', 'audio'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof VideoTrimmer>;

export const Default: Story = {
  args: {
    src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    format: 'video',
  },
};

export const Audio: Story = {
  args: {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    format: 'audio',
  },
};

export const WithMinMaxDuration: Story = {
  args: {
    src: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    format: 'video',
    minDuration: 5,
    maxDuration: 30,
  },
};

export const WithCallback: Story = {
  render: () => {
    const handleTrim = (blob: Blob, start: number, end: number) => {
      console.log('Trimmed:', { blob, start, end });
      alert(`Trimmed from ${start.toFixed(2)}s to ${end.toFixed(2)}s`);
    };

    return (
      <VideoTrimmer
        src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        format="video"
        onTrim={handleTrim}
      />
    );
  },
};

