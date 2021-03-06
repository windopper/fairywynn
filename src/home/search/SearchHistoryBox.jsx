import { useState, useRef, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH } from "../reducer/search";
import "./Search.scss";

export default function SearchHistoryBox() {
  const input = useRef("");
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();

  const reRender = () => setUpdate((v) => !v);

  const callbackDispatch = useCallback((v) => dispatch(SEARCH(v)), [dispatch])

  const dispatchSearch = (v) => {
    callbackDispatch(v)
    input.current = ''
    reRender();
  };

  const preSearch = useSelector((state) => state.search.preSearch);

  return (
    <>
      <SearchBox />
      <PreSearch />
    </>
  );

  function PreSearch() {
    return (
      <div className="presearchwrapper">
        {preSearch.map((v, i) => {
          return (
            <div
              className="presearch"
              key={i}
              onClick={() => dispatchSearch(v)}
            >
              {v.length > 10 ? v.slice(0, 10)+"..." : v}
            </div>
          );
        })}
      </div>
    );
  }

  function SearchBox() {
    return (
      <div className="searchwrapper">
        <input
          type="text"
          className="searchInput"
          placeholder="Search Items.."
          onChange={(e) => (input.current = e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? dispatchSearch(input.current) : null}
        ></input>
        <div
          className="searchButton"
          onClick={() => {
            dispatchSearch(input.current);
          }}
        >
          Search
        </div>
      </div>
    );
  }
}
