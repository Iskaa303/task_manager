import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserId } from "@/features/auth/api/use-user-id";
import { ListChecksIcon } from "lucide-react";
import { TaskStatus } from "../types";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DatePicker } from "@/components/date-picker";

interface DataFiltersProps {
  
};

export const DataFilters = ({}: DataFiltersProps) => {
  const { userId, isLoading: isLoadingUser } = useUserId();

  const isLoading = isLoadingUser;

  const [{
    status,
    search,
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
          <SelectTrigger className="w-full lg:w-auto h-8">
            <div className="flex items-center pr-2">
              <ListChecksIcon className="size-4 mr-2" />
              <SelectValue placeholder="All statuses" />
            </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all"> All statuses </SelectItem>
          <SelectSeparator />
          <SelectItem value={TaskStatus.BACKLOG}>Backlog</SelectItem>
          <SelectItem value={TaskStatus.TODO}>To do</SelectItem>
          <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
          <SelectItem value={TaskStatus.IN_REVIEW}>In Review</SelectItem>
          <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
        </SelectContent>
      </Select>
      <DatePicker
        placeHolder="Due date"
        className="h-8 w-full lg:w-auto"
        value={dueDate ? new Date(dueDate) : undefined}
        onChange={(date) => {
          setFilters({ dueDate: date ? date.toISOString() : null })
        }}
      />
    </div>
  );
};