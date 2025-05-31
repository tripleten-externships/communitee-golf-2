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

export const Default: StoryObj<typeof LoginForm> = {
	args: {
		username: '',
		password: '',
		onLogin: () => console.log('Login clicked'),
	},
};
