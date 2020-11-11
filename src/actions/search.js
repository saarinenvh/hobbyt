import { SEARCH } from "../constants/action-types";
import * as activities from "../activities.js";

export function search(searchObject) {
  console.log("action");
  return { type: SEARCH, payload: searchObject };
}
