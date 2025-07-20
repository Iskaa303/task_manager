"use client";

import { AlertTriangle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <AlertTriangle className="size-6 text-muted-foreground mb-2" />
      <p className="text-sm font-medium text-muted-foreground">
        Something went wrong
      </p>
    </div>
  );
};

export default Error;
