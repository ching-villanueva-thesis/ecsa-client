import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Sop1Form = () => {
  const { simulateSop1, isSop1Loading, importFiles, sop1Images } =
    useContext(AppContext);
  const [populationSize, setPopulationSize] = useState(500);

  const onChangePopulationSize = (e) => {
    const { value } = e.target;
    setPopulationSize(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!importFiles.demand || !importFiles.spaces) {
      toast.error("Please upload both demand and spaces files.");
      return;
    }
    const formData = new FormData();

    formData.append("populationSize", populationSize);
    formData.append("demandFile", importFiles.demand);
    formData.append("spacesFile", importFiles.spaces);

    simulateSop1(formData);
  };

  return (
    <section>
      <h1 className="font-bold">SOP 1 Simulation</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <h2 className="font-bold mt-4">Details</h2>
        <p className="text-xs">
          In the ECSA, Sobol Sequence is used at the initialization stage to
          generate a more uniformly distributed initial population for improved
          global search.
        </p>
        <section className="flex flex-col gap-2 p-2">
          <section>
            <label className="font-bold text-sm" htmlFor="population-size">
              Population Size
            </label>
            <input
              id="population-size"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Population Size"
              type="number"
              value={populationSize}
              onChange={onChangePopulationSize}
            />
          </section>
        </section>
        <button
          className="w-full p-2 mt-2 bg-sky-600 rounded-md text-sm text-white hover:bg-sky-700"
          type="submit"
          disabled={isSop1Loading}
        >
          {!isSop1Loading && <span>Simulate</span>}
          {isSop1Loading && <span>Simulating...</span>}
        </button>
      </form>
      {sop1Images.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Results</h2>
          <section className="flex flex-col gap-2">
            {sop1Images.map((src, index) => (
              <img key={index} src={src} alt={`SOP1 ${index + 1}`} />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default Sop1Form;
