"use client";

import { useCallback } from "react";
import { Loader, PlusIcon } from "lucide-react";

import { useUserId } from "@/features/auth/api/use-user-id";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { DataCalendar } from "./data-calendar";

export const TaskViewSwitcher = () => {
  const [{
    status,
    dueDate
  }] = useTaskFilters();

  const [ view, setView ] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const { userId } = useUserId();
  const { setStatus } = useCreateTaskModal();

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    userId: userId ?? "",
    status,
    dueDate,
  });

  const onKanbanChange = useCallback((
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => {
    bulkUpdate({
      json: { tasks },
    });
  }, [bulkUpdate]);

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 w-full border rounded-lg"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger className="h-8 w-full lg:w-auto cursor-pointer" value="table">
              Table
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto cursor-pointer" value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger className="h-8 w-full lg:w-auto cursor-pointer" value="calendar">
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size="sm" className="w-full lg:w-auto" onClick={() => setStatus(TaskStatus.BACKLOG)}>
            <PlusIcon className="size-4 mr-2" />
            New
          </Button>
        </div>
        <DottedSeparator className="my-4" />
        <DataFilters />
        <DottedSeparator className="my-4" />
        {isLoadingTasks ? (
          <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
        <>
          <TabsContent value="table" className="mt-0">
            <DataTable columns={columns} data={tasks?.documents ?? []} />
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
          </TabsContent>
          <TabsContent value="calendar" className="mt-0 h-full pb-4">
            <DataCalendar data={tasks?.documents ?? []} />
          </TabsContent>
        </>
        )}
      </div>
    </Tabs>
  );
};
