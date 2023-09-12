import { availabilitiesClientApi } from "./availability";
import { eventsClientApi } from "./events";
import { friendshipsClientApi } from "./friendships";
import { locationsClientApi } from "./locations";
import { usersClientApi } from "./users";

export const clientApi = {
  availabilities: availabilitiesClientApi,
  events: eventsClientApi,
  friendships: friendshipsClientApi,
  users: usersClientApi,
  locations:locationsClientApi
};
