import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Sop3Form = () => {
  const { simulateSop3, sop3Images, isSop3Loading } = useContext(AppContext);
  const [sop3Form, setSop3Form] = useState({
    iterations: 100,
    maxDiscoveryRate: 0.5,
    minDiscoveryRate: 0.25,
    maxAlphaValue: 0.05,
    minAlphaValue: 0.01,
    cycles: 4,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setSop3Form((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      !sop3Form.iterations ||
      !sop3Form.maxDiscoveryRate ||
      !sop3Form.minDiscoveryRate ||
      !sop3Form.maxAlphaValue ||
      !sop3Form.minAlphaValue
    ) {
      toast.error("Please fill all the fields.");
      return;
    }

    const formData = new FormData();
    formData.append("maxIterations", sop3Form.iterations);
    formData.append("dMax", sop3Form.maxDiscoveryRate);
    formData.append("dMin", sop3Form.minDiscoveryRate);
    formData.append("aMax", sop3Form.maxAlphaValue);
    formData.append("aMin", sop3Form.minAlphaValue);
    formData.append("cycles", sop3Form.cycles);

    simulateSop3(formData);
  };

  return (
    <section>
      <h1 className="font-bold">SOP 3 Simulation</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <h2 className="font-bold mt-4">Details</h2>
        <p className="text-xs">
          In the ECSA, Cosine Annealing with Warm Restarts is used to
          dynamically adjust the discovery rate and step size on the current
          iteration of the algorithm, taking advantage of a cosine-shaped
          schedule for effective balancing of exploration and exploitation.
        </p>
        <section className="flex flex-col gap-2 p-2">
          <section>
            <label className="font-bold text-sm" htmlFor="iterations">
              Iterations
            </label>
            <input
              id="iterations"
              name="iterations"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Iterations"
              type="number"
              value={sop3Form.iterations}
              onChange={onChange}
            />
          </section>

          <section>
            <label className="font-bold text-sm" htmlFor="cycles">
              Cycles
            </label>
            <input
              id="cycles"
              name="cycles"
              // step="4"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Cycles"
              type="number"
              value={sop3Form.cycles}
              onChange={onChange}
            />
          </section>

          <section>
            <label className="font-bold text-sm" htmlFor="maxdr">
              Max Discovery Rate
            </label>
            <input
              id="maxdr"
              name="maxDiscoveryRate"
              step="0.01"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Max Discovery Rate"
              type="number"
              value={sop3Form.maxDiscoveryRate}
              onChange={onChange}
            />
          </section>

          <section>
            <label className="font-bold text-sm" htmlFor="mindr">
              Min Discovery Rate
            </label>
            <input
              id="mindr"
              name="minDiscoveryRate"
              step="0.01"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Min Discovery Rate"
              type="number"
              value={sop3Form.minDiscoveryRate}
              onChange={onChange}
            />
          </section>

          <section>
            <label className="font-bold text-sm" htmlFor="maxav">
              Max Alpha Value
            </label>
            <input
              id="maxav"
              name="maxAlphaValue"
              step="0.01"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Max Alpha Value"
              type="number"
              value={sop3Form.maxAlphaValue}
              onChange={onChange}
            />
          </section>

          <section>
            <label className="font-bold text-sm" htmlFor="minav">
              Min Alpha Value
            </label>
            <input
              id="minav"
              name="minAlphaValue"
              step="0.01"
              className="text-sm border rounded w-full p-2"
              placeholder="Enter Min Alpha Value"
              type="number"
              value={sop3Form.minAlphaValue}
              onChange={onChange}
            />
          </section>
        </section>
        <button
          className="w-full p-2 mt-2 bg-sky-600 rounded-md text-sm text-white hover:bg-sky-700"
          type="submit"
          disabled={isSop3Loading}
        >
          {!isSop3Loading && <span>Simulate</span>}
          {isSop3Loading && <span>Simulating...</span>}
        </button>
      </form>
      {sop3Images.length > 0 && (
        <>
          <h2 className="font-bold mt-4">Results</h2>
          <section className="flex flex-wrap">
            {sop3Images.map((src, index) => (
              <img
                key={index}
                style={{ width: "50%" }}
                src={src}
                alt={`SOP3 ${index + 1}`}
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
};

export default Sop3Form;
