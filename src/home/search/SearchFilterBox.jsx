import './Search.scss'
import { useDispatch } from "react-redux";
import { category, rarity } from "../content/EnumParts";
import { FILTERMINLEVEL, FILTERMAXLEVEL, FILTERCATEGORY, FILTERRARITY } from "../reducer/filter";

const LEVEL = ["-", 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const CATEGORY = category
const RARITY = ['All'].concat(rarity)

export default function SearchFilterBox() {
    const dispatch = useDispatch()
    return (
        <>
            <FilterSearch/>
        </>
    )

    function FilterSearch() {

        const selectDispatch = (value, reducer) => dispatch(reducer(value))
    
        const selectContainer = (data, reducer) => {
          return (
            <select onChange={(e) => selectDispatch(e.target.value, reducer)} defaultValue={data[0]}>
            {data.map((v, i) => {
              return (
                <option value={v} key={i}>
                  {v}
                </option>
              );
            })}
          </select>
          )
        }
    
        const minLevelSelect = () => {
          return selectContainer(LEVEL, FILTERMINLEVEL)
        };
    
        const maxLevelSelect = () => {
          return selectContainer(LEVEL, FILTERMAXLEVEL)
        };
    
        const categorySelect = () => {
          return selectContainer(CATEGORY, FILTERCATEGORY)
        }
    
        const raritySelect = () => {
          return selectContainer(RARITY, FILTERRARITY)
        }
    
        return (
          <div className="filtersearchwrapper">
            <div>
              <div>minLevel</div>
              <div>{minLevelSelect()}</div>
            </div>
            <div>
              <div>maxLevel</div>
              <div>{maxLevelSelect()}</div>
            </div>
            <div>
              <div>category</div>
              <div>{categorySelect()}</div>
            </div>
            <div>
              <div>rarity</div>
              <div>{raritySelect()}</div>
            </div>
          </div>
        );
      }
}