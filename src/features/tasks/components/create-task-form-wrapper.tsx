import { Loader } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
  onCancel: () => void;
};

export const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProps) => {
  const isLoading = false;

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
    <CreateTaskForm
      onCancel={onCancel}
      userId=""
    />
  )
}