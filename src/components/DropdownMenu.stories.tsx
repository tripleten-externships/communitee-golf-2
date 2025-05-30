import { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { within, userEvent, expect } from "@storybook/test";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const mockToken = "fake-token-for-storybook";

export const Default: Story = {
  render: () => <DropdownMenu token={mockToken} />,
};

export const SelectCourse: Story = {
  render: () => <DropdownMenu token={mockToken} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button", { name: /gilory golf course/i });
    await userEvent.click(button);

    const option = await canvas.findByText("Golf Course Two");
    await userEvent.click(option);

    await expect(
      canvas.getByText(/send a message to golf course two/i)
    ).toBeInTheDocument();
  },
};
