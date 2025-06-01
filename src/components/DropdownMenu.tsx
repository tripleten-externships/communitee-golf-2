import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Location {
  id: string;
  name: string;
}

export const DropdownMenu: React.FC<{
  token: string;
  onSelectLocation?: (location: Location) => void;
}> = ({ token, onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch locations on mount
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("http://localhost:8080/location", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
        setError(null);
      })
      .catch((err) => console.error("Failed to load locations:", err))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="w-[336px] h-[595px] bg-white rounded-md pt-5 pb-5 px-4 relative inline-block text-left">
      <Menu as="div" className="relative w-full">
        <div className="text-sm text-gray-600 mt-8 mb-1">location</div>
        <div>
          <MenuButton className="inline-flex w-full justify-between rounded-[12px] bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 outline outline-1 outline-black ">
            {selectedLocation?.name || "Gilory Golf Course"}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-gray-400"
            />
          </MenuButton>
        </div>

        <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-[12px] bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            {loading && (
              <div className="text-sm text-gray-400 mt-2">
                Loading locations...
              </div>
            )}
            {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
            {locations.length === 0 && !loading && (
              <div className="text-sm text-gray-500 px-4 py-2">
                No locations found.
              </div>
            )}
            {locations.map((location) => (
              <MenuItem key={location.id} as="div">
                {({ active }) => (
                  <button
                    onClick={() => {
                      setSelectedLocation(location);
                      onSelectLocation?.(location);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm ${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {location.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};
