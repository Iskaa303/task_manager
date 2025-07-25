import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./create-task-form";
import { useUserId } from "@/features/auth/api/use-user-id";
import { TaskStatus } from "../types";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
  status?: string;
};

export const CreateTaskFormWrapper = ({ onCancel, status }: CreateTaskFormWrapperProps) => {
  const { userId, isLoading: isLoadingUser } = useUserId();

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

  const taskStatus = Object.values(TaskStatus).includes(status as TaskStatus) ? (status as TaskStatus) : undefined;

  return (
    <CreateTaskForm
      onCancel={onCancel}
      userId={userId!}
      status={taskStatus}
    />
  )
}
