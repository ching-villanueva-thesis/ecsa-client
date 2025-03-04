import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import { postSimulate } from "../queries/simulate";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [demandGeoJson, setDemandGeoJson] = useState(null);
  const [spacesGeoJson, setSpacesGeoJson] = useState(null);
  const [importFiles, setImportFiles] = useState({
    demand: null,
    spaces: null,
  });
  const [simulationResult, setSimulationResult] = useState(null);

  const { mutate: simulate, isPending: isLoading } = useMutation({
    mutationFn: postSimulate,
    onSuccess: (data) => {
      console.log(data);
      setSimulationResult(data);
    },
  });

  return (
    <AppContext.Provider
      value={{
        demandGeoJson,
        setDemandGeoJson,

        spacesGeoJson,
        setSpacesGeoJson,

        importFiles,
        setImportFiles,

        simulate,
        isLoading,

        simulationResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
