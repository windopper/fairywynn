import './Search.scss'
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from "react-redux";
import { category, rarity, stats } from "../content/EnumParts";
import { FILTERMINLEVEL, FILTERMAXLEVEL, FILTERCATEGORY, FILTERRARITY, FILTER1STATS, FILTER2STATS, FILTER3STATS, FILTER4STATS } from "../reducer/filter";
import { FilterableValue } from '../../data/FilterableValue';

const LEVEL = ["-", 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const CATEGORY = category
const RARITY = ['All'].concat(rarity)
const STATS = ['All'].concat(FilterableValue)

export default function SearchFilterBox() {
    const dispatch = useDispatch()
    return (
        <>
            <FilterSearch/>
        </>
    )

    function FilterSearch() {

        const selectDispatch = (value, reducer) => dispatch(reducer(value))

        const selectDispatchWithSort = (value, sort, reducer) => dispatch(reducer(value, sort))
    
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

        function SelectSortContainer(data, reducer) {
          const [state, updateSort] = useState('ascend')
          const ref = useRef()

          const updateAscend = () => {
            if(ref.current.value === 'All') return;
            updateSort('ascend')
          }

          const updateDescend = () => {
            if(ref.current.value === 'All') return;
            updateSort('descend')
          }

          useEffect(() => {
            selectDispatchWithSort(ref.current.value, state, reducer)
          }, [state])

          return (
            <>
            <div className='selectsort-wrapper'>
              <div className='selectsort-triangle' onClick={() => updateAscend()} style={{
                color: `${state === 'ascend' ? 'white' : 'gray'}`
              }}>▲</div>
              <div className='selectsort-triangle' onClick={() => updateDescend()} style={{
                color: `${state === 'descend' ? 'white' : 'gray'}`
              }}>▼</div>
            </div>
            <select onChange={(e) => selectDispatchWithSort(e.target.value, state, reducer) } ref={ref} defaultValue={data[0]}>
            {data.map((v, i) => {
              return (
                <option value={v} key={i}>
                  {v}
                </option>
              );
            })}
            </select>
            </>
          )
        }
    
        const minLevelSelect = () => {
          return selectContainer(LEVEL, FILTERMINLEVEL)
        };
    
        const maxLevelSelect = () => {
          return selectContainer(LEVEL, FILTERMAXLEVEL)
        };

        const filter1StatsSelect = () => {
          return SelectSortContainer(STATS, FILTER1STATS)
        }
        const filter2StatsSelect = () => {
          return SelectSortContainer(STATS, FILTER2STATS)
        }
        const filter3StatsSelect = () => {
          return SelectSortContainer(STATS, FILTER3STATS)
        }
        const filter4StatsSelect = () => {
          return SelectSortContainer(STATS, FILTER4STATS)
        }

    
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
            <div>
              <div>Filter1</div>
              {filter1StatsSelect()}
            </div>
            <div>
              <div>Filter2</div>
              {filter2StatsSelect()}
            </div>
            <div>
              <div>Filter3</div>
              {filter3StatsSelect()}
            </div>
            <div>
              <div>Filter4</div>
              {filter4StatsSelect()}
            </div>
            
          </div>
        );
      }
}