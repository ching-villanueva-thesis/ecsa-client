import "./App.css";

import SimulatorForm from "./components/SimulatorForm";
import Visualization from "./components/Visualization";
import Evaluation from "./components/Evaluation";

function App() {
  return (
    <main className="flex flex-row w-screen">
      <section className="flex flex-col justify-between p-4 basis-1/4 shadow-md">
        <section className="flex flex-col gap-4">
          <section>
            <h2 className="text-xl font-bold">Configure Simulator</h2>
            <SimulatorForm />
          </section>

          <div className="w-full border-b-[1px]"></div>

          <section>
            <h2 className="text-xl font-bold">Evaluation</h2>
            <Evaluation />
          </section>
        </section>
        <section>
          <p className="text-xs text-center">
            Ching, C.M. & Villanueva, M.A. (2024) An Enhancement Of Cuckoo
            Search Algorithm For Optimal Earthquake Evacuation Space Allocation
            In Intramuros, Manila City
          </p>
        </section>
      </section>

      <Visualization />
    </main>
  );
}

export default App;
