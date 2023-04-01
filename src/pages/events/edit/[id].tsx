import type { Group } from "@prisma/client"
import { Avatar, Button, DatePicker, Input, Select, Tag, Tooltip } from "antd"
import dayjs from "dayjs"
import Image from "next/image"
import { useRouter } from "next/router"
import type { CustomTagProps } from "rc-select/lib/BaseSelect"
import type { FC } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"
import { GroupPicture } from "../../../components/Groups/GroupPicture"
import Layout from "../../../components/Layout/Layout"
import RequireAuth from "../../../components/RequireAuth"
import RichTextEditor from "../../../components/RichTextEditor"
import { api } from "../../../utils/api"

type Option = {
  label: string
  value: number
}

const validationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date(),
  allDay: z.boolean(),
  location: z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  groups: z.array(z.object({ value: z.number() })),
})

type FormValues = z.infer<typeof validationSchema>

const EditEventPage: FC = () => {
  const router = useRouter()

  const { id } = router.query

  api.events.getEvent.useQuery(
    { id: parseInt(id as string) },
    {
      enabled: typeof id === "string",
      onSuccess(data) {
        reset({
          ...data,
          groups: data?.EventParticipatingGroup.map(x => ({
            value: x.groupId,
          })),
        })
      },
    }
  )

  const getEventParticipantsQuery = api.events.getEventParticipants.useQuery(
    { eventIds: [parseInt(id as string)] },
    {
      enabled: typeof id === "string",
    }
  )

  const updateEventMutation = api.events.updateEvent.useMutation({
    onSuccess(data) {
      toast.success("Event updated")

      void router.push(`/events/${data.id}`)
    },
  })

  const form = useForm<FormValues>()
  const { handleSubmit, setValue, watch, reset } = form

  const onSubmit = handleSubmit(data => {
    updateEventMutation.mutate({ id: parseInt(id as string), ...data })
  })

  const formData = watch()

  return (
    <RequireAuth>
      <Layout className="p-0">
        <Image
          alt="cover"
          width={2560}
          height={1440}
          src="https://picsum.photos/2560/1440"
        />
        <form className="flex flex-col gap-2 !p-4" onSubmit={onSubmit}>
          <Input
            value={formData.name}
            placeholder="Name"
            onChange={e => {
              setValue("name", e.target.value)
            }}
          />
          <RichTextEditor
            value={formData.description}
            onChange={value => {
              setValue("description", value)
            }}
          />
          <DatePicker.RangePicker
            showTime
            value={[dayjs(formData.startDate), dayjs(formData.endDate)]}
          />
          <GroupSearch
            values={formData.groups as Option[]}
            onChange={values => setValue("groups", values)}
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg">Participants</p>
            <Avatar.Group
              maxCount={5}
              maxStyle={{ color: "white", backgroundColor: "#115E59" }}
            >
              {getEventParticipantsQuery.data?.map(participant => (
                <Tooltip
                  title={`${participant.user.firstName} ${participant.user.lastName}`}
                  placement="top"
                  key={`event-participant-${participant.id}`}
                >
                  <Avatar style={{ backgroundColor: "#0F9488" }}>
                    {participant.user.firstName.charAt(0) +
                      participant.user.lastName.charAt(0)}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          <div className="flex justify-center ">
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </div>
        </form>
      </Layout>
    </RequireAuth>
  )
}

const GroupSearch: FC<{
  values: Option[]
  onChange: (options: Option[]) => void
}> = ({ values, onChange }) => {
  const [query, setQuery] = useState("")
  const [groupsOptions, setGroupsOptions] = useState<Option[]>([])

  const searchGroupsQuery = api.groups.searchGroups.useQuery(
    { query },
    {
      onSuccess(data) {
        const options = data.map(group => ({
          label: group.name,
          value: group.id,
        }))

        setGroupsOptions(options)
      },
    }
  )

  return (
    <Select
      labelInValue
      filterOption={false}
      optionLabelProp="children"
      mode="multiple"
      value={values}
      onSearch={value => setQuery(value)}
      onChange={(values: Option[]) => {
        onChange(values)
      }}
      searchValue={query}
      placeholder="Select groups"
      loading={searchGroupsQuery.isLoading}
      tagRender={GroupSearchTag}
    >
      {searchGroupsQuery.data &&
        groupsOptions.map(({ value }: { value: number }) => (
          <Select.Option key={`select-group-option-${value}`} value={value}>
            <GroupSelectOption
              group={searchGroupsQuery.data?.find(x => x.id === value) as Group}
            />
          </Select.Option>
        ))}
    </Select>
  )
}

const GroupSelectOption: FC<{ group: Group }> = ({ group }) => {
  return (
    <span className="text-black">
      <GroupPicture size={20} group={group} className="mr-2 inline" />
      {group.name}
    </span>
  )
}

const GroupSearchTag = (props: CustomTagProps) => {
  const { label, closable, onClose } = props

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

export default EditEventPage
