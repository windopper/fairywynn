import "../Content.scss";
import {
  getPowderSockets,
  getDamage,
  getDefense,
  GetDamagesWithPowder,
} from "../EnumParts";
import { getColorFromTier } from "../../../utils/ColorPicker";
import useBuildItemUpdate from "../../hooks/useBuildItemUpdate";
import useBuildItemPowderUpdate from "../../hooks/useBuildItemPowderUpdate";
import { GetArmorDefenseWithPowder } from "../../../utils/WynnMath";
import { useStore } from "react-redux";

export default function ItemDisplay({ d, equipType }) {
  const appliedPowder = useBuildItemPowderUpdate(equipType);
  const store = useStore();

  const sockets = d.sockets;

  return (
    <div
      className="item"
      style={{
        width: "200px",
      }}
    >
      <div
        className="name"
        style={{
          color: getColorFromTier(d),
        }}
      >
        {d.name}
      </div>
      <Gap />
      {equipType !== "weapon" ? (
        <div className="defense">
          {getDefense(store.getState().itembuild[equipType].item)}
        </div>
      ) : (
        <div className="damage">
          {/* <GetDamagesWithPowder equipType={equipType} /> */} 
          {getDamage(store.getState().itembuild[equipType].item)}
        </div>
      )}
      <br />
      <hr />
      <hr />
      <hr />
      <br />
      <div className="powder" id="leftside">
        [{appliedPowder.length}/{sockets}] Powder Slots
      </div>
    </div>
  );
}

function Gap() {
  return <div className="gap"></div>;
}
