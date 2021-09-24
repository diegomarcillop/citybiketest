import React from 'react'
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { colors } from "../../../common/utils/colors";

export const CustomMarket = ({ freeBikes, emptySlots, latitude, longitude, color = colors.green}) => {
  
  const position = [latitude, longitude];

  const getIcon = () => {
    return L.icon({
      iconUrl: `/images/marker_${color}.png`,
      iconSize: [18, 18],
    });
  }

  return (
    <Marker position={position} icon={getIcon()} >
      <Popup>
        <span>
          Free bikes: <strong>{freeBikes}</strong> <br />
          Emply Slots: <strong>{emptySlots}</strong>
        </span>
      </Popup>
    </Marker>
  )
};

