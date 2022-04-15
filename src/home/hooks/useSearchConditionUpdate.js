import { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";

export default function useSearchConditionUpdate(api) {
  const store = useStore();
  const [update, setUpdate] = useState(false);
  const filterref = useRef(JSON.stringify(store.getState().filter));
  const searchref = useRef(JSON.stringify(store.getState().search));

  const reRender = () => setUpdate((u) => !u);

  const listener = () => {
    let shouldUpdate = false;
    if (filterref.current !== JSON.stringify(store.getState().filter)) {
      filterref.current = JSON.stringify(store.getState().filter);
      shouldUpdate = true;
    }
    if (searchref.current !== JSON.stringify(store.getState().search)) {
      searchref.current = JSON.stringify(store.getState().search);
      shouldUpdate = true;
    }
    if (shouldUpdate) {
      reRender();
    }
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(listener);
    return () => {
      unsubscribe();
    };
  }, []);

  const filter = JSON.parse(filterref.current);
  const search = JSON.parse(searchref.current);
  const fd = filterData(api, search, filter);
  const filteredData = fd === undefined ? [] : fd;

  return [filteredData, search, filter];
}

const filterData = (api, search, filter) => {
  const data = api;

  if (data.items) {
    const s = search;
    const f = filter;

    let fd = data.items.filter((v) =>
      v.name.toLowerCase().includes(s.currentSearch)
    );
    fd = fd.filter((v, i) => v.level <= f.maxLevel && v.level >= f.minLevel);
    if (f.Rarity !== "All") fd = fd.filter((v, i) => v.tier == f.Rarity);
    if (f.Category !== "all") {
      fd = fd.filter((v, i) => {
        if (v.type !== undefined) {
          if (v.type.toLowerCase() == f.Category) return true;
        } else if (v.accessoryType !== undefined) {
          if (v.accessoryType.toLowerCase() == f.Category) return true;
        }
        return false;
      });
    }

    if (f.Filter4.type !== "All") {
      const filterType = f.Filter4.type;
      if (f.Filter1.sort === "ascend") {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((a, b) => a[filterType] - b[filterType]);
      } else {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((b, a) => a[filterType] - b[filterType]);
      }
    }
    if (f.Filter3.type !== "All") {
      const filterType = f.Filter3.type;
      if (f.Filter1.sort === "ascend") {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((a, b) => a[filterType] - b[filterType]);
      } else {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((b, a) => a[filterType] - b[filterType]);
      }
    }
    if (f.Filter2.type !== "All") {
      const filterType = f.Filter2.type;
      if (f.Filter1.sort === "ascend") {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((a, b) => a[filterType] - b[filterType]);
      } else {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((b, a) => a[filterType] - b[filterType]);
      }
    }
    if (f.Filter1.type !== "All") {
      const filterType = f.Filter1.type;
      if (f.Filter1.sort === "ascend") {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((a, b) => a[filterType] - b[filterType]);
      } else {
        fd = fd
          .filter((v, i) => v[filterType])
          .sort((b, a) => a[filterType] - b[filterType]);
      }
    }

    fd = fd.filter((v, i) => i < 500);

    return fd;
  }
};
