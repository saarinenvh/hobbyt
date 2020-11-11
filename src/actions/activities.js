import { GET_ACTIVITIES } from "../constants/action-types";
import * as activities from "../activities.js";

export function getActivities() {
  return { type: GET_ACTIVITIES, payload: activities.items };
}
