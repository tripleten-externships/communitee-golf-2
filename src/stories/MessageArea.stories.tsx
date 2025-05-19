import type { Meta, StoryObj } from '@storybook/react';
import MessageArea from '../components/MessageArea'; 
import '../index.css';

const meta: Meta<typeof MessageArea> = {
  title: 'Components/MessageArea',
  component: MessageArea,
};

export default meta;
type Story = StoryObj<typeof MessageArea>;

export const Default: Story = {};

