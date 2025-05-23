import type { Meta, StoryObj } from "@storybook/react";
import MessageArea from "../components/MessageArea";
import "../index.css";

const meta: Meta<typeof MessageArea> = {
  title: "Components/MessageArea",
  component: MessageArea,
  argTypes: {
    initialMessages: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MessageArea>;

export const Default: Story = {
  args: {
    initialMessages: [
      {
        id: "3",
        content: "Do you have any tee times available tomorrow afternoon?",
        sentAt: "2025-04-26T18:00:00.000Z",
        senderId: "client-2",
      },
      {
        id: "4",
        content: "Yes, we have a slot at 2 PM.",
        sentAt: "2025-04-26T18:15:00.000Z",
        senderId: "user-123",
      },
      {
        id: "5",
        content: "Perfect, see you tomorrow at 2 PM!",
        sentAt: "2025-04-26T18:30:00.000Z",
        senderId: "client-2",
      },
    ],
  },
};
