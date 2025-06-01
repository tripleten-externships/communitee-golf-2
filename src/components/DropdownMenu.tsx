import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Location {
  id: string;
  name: string;
}

export const DropdownMenu: React.FC<{
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
}> = ({ locations, selectedLocation, onSelectLocation }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[336px] bg-white rounded-md pt-1 pb-4 relative inline-block text-left">
        <Menu as="div" className="relative w-full">
          <div className="text-sm text-gray-600 mt-0 mb-1">location</div>
          <div>
            <MenuButton className="inline-flex w-full justify-between rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline outline-1 outline-black">
              {selectedLocation?.name || "Select location"}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-[12px] bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="py-1">
              {locations.length === 0 ? (
                <div className="text-sm text-gray-500 px-4 py-2">
                  No locations found.
                </div>
              ) : (
                locations.map((location) => (
                  <MenuItem key={location.id} as="div">
                    {({ active }) => (
                      <button
                        onClick={() => onSelectLocation(location)}
                        className={`w-full text-left px-4 py-3 text-sm ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                      >
                        {location.name}
                      </button>
                    )}
                  </MenuItem>
                ))
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};
