"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { TaskDate } from "./task-date";
import { Task } from "../types";
import { TaskActions } from "./task-actions";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const name = row.original.name;

      return <p className="line-clamp-1">{name}</p>
    }
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const dueDate = row.original.dueDate;

      return <TaskDate value={dueDate} />
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      const status = row.original.status;

      return <Badge variant={status}>{snakeCaseToTitleCase(status)}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;

      return (
        <TaskActions id={id}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    }
  }
];