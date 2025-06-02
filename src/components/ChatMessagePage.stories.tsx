import { Meta, StoryObj } from "@storybook/react";
import { ChatMessagePage } from "./ChatMessagePage";
import { User } from "../types";
import jacob from "../assets/jacob.jpg";

const meta: Meta<typeof ChatMessagePage> = {
  title: "Pages/ChatMessagePage",
  component: ChatMessagePage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatMessagePage>;

const mockUser: User = {
  name: "John Smith",
  avatar: jacob,
};

export const Default: Story = {
  render: () => <ChatMessagePage user={mockUser} />,
};
