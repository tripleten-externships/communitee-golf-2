import type { Meta, StoryObj } from "@storybook/react";
import { MessageTab } from "./MessageTab";

const meta = {
  title: "Components/MessageTab",
  component: MessageTab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MessageTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
