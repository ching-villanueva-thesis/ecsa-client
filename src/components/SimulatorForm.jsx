import { useContext, useState } from "react";
import * as d3 from "d3";

import AppContext from "../context/AppContext";

const SimulatorForm = () => {
  const {
    demandGeoJson,
    spacesGeoJson,
    setDemandGeoJson,
    setSpacesGeoJson,
    importFiles,
    setImportFiles,
    simulate,
    isLoading,
  } = useContext(AppContext);

  const [maxIterations, setMaxIterations] = useState(500);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!demandGeoJson || !spacesGeoJson) return;

    const formData = new FormData();
    formData.append("maxIterations", maxIterations);
    formData.append("demandFile", importFiles.demand);
    formData.append("spacesFile", importFiles.spaces);

    simulate(formData);
  };

  const onUploadDemandFile = (e) => {
    if (!e?.target || !!demandGeoJson) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    const demandPoints = {
      type: "FeatureCollection",
      name: "Demand Points",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
    };

    reader.onload = (e) => {
      const content = e.target.result;
      const parsed = d3.csvParse(content);

      demandPoints["features"] = parsed.map((d, i) => ({
        type: "Feature",
        properties: { id: i + 1 },
        geometry: {
          type: "Point",
          coordinates: [d["Longitude"], d["Latitude"]],
        },
      }));

      setDemandGeoJson(JSON.stringify(demandPoints));
    };

    reader.readAsText(file);

    setImportFiles((prev) => ({ ...prev, demand: file }));
  };

  const onUploadSpacesFile = (e) => {
    if (!e?.target || !!spacesGeoJson) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    const evacuationSpaces = {
      type: "FeatureCollection",
      name: "Evacuation Spaces",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
      },
    };

    reader.onload = (e) => {
      const content = e.target.result;
      const parsed = d3.csvParse(content);

      evacuationSpaces["features"] = parsed.map((d, i) => ({
        type: "Feature",
        properties: {
          id: i + 1,
        },
        geometry: {
          type: "Point",
          coordinates: [d["Longitude"], d["Latitude"]],
        },
      }));

      setSpacesGeoJson(JSON.stringify(evacuationSpaces));
    };

    reader.readAsText(file);

    setImportFiles((prev) => ({ ...prev, spaces: file }));
  };

  const onConfigureMaxGen = (e) => {
    const { value } = e.target;
    setMaxIterations(Number(value));
  };

  return (
    <form onSubmit={onSubmit} encType="multipart/form-data">
      <h3 className="text-sm">Enhanced Cuckoo Search Algorithm</h3>
      <section className="flex flex-col gap-2 p-2">
        <section>
          <label className="font-bold text-sm" htmlFor="maxGen">
            Max Iterations
          </label>
          <input
            id="maxGen"
            className="text-sm border rounded w-full p-2"
            placeholder="Enter Max Generations"
            type="number"
            value={maxIterations}
            onChange={onConfigureMaxGen}
          />
        </section>

        <section>
          <label className="font-bold text-sm" htmlFor="importDemandGeoJson">
            Import Demand Points
          </label>
          <input
            className="w-full text-sm"
            id="importGeoJson"
            type="file"
            accept=".csv"
            onChange={onUploadDemandFile}
          />
          {!demandGeoJson && (
            <span className="block text-xs mt-1 text-gray-400">
              Only csv is supported
            </span>
          )}
        </section>

        <section>
          <label className="font-bold text-sm" htmlFor="importSpacesGeoJson">
            Import Open Spaces
          </label>
          <input
            className="w-full text-sm"
            id="importGeoJson"
            type="file"
            accept=".csv"
            onChange={onUploadSpacesFile}
          />
          {!spacesGeoJson && (
            <span className="block text-xs mt-1 text-gray-400">
              Only csv is supported
            </span>
          )}
        </section>
      </section>

      <button
        className="w-full p-2 mt-2 bg-sky-600 rounded-md text-sm text-white hover:bg-sky-700"
        type="submit"
        disabled={isLoading}
      >
        {!isLoading && <span>Simulate</span>}
        {isLoading && <span>Simulating...</span>}
      </button>
    </form>
  );
};

export default SimulatorForm;
