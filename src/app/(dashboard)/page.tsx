import React from "react";
import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/queries";
import { TaskViewSwitcherWrapper } from "@/features/tasks/components/task-view-switcher-wrapper";

export default async function Home() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <TaskViewSwitcherWrapper />
  );
};
