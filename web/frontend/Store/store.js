import { createStore } from "redux";
import SectionReducer from "./reducer";

const store = createStore(SectionReducer);
export default store;
