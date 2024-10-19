import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const SimulatorForm = () => {
  const { demandGeoJson, spacesGeoJson, setDemandGeoJson, setSpacesGeoJson } =
    useContext(AppContext);
  const [maxGen, setMaxGen] = useState(100);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!demandGeoJson || !spacesGeoJson) return;

    console.log({ payload: { maxGen, demandGeoJson, spacesGeoJson } });
  };

  const onUploadDemandFile = (e) => {
    if (!e?.target || !!demandGeoJson) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDemandGeoJson(reader.result);
    };

    reader.readAsText(file);
  };

  const onUploadSpacesFile = (e) => {
    if (!e?.target || !!spacesGeoJson) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSpacesGeoJson(reader.result);
    };

    reader.readAsText(file);
  };

  const onConfigureMaxGen = (e) => {
    const { value } = e.target;
    setMaxGen(Number(value));
  };

  return (
    <form onSubmit={onSubmit}>
      <h3 className="text-sm">Enhanced Cuckoo Search Algorithm</h3>
      <section className="flex flex-col gap-2 p-2">
        <section>
          <label className="font-bold text-sm" htmlFor="maxGen">
            Max Generations
          </label>
          <input
            id="maxGen"
            className="text-sm border rounded w-full p-2"
            placeholder="Enter Max Generations"
            type="number"
            value={maxGen}
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
            accept=".geojson"
            onChange={onUploadDemandFile}
          />
          {!demandGeoJson && (
            <span className="block text-xs mt-1 text-gray-400">
              Only geojson is supported
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
            accept=".geojson"
            onChange={onUploadSpacesFile}
          />
          {!spacesGeoJson && (
            <span className="block text-xs mt-1 text-gray-400">
              Only geojson is supported
            </span>
          )}
        </section>
      </section>

      <button
        className="w-full p-2 mt-2 bg-sky-600 rounded-md text-sm text-white hover:bg-sky-700"
        type="submit"
      >
        Run
      </button>
    </form>
  );
};

export default SimulatorForm;
