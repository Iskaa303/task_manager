import { useCurrent } from "./use-current";

export const useUserId = () => {
  const { data, isLoading, error } = useCurrent();

  const userId = data?.$id!;

  return { userId, isLoading, error };
};
