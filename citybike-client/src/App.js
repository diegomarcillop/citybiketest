import React, { Component } from "react";
import socketIOClient from "socket.io-client";

import { API_URL } from './common/constants/contants';
import { MapLeaflet } from "./components/organisms/MapLeaflet/MapLeaflet";
import { HistoryBikes } from "./components/organisms/HistoryBikes/HistoryBikes";
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      zoom: 13,
      latitude: 0,
      longitude: 0,
      position: null,
      stations: [],
      stationsHistory: null,
      history: [],
      totalFreeBikes: 0,
      totalEmptySlots: 0,
    };
  }
  componentDidMount() {
    const socket = socketIOClient(API_URL);
    socket.on("decobike/city", ({ data }) => {
      this.setState({
        latitude: data?.location?.latitude,
        longitude: data?.location?.longitude,
        stations: data?.stations,
      });
      if (this.state.history.length === 0) {
        const newHistory = this.state.history;
        newHistory.push(data?.stations);
        this.setState({ history: newHistory});
      }

      this.saveHistory(socket);
    });
    this.getHistory(socket);
  }

  saveHistory = (socket) => {
    socket.emit('save-history', this.state.stations);
  }

  getHistory = (socket) => {
    socket.on('get-history', (data) => {
      this.setState({ history: data});
    });
  }

  handleStationsHistory = (newStations, index) => {
    if (index === 0) {
      this.setState({ stationsHistory: null});
      return;
    } 
    this.setState({ stationsHistory: newStations });
  }

  getTotalBikes = () => {
    let freeBikes = 0;
    for (let item of (this.state.stationsHistory || this.state.stations)) {
      freeBikes = freeBikes  + item.free_bikes;
    }
    return freeBikes;
  }

  getEmplySlots = () => {
    let emptySlots = 0
    for (let item of (this.state.stationsHistory || this.state.stations)) {
      emptySlots = emptySlots + item.empty_slots;
    }
    return emptySlots;
  }

  render() {
    const position = [this.state.latitude, this.state.longitude];
    return (
      <div className="map">
        <div className="header">
          <h1 className="title"> City Bikes in Miami </h1>
        </div>
        <div className="content">
          {(this.state.latitude && this.state.longitude) && (
            <MapLeaflet
              position={position}
              zoom={this.state.zoom}
              data={this.state.stationsHistory || this.state.stations}
            />
          )}
          <div className="section-bottom">
            <HistoryBikes
              history={this.state.history}
              updateItemHistory={this.handleStationsHistory}
            />
            <div className="container-total">
              <span><strong>Free Bikes</strong>: {this.getTotalBikes()}</span>
              <span><strong>Empty Slots</strong>: {this.getEmplySlots()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
