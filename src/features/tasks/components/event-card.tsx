import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { TaskStatus } from "../types";
import React from "react";

interface EventCardProps {
  title: string;
  status: TaskStatus;
  id: string;
}

const statusColorMap: Record<TaskStatus, string> = {
  [TaskStatus.BACKLOG]: "border-l-pink-500",
  [TaskStatus.TODO]: "border-l-red-500",
  [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
  [TaskStatus.IN_REVIEW]: "border-l-blue-500",
  [TaskStatus.DONE]: "border-l-emerald-500",
};

export const EventCard =({
  title,
  status,
  id
}: EventCardProps) => {
  const router = useRouter();

  const onClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();

    router.push(`/tasks/${id}`);
  };

  return (
    <div className="px-2">
      <div onClick={onClick} className={cn(
        "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition",
        statusColorMap[status]
      )}>
        <p>{title}</p>
      </div>
    </div>
  );
};