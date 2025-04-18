import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { MutatingDots } from "react-loader-spinner";
import Metrics from "./Metrics";
import makeBlobUrl, { makeBlobImageUrl } from "../util/blob";

const Visualization = () => {
  const { simulationResult, isLoading } = useContext(AppContext);
  const [lineChartData, setLineChartData] = useState(null);
  const [interval, setInterval] = useState(0);

  // useEffect(() => {
  //   if (simulationResult) {

  //   }
  // }, [simulationResult]);

  return (
    <section className="flex flex-col">
      <section className="flex">
        {/* <section className="flex flex-col w-full mt-2">
          {!isLoading && (
            <h3 className="font-bold text-l mb-2">Convergence Graph</h3>
          )}

          {!isLoading && lineChartData && (
            <LineChart width={600} height={250} data={lineChartData}>
              <XAxis
                label={{
                  value: "Iterations",
                  position: "insideBottom",
                  offset: -5,
                }}
                dataKey="iteration"
                interval={Math.floor(interval)}
              />
              <YAxis
                scale="log"
                domain={[
                  Math.min(...simulationResult.metrics.convergence),
                  "auto",
                ]}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="fmin"
                stroke="rgb(2 132 199)"
                dot={{ r: 2 }}
              />
            </LineChart>
          )}
        </section> */}
        {simulationResult && <Metrics simulationResult={simulationResult} />}
      </section>
    </section>
  );
};

export default Visualization;
