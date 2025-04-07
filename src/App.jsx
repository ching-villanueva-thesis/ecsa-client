import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import Drawer from "react-modern-drawer";

import SimulatorForm from "./components/SimulatorForm";
import Visualization from "./components/Visualization";
import MapViewComponent from "./components/MapViewComponent";
import AppContext from "./context/AppContext";

import Sop1Form from "./components/Sop1Form";
import Sop2Form from "./components/Sop2Form";
import Sop3Form from "./components/Sop3Form";

import "./App.css";
import "react-modern-drawer/dist/index.css";

function App() {
  const { simulationResult } = useContext(AppContext);
  const [showSop1Drawer, setShowSop1Drawer] = useState(false);
  const [showSop2Drawer, setShowSop2Drawer] = useState(false);
  const [showSop3Drawer, setShowSop3Drawer] = useState(false);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <main className="flex flex-col w-screen justify-between">
        <section className="w-full">
          <MapViewComponent />
        </section>

        <section className="flex p-4 gap-8 basis-1/4">
          <section>
            <h2 className="text-xl font-bold">Configure Simulator</h2>
            <SimulatorForm />

            <section className="flex gap-2 mt-4">
              <section>
                <button
                  className="p-2 border-b-4 border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 transition-all duration-200 text-xs"
                  onClick={() => setShowSop1Drawer(true)}
                >
                  SOP 1 (Sobol Sequence)
                </button>
              </section>

              <section>
                <button
                  className="p-2 border-b-4 border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 transition-all duration-200 text-xs"
                  onClick={() => setShowSop2Drawer(true)}
                >
                  SOP 2 (Levy + Gaussian Walk)
                </button>
              </section>

              <section>
                <button
                  className="p-2 border-b-4 border-sky-600 text-sky-600 hover:text-white hover:bg-sky-600 transition-all duration-200 text-xs"
                  onClick={() => setShowSop3Drawer(true)}
                >
                  SOP 3 (Cosine Annealing)
                </button>
              </section>
            </section>
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
            Ching, C.M. & Villanueva, M.A. (2025) An Enhancement Of Cuckoo
            Search Algorithm For Optimal Earthquake Evacuation Space Allocation
            In Intramuros, Manila City
          </p>
        </section>
      </main>

      <Drawer
        className="overflow-y-scroll p-4"
        style={{ width: "50%" }}
        open={showSop1Drawer}
        onClose={() => setShowSop1Drawer(false)}
        direction="right"
      >
        <Sop1Form />
      </Drawer>

      <Drawer
        className="overflow-y-scroll p-4"
        style={{ width: "50%" }}
        open={showSop2Drawer}
        onClose={() => setShowSop2Drawer(false)}
        direction="right"
      >
        <Sop2Form />
      </Drawer>

      <Drawer
        className="overflow-y-scroll p-4"
        style={{ width: "50%" }}
        open={showSop3Drawer}
        onClose={() => setShowSop3Drawer(false)}
        direction="right"
      >
        <Sop3Form />
      </Drawer>
    </>
  );
}

export default App;
