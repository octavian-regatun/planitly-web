import { Group } from "@prisma/client"
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik"
import { DateTimeRangePicker } from "../../components/DateRangePicker/DateRangePicker"
import { SearchGroups } from "../../components/Events/SearchGroups"
import Layout from "../../components/Layout/Layout"
import type { LocationItem } from "../../components/LocationSearch/LocationSearch"
import { LocationSearch } from "../../components/LocationSearch/LocationSearch"
import RequireAuth from "../../components/RequireAuth"
import RichTextEditor from "../../components/RichTextEditor"
import { api } from "../../utils/api"

type CreateEventFormikValues = {
  name: string
  description: string
  startDate: Date | null
  endDate: Date | null
  allDay: boolean
  location: LocationItem | null
  groups: Group[]
}

const EventsCreatePage = () => {
  const createEventMutation = api.events.createEvent.useMutation({})

  const initialValues: CreateEventFormikValues = {
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    allDay: true,
    location: null,
    groups: [],
  }

  function onSubmit(values: CreateEventFormikValues) {
    alert(JSON.stringify(values, null, 2))

    if (!values.location) return

    if (!values.startDate || !values.endDate) return

    createEventMutation.mutate({
      ...values,
      startDate: values.startDate,
      endDate: values.endDate,
      location: values.location,
    })
  }

  function onDateChange(
    dates: [Date | null, Date | null],
    formik: FormikProps<CreateEventFormikValues>
  ) {
    const [startDate, endDate] = dates

    formik.setValues({
      ...formik.values,
      startDate,
      endDate,
    })
  }

  return (
    <RequireAuth>
      <Layout className="bg-teal-600 text-white">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className="flex flex-col items-center gap-4">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-lg">Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Event name"
                    className="rounded-lg bg-teal-700 p-2 text-white placeholder-gray-200 outline-teal-300"
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-lg">Description</label>
                  <RichTextEditor
                    value={formik.values.description}
                    onChange={(content) =>
                      formik.setFieldValue("description", content)
                    }
                  />
                </div>
                <div className="flex w-full gap-4">
                  <div className="flex flex-[2] flex-col gap-2">
                    <label className="text-lg">Date</label>
                    <DateTimeRangePicker
                      startDate={formik.values.startDate}
                      endDate={formik.values.endDate}
                      onChange={(dates) => onDateChange(dates, formik)}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <label className="text-xl">All Day</label>
                    <Field
                      type="checkbox"
                      name="allDay"
                      className="h-[42px] w-[42px] rounded-lg border border-black text-center accent-teal-700"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-xl">Location</label>
                  <LocationSearch
                    onSelect={(location) =>
                      formik.setValues({ ...formik.values, location })
                    }
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-xl">Groups</label>
                  <SearchGroups
                    onClick={(group) => {
                      formik.setFieldValue("groups", [
                        ...formik.values.groups,
                        group,
                      ])
                    }}
                  />
                </div>
                <button className="rounded bg-yellow-200 px-8 py-2 text-lg text-black">
                  Create Event
                </button>
              </Form>
            )
          }}
        </Formik>
      </Layout>
    </RequireAuth>
  )
}

export default EventsCreatePage
