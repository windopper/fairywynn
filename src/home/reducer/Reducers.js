import { combineReducers } from "redux";
import { fetcher } from "./fetcher";
import { filter } from "./filter";
import { itembuild } from "./itembuild";
import { builddetail } from "./builddetail";
import { popup } from "./popup";
import { searchReducer } from "./search";

const rootReducer = combineReducers({
    filter: filter,
    search: searchReducer,
    fetcher: fetcher,
    itembuild: itembuild,
    popup: popup,
    builddetail: builddetail
})

export default rootReducer