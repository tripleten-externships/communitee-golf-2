import { Meta, StoryObj } from "@storybook/react";
import { DropdownMenu } from "./DropdownMenu";
import { within, userEvent, expect } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  argTypes: {
    locations: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const mockLocations = [
  { id: "1", name: "Gilroy Golf Course" },
  { id: "2", name: "Golf Course Two" },
  { id: "3", name: "Pebble Beach" },
];

const Template = () => {
  const [selected, setSelected] = useState(mockLocations[0]);
  return (
    <DropdownMenu
      locations={mockLocations}
      selectedLocation={selected}
      onSelectLocation={(loc) => setSelected(loc)}
    />
  );
};

export const Default: Story = {
  render: Template,
};

export const SelectCourse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = await canvas.findByRole("button", {
      name: /gilroy golf course/i,
    });
    await userEvent.click(button);

    const option = await canvas.findByText(/golf course two/i);
    await userEvent.click(option);

    await expect(
      canvas.getByRole("button", { name: /golf course two/i })
    ).toBeInTheDocument();
  },
};
