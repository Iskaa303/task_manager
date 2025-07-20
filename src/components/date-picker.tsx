"use client";

import { CalendarIcon, XIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeHolder?: string;
};

export const DatePicker = ({
  value,
  onChange,
  className,
  placeHolder = "Select date"
}: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeHolder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          autoFocus
        />
        <div className="p-2 border-t flex justify-end mt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onChange(undefined)}
            aria-label="Reset date"
            title="Reset date"
            className="flex items-center gap-1"
          >
            <XIcon className="size-4" aria-hidden="true" />
            Reset date
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
