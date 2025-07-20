import { useQueryState, parseAsString } from "nuqs";

import { TaskStatus } from "../types";

export const useCreateTaskModal = () => {
  const [ status, setStatus ] = useQueryState(
    "create-task",
    parseAsString.withOptions({ clearOnDefault: true })
  );

  const isOpen = status !== null && status !== undefined;

  const open = (initialStatus: TaskStatus) => setStatus(initialStatus);
  const close = () => setStatus(null);

  return {
    isOpen,
    status: status ?? TaskStatus.BACKLOG,
    open,
    close,
    setStatus,
  };
};
