import React, { useState } from 'react';

import { Slider } from '../../atoms/Slider/Slider';
import './HistoryBikes.css';


export const HistoryBikes = ({ history, updateItemHistory }) => {

  const [itemSelected, setItemSelected] = useState(0)

  const handleItemSelected = (index, item) => {
    setItemSelected(index);
    updateItemHistory(item, index);
  };

  return (
    <div className="history-bikes">
      <h1 className="title">History</h1>
      <Slider
        items={history}
        itemSelected={itemSelected}
        setItemSelected={handleItemSelected}
      />
    </div>
  )
}
