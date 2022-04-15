import { useCallback, useMemo, useRef } from "react";
import { hideBuildDetail } from "../../reducer/builddetail";
import { batch, useDispatch, useSelector, useStore } from "react-redux";
import useBuildDetailDashBoardStateUpdate from "../../hooks/useBuildDetailDashBoardStateUpdate";
import BuildRequirements from "./contents/BuildRequirements";
import BuildStats from "./contents/BuildStats";
import StatRemain from "./contents/StatRemain";
import BuildItemUsed from "./contents/BuildItemUsed";
import BuildSpellInfo from "./contents/buildspell/BuildSpellInfo";
import "./BuildDetail.scss";
import BuildWarn from "./contents/buildnotice/BuildWarn";
import BuildMeleeInfo from "./contents/buildmelee/BuildMeleeInfo";
import { resetsetting, updatebuild } from "../../reducer/itembuild";
import BuildAssignSequence from "./contents/BuildAssignSequence";
import BuildBoosts from "./contents/BuildBoosts";
import useBuildSettingUpdate from "../../hooks/useBuildSettingUpdate";
import BuildAnalysis from "./contents/buildanalysis/BuildAnalysis";
import HideButton from "./HideButton";
import useBuildUpdate from "../../hooks/useBuildUpdate";
import ResetButton from "./ResetButton";
import NextSpellCost from "./contents/NextSpellCost";
import NoticeBeta from "./contents/buildnotice/NoticeBeta";

export default function BuildDetail() {


  const showBuildDetail = useBuildDetailDashBoardStateUpdate();

  const buildCode = useBuildUpdate()

  const isCursorInside = useRef(false);

  const onEnter = () => (isCursorInside.current = true);
  const onLeave = () => (isCursorInside.current = false);

  const store = useStore();
  const dispatch = useDispatch();

  const hideDashBoard = () => dispatch(hideBuildDetail)

  const currentItemBuild = useSelector(s => s.itembuild)
  const weaponItem = currentItemBuild.weapon
  const hasWeapon = weaponItem !== undefined

  const statAssigned = currentItemBuild.currentBuild.statAssigned
  const computedDamage = currentItemBuild.currentBuild.computedDamage
  const meleeDamages = computedDamage.melee
  const spellDamages = computedDamage.spell

  const buildBoostsMemo = useMemo(() => <BuildBoosts />, [showBuildDetail])

  return (
    <>
      {showBuildDetail ? (
        <div
          className="build-detail-wrapper"
          onClick={() => (isCursorInside.current ? null : hideDashBoard())}
        >
          <div
            className="build-detail"
            onMouseEnter={() => onEnter()}
            onMouseLeave={() => onLeave()}
          >
            <div style={{width: '100%'}} className='top-buttons'>
              <ResetButton />
              <HideButton />
            </div>
            <BuildWarn itemBuildData={currentItemBuild} statAssigned={statAssigned}/>

            <div className="detail-column-container first-container">
              {/* {buildrequirementsMemo} */}
            <BuildRequirements data={currentItemBuild} />
            <StatRemain data={currentItemBuild} statAssigned={statAssigned}/>
            <Title title={'Build Item'} />
            <BuildItemUsed data={currentItemBuild} />
            <Title title={'Build Sequence'} />
            <BuildAssignSequence itemBuildData={currentItemBuild}/>
            <BuildStats data={currentItemBuild}/>
            {buildBoostsMemo}
            <BuildMeleeInfo computedMeleeDamages={meleeDamages} itemBuildData={currentItemBuild}/>
            <BuildSpellInfo itemBuildData={currentItemBuild} computedBuildDamages={computedDamage}/>
            </div>
            <div className="detail-column-container second-container">
              <Title title={'Build Analysis'} />
              <NoticeBeta />
              <BuildAnalysis itemBuildData={currentItemBuild} computedMeleeDamage={meleeDamages} computedSpellDamage={spellDamages}/>
              <Title title={'Next Spell Costs'} />
              <NextSpellCost />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Title({title}) {
  return (
    <div className="title">{title}</div>
  )
}

function BlankSpace({value}) {
  return (
    <div style={{
      height: {value}
    }}></div>
  )
}
