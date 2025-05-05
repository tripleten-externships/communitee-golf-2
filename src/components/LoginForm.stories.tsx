import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from '../components/LoginForm';
import { DropdownMenu } from '../components/DropdownMenu';
import MessageBox from '../components/MessageBox';

const meta = {
	title: 'Components/CombinedView',
	component: LoginForm, // You can just pick any (storybook requires a component)
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<div className='w-full min-h-screen flex justify-center items-start space-x-8 p-10 bg-gray-50'>
			<LoginForm onLogin={() => {}} />
			<DropdownMenu />
			<br />
			<MessageBox />
		</div>
	),
};
