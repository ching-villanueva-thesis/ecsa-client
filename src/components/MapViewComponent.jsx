import { useContext, useEffect, useRef, useState } from "react";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";

import AppContext from "../context/AppContext";
import makeBlobUrl from "../util/blob";

const MapViewComponent = () => {
  const { demandGeoJson, spacesGeoJson } = useContext(AppContext);

  const [mapView, setMapView] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef?.current) return;

    const layers = [];

    if (demandGeoJson) {
      layers.push(
        new GeoJSONLayer({
          url: makeBlobUrl(demandGeoJson),
        })
      );
    }

    if (spacesGeoJson) {
      layers.push(
        new GeoJSONLayer({
          url: makeBlobUrl(spacesGeoJson),
        })
      );
    }

    const map = new Map({
      basemap: "osm",
      layers: layers,
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      zoom: 16,
      center: [120.9747, 14.5896],
    });

    setMapView(view);
  }, [demandGeoJson, spacesGeoJson]);

  return <div className="w-full h-[60dvh] shadow-md" ref={mapRef}></div>;
};

export default MapViewComponent;
