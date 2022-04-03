import Masonry from "react-masonry-css";
import { useEffect, useRef, useState } from "react";
import "./Content.scss";
import { nameColor, damageColor, getDamage, getPowderSockets, getDefense, getAttackSpeed, getRequires, getStats } from "./EnumParts";

export default function Content({search, setLoading, loading}) {


  const [data, setData] = useState([]);
//   const loading = useRef(false)
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  useEffect(() => {
    setLoading(true)
    console.log('loading...')
    fetch(
      `https://api.wynncraft.com/public_api.php?action=itemDB&search=${search}`
    )
      .then((res) => {
          return res.json()
      })
      .then((d) => {
        console.log('done')
        setLoading(false)
        setData(d);
      })
      .catch(e => console.log(e))
  }, [search]);

  let mapped = []

  if(loading) {
    mapped = []
    for(let i=0; i<200; i++) {
        mapped.push(
            <div className="item" key={i} style={{
                height: Math.random() * 300 + 200 + 'px'
            }}>
            </div>
        )
    }
  } else {
    mapped =
    data.length != 0 && data.items != undefined
      ? data.items.map((d, i) => {
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
              <Gap/>
              {getAttackSpeed(d)}
              <Gap/>
              <div className="damage">{getDamage(d)}</div>
              <div className="defense">{getDefense(d)}</div>
              <Gap/>
              {getRequires(d)}
              <Gap/>
              {getStats(d)}
              <Gap/>
              <Gap/>
              <div className="lore">{d.addedLore}</div>
              <Gap/>
              <div className='powder' id='leftside'>{getPowderSockets(d.sockets)}</div>
              <div className='typetier'                 style={{
                  color: nameColor[d.tier],
                }} id="leftside">{d.tier+" "+`${d.type == undefined ? d.accessoryType : d.type}`}</div>
              <div className="restriction" id="leftside">{d.restrictions}</div>
            </div>
          );
        })
      : data;
  }

  return (
    <Masonry
    className="container"
    breakpointCols={breakpointColumnsObj}
    columnClassName="column"
  >
    {mapped}
  </Masonry>
  )
}

function Gap() {
    return <div className="gap"></div>
}
