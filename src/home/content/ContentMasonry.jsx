import Items from "./Item";
import Masonry from "react-masonry-css";
import { useState } from "react";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

export default function ContentMasonry({filteredData}) {

    return (
        <Masonry
        className="container"
        breakpointCols={breakpointColumnsObj}
        columnClassName="column"
      >
        {filteredData.length != 0 && filteredData != undefined
        ? Items(filteredData)
        : filteredData}
      </Masonry>
    )
}