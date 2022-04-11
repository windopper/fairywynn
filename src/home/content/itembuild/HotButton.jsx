import "./HotButton.scss";
import { useCallback, useRef, useState } from "react";
import { batch, useDispatch, useStore } from "react-redux";
import { BUILDEQUIPS } from "../../reducer/itembuild";
import BuildItems from "./BuildItems";
import useBuildItemsUpdate from "../../hooks/useBuildItemsUpdate";
import BuildDetail from "../builddetail/BuildDetail";
import { showBuildDetail } from "../../reducer/builddetail";
import ExportButton from "./ExportButton";
import { updatebuild } from "../../reducer/itembuild";
import { getBuildDamages, StatAssignCalculateFunction } from "../../../utils/WynnMath";

export default function HotButton() {

  const dispatch = useDispatch()
  const _ = useBuildItemsUpdate();
  const store = useStore();
  const itembuild = store.getState().itembuild;
  const remain = BUILDEQUIPS.filter((v) => itembuild[v] !== undefined).length;
  const [hover, setHover] = useState(false);

  const setShowBuildDetail = useCallback(
    () => (
        // dispatch(showBuildDetail)
      batch(() => {
        dispatch(updatebuild(getBuildDamages(store.getState().itembuild), StatAssignCalculateFunction(store.getState().itembuild)))
        dispatch(showBuildDetail)
      })
  ),
    [dispatch]
  );


  return (
    <div
      className="hotbutton"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <ExportButton /> : null}
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
            return <BuildItems v={v} itembuild={itembuild} />;
          })
        : null}
    </div>
  );
}
