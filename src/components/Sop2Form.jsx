import { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import toast from "react-hot-toast";

const Sop2Form = () => {
  const { simulateSop2, isSop2Loading, sop2Images } = useContext(AppContext);
  const [steps, setSteps] = useState(100);

  const onSubmit = (e) => {
    e.preventDefault();

    if (steps <= 0) {
      toast.error("Please enter a valid number of steps.");
      return;
    }

    const formData = new FormData();
    formData.append("steps", steps);

    simulateSop2(formData);
  };

  const onChange = (e) => {
    const { value } = e.target;
    setSteps(value);
  };

  return (
    <section>
      <h1 className="font-bold">SOP 2 Simulation</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <h2 className="font-bold mt-4">Details</h2>
        <p className="text-xs">
          In the ECSA, instead of replacing Levy flight, the Gaussian Diffusion
          method is used as the controlled random walk to exploit promising
          areas that were found at the later stages of the iteration.
        </p>
        <section>
          <label className="font-bold text-sm" htmlFor="steps">
            Steps
          </label>
          <input
            id="steps"
            name="steps"
            className="text-sm border rounded w-full p-2"
            placeholder="Enter Iterations"
            type="number"
            value={steps}
            onChange={onChange}
          />
        </section>

        <button
          className="w-full p-2 mt-2 bg-sky-600 rounded-md text-sm text-white hover:bg-sky-700"
          type="submit"
          disabled={isSop2Loading}
        >
          {!isSop2Loading && <span>Simulate</span>}
          {isSop2Loading && <span>Simulating...</span>}
        </button>

        {sop2Images.length > 0 && (
          <>
            <h2 className="font-bold mt-4">Results</h2>
            <section className="flex flex-col gap-2">
              {sop2Images.map((src, index) => (
                <img key={index} src={src} alt={`SOP2 ${index + 1}`} />
              ))}
            </section>
          </>
        )}
      </form>
    </section>
  );
};

export default Sop2Form;
