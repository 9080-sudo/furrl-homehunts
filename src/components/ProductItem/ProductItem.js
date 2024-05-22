import React, { useEffect, useState } from "react";

import classes from "./ProductItem.module.css";
import ShareButton from "../ShareButton/ShareButton";

export default function ProductItem({ product, takeFullWidth }) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let { title, MRP, brand, discountPercent, price, images, id } = product;
  const { value: mrpValue } = MRP;
  const { value: priceValue } = price;
  const { name: brandName } = brand[0];
  // console.log(brandName, 'brand name')
  if (title.length > 19) {
    title = title.substring(0, 19) + "...";
  }
  const { src } = images[0];
  let widthStyle = {};
  let heightStyle = {};
  if (takeFullWidth && width <= 576) {
    widthStyle = { minWidth: "100%" };
    heightStyle = { height: "300px" };
  }
  // console.log(window.innerWidth);
  const productDetailsLink = `https://web.furrl.in/productDetail?id=${id}&ref=vibeResults_HomeHunts`
  return (
    <li className={classes["product-container"]} style={widthStyle}>
      <a
        href={productDetailsLink}
        className={classes['product-link']}
      >
        <div>
          <img
            src={src}
            alt={title}
            className={classes["image"]}
            style={heightStyle}
          />
          <div className={classes["details-container"]}>
            <h3 className={classes["brand-name"]}>{brandName}</h3>
            <p className={classes["title"]}>{title}</p>
            <div className={classes["price-container"]}>
              <span className={classes["price-value"]}>Rs. {priceValue}</span>
              <span className={classes["mrp-value"]}>Rs. {mrpValue}</span>
              <span className={classes["discount-percent"]}>
                {discountPercent}%
              </span>
            </div>
          </div>
        </div>
        <ShareButton productDetailsLink={productDetailsLink}/>
      </a>
    </li>
  );
}
