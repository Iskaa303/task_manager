"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCurrent } from "@/features/auth/api/use-current";

import { useEditTaskModal } from "../hooks/use-create-edit-modal";
import { EditTaskFormWrapper } from "./edit-task-form-wrapper";

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  const { data: user } = useCurrent();

  if (!user) {
    return null;
  }

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && (
        <EditTaskFormWrapper id={taskId} onCancel={close} />
      )}
    </ResponsiveModal>
  );
};
