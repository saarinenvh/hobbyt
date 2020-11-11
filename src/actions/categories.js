import {
  GET_SUPER_CATEGORIES,
  GET_CATEGORIES,
  GET_SUB_CATEGORIES
} from "../constants/action-types";
import * as superCategories from "../superCategories";
import * as subCategories from "../subCategories";
import * as categories from "../categories";

export function getSuperCategories() {
  return { type: GET_SUPER_CATEGORIES, payload: superCategories.items };
}

export function getCategories() {
  return { type: GET_CATEGORIES, payload: categories.items };
}

export function getSubCategories() {
  return { type: GET_SUB_CATEGORIES, payload: subCategories.items };
}
