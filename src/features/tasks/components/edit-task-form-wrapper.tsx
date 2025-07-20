import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useUserId } from "@/features/auth/api/use-user-id";

import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
};

export const EditTaskFormWrapper = ({
  onCancel,
  id,
}: EditTaskFormWrapperProps) => {
  const { userId, isLoading: isLoadingUser } = useUserId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const isLoading = isLoadingUser || isLoadingTask;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!initialValues) {
    return null;
  }

  return (
    <EditTaskForm
      onCancel={onCancel}
      initialValues={initialValues}
      userId={userId!}
    />
  )
}
