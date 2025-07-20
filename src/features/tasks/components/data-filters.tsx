import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserId } from "@/features/auth/api/use-user-id";
import { ListChecksIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DatePicker } from "@/components/date-picker";

// Removed empty interface DataFiltersProps as it is not used and empty

export const DataFilters = () => {
  const { isLoading: isLoadingUser } = useUserId();

  const isLoading = isLoadingUser;

  const [{
    status,
    dueDate
  }, setFilters] = useTaskFilters();

  const onStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? null : value as TaskStatus });
  };

  if (isLoading) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <Select
        defaultValue={status ?? undefined}
        onValueChange={(value) => onStatusChange(value)}
      >
          <SelectTrigger className="w-full lg:w-auto h-8 cursor-pointer">
            <div className="flex items-center pr-2">
              <ListChecksIcon className="size-4 mr-2" />
              <SelectValue placeholder="All statuses" />
            </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="cursor-pointer"> All statuses </SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG} className="cursor-pointer">Backlog</SelectItem>
          <SelectItem value={TaskStatus.TODO} className="cursor-pointer">To do</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS} className="cursor-pointer">In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW} className="cursor-pointer">In Review</SelectItem>
          <SelectItem value={TaskStatus.DONE} className="cursor-pointer">Done</SelectItem>
        </SelectContent>
      </Select>
      <DatePicker
        placeHolder="Due date"
        className="h-8 w-full lg:w-auto cursor-pointer"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null })
        }}
      />
    </div>
  );
};
