import "./App.css";

import SimulatorForm from "./components/SimulatorForm";
import Visualization from "./components/Visualization";
import Metrics from "./components/Metrics";
import MapViewComponent from "./components/MapViewComponent";
import { useContext } from "react";
import AppContext from "./context/AppContext";

function App() {
  const { simulationResult } = useContext(AppContext);
  return (
    <main className="flex flex-col w-screen justify-between">
      <section className="w-full">
        <MapViewComponent />
      </section>

      <section className="flex p-4 gap-8 basis-1/4">
        <section>
          <h2 className="text-xl font-bold">Configure Simulator</h2>
          <SimulatorForm />
        </section>

        <section>
          <h2 className="text-xl font-bold">Simulation Results</h2>
          {simulationResult && <Visualization />}
          {!simulationResult && (
            <p className="text-sm">Nothing to see here yet.</p>
          )}
        </section>
      </section>

      <section className="mt-4">
        <p className="text-xs text-center">
          Ching, C.M. & Villanueva, M.A. (2025) An Enhancement Of Cuckoo Search
          Algorithm For Optimal Earthquake Evacuation Space Allocation In
          Intramuros, Manila City
        </p>
      </section>
    </main>
  );
}

export default App;
