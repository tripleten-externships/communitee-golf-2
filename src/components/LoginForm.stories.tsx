import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
	title: 'Components/LoginForm',
	component: LoginForm,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
	args: {
		onLogin: () => console.log('Login successful'),
	},
};

export const PreFilled: Story = {
	render: (args) => (
		<LoginForm
			{...args}
			onLogin={() => {
				console.log('Logging in with pre-filled data');
			}}
		/>
	),
};
