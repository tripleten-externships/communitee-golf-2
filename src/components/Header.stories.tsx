import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const LoginPage: Story = {
  args: {
    isLoginPage: true,
  },
};

export const WithBackButton: Story = {
  args: {
    isLoginPage: false,
    onBack: () => alert("Back button clicked!"),
  },
};
