import { useRef, useCallback } from "react";
import { useDispatch, useStore } from "react-redux";
import usePowderBuildDashBoardStateUpdate from "../../hooks/usePowderBuildDashBoardStateUpdate";
import { closePowderBuild } from "../../reducer/powderbuild";
import { DisplayItem } from "../Item";
import ItemDisplay from "./ItemDisplay";
import PowderApplyDashBoard from "./PowderApplyDashBoard";
import './PowderBuild.scss'

export default function PowderBuild() {
  const isCursorInside = useRef(false);

  const onEnter = () => (isCursorInside.current = true);
  const onLeave = () => (isCursorInside.current = false);

  const store = useStore();
  const dispatch = useDispatch();

  const hideDashBoard = useCallback(
    () => dispatch(closePowderBuild()),
    [dispatch]
  );

  const powderbuild = usePowderBuildDashBoardStateUpdate();

//   const currentItemBuild = store.getState().powderbuild.item;
//   console.log(currentItemBuild)

  return (
    <>
      {powderbuild.state ? (
        <div className="powderbuild-container-wrapper"
        onClick={() => (isCursorInside.current ? null : hideDashBoard())}
        >
          <div
            className="powderbuild-container"
            onMouseEnter={() => onEnter()}
            onMouseLeave={() => onLeave()}
          >
              <div className="powderbuild-itemdisplay-wrapper">
                 <ItemDisplay d={powderbuild.item} />
              </div>
              <PowderApplyDashBoard />
          </div>
        </div>
      ) : null}
    </>
  );
}
