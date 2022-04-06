import { useCallback, useRef } from "react";
import { hideBuildDetail } from "../../reducer/builddetail";
import { useDispatch, useStore } from "react-redux";
import useBuildDetailDashBoardStateUpdate from "../../hooks/useBuildDetailDashBoardStateUpdate";
import "./BuildDetail.scss";
import HideButton from "./HideButton";
import BuildRequirements from "./contents/BuildRequirements";
import BuildStats from "./contents/BuildStats";

export default function BuildDetail() {
  const isCursorInside = useRef(false);

  const onEnter = () => (isCursorInside.current = true);
  const onLeave = () => (isCursorInside.current = false);

  const store = useStore();
  const dispatch = useDispatch();

  const hideDashBoard = useCallback(
    () => dispatch(hideBuildDetail),
    [dispatch]
  );

  const showBuildDetail = useBuildDetailDashBoardStateUpdate();

  const currentItemBuild = store.getState().itembuild;

  return (
    <>
      {showBuildDetail ? (
        <div
          className="build-detail-wrapper"
          onClick={() => (isCursorInside.current ? null : hideDashBoard())}
        >
          {/* <HideButton /> */}
          <div
            className="build-detail"
            onMouseEnter={() => onEnter()}
            onMouseLeave={() => onLeave()}
          >
            <BuildRequirements data={currentItemBuild} />
            <BuildStats data={currentItemBuild}/>
          </div>
        </div>
      ) : null}
    </>
  );
}