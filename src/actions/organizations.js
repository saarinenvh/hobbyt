import { GET_ORGANIZATIONS, ADD_HOBBY } from "../constants/action-types";
import * as organizers from "../organizers.js";

export function getOrganizations() {
  return { type: GET_ORGANIZATIONS, payload: organizers.items };
}

export function addOrganization(payload) {
  return { type: ADD_HOBBY, payload };
}
