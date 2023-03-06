import { ErrorMessage, Field, Form, Formik } from "formik"
import { DateRangePicker } from "rsuite"
import Layout from "../../components/Layout/Layout"
import type { LocationItem } from "../../components/LocationSearch/LocationSearch"
import { LocationSearch } from "../../components/LocationSearch/LocationSearch"
import RequireAuth from "../../components/RequireAuth"
import RichTextEditor from "../../components/RichTextEditor"

type CreateEventFormikValues = {
  name: string
  description: string
  startDate: Date
  endDate: Date
  allDay: boolean
  location: LocationItem | null
}

const EventsCreatePage = () => {
  const initialValues: CreateEventFormikValues = {
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    allDay: false,
    location: null,
  }

  function onSubmit(values: CreateEventFormikValues) {
    console.log(values)
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
                  <DateRangePicker
                    format={`yyyy-MM-dd ${
                      formik.values.allDay ? "" : "HH:mm:ss"
                    }`}
                    value={[formik.values.startDate, formik.values.endDate]}
                    onChange={(value) => {
                      formik.setFieldValue("startDate", value?.at(0))
                      formik.setFieldValue("endDate", value?.at(1))
                    }}
                    showOneCalendar
                    ranges={[
                      {
                        label: "today",
                        value: [new Date(), new Date()],
                      },
                    ]}
                    defaultCalendarValue={[
                      new Date("2022-02-01 00:00:00"),
                      new Date("2022-05-01 23:59:59"),
                    ]}
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
