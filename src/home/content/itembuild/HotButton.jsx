import "./HotButton.scss";
import { useRef, useState } from "react";
import { useStore } from "react-redux";
import { BUILDEQUIPS } from "../../reducer/itembuild";
import BuildItems from "./BuildItems";
import useBuildItemsUpdate from "../../hooks/useBuildItemsUpdate";

export default function HotButton() {
  const _ = useBuildItemsUpdate();
  const store = useStore();
  const equips = store.getState().itembuild;
  const remain = BUILDEQUIPS.filter((v) => equips[v] !== undefined).length;

  const [hover, setHover] = useState(false);

  return (
    <div
      className="hotbutton"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? null : <div className="remaining">{`${remain}/9`}</div>}
      {hover ? null : <div className="margin10">CURRENT BUILD</div>}
      {hover ? <div className="createbuild">CREATE BUILD</div> : null}
      {hover ? <div className="builddetail">BUILD DETAIL</div> : null}
      {hover
        ? BUILDEQUIPS.map((v, i) => {
            return <BuildItems v={v} equips={equips} />;
          })
        : null}
    </div>
  );
}
