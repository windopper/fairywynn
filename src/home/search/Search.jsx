import { useRef } from "react";
import "./Search.scss";
export default function Search({ setSearch, preSearch }) {
  const input = useRef("");

  function SearchBox() {
    return (
      <div className="searchwrapper">
        <input
          type="text"
          className="searchInput"
          placeholder="Search Items.."
          onChange={(e) => (input.current = e.target.value)}
        ></input>
        <div
          className="searchButton"
          onClick={() => {
            setSearch(input.current);
          }}
        >
          Search
        </div>
      </div>
    );
  }

  return (
    <div className="searchbox">
      <SearchBox />
      <PreSearch preSearch={preSearch} setSearch={setSearch} />
    </div>
  );
}

function PreSearch({ preSearch, setSearch }) {

  

  return (
    <div className="presearchwrapper">
      {preSearch.map((v, i) => {
        return (
          <div className="presearch" key={i} onClick={() => setSearch(preSearch[i])}>
            {v}
          </div>
        );
      })}
    </div>
  );
}
