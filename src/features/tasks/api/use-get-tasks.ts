import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";

interface UseGetTasksProps {
  userId: string;
  status?: TaskStatus | null;
  search?: string | null;
  dueDate?: string | null;
};

export const useGetTasks = ({
  userId,
  status,
  search,
  dueDate
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      userId,
      status,
      search,
      dueDate,
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query: {
          userId,
          status: status ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const { data } = await response.json();

      return data;
    }
  });

  return query;
};
