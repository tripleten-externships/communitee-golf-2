import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
	title: 'Components/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		username: { control: 'text' },
		password: { control: 'text' },
		onLogin: { action: 'onLogin triggered' },
		onUsernameChange: { action: 'username changed' },
		onPasswordChange: { action: 'password changed' },
	},
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
	args: {
		username: '',
		password: '',
	},
};

export const PreFilled: Story = {
	args: {
		username: 'manager',
		password: 'golfcourse123',
	},
};
