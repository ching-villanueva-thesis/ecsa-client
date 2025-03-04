import PropTypes from "prop-types";

const Metrics = ({ simulationResult }) => {
  const { metrics } = simulationResult;

  return (
    <section>
      <h3 className="font-bold text-l mb-2">Key Metrics</h3>
      <section className="flex flex-col gap-2">
        <p className="px-2 text-sm">
          <p className="font-bold">Allocations Found: </p>
          {metrics.allocations}
        </p>
        <p className="px-2 text-sm">
          <p className="font-bold">Fitness Value of Result: </p>
          {metrics.resultFitness}
        </p>
        <p className="px-2 text-sm">
          <p className="font-bold">Execution Time: </p>
          {metrics.executionTime}s
        </p>
      </section>
    </section>
  );
};

Metrics.propTypes = {
  simulationResult: PropTypes.shape({
    metrics: PropTypes.shape({
      executionTime: PropTypes.number.isRequired,
      allocations: PropTypes.number.isRequired,
      resultFitness: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Metrics;
