import { backendAxios, mapAxiosResponse } from "@/utilities/axios";
import { Group, groupSchema } from "./groups";
import { z } from "zod";

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  picture: z.string().optional(),
  color: z.string(),
  allDay: z.boolean(),
  startAt: z.date(),
  endAt: z.date(),
  groupIds: z.array(z.number()),
});

export type CreateEvent = z.infer<typeof createEventSchema>;

const eventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  picture: z.string().optional(),
  color: z.string(),
  allDay: z.boolean(),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
  authorId: z.number(),
  groups: groupSchema.array(),
});

export type Event = z.infer<typeof eventSchema>;

export const eventsService = {
  async createEvent(event: CreateEvent) {
    return (await backendAxios.post<Event>("/events", event)).data;
  },
  async findAll() {
    return (await backendAxios.get<Event[]>("/events")).data;
  },
  async findById(id: number) {
    const response = await backendAxios.get<Event>(`/events/${id}`);

    return mapAxiosResponse(response, eventSchema);
  },
  async removeById(id: number) {
    return (await backendAxios.delete(`/events/${id}`)).data;
  },
};
