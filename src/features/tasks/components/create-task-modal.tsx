"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCurrent } from "@/features/auth/api/use-current";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";

export const CreateTaskModal = () => {
  const { isOpen, close, status } = useCreateTaskModal();

  const { data: user } = useCurrent();

  if (!user) {
    return null;
  }

  return (
    <ResponsiveModal open={isOpen} onOpenChange={(open) => !open && close()}>
      <CreateTaskFormWrapper onCancel={close} status={status} />
    </ResponsiveModal>
  );
};
