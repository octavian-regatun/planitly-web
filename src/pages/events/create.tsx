import { ErrorMessage, Field, Form, Formik } from "formik"
import { DateTimeRangePicker } from "../../components/DateRangePicker/DateRangePicker"

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
}

const EventsCreatePage = () => {
  const createEventMutation = api.events.createEvent.useMutation({
    onSuccess(data) {
      console.log(data)
    },
  })

  const initialValues: CreateEventFormikValues = {
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    allDay: true,
    location: null,
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

  return (
    <RequireAuth>
      <Layout>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form className="flex flex-col items-center gap-4">
                <div className="flex w-full flex-col gap-2">
                  <label className="text-center text-xl font-bold">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="rounded-full border border-black p-2 text-center"
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-center text-xl font-bold">
                    Description
                  </label>
                  <RichTextEditor
                    value={formik.values.description}
                    onChange={(content) =>
                      formik.setFieldValue("description", content)
                    }
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-center text-xl font-bold">Date</label>
                  <DateTimeRangePicker
                    startDate={formik.values.startDate}
                    endDate={formik.values.endDate}
                    onChange={(dates) => {
                      const [startDate, endDate] = dates

                      formik.setValues({
                        ...formik.values,
                        startDate,
                        endDate,
                      })
                    }}
                  />
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2">
                  <label className="text-center text-xl font-bold">
                    All Day
                  </label>
                  <Field
                    type="checkbox"
                    name="allDay"
                    className="h-4 w-4 rounded-full border border-black text-center"
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <label className="text-center text-xl font-bold">
                    Location
                  </label>
                  <LocationSearch
                    onSelect={(location) =>
                      formik.setValues({ ...formik.values, location })
                    }
                  />
                  <ErrorMessage name="name" component="div" />
                </div>
                <button className="rounded-full bg-black px-8 py-2 text-lg font-bold uppercase text-white">
                  Submit
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
