import type { Meta, StoryObj } from "@storybook/react";
import MessageAreaStream from "./MessageAreaStream";
import { useEffect, useState } from "react";
import "../src/index.css";

const mockMessages = [
  {
    id: "3",
    content: "Do you have any tee times available tomorrow afternoon?",
    sentAt: "2025-04-26T14:00:00.000Z",
    senderId: "user-123",
  },
  {
    id: "4",
    content: "Also, are there any beginner packages available?",
    sentAt: "2025-04-26T14:00:00.000Z",
    senderId: "user-123",
  },
  {
    id: "5",
    content: "Yes, we have a slot at 2 PM.",
    sentAt: "2025-04-26T14:15:00.000Z",
    senderId: "client-456",
  },
  {
    id: "6",
    content: "Perfect, see you tomorrow at 2 PM!",
    sentAt: "2025-04-26T14:30:00.000Z",
    senderId: "user-123",
  },
];

const meta: Meta<typeof MessageAreaStream> = {
  title: "Components/MessageAreaStream",
  component: MessageAreaStream,
  args: {
    userId: "user-123",
    isTyping: true,
    clientId: "1",
    token: "mock-token",
    messages: mockMessages,
  },
};

export default meta;
type Story = StoryObj<typeof MessageAreaStream>;

export const Default: Story = {
  render: (args) => (
    <div className="w-[336px] h-[595px] p-4">
      <MessageAreaStream {...args} setIsTyping={() => {}} />
    </div>
  ),
};

function TypingDemoWrapper() {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => {
      setIsTyping(true);
    }, 300);

    const stop = setTimeout(() => {
      setIsTyping(false);
    }, 3300); // start + 3 seconds

    return () => {
      clearTimeout(start);
      clearTimeout(stop);
    };
  }, []);

  return (
    <div className="w-[336px] h-[595px] border border-gray-300 p-4 bg-white">
      <MessageAreaStream
        messages={mockMessages}
        userId="user-123"
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        clientId="client-1"
        token="storybook-token"
      />
    </div>
  );
}

export const TypingDemo: Story = {
  render: () => <TypingDemoWrapper />,
};
