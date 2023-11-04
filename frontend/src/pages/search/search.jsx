import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigat
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
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

import { AppContext } from "@/App";


const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

import styles from './search.module.css'

const search = () => {
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState("");
    const { best } = useContext(AppContext);
  
    const navigate = useNavigate();
    
    useEffect(() => {
      console.log(city)
      if(city == '' || city == null || city ==undefined){}
      else navigate(`/city/${city}`);
    }, [city]);
    
    return (
        <div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="mt-8 ml-[40vw]">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between "
                >
                    {city
                    ? best.find((item) => item.city === city)?.city
                    : "Select City..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 bg-white">
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
        </div>
    )
}

export default search