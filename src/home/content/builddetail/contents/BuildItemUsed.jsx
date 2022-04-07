import { getColorFromTier } from "../../../../utils/ColorPicker";
import { BUILDEQUIPS } from "../../../reducer/itembuild";
import "./BuildItemUsed.scss";

export default function BuildItemUsed({ data }) {
  const buildItems = BUILDEQUIPS.map((v) => (
    <BuildItem data={data[v]} equipType={v} />
  ));

  return <div className="builditemused-container">{buildItems}</div>;
}

function BuildItem({ data, equipType }) {
  const isUndefined = data === undefined;
//   console.log(data);
  return (
    <>
      {isUndefined ? (
        <div className="builditemused-item" key={equipType} style={{
            color: 'gray'
        }}>
          {equipType}
        </div>
      ) : (
        <div className="builditemused-item" key={equipType} style={{
            color: getColorFromTier(data.item)
        }}>
          {data.item.name}
        </div>
      )}
    </>
  );
}
