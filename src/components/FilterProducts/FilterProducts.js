import React, { useEffect, useRef, useState } from "react";
import classes from "./FilterProducts.module.css";

export default function FilterProducts({ specificFilters, onSetFilters }) {
  const [filters, setFilters] = useState([{ name: "All" }]);
  const isFetching = useRef(false);
  useEffect(() => {
    const getFilters = async () => {
      if (isFetching.current === false) {
        isFetching.current = true;
        const url = "https://api.furrl.in/api/v2/listing/getListingFilters";
        const data = { id: "#HomeHunts", entity: "vibe" };
        let tempFilters = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        tempFilters = await tempFilters.json();
        tempFilters = tempFilters.data.getListingFilters.easyFilters.map(
          (filter) => ({
            id: filter.uniqueId,
            name: filter.name,
            type: filter.contentType,
          })
        );
        setFilters((prev) => {
          isFetching.current = false;
          return [...prev, ...tempFilters];
        });
      }
    };
    getFilters();
  }, []);
  return (
    <ul className={classes["filters-list"] }>
      {filters.length > 1 && filters.map((filter, idx) => (
        <li
          className={`${classes["filter"]} ${specificFilters.length > 0 ? specificFilters[0].id === filter.id ? classes['active-filter']: '' : filter.name === 'All'? classes['active-filter']: ''}`}
          onClick={() => {
            if (filter.type) {
              onSetFilters([{
                id: filter.id, 
                type: filter.type
              }]);
            }else{
                onSetFilters([])
            }
          }}
          key = {idx}
        >
          {filter.name}
        </li>
      ))}
    </ul>
  );
}
