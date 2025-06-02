import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPassword } from "./ForgotPassword";

const meta = {
  title: "Components/ForgotPassword",
  component: ForgotPassword,

  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ForgotPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
