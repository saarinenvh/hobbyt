import { GET_HOBBIES, ADD_HOBBY } from "../constants/action-types";
import * as hobbies from "../hobbies.js";

export function getHobbies() {
  return { type: GET_HOBBIES, payload: hobbies.items };
}

export function addHobby(payload) {
  return { type: ADD_HOBBY, payload };
}
