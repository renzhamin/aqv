import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import GroupedBarChart from "./barchart/GroupedBarChart"; // Import the custom hook

import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function SearchBar({ city, setCity }) {
  const [open, setOpen] = React.useState(false);
  const { best } = React.useContext(AppContext);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {city
            ? best.find((item) => item.city === city)?.city
            : "Select City..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search City..." className="h-9" />
          <CommandEmpty>No Cities found.</CommandEmpty>
          <CommandGroup className="max-h-64">
            {best.map((item) => (
              <CommandItem
                key={item.city}
                value={item.city}
                onSelect={(currentValue) => {
                  setCity(currentValue === city ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {item.city}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    city === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function Compare() {
  const [city, setCity] = React.useState("");

  return (
    <div>
      <h1>Grouped Bar Chart Example</h1>
      {GroupedBarChart(
        data,
        "month",
        ["group1", "group2", "group3"],
        "Month",
        "Value"
      )}
      <div className="m-14">
        <SearchBar city={city} setCity={setCity} />
      </div>
    </div>
  );
}

export default Compare;
