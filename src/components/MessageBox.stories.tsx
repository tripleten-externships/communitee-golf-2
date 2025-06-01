import type { Meta, StoryObj } from '@storybook/react';
import MessageBox from './MessageBox';

const meta: Meta<typeof MessageBox> = {
	title: 'Components/MessageBox',
	component: MessageBox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof MessageBox>;

export const Default: Story = {};
