import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import { Oval } from "react-loader-spinner";
import classes from "./ProductList.module.css";
import FilterProducts from "../FilterProducts/FilterProducts";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState([]);

  const page = useRef(1);
  const totalProducts = useRef(0);
  const isFetching = useRef(false);
  const totalPages = useRef(300)
  const prevFilters = useRef([])

  const fetchData = useCallback(async () => {
    // console.log(page.current, totalPages.current, totalPages.current < page.current, 'check')
    if (isFetching.current === false && totalPages.current > page.current) {
      isFetching.current = true;
      // console.log('fetching', filters, 'asdf')
      if(filters.length > 0 && prevFilters.current.length > 0){
        if(filters[0].id !== prevFilters.current[0].id){
          page.current = 1 
          totalPages.current = 300
          prevFilters.current = filters
        }
      }else if(filters.length === 0 && prevFilters.current.length === 0){

      }else{
        page.current = 1 
        totalPages.current = 300
        prevFilters.current = filters
      }
      setIsLoading(true);
      const url = "https://api.furrl.in/api/v2/listing/getListingProducts";
      const data = {
        input: {
          page: page.current,
          pageSize: 10,
          filters: filters,
          id: "#HomeHunts",
          entity: "vibe",
        },
      };
      let newProducts = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      newProducts = await newProducts.json();
      // console.log(newProducts)
      totalProducts.current = newProducts.data.getListingProducts.totalProducts;
      totalPages.current = newProducts.data.getListingProducts.totalPages;
      // console.log(totalPages.current, 'total pages')
      newProducts = newProducts.data.getListingProducts.products;
      // console.log(newProducts)
      if (page.current !== 1) {
        setProducts((prevProducts) => {
          return [...prevProducts, ...newProducts];
        });
      }else{
        setProducts(newProducts)
      }

      setIsLoading((prev) => {
        isFetching.current = false;
        return !prev;
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    page.current = 1;
    totalPages.current = 300;
    // console.log(filters)
    fetchData();
  }, [filters, fetchData]);

  useEffect(() => {
    const handleScroll = () => {
      
      if (
        !(
          window.innerHeight +
            Math.floor(document.documentElement.scrollTop) +
            100 >=
          document.documentElement.offsetHeight
        ) ||
        isLoading
      ) {
        return;
      }
      page.current += 1;
      fetchData();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, fetchData]);

  let idx = 2;
  return (
    <>
      <div className={classes["filter-products-container"]}>
        <div className={classes["total-products-container"]}>
          <span className={classes["shop-products"]}>Shop Products</span>{" "}
          <div className={classes["dot"]}></div>
          <span className={classes["total-products"]}>
            {totalProducts.current}
          </span>
        </div>
        <FilterProducts specificFilters={filters} onSetFilters={setFilters} />
      </div>
      <ul className={classes["list-of-products"]}>
        {products.map((product, index) => {
          if (idx === index) {
            idx += 5;
          }
          return (
            <ProductItem
              key={product.id}
              product={product}
              takeFullWidth={idx - 5 === index}
            />
          );
        })}
      </ul>
      {isLoading && (
        <div className={classes["center"]}>
          <Oval
            visible={true}
            height="30"
            width="30"
            color="#2f77eb"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
}
