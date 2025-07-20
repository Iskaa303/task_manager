"use client";

import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useUserId } from "@/features/auth/api/use-user-id";

import { TaskViewSwitcher } from "./task-view-switcher";

export const TaskViewSwitcherWrapper = () => {
  const { isLoading: isLoadingUser } = useUserId();

  const isLoading = isLoadingUser;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <TaskViewSwitcher />
  )
}
