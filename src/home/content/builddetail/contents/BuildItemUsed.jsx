import { useRef, useState, useEffect } from "react";
import { getColorFromTier } from "../../../../utils/ColorPicker";
import useBuildItemPowderUpdate from "../../../hooks/useBuildItemPowderUpdate";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import { DisplayItemWithPowder } from "../../Item";
import BuildItemOption from "./BuildItemOptions";

import "./BuildItemUsed.scss";


const elementColor = {
  neutral: "RGB(252, 165, 14)",
  "✹": "RGB(255, 85, 83)",
  "✤": "RGB(4, 155, 5)",
  "❉": "RGB(70, 223, 223)",
  "❋": "RGB(228, 226, 227)",
  "✦": "RGB(255, 255, 85)",
};

export default function BuildItemUsed({ data }) {
  const buildItems = BUILDEQUIPS.map((v) => (
    <BuildItem data={data[v]} equipType={v} />
  ));

  return <div className="builditemused-container">{buildItems}</div>;
}

function BuildItem({ data, equipType }) {

  
  const [click, setClick] = useState(false)
  const [hover, setHover] = useState(false)
  
  const ref = useRef(null)

  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setClick(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [ref]);

  const isUndefined = data === undefined;

  return (
    <>
      {isUndefined ? (
        <div className="builditemused-item" key={equipType} style={{
            color: 'gray'
        }}>
          {equipType}
        </div>
      ) : (
        <>
        <div ref={ref} className="builditemused-item" key={equipType} style={{
            color: getColorFromTier(data.item),
            backgroundColor: `${click ? 'white' : 'rgb(31, 31, 31)'}`,
            borderColor: `${click ? 'white' : 'rgb(156, 156, 156)'}`
        }}
        onClick={() => setClick(true)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        >
          <div>{data.item.name}</div>
          <PowderApplied />
          {/* {hover ? <BuildItemOption /> : null} */}
        </div>
        </>
      )}
    </>
  );

  function ClickBuildItemSearchInfo() {
    return (
      <div className="builditemused-searchinfo">
        <DisplayItemWithPowder equipsData={data} />
      </div>
    )
  }

  function PowderApplied() {
    const powderbuild = useBuildItemPowderUpdate(equipType)
    return powderbuild.length == 0 ? null : (
      <div className="builditemused-item-powder">
        {powderbuild.map((v) => (
          <div
            style={{
              color: `${elementColor[v.charAt(0)]}`,
              textShadow: `0 0 10px ${elementColor[v.charAt(0)]}
        , 0 0 40px ${elementColor[v.charAt(0)]}
        , 0 0 60px ${elementColor[v.charAt(0)]}
        , 0 0 100px ${elementColor[v.charAt(0)]}`,
            }}
          >
            <span>{` ${v.charAt(0)}`}&nbsp;</span>
          </div>
        ))}
      </div>
    );
  }
}



