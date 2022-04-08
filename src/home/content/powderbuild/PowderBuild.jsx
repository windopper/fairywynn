import { useRef, useCallback } from "react";
import { useDispatch, useStore } from "react-redux";
import usePowderBuildDashBoardStateUpdate from "../../hooks/usePowderBuildDashBoardStateUpdate";
import { closePowderBuild } from "../../reducer/powderbuild";
import useBuildItemPowderUpdate from "../../hooks/useBuildItemPowderUpdate";
import ItemDisplay from "./ItemDisplay";
import PowderApplyDashBoard from "./PowderApplyDashBoard";
import "./PowderBuild.scss";
import { removepowder } from "../../reducer/itembuild";

const elementEmoji = {
  fire: "✹",
  earth: "✤",
  water: "❉",
  air: "❋",
  thunder: "✦",
};

const elementColor = {
  neutral: "RGB(252, 165, 14)",
  "✹": "RGB(255, 85, 83)",
  "✤": "RGB(4, 155, 5)",
  "❉": "RGB(70, 223, 223)",
  "❋": "RGB(228, 226, 227)",
  "✦": "RGB(255, 255, 85)",
};

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
  // console.log(powderbuild.equipType)

  return (
    <>
      {powderbuild.state ? (
        <div
          className="powderbuild-container-wrapper"
          onClick={() => (isCursorInside.current ? null : hideDashBoard())}
        >
          <div
            className="powderbuild-container"
            onMouseEnter={() => onEnter()}
            onMouseLeave={() => onLeave()}
          >
            <div className="powderbuild-itemdisplay-wrapper">
              <ItemDisplay
                d={powderbuild.item}
                equipType={powderbuild.equipType}
              />
            </div>
            <Powders />
            <PowderApplyDashBoard equipType={powderbuild.equipType} />
          </div>
        </div>
      ) : null}
    </>
  );

  function Powders() {
    const buildItemUpdate = useBuildItemPowderUpdate(powderbuild.equipType);
    const dispatch = useDispatch();

    const PowderInfo = () => {
      if(buildItemUpdate.length === 0) {
        if(powderbuild.item.sockets > 1) {
          return <div className="powderassinginfo">You can assign {powderbuild.item.sockets} powders to this item</div>
        } else if(powderbuild.item.sockets === 1) {
          return <div className="powderassinginfo">You can assign {powderbuild.item.sockets} powder to this item</div>
        } else {
          return <div className="powderassinginfo" style={{
            color: 'rgb(255, 121, 121)'
          }}>You can't assign powder to this item</div>
        }
        
      }
    }

    return (
      <div className="powderbuild-powderdisplay-wrapper">
        <PowderInfo />
        {buildItemUpdate.map((v, i) => (
          <div
            style={{
              color: `${elementColor[v.charAt(0)]}`,
              textShadow: `0 0 42px ${elementColor[v.charAt(0)]}
              , 0 0 82px ${elementColor[v.charAt(0)]}
              , 0 0 92px ${elementColor[v.charAt(0)]}
              , 0 0 102px ${elementColor[v.charAt(0)]}
              , 0 0 151px ${elementColor[v.charAt(0)]}`,
              animationName: 'glowing',
              animationDuration: '4s',
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
            }}
            onClick={() => dispatch(removepowder(powderbuild.equipType, i))}
          >
            <span>{v.charAt(0)}</span>
            <span
              style={{
                position: "relative",
                fontWeight: "700",
                fontSize: "1.2rem",
                left: "-10px",
                top: "3px",
                color: "rgb(217, 217, 217)",
              }}
            >
              {v.slice(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
