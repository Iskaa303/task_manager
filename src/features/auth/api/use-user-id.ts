import { useCurrent } from "./use-current";

export const useUserId = () => {
  const { data, isLoading, error } = useCurrent();

  const userId = data?.$id ?? null;

  return { userId, isLoading, error };
};
