import { useCallback, useRef } from "react";
import { hideBuildDetail } from "../../reducer/builddetail";
import { batch, useDispatch, useStore } from "react-redux";
import useBuildDetailDashBoardStateUpdate from "../../hooks/useBuildDetailDashBoardStateUpdate";
import BuildRequirements from "./contents/BuildRequirements";
import BuildStats from "./contents/BuildStats";
import StatRemain from "./contents/StatRemain";
import BuildItemUsed from "./contents/BuildItemUsed";
import BuildSpellInfo from "./contents/buildspell/BuildSpellInfo";
import { getBuildDamages, StatAssignCalculateFunction } from "../../../utils/WynnMath";
import "./BuildDetail.scss";
import BuildWarn from "./contents/buildspell/BuildWarn";
import BuildMeleeInfo from "./contents/buildmelee/BuildMeleeInfo";
import { updatebuild } from "../../reducer/itembuild";

export default function BuildDetail() {

  const isCursorInside = useRef(false);

  const onEnter = () => (isCursorInside.current = true);
  const onLeave = () => (isCursorInside.current = false);

  const store = useStore();
  const dispatch = useDispatch();

  const hideDashBoard = useCallback(() =>
      dispatch(hideBuildDetail),
    [dispatch]
  );

  const showBuildDetail = useBuildDetailDashBoardStateUpdate();

  const currentItemBuild = store.getState().itembuild;
  // console.log(currentItemBuild)

  const statAssigned = currentItemBuild.currentBuild.statAssigned
  const computedDamage = currentItemBuild.currentBuild.computedDamage
  const meleeDamages = computedDamage.melee
  const spellDamages = computedDamage.spell

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
            <BuildWarn itemBuildData={currentItemBuild} statAssigned={statAssigned}/>
            <BuildRequirements data={currentItemBuild} />
            <StatRemain data={currentItemBuild} statAssigned={statAssigned}/>
            <BuildItemUsed data={currentItemBuild} />
            <BuildStats data={currentItemBuild}/>
            <BuildMeleeInfo computedMeleeDamages={meleeDamages} itemBuildData={currentItemBuild}/>
            <BuildSpellInfo itemBuildData={currentItemBuild} computedBuildDamages={computedDamage}/>
          </div>
        </div>
      ) : null}
    </>
  );
}
