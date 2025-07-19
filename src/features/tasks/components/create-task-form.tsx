
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { createTaskSchema } from "../schemas";
import { Card } from "@/components/ui/card";
import { TaskStatus } from "../types";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateTaskFormProps {
  onCancel: () => void;
  userId: string;
}

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

export const CreateTaskForm = ({ onCancel, userId }: CreateTaskFormProps) => {

  const form = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      status: TaskStatus.BACKLOG,
      dueDate: new Date(),
      userId,
      description: "",
    },
  });

  const onSubmit: SubmitHandler<CreateTaskFormData> = (values) => {
    const dataWithUserId = { ...values, userId };
    console.log({ values: dataWithUserId });
  };

  return (
    <Card>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 p-4"
        >
          <FormItem>
            <FormLabel htmlFor="name">Task Name</FormLabel>
            <FormControl>
              <Input id="name" {...form.register("name")} />
            </FormControl>
            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="status">Status</FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => form.setValue("status", value as TaskStatus)}
                value={form.watch("status")}
              >
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BACKLOG">Backlog</SelectItem>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{form.formState.errors.status?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="dueDate">Due Date</FormLabel>
            <FormControl>
              <Input
                id="dueDate"
                type="date"
                {...form.register("dueDate", { valueAsDate: true })}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.dueDate?.message}</FormMessage>
          </FormItem>

          <FormItem>
            <FormLabel htmlFor="description">Description (optional)</FormLabel>
            <FormControl>
              <textarea
                id="description"
                {...form.register("description")}
                className="resize-none w-full rounded border border-gray-300 px-3 py-2"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.description?.message}</FormMessage>
          </FormItem>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Create Task
            </button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
