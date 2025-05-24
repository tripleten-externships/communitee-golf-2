import type { Meta, StoryObj } from "@storybook/react";
import { MessageArea } from "./MessageArea";
import { messageStreams } from "../mock/messageStream";
import { action } from "@storybook/addon-actions";

const meta: Meta<typeof MessageArea> = {
  title: "Components/MessageArea",
  component: MessageArea,
};

export default meta;

type Story = StoryObj<typeof MessageArea>;

export const Default: Story = {
  args: {
    streams: messageStreams,
    onSelectStream: action("onSelectStream"),
  },
};
