import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useConfirm } from "@/hooks/use-confirm";

import { Button } from "@/components/ui/button";

import { Task } from "../types";
import { useDeleteTask } from "../api/use-delete-task";

interface TaskBreadcrumbsProps {
  task: Task;
};

export const TaskBreadcrumbs = ({
  task
}: TaskBreadcrumbsProps) => {
  const router = useRouter();

  const { mutate, isPending } = useDeleteTask();
  const [ ConfirmDialog, confirm ] = useConfirm(
    "Delete task?",
    "This action cannot be undone.",
    { variant: "destructive" },
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: task.$id } }, {
      onSuccess: () => {
        router.push("/tasks");
      }
    })
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />
      <p className="text-sm lg:text-lg font-semibold">
        {task.name}
      </p>
      <Button
        onClick={handleDeleteTask}
        disabled={isPending}
        className="ml-auto"
        variant="destructive"
        size="sm"
      >
        <TrashIcon className="size-4 lg:mr-2" />
        <span className="hidden lg:block">Delete Task</span>
      </Button>
    </div>
  );
};