import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./shadcn/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/Form";
import { Input } from "./shadcn/Input";
import { Textarea } from "./shadcn/Textarea";
import { Checkbox } from "./shadcn/Checkbox";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { blue } from "tailwindcss/colors";
import { eventsService } from "@/services/events";
import { useToast } from "./shadcn/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DatePickerDate {
  startDate: Date | null;
  endDate: Date | null;
}

export function NewEventDialog() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [date, setDate] = useState<DatePickerDate>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setDate({ startDate: start, endDate: end });
    if (start && end) {
      form.setValue("startAt", start);
      form.setValue("endAt", end);
    }
  };

  const createEventMutation = useMutation({
    mutationFn: eventsService.createEvent,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast({
        title: "Event Created 🎉",
        description: `Event ${data.title} has been created`,
      });
      setIsOpen(false);
    },
    onError(error) {
      toast({
        title: "Event Creation Failed 😢",
        description: error.message,
      });
    },
  });

  const formSchema = z.object({
    title: z.string().min(1).max(50),
    description: z.string(),
    startAt: z.date(),
    endAt: z.date(),
    allDay: z.boolean(),
    color: z.string(),
    picture: z.string(),
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createEventMutation.mutate(values);
  }

  return (
    <Dialog open={isOpen} onOpenChange={isOpen => setIsOpen(isOpen)}>
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
            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem className="col-span-1">
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
                  <FormItem className="col-span-1 flex items-center space-y-0 space-x-2 mt-8 ">
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
            <Button type="submit">Create Event</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
