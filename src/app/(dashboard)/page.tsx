import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { UserButton } from "@/features/auth/components/user-button";
import { TaskViewSwitcher } from "@/features/tasks/components/task-view-switcher";

export default async function Home() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <TaskViewSwitcher />
    </div>
  );
};
