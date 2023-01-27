import * as React from "react";
import {
  Map,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Marker,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getLocations } from "./service/api";

import g from "./Spot_Green.png";
import r from "./Spot_Red.png";
import y from "./Spot_Yellow.png";
import ControlPanel from "./ControlPanel";

function App() {
  const [locations, setLocations] = React.useState([]);
  const [API_KEY] = React.useState("eYboNuK8ZtXZYc42zMuK");

  const [mode, setMode] = React.useState("dark");

  // const INITIAL_VIEW_STATE = {
  //   latitude: 25.31972535,
  //   longitude: 51.52509915,
  //   zoom: 20,
  //   pitch: 0,
  //   bearing: 0,
  // };

  React.useEffect(() => {
    getLocations().then((res) => {
      if (res && res.length > 0) {
        setLocations(
          powLocations(res)
            .map((r) => ({
              ...r,
              latitude:
                Number(r.latitude) - Math.random(0.000000000000000000004),
              longitude:
                Number(r.longitude) - Math.random(0.0000000000000000054),
            }))
            .concat([
              ...res.map((r) => ({
                ...r,
                status_location: 0,
              })),
            ])
        );
      }
    });
  }, []);

  const powLocations = (_locations, mul = 2) => {
    const locations = [];
    for (let i = 0; i < mul; i++) {
      locations.push(..._locations);
    }
    return locations;
  };

  React.useEffect(() => {
    console.log("Rendering " + locations.length + " Locations!");
  }, [locations]);

  const pins = React.useMemo(
    () =>
      locations.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.longitude}
          latitude={location.latitude}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
          }}
        >
          {/* <Pin /> */}
          <img
            src={
              location.status_location === 0
                ? r
                : location.status_location === 1
                ? y
                : g
            }
            alt=""
          />
        </Marker>
      )),
    [locations]
  );

  return (
    // <DeckGL
    //   controller={true}
    //   initialViewState={
    //     INITIAL_VIEW_STATE
    //   }
    // >
    <React.Fragment>
      <Map
        mapLib={maplibregl}
        initialViewState={{
          latitude: 25.31972535,
          longitude: 51.52509915,
          zoom: 13,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={`https://api.maptiler.com/maps/streets-v2-${mode}/style.json?key=${API_KEY}`}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />

        {pins}
      </Map>
      <ControlPanel
        mode={mode}
        onToggle={() => setMode(mode === "dark" ? "light" : "dark")}
      />
    </React.Fragment>
  );
}

export default App;
