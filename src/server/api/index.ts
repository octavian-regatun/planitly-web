import { availabilitiesServerApi } from "./availability";
import { eventsServerApi } from "./events";
import { friendshipsServerApi } from "./friendships";
import { usersServerApi } from "./users";

export const serverApi = {
  events: eventsServerApi,
  users: usersServerApi,
  friendships: friendshipsServerApi,
  availabilities: availabilitiesServerApi,
};
