import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";

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

export default function SearchBar({
  selected,
  setSelected,
  promptString,
  data,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between "
          >
            {selected
              ? data.find((item) => item.city === selected)?.city
              : promptString}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-white">
          <Command>
            <CommandInput placeholder="Search City..." className="h-9" />
            <CommandEmpty>No Cities found.</CommandEmpty>
            <CommandGroup className="max-h-64">
              {data.map((item) => (
                <CommandItem
                  key={item.city}
                  value={item.city}
                  onSelect={(currentValue) => {
                    setSelected(currentValue === selected ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.city}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selected === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
