import Masonry from "react-masonry-css";
import { useEffect, useRef, useState } from "react";
import "./Content.scss";
import {
  nameColor,
  getDamage,
  getPowderSockets,
  getDefense,
  getAttackSpeed,
  getRequires,
  getStats,
} from "./EnumParts";
import { filtering } from "../reducer/filter";
import { useDispatch, useSelector, useStore } from "react-redux";
import { COMPLETE, FETCHING } from "../reducer/fetcher";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export default function Content() {
  const store = useStore();
  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filter = useRef(store.getState().filter);
  const search = useRef(store.getState().search);

  useEffect(() => {
    console.log("fetching...");

    fetch(`https://api.wynncraft.com/public_api.php?action=itemDB&category=all`)
      .then((res) => {
        return res.json();
      })
      .then((d) => {
        console.log(d.items.length + " items uploading");
        setData(d);
        dispatch(COMPLETE(d))
      })
      .catch((e) => {});
  }, []);

  useEffect(() => {

    const listener = () => {
      filter.current = store.getState().filter;
      search.current = store.getState().search;
      filterData();
    };
  
    store.subscribe(listener);
  }, [data])

  const filterData = () => {

    if (data.items !== undefined) {
      const s = search.current;
      const f = filter.current;

      let fd = data.items.filter((v) =>
        v.name.toLowerCase().includes(s.currentSearch)
      );
      fd = fd.filter((v, i) => v.level <= f.maxLevel && v.level >= f.minLevel);
      if (f.Rarity !== "All") fd = fd.filter((v, i) => v.tier == f.Rarity);
      if (f.Category !== "all")
        fd = fd.filter((v, i) => {
          if (v.type !== undefined) {
            if (v.type.toLowerCase() == f.Category) return true;
          } else if (v.accessoryType !== undefined) {
            if (v.accessoryType.toLowerCase() == f.Category) return true;
          }
          return false;
        });
      fd = fd.filter((v, i) => i < 500);

      setFilteredData(fd);
    }
  };


  let mapped =
    filteredData.length != 0 && filteredData != undefined
      ? Item(filteredData)
      : filteredData;

  if (filteredData.length == 0 && search.current.currentSearch !== "") {
    mapped = [];
    mapped.push(<div className="zerodata">검색 결과가 없습니다</div>);
  }

  const MappedContainer = () => (
    <Masonry
      className="container"
      breakpointCols={breakpointColumnsObj}
      columnClassName="column"
    >
      {mapped}
    </Masonry>
  );

  return <MappedContainer />;
}

function Gap() {
  return <div className="gap"></div>;
}

function Item(data) {
  // console.log(data.length)
  let mappingData = data.map((d, i) => {
    return (
      <div className="item" key={i}>
        <div
          className="name"
          style={{
            color: nameColor[d.tier],
          }}
        >
          {d.name}
        </div>
        <Gap />
        {getAttackSpeed(d)}
        <Gap />
        <div className="damage">{getDamage(d)}</div>
        <div className="defense">{getDefense(d)}</div>
        <Gap />
        {getRequires(d)}
        <Gap />
        {getStats(d)}
        <Gap />
        <Gap />
        <div className="lore">{d.addedLore}</div>
        <Gap />
        <div className="powder" id="leftside">
          {getPowderSockets(d.sockets)}
        </div>
        <div
          className="typetier"
          style={{
            color: nameColor[d.tier],
          }}
          id="leftside"
        >
          {d.tier + " " + `${d.type == undefined ? d.accessoryType : d.type}`}
        </div>
        <div className="restriction" id="leftside">
          {d.restrictions}
        </div>
      </div>
    );
  });
  return mappingData;
}
