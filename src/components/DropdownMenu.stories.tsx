import { DropdownMenu } from "./DropdownMenu";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const mockLocations = [
  { id: "1", name: "Gilroy Golf Course" },
  { id: "2", name: "Santa Clara Country Club" },
];

export const Default: Story = {
  render: () => (
    <DropdownMenu
      locations={mockLocations}
      selectedLocation={mockLocations[0]}
      onSelectLocation={(loc) => console.log("Selected:", loc)}
    />
  ),
};
