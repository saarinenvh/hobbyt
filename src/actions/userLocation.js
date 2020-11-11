import { ADD_USER_LOCATION } from "../constants/action-types";

export function addUserLocation(location) {
  return { type: ADD_USER_LOCATION, payload: location };
}
