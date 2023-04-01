import { zodResolver } from "@hookform/resolvers/zod"
import type { Group } from "@prisma/client"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { DateTimeRangePicker } from "../../components/DateRangePicker/DateRangePicker"
import { GroupChip } from "../../components/Groups/GroupChip"
import { SearchGroups } from "../../components/Groups/SearchGroups"
import Layout from "../../components/Layout/Layout"
import { LocationSearch } from "../../components/LocationSearch/LocationSearch"
import ProfilePicture from "../../components/ProfilePicture"
import RequireAuth from "../../components/RequireAuth"
import RichTextEditor from "../../components/RichTextEditor"
import { api } from "../../utils/api"
import { removeDuplicates } from "../../utils/array"

const userZod = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  emailVerified: z.boolean().nullable(),
  image: z.string(),
  username: z.string(),
})

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
  groups: z.array(z.number()),
  participants: z.array(userZod),
})

type FormValues = z.infer<typeof validationSchema>

const EventsCreatePage = () => {
  const router = useRouter()

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
      description: null,
      groups: [],
      startDate: new Date(),
      endDate: new Date(),
      location: null,
      allDay: true,
      participants: [],
    },
  })

  watch()

  api.groups.getParticipants.useQuery(
    {
      ids: getValues().groups,
    },
    {
      onSuccess(data) {
        const participants = removeDuplicates(
          [...getValues().participants, ...data],
          "id"
        )

        setValue("participants", participants)
      },
    }
  )

  const getGroupsQuery = api.groups.getGroups.useQuery({
    ids: getValues().groups,
  })

  const createEventMutation = api.events.createEvent.useMutation({
    onSuccess() {
      toast.success("Event created successfully!", {
        id: "event-created",
      })

      void router.push("/dashboard/calendar")
    },
  })

  const onSubmit = handleSubmit(data => {
    if (!data.location) return

    createEventMutation.mutate({
      ...data,
      location: {
        ...data.location,
      },
      groupsId: data.groups,
    })
  })

  function onDateChange(dates: [Date | null, Date | null]) {
    const [startDate, endDate] = dates
    console.log(startDate, endDate)

    setValue("startDate", startDate as Date)
    setValue("endDate", endDate as Date)
  }

  const onGroupChipCloseClick = (group: Group) => {
    const groups = getValues().groups.filter(g => g !== group.id)

    setValue("groups", groups)
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
              onChange={content => setValue("description", content)}
            />
          </div>
          <div className="flex w-full gap-4">
            <div className="flex flex-[2] flex-col gap-2">
              <label className="text-sm text-gray-400">Pick Date</label>
              <DateTimeRangePicker
                startDate={getValues().startDate}
                endDate={getValues().endDate}
                onChange={dates => onDateChange(dates)}
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
              onSelect={location => setValue("location", location)}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.location?.message}</p>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Search Groups</label>
            <SearchGroups
              onClick={group => {
                setValue("groups", [...getValues().groups, group.id])
              }}
              exclude={getValues().groups}
            />
            <div className="flex flex-wrap">
              {getGroupsQuery.data?.map(group => (
                <GroupChip
                  key={`group-chip-${group.id}`}
                  group={group}
                  onCloseClick={onGroupChipCloseClick}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <label className="text-sm text-gray-400">Participants</label>
            <div className="flex">
              {getValues().participants.map(participant => (
                <ProfilePicture
                  key={`participant-${participant.id}`}
                  user={participant}
                />
              ))}
            </div>
          </div>
          <button className="mt-8 rounded bg-teal-600 px-8 py-2 text-lg text-white">
            Create Event
          </button>
        </form>
      </Layout>
    </RequireAuth>
  )
}

export default EventsCreatePage
