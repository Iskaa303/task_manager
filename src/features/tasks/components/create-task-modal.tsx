"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { useCurrent } from "@/features/auth/api/use-current";

import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { CreateTaskForm } from "./create-task-form";

export const CreateTaskModal = () => {
  const { isOpen, setIsOpen, close } = useCreateTaskModal();

  const { data: user } = useCurrent();

  if (!user) {
    return null;
  }

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskForm onCancel={close} userId={user.$id} />
    </ResponsiveModal>
  );
};
