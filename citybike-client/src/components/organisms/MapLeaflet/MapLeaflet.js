import React from 'react';
import { MapContainer, TileLayer } from "react-leaflet";

import { colors } from '../../../common/utils/colors';
import { CustomMarket as MarkerStation } from '../../atoms/Marker/Marker';

export const MapLeaflet = ({ position, zoom, data }) => {

  const getColor = (value) => {
    if (value === 0) return colors.red;
    if (value <= 5) return  colors.orange;
    return  colors.green;
  }

  return (
    <MapContainer center={position} zoom={zoom} style={{ width: '100%', height: '100%'}}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((marker, key) => (
        <MarkerStation
          key={key}
          emptySlots={marker.empty_slots}
          freeBikes={marker.free_bikes}
          latitude={marker.latitude}
          longitude={marker.longitude}
          color={getColor(marker.free_bikes)}
        />
      ))}
    </MapContainer>
  )
}
