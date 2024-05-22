import React from "react";

import { IoShareOutline } from "react-icons/io5";
import classes from './ShareButton.module.css'

export default function ShareButton({productDetailsLink}) {
    const openShareScreen = async () => {
        try {
            if (navigator.share) {
              await navigator.share({
                title: 'Product Details',
                text: productDetailsLink,
                url: window.location.href
              });
            } else {
              alert('Web Share API is not supported in this browser.');
            }
          } catch (error) {
            console.error('Error sharing:', error);
          }
    }
  return (
    <div className={classes['share-btn-container']}>
      <IoShareOutline onClick={() => openShareScreen()} className={classes['share-position']}/>
    </div>
  );
}
