"use client";

import React, { JSX } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface PropsType {
  title: string;
  value: string;
  filterType: "checkbox" | "radio";
  disabled?: boolean;
  options?: { label: string; value: string }[];
  selectedValues?: string[] | string | undefined;
  onValuesChange?: (values: string[] | string | undefined) => void;
  hasSearch?: boolean;
  hasClear?: boolean;
  hasClearButton?: boolean;
  children?: React.ReactNode;
  renderCustom?: JSX.Element;
  onClear?: () => void;
}

const FilterAccordionItem = ({
  title,
  value,
  filterType,
  options = [],
  selectedValues,
  onValuesChange,
  hasSearch = false,
  hasClearButton = false,
  disabled = false,
  children,
  renderCustom,
  onClear,
}: PropsType) => {
  const [searchItem, setSearchItem] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [isCustomSelected, setIsCustomSelected] = React.useState(false);

  React.useEffect(() => {
    if (hasSearch && options) {
      const filtered = options.filter((option) =>
        option?.label.toLowerCase()?.includes(searchItem.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [searchItem, hasSearch]);

  const handleRadionChange = () => {};

  const handleClear = () => {
    onClear?.();
  };

  return (
    <AccordionItem
      className="w-full mb-3 rounded-[4px] min-h-14 bg-white px-4 border-0"
      value={value}
    >
      <AccordionTrigger className="!no-underline text-sm font-semibold flex justify-between items-center">
        {title}
      </AccordionTrigger>
      <AccordionContent className="pt-0">
        {hasSearch && (
          <div className="mb-2">
            <Input
              disabled={disabled}
              type="text"
              placeholder="Search..."
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="w-full text-sm focus:!ring-0 focus:!shadow-none border"
            />
          </div>
        )}
        {filterType === "checkbox" && (
          <ScrollArea className="max-h-[190px] mb-2 flex flex-col overflow-y-auto">
            <div className="space-y-2">
              {filteredOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center !cursor-pointer",
                    disabled &&
                      "pointer-events-none text-muted-foreground opacity-[75%]",
                  )}
                >
                  <Checkbox
                    className="mr-2"
                    disabled={disabled}
                    checked={selectedValues?.includes(option.value)}
                    onCheckedChange={(checked) => {
                      if (onValuesChange) {
                        const currentValues = Array.isArray(selectedValues)
                          ? [...selectedValues]
                          : [];
                        if (checked) {
                          onValuesChange([...currentValues, option.value]);
                        } else {
                          onValuesChange(
                            currentValues.filter((val) => val !== option.value),
                          );
                        }
                      }
                    }}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
            <Scrollbar orientation="vertical" />
          </ScrollArea>
        )}
        {filterType === "radio" && (
          <RadioGroup
            onChange={handleRadionChange}
            value={selectedValues as string}
            disabled={disabled}
            className={cn(
              "",
              disabled &&
                "pointer-events-none text-muted-foreground opacity-75",
            )}
          >
            <div className="space-y-2 mb-2">
              {filteredOptions.map((option) => {
                return (
                  <label
                    key={option.value}
                    htmlFor={`radio-item-${option.value}`}
                    className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={`radio-item-${option.value}`}
                      checked={
                        option.value === isCustomSelected
                          ? "custom"
                          : selectedValues
                      }
                      className="text-primary"
                    />
                  </label>
                );
              })}
            </div>
          </RadioGroup>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
export default FilterAccordionItem;
