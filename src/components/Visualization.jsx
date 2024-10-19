import MapViewComponent from "./MapViewComponent";

const Visualization = () => {
  return (
    <section className="flex flex-col w-full h-screen">
      <MapViewComponent />

      <section className="p-4">
        <h2 className="font-bold text-xl">Simulation Result</h2>
        {/* Visualize results here */}
        <section>
          <p className="text-sm">Nothing to see here yet.</p>
        </section>
      </section>
    </section>
  );
};

export default Visualization;
