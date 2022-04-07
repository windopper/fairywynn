

import '../Content.scss'
import { getPowderSockets, getDamage, getDefense } from '../EnumParts';
import { getColorFromTier } from '../../../utils/ColorPicker';

export default function ItemDisplay({d}) {

    const sockets = d.sockets

    return (
        <div className="item" style={{
            width: '200px'
        }}>
          <div
            className="name"
            style={{
              color: getColorFromTier(d),
            }}
          >
            {d.name}
          </div>
          <Gap />
          <div className="damage">{getDamage(d)}</div>
          <div className="defense">{getDefense(d)}</div>
          <br />
          <hr /><hr /><hr />
          <br />
          <div className="powder" id="leftside">
            {getPowderSockets(sockets)}
          </div>
        </div>
      );
}

function Gap() {
    return <div className="gap"></div>;
}
