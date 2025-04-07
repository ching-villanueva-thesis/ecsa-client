import { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "react-modern-drawer";

import { makeBlobImageUrl } from "../util/blob";

import "react-modern-drawer/dist/index.css";

const Metrics = ({ simulationResult }) => {
  const { metrics, convergenceCurve } = simulationResult;
  const { dcs, decsa } = metrics;

  const [showConvergenceDrawer, setShowConvergenceDrawer] = useState(false);

  return (
    <section>
      <h3 className="font-bold text-l mb-2">Key Metrics</h3>

      <section className="flex gap-4">
        <section className="flex flex-col gap-2">
          <h4 className="font-bold text-sm">DCS</h4>
          <p className="text-sm">
            <p className="font-bold">Allocations Found: </p>
            {dcs.allocations}
          </p>
          <p className="text-sm">
            <p className="font-bold">Fitness Value of Result: </p>
            {dcs.resultFitness}
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h4 className="font-bold text-sm">DECSA</h4>
          <p className="text-sm">
            <p className="font-bold">Allocations Found: </p>
            {decsa.allocations}
          </p>
          <p className="text-sm">
            <p className="font-bold">Fitness Value of Result: </p>
            {decsa.resultFitness}
          </p>
        </section>
      </section>

      <section className="flex items-center gap-6 mt-6">
        <p className="text-sm">
          <p className="font-bold">Execution Time: </p>
          {dcs.executionTime}s
        </p>

        <button
          className="p-2 border-2 border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 transition-all duration-200 text-xs"
          onClick={() => setShowConvergenceDrawer(true)}
        >
          Show Convergence
        </button>
      </section>

      <Drawer
        open={showConvergenceDrawer}
        className="overflow-y-scroll p-4"
        style={{ width: "50%" }}
        onClose={() => setShowConvergenceDrawer(false)}
        direction="right"
      >
        <h2 className="font-bold mt-4">Convergence Graph</h2>
        <img
          className="mt-4"
          src={makeBlobImageUrl(convergenceCurve)}
          alt="Optimal Allocation of Evacuation Areas"
        />
      </Drawer>
    </section>
  );
};

Metrics.propTypes = {
  simulationResult: PropTypes.shape({
    metrics: PropTypes.shape({
      dcs: {
        executionTime: PropTypes.number.isRequired,
        allocations: PropTypes.number.isRequired,
        resultFitness: PropTypes.number.isRequired,
      },
      decsa: {
        executionTime: PropTypes.number.isRequired,
        allocations: PropTypes.number.isRequired,
        resultFitness: PropTypes.number.isRequired,
      },
    }).isRequired,
  }).isRequired,
};

export default Metrics;
