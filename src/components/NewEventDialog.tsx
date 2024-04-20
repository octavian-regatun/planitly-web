import { useCreateEvent } from "@/hooks/use-create-event";
import { useGetGroups } from "@/hooks/use-get-groups";
import { Group } from "@/services/groups";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { blue } from "tailwindcss/colors";
import * as z from "zod";
import { ColorPicker } from "./ColorPicker";
import { GroupSelector } from "./GroupSelector";
import { Button } from "./shadcn/button";
import { Checkbox } from "./shadcn/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Input } from "./shadcn/input";
import { Textarea } from "./shadcn/textarea";

interface DatePickerDate {
  startDate: Date | null;
  endDate: Date | null;
}

export function NewEventDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [date, setDate] = useState<DatePickerDate>({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
    if (start && end) {
      form.setValue("startAt", start);
      form.setValue("endAt", end);
    }
  };

  const getGroups = useGetGroups();
  const createEvent = useCreateEvent();

  const formSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string(),
    startAt: z.date(),
    endAt: z.date(),
    allDay: z.boolean(),
    color: z.string(),
    picture: z.string(),
    groupIds: z.number().array(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startAt: new Date(),
      endAt: new Date(),
      allDay: true,
      color: blue["500"],
      picture: "",
      groupIds: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createEvent.mutateAsync(values);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusCircleIcon className="w-6 h-6 mr-4" /> New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="New Year's Eve" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="This is a description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupIds"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <GroupSelector
                      value={selectedGroup}
                      onChange={(group) => {
                        if (!group) return;
                        setSelectedGroup(group);
                        form.setValue("groupIds", [group.id]);
                      }}
                      groups={getGroups.data?.data || []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <ReactDatePicker
                        selected={date.startDate}
                        onChange={handleDateChange}
                        startDate={date.startDate}
                        endDate={date.endDate}
                        selectsRange
                        customInput={<Input />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allDay"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex items-center space-y-0 space-x-2 mt-6 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>All Day</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="col-span-1 flex items-center space-y-0 space-x-2 mt-8 ">
                  <FormControl>
                    <ColorPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Color</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isLoading}>
              Create Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
