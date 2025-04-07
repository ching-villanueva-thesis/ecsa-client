import { useContext, useEffect, useRef, useState } from "react";

import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer.js";
import Polyline from "@arcgis/core/geometry/Polyline.js";

import AppContext from "../context/AppContext";
import makeBlobUrl from "../util/blob";
import { MutatingDots } from "react-loader-spinner";

const MapViewComponent = () => {
  const { demandGeoJson, spacesGeoJson, isLoading, simulationResult } =
    useContext(AppContext);

  const [mapView, setMapView] = useState(null);
  const mapRef = useRef(null);
  const graphicsLayerRef = useRef(null);

  const [showDCS, setShowDCS] = useState(true);
  const [showDECSA, setShowDECSA] = useState(true);

  useEffect(() => {
    if (!mapRef?.current) return;

    const layers = [];

    const graphicsLayer = new GraphicsLayer();
    graphicsLayerRef.current = graphicsLayer;
    layers.push(graphicsLayer);

    if (demandGeoJson) {
      layers.push(
        new GeoJSONLayer({
          url: makeBlobUrl(demandGeoJson),
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-marker",
              color: "red",
              size: 4,
            },
          },
          popupTemplate: {
            title: "{id}",
          },
        })
      );
    }

    if (spacesGeoJson) {
      layers.push(
        new GeoJSONLayer({
          url: makeBlobUrl(spacesGeoJson),
          renderer: {
            type: "simple",
            symbol: {
              type: "simple-marker",
              color: "green",
              size: 8,
            },
          },
          popupTemplate: {
            title: "{id}",
          },
        })
      );
    }

    const map = new Map({
      basemap: "dark-gray-3d",
      layers: layers,
    });

    const view = new MapView({
      container: mapRef.current,
      map: map,
      zoom: 15,
      center: [120.9747, 14.5896],
    });

    setMapView(view);
  }, [demandGeoJson, spacesGeoJson, simulationResult]);

  useEffect(() => {
    if (simulationResult) {
      const graphicsLayer = graphicsLayerRef.current;
      if (!graphicsLayer || !simulationResult) return;

      graphicsLayer.removeAll();

      const { dcsResult, decsaResult } = simulationResult ?? {};

      if (showDCS && dcsResult) {
        const dcsPolylineGraphics = dcsResult
          .map((coordinates) => new Polyline({ paths: coordinates }))
          .map(
            (polyline) =>
              new Graphic({
                geometry: polyline,
                symbol: {
                  type: "simple-line",
                  color: [0, 0, 255],
                  width: 1,
                },
              })
          );
        graphicsLayer.addMany(dcsPolylineGraphics);
      }

      if (showDECSA && decsaResult) {
        const decsaPolylineGraphics = decsaResult
          .map((coordinates) => new Polyline({ paths: coordinates }))
          .map(
            (polyline) =>
              new Graphic({
                geometry: polyline,
                symbol: {
                  type: "simple-line",
                  color: [226, 119, 40],
                  width: 1,
                },
              })
          );
        graphicsLayer.addMany(decsaPolylineGraphics);
      }
    }
  }, [simulationResult, showDCS, showDECSA]);

  return (
    <section className="relative">
      <div className="w-full h-[60dvh] shadow-md" ref={mapRef}></div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="rgb(2 132 199)"
            secondaryColor="rgb(2 132 199)"
            radius="8"
            ariaLabel="mutating-dots-loading"
          />
        </div>
      )}

      <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg p-4 z-10 space-y-3 border border-gray-200">
        <h4 className="text-base font-semibold text-gray-700">
          Show Allocations
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="dcs-toggle"
            checked={showDCS || !simulationResult}
            onChange={() => setShowDCS((prev) => !prev)}
            disabled={isLoading}
            className="accent-blue-600"
          />
          <label htmlFor="dcs-toggle" className="text-sm text-blue-700">
            DCS
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="decsa-toggle"
            checked={showDECSA || !simulationResult}
            onChange={() => setShowDECSA((prev) => !prev)}
            disabled={isLoading}
            className="accent-orange-600"
          />
          <label htmlFor="decsa-toggle" className="text-sm text-orange-700">
            DECSA
          </label>
        </div>
      </div>
    </section>
  );
};

export default MapViewComponent;
