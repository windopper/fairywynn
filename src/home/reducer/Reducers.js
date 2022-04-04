import { combineReducers } from "redux";
import { fetcher } from "./fetcher";
import { filter } from "./filter";
import { searchReducer } from "./search";

const rootReducer = combineReducers({
    filter: filter,
    search: searchReducer,
    fetcher: fetcher
})

export default rootReducer