import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { TaskStatus } from "../types";

export const useTaskFilters = () => {
  return useQueryStates({
    status: parseAsStringEnum(Object.values(TaskStatus)),
    search: parseAsString,
    dueDate: parseAsString,
  });
};