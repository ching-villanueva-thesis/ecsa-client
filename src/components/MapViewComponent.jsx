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

  useEffect(() => {
    if (!mapRef?.current) return;

    const layers = [];

    // TODO: Create a util function for this
    // const graphicsLayer = new GraphicsLayer();
    // const polyline = new Polyline({
    //   paths: [
    //     [120.972179364066918, 14.592769365015331],
    //     [120.972904589586477, 14.592777563969046],
    //   ],
    // });
    // const polylineGraphic = new Graphic({
    //   geometry: polyline,
    //   symbol: {
    //     type: "simple-line",
    //     color: [226, 119, 40],
    //     width: 3,
    //   },
    // });
    // graphicsLayer.add(polylineGraphic);
    // layers.push(graphicsLayer);

    if (simulationResult) {
      const { result } = simulationResult ?? {};

      const graphicsLayer = new GraphicsLayer();

      const polylineGraphics = result
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

      graphicsLayer.addMany(polylineGraphics);
      layers.push(graphicsLayer);
    }

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
    </section>
  );
};

export default MapViewComponent;
