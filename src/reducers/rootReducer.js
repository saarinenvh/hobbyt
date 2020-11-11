import * as actions from "../constants/action-types";

const initialState = {
  organizations: [],
  categories: [],
  superCategories: [],
  subCategories: [],
  activities: [],
  userLocation: {},
  searchObject: {}
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CATEGORIES:
      return Object.assign({}, state, { categories: action.payload });
    case actions.GET_SUB_CATEGORIES:
      return Object.assign({}, state, { subCategories: action.payload });
    case actions.GET_SUPER_CATEGORIES:
      return Object.assign({}, state, { superCategories: action.payload });
    case actions.GET_ACTIVITIES:
      return Object.assign({}, state, { activities: action.payload });
    case actions.GET_ORGANIZATIONS:
      return Object.assign({}, state, {
        organizations: action.payload
      });
    case actions.ADD_USER_LOCATION: {
      return Object.assign({}, state, { userLocation: action.payload });
    }
    case actions.SEARCH: {
      console.log(action.payload);
      return Object.assign({}, state, { searchObject: action.payload });
    }
    default:
      return state;
  }
}

export default rootReducer;
