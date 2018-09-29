import { FETCH_PLAYERS_LIST } from "../actions/types";

const reducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAYERS_LIST:
      return 0;

    default:
      return state;
  }
};

export default reducer;
