import { HomePage } from "./HomePage";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof HomePage> = {
  title: "Pages/HomePage",
  component: HomePage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  args: {
    token: "dummy-token",
    onSelectLocation: (location) => console.log("Selected location:", location),
  },
};
