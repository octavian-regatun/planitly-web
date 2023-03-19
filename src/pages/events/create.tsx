import { initials } from "@dicebear/collection"
import { createAvatar } from "@dicebear/core"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Group, User } from "@prisma/client"
import Image from "next/image"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DateTimeRangePicker } from "../../components/DateRangePicker/DateRangePicker"
import { SearchGroups } from "../../components/Events/SearchGroups"
import Layout from "../../components/Layout/Layout"
import { LocationSearch } from "../../components/LocationSearch/LocationSearch"
import RequireAuth from "../../components/RequireAuth"
import RichTextEditor from "../../components/RichTextEditor"
import { api } from "../../utils/api"

const validationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date(),
  allDay: z.boolean(),
  location: z
    .object({
      name: z.string(),
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
  groups: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  participants: z.array(
    z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().nullable(),
      emailVerified: z.boolean().nullable(),
      image: z.string(),
      username: z.string(),
    })
  ),
})

type FormValues = z.infer<typeof validationSchema>

const EventsCreatePage = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      groups: [],
      startDate: new Date(),
      endDate: new Date(),
      location: null,
      allDay: true,
      participants: [],
    },
  })

  watch()

  api.users.getMe.useQuery(undefined, {
    onSuccess(data) {
      if (!data) return

      if (getValues().participants.length === 0)
        setValue("participants", [...getValues().participants, data])
    },
  })

  api.groups.getParticipants.useQuery(
    {
      ids: getValues().groups.map((group) => group.id),
    },
    {
      onSuccess(data) {
        const participants = [...getValues().participants, ...data].filter(
          (user, index, self) =>
            index === self.findIndex((t) => t.id === user.id)
        )

        setValue("participants", participants)
      },
    }
  )

  const createEventMutation = api.events.createEvent.useMutation({})

  const onSubmit = handleSubmit((data) => console.log(data))

  function onDateChange(dates: [Date | null, Date | null]) {
    const [startDate, endDate] = dates
    console.log(startDate, endDate)

    setValue("startDate", startDate as Date)
    setValue("endDate", endDate as Date)
  }

  return (
    <RequireAuth>
      <Layout>
        <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Enter Event Name</label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="border-b-2 border-b-gray-200 py-2 outline-none"
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Description</label>
            <RichTextEditor
              value={getValues().description}
              onChange={(content) => setValue("description", content)}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-[2] flex-col gap-2">
              <label className="text-sm text-gray-400">Pick Date</label>
              <DateTimeRangePicker
                startDate={getValues().startDate}
                endDate={getValues().endDate}
                onChange={(dates) => onDateChange(dates)}
              />
              {errors.startDate && (
                <p className="text-xs text-red-600">
                  {errors.startDate.message}
                </p>
              )}
              {errors.endDate && (
                <p className="text-xs text-red-600">{errors.endDate.message}</p>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <label className="text-sm text-gray-400">All Day</label>
              <input
                {...register("allDay")}
                type="checkbox"
                name="allDay"
                className="h-6 w-6 accent-gray-400"
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Search Location</label>
            <LocationSearch
              onSelect={(location) => setValue("location", location)}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.location?.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Search Groups</label>
            <SearchGroups
              onClick={(group) => {
                setValue("groups", [...getValues().groups, group])
              }}
              exclude={getValues().groups.map((group) => group.id)}
            />
            <div className="flex flex-wrap">
              {getValues().groups.map((group) => (
                <GroupChip key={`group-chip-${group.id}`} group={group} />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Participants</label>
            <div className="flex">
              {getValues().participants.map((participant) => (
                <UserChip
                  key={`user-chip-${participant.id}`}
                  user={participant}
                />
              ))}
            </div>
          </div>
          <button className="rounded bg-teal-600 px-8 py-2 text-lg text-white">
            Create Event
          </button>
        </form>
      </Layout>
    </RequireAuth>
  )
}

const GroupChip: React.FC<{ group: Group }> = ({ group }) => {
  const avatarSrc = useMemo(
    () =>
      createAvatar(initials, {
        seed: group.name,
        size: 32,
        backgroundType: ["gradientLinear"],
      }).toDataUriSync(),
    [group.name]
  )

  return (
    <div className="flex w-fit items-center gap-2 rounded-full border border-gray-200 p-2">
      <Image
        width={24}
        height={24}
        src={avatarSrc}
        alt="group avatar"
        className="rounded-full"
      />
      <p className="text-xs">{group.name}</p>
    </div>
  )
}

const UserChip: React.FC<{
  user: User
}> = ({ user }) => {
  const avatarSrc = useMemo(
    () =>
      createAvatar(initials, {
        seed: user.firstName + " " + user.lastName,
        size: 32,
        backgroundType: ["gradientLinear"],
      }).toDataUriSync(),
    [user.firstName, user.lastName]
  )

  return (
    <Image
      width={32}
      height={32}
      src={avatarSrc}
      alt="user avatar"
      className="rounded-full"
    />
  )
}

export default EventsCreatePage
