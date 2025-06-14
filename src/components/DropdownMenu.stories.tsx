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

const Template = (args: React.ComponentProps<typeof DropdownMenu>) => {
  const safeLocations = args.locations ?? [];
  const [selected, setSelected] = useState(safeLocations[0] || null);
  return (
    <DropdownMenu
      {...args}
      locations={safeLocations}
      selectedLocation={selected}
      onSelectLocation={setSelected}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    locations: [
      { id: "1", name: "Gilroy Golf Course" },
      { id: "2", name: "Golf Course Two" },
      { id: "3", name: "Pebble Beach" },
    ],
  },
};

export const SelectCourse: Story = {
  render: Template,
  args: {
    locations: [
      { id: "1", name: "Gilroy Golf Course" },
      { id: "2", name: "Golf Course Two" },
      { id: "3", name: "Pebble Beach" },
    ],
  },
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
