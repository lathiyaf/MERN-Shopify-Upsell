import { SECTION_DELETE, SECTION_DETAILS } from "./consts";

const initialState = {
  section_data: {},
};

const SectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SECTION_DETAILS:
      return {
        section_data: { ...state.section_data, ...action.payload },
      };

    case SECTION_DELETE:
      return {
        section_data: { ...initialState.section_data },
      };

    default:
      return state;
  }
};

export default SectionReducer;
