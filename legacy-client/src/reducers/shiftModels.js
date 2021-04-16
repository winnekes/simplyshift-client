import { SHIFT_MODELS_FETCHED, SHIFT_MODEL_EDITED } from "../actions/shifts";

export default function (state = [], action = {}) {
  switch (action.type) {
    case SHIFT_MODELS_FETCHED:
      return action.payload;
    case SHIFT_MODEL_EDITED:
      return state.map((model) =>
        model.id === action.payload.id ? action.payload : model
      );

    default:
      return state;
  }
}
