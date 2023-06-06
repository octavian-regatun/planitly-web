import { availabilitiesServerApi } from "./services/availability";
import { eventsServerApi } from "./services/events";
import { friendshipsServerApi } from "./services/friendships";
import { usersServerApi } from "./services/users";

export const serverApi = {
  events: eventsServerApi,
  users: usersServerApi,
  friendships: friendshipsServerApi,
  availabilities: availabilitiesServerApi,
};
