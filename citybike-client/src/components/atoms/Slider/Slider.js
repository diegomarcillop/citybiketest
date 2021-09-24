import React from 'react';

import './Slider.css';

export const Slider = ({ itemSelected, items, setItemSelected }) => {

  return (
    <div className="slider">
      <div className="line">
        {items.map((item, index) => (
          <button
            key={index}
            className={`button-slider ${(itemSelected === index) && 'button-active__active'}`}
            onClick={() => setItemSelected(index, item)}
          />
        ))}
      </div>
      <div className="values">
        {items.map((item, index) => (
          <span key={index} className="text-value">{index === 0 ? 'Now' : `${index}m`} </span>
        ))}
      </div>
    </div>
  )
}
