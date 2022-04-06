import Masonry from "react-masonry-css";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./Content.scss";

import { useDispatch, useSelector, useStore } from "react-redux";
import { COMPLETE, FETCHING } from "../reducer/fetcher";
import ContentMasonry from "./ContentMasonry";
import useSearchConditionUpdate from "../hooks/useSearchConditionUpdate";

export default function Content() {
  const store = useStore();
  const dispatch = useDispatch()

  const api = useRef([])

  const [_, Update] = useState(false)
  const [filteredData, search, filter] = useSearchConditionUpdate(api.current)


  useEffect(() => {
    console.log("fetching...");

    fetch(`https://api.wynncraft.com/public_api.php?action=itemDB&category=all`)
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        console.log(d.items.length + " items uploading");
        api.current = d
        console.log(d)
        Update(u=>!u)
        dispatch(COMPLETE(d))
      })
      .catch((e) => {});
  }, []);


  const MappedContainer = () => (
    <>
    {filteredData.length !== 0 ? 
    filteredData.length === 500 ? <div className="searchsize">{`${filteredData.length}개 검색됨 (최대 500개)`}</div> : <div className="searchsize">{`${filteredData.length}개 검색됨`}</div>
     : null}
    {filteredData.length == 0 && search.currentSearch !== "" ? <div className="zerodata">검색 결과가 없습니다</div> : null}
    <ContentMasonry filteredData={filteredData}/>
    </>
  );

  return <MappedContainer />;
}


