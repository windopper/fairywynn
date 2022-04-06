import "./HotButton.scss";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { BUILDEQUIPS } from "../../reducer/itembuild";
import BuildItems from "./BuildItems";
import useBuildItemsUpdate from "../../hooks/useBuildItemsUpdate";
import BuildDetail from "../builddetail/BuildDetail";
import { showBuildDetail } from "../../reducer/builddetail";

export default function HotButton() {

  const dispatch = useDispatch()
  const _ = useBuildItemsUpdate();
  const store = useStore();
  const equips = store.getState().itembuild;
  const remain = BUILDEQUIPS.filter((v) => equips[v] !== undefined).length;

  const [hover, setHover] = useState(false);

  const setShowBuildDetail = useCallback(() => dispatch(showBuildDetail), [dispatch])


  return (
    <div
      className="hotbutton"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? null : <div className="remaining">{`${remain}/9`}</div>}
      {hover ? null : <div className="margin10">CURRENT BUILD</div>}
      {hover ? <div className="createbuild">CREATE BUILD</div> : null}
      {hover ? (
        <div className="builddetail" onClick={() => setShowBuildDetail()}>
          BUILD DETAIL
        </div>
      ) : null}
      {hover
        ? BUILDEQUIPS.map((v, i) => {
            return <BuildItems v={v} equips={equips} />;
          })
        : null}
    </div>
  );
}