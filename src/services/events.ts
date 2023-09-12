import { backendAxios } from "@/utilities/axios";

export interface EventRequest {
  title: string;
  description: string;
  picture?: string;
  color: string;
  allDay: boolean;
  startAt: Date;
  endAt: Date;
}

export interface EventResponse {
  id: number;
  title: string;
  description: string;
  picture?: string;
  color: string;
  allDay: boolean;
  startAt: Date;
  endAt: Date;
  authorId: number;
}

export const eventsService = {
  async createEvent(event: EventRequest) {
    return (await backendAxios.post<EventResponse>("events", event)).data;
  },
  async findAll() {
    return (await backendAxios.get<EventResponse[]>("events")).data;
  },
  async findById(id: number) {
    return (await backendAxios.get<EventResponse>(`events/${id}`)).data;
  },
  async removeById(id: number) {
    return (await backendAxios.delete(`events/${id}`)).data;
  },
};
