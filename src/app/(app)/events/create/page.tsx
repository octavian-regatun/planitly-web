"use client";
import { createEvent } from "@/api/events";
import { retrieveLocation, searchLocation } from "@/api/locations";
import { getUsers } from "@/api/users";
import RichTextEditor from "@/components/RichTextEditor";
import Button from "@/components/UI/Button";
import UserCard from "@/components/UserCard";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, MultiSelect, Select } from "@mantine/core";
import { User } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { forwardRef, useCallback, useMemo, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const LazyMap = dynamic(() => import("@/components/Map"), { ssr: false });

const validationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  allDay: z.boolean(),
  location: z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  userIds: z.array(z.string()),
});

type FormValues = z.infer<typeof validationSchema>;

export default function EventsCreatePage() {
  const [locationQuery, setLocationQuery] = useState("");
  const [pickedLocationId, setPickedLocationId] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      description: "",
      userIds: [],
      startDate: new Date(),
      endDate: new Date(),
      allDay: true,
    },
  });

  const session_token = useMemo(nanoid, []);

  function onDateChange(dates: [Date | null, Date | null]) {
    const [startDate, endDate] = dates;

    setValue("startDate", startDate as Date);
    setValue("endDate", endDate as Date);
  }

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully", {
        toastId: "create-event-success",
      });

      router.push("/calendar");
    },
  });

  function onSubmit(data: FormValues) {
    createEventMutation.mutate({
      ...data,
    });
  }

  const searchLocationQuery = useQuery({
    queryKey: ["search-location", locationQuery],
    queryFn: () => searchLocation({ query: locationQuery, session_token }),
    enabled: locationQuery !== "",
  });

  const retrieveLocationQuery = useQuery({
    queryKey: ["retrieve-location", pickedLocationId],
    queryFn: () =>
      retrieveLocation({ session_token, id: pickedLocationId as string }),
    enabled: !!pickedLocationId,
    onSuccess: data => {
      const { name, address, latitude, longitude } = data;
      setValue("location", { name, address, latitude, longitude });
    },
  });

  const getUsersQuery = useQuery({
    queryKey: ["get-users"],
    queryFn: () => getUsers({ includeMe: false }),
  });

  const session = useSession();

  const searchLocationOnChange = useCallback(
    debounce(setLocationQuery, 250),
    []
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-4 px-4 pb-24 pt-4"
    >
      <Input
        placeholder="Title"
        className="w-full"
        classNames={{
          input:
            "w-full rounded border border-teal-500 px-4 py-2 outline-teal-500",
        }}
        {...register("name")}
      />
      <RichTextEditor
        value={watch("description")}
        onChange={value => {
          setValue("description", value);
        }}
      />
      <ReactDatePicker
        selected={watch("startDate")}
        onChange={(dates: [Date | null, Date | null]) => onDateChange(dates)}
        startDate={watch("startDate")}
        endDate={watch("endDate")}
        selectsRange
        popperClassName="!z-[1002]"
        wrapperClassName="w-full"
        className="h-9 w-full rounded border border-teal-500 px-4 py-2 outline-none"
      />
      <Select
        placeholder="Search Location"
        className="w-full"
        classNames={{
          input:
            "w-full rounded border border-teal-500 px-4 py-2 outline-teal-500",
        }}
        searchable
        onSearchChange={value => {
          searchLocationOnChange(value);
        }}
        onChange={value => {
          setPickedLocationId(value);
        }}
        filter={() => true}
        data={
          searchLocationQuery.data?.map(location => ({
            value: location.id,
            label: location.name,
          })) || []
        }
      />
      <div className="h-64 w-full">
        <LazyMap />
      </div>
      <MultiSelect
        placeholder="Select users or groups"
        multiple
        onChange={value => {
          setValue("userIds", [session.data?.user.id as string, ...value]);
        }}
        data={
          getUsersQuery.data?.map(user => ({
            value: user.id,
            label: `${user.firstName} ${user.lastName}`,
          })) || []
        }
        className="w-full"
        classNames={{
          input:
            "w-full rounded border border-teal-500 px-4 py-2 outline-teal-500",
        }}
        valueComponent={SelectUserGroupValue}
        itemComponent={SelectUserGroupItem}
      />
      <Button type="submit">Create Event</Button>
    </form>
  );
}

const SelectUserGroupItem = forwardRef<
  HTMLDivElement,
  { value: string; label: string }
>(({ value, label, ...rest }, ref) => {
  const getUsersQuery = useQuery({
    queryKey: ["get-users"],
    queryFn: () => getUsers({ includeMe: false }),
  });

  if (!getUsersQuery.data) return null;

  return (
    <div
      {...rest}
      ref={ref}
      className="flex items-center gap-2 p-2 hover:cursor-pointer hover:bg-neutral-100"
    >
      <UserCard
        user={getUsersQuery.data?.find(user => user.id === value) as User}
      />
    </div>
  );
});

SelectUserGroupItem.displayName = "SelectUserGroupItem";

const SelectUserGroupValue = forwardRef<HTMLDivElement, any>(
  ({ value, label, onRemove, ...rest }, ref) => {
    delete rest.classNames;

    const getUsersQuery = useQuery({
      queryKey: ["get-users"],
      queryFn: () => getUsers({ includeMe: false }),
    });

    if (!getUsersQuery.data) return null;

    return (
      <div
        {...rest}
        ref={ref}
        className="flex items-center gap-2 rounded bg-neutral-100 p-2"
      >
        <UserCard
          className="p-0"
          displayUsername={false}
          pictureSize={24}
          user={getUsersQuery.data?.find(user => user.id === value) as User}
        />
        <button
          className="rounded p-1 hover:cursor-pointer hover:bg-neutral-200"
          onClick={onRemove}
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    );
  }
);

SelectUserGroupValue.displayName = "SelectUserGroupValue";
