import { Item } from "./Item";
import Masonry from "react-masonry-css";
import { useState, useRef, useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen";

const breakpointColumnsObj = {
  default: 5,
  1300: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const options = {
  root: null, // viewport
  rootMargin: "0px",
  threshold: 0,
};

export default function ContentMasonry({ filteredData }) {

  const page = useRef(0);
  const [showableData, setShowableData] = useState([]);
  const observableRef = useRef();

  const observer = new IntersectionObserver((entries, io) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        page.current = page.current + 1
        setShowableData(filteredData.slice(0, page.current * 60 + 60));
      }
    })

  }, options);

  useEffect(() => {
    setShowableData(filteredData.slice(0, 60))
  }, [])

  useEffect(() => {
    if (observableRef.current) {
      observer.observe(observableRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [showableData]);

  window.onbeforeunload = () => {
    console.log('reload!')
    window.scrollTo(0, 0)
  } 

  // useEffect(() => {
  //   console.log(observableRef);
  // }, [page.current]);

  // return (
  //   <Masonry
  //     className="container"
  //     breakpointCols={breakpointColumnsObj}
  //     columnClassName="column"
  //   >
  //     {filteredData.length != 0 && filteredData
  //       ? filteredData.map((d, i) => {
  //         return <Item d={d} i={i} />
  //       })
  //       : filteredData}
  //   </Masonry>
  // );

  return (
    <Masonry
      className="container"
      breakpointCols={breakpointColumnsObj}
      columnClassName="column"
    >
      {showableData.map((d, i) => {
        if (showableData.length - 15 === i) {
          return <Item d={d} i={i} ref={observableRef} key={i}/>;
        } else {
          return <Item d={d} i={i} ref={null} key={i}/>;
        }
      })}
    </Masonry>
  );
}
