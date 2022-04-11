import { useRef, useState, useEffect } from "react";
import { getColorFromTier } from "../../../../utils/ColorPicker";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import { DisplayItemWithPowder } from "../../Item";
import "./BuildItemUsed.scss";

export default function BuildItemUsed({ data }) {
  const buildItems = BUILDEQUIPS.map((v) => (
    <BuildItem data={data[v]} equipType={v} />
  ));

  return <div className="builditemused-container">{buildItems}</div>;
}

function BuildItem({ data, equipType }) {

  const [click, setClick] = useState(false)
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
            border: `${click ? '5px solid white' : '5px solid rgb(156, 156, 156)'}`
        }}
        onClick={() => setClick(true)}
        >
          {data.item.name}
          {/* {click ? <ClickBuildItemSearchInfo /> : null} */}
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
}



