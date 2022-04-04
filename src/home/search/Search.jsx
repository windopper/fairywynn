
import "./Search.scss";
import SearchFilterBox from "./SearchFilterBox";
import SearchHistoryBox from "./SearchHistoryBox";

export default function Search() {

  return (
    <div className="searchbox">
      <SearchHistoryBox />
      <SearchFilterBox/>
    </div>
  );

}


