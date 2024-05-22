import React from "react";

import classes from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={classes['nav-container']}>
      <div className={classes['m-auto']}>
        <img
          src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg"
          alt="Furrl"
        />
      </div>
      <div>
        <a href="https://furrl.in/wishlist" className={classes['mlr']}>
          <img
            src="https://web.furrl.in/_next/static/media/Whislist.2ac94d87.svg"
            alt="wishlist"
          />
        </a>
        <a href="https://furrl.in/cart" className={classes['mlr']}>
          <img
            src="https://web.furrl.in/_next/static/media/Bag.b94fa005.svg"
            alt="cart"
          />
        </a>
      </div>
    </nav>
  );
}
