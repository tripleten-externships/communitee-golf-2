import { Meta, StoryObj } from "@storybook/react";
import { ChatMessagePage } from "./ChatMessagePage";
import { User } from "../types/type";
import jacob from "../assets/jacob.jpg";

const meta: Meta<typeof ChatMessagePage> = {
  title: "Pages/ChatMessagePage",
  component: ChatMessagePage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ChatMessagePage>;

const mockUser: User = {
  id: "user-123",
  username: "johnsmith",
  role: "manager",
  name: "John Smith",
  avatar: jacob,
};

export const Default: Story = {
  render: () => (
    <ChatMessagePage
      user={mockUser}
      streamId="1"
      onBack={() => console.log("Back clicked")}
    />
  ),
};
