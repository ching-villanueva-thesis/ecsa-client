import { useMutation } from "@tanstack/react-query";
import { createContext, useState } from "react";
import {
  postSimulate,
  postSimulateSop1,
  postSimulateSop2,
  postSimulateSop3,
} from "../queries/simulate";
import { makeBlobImageUrl } from "../util/blob";
import toast from "react-hot-toast";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [demandGeoJson, setDemandGeoJson] = useState(null);
  const [spacesGeoJson, setSpacesGeoJson] = useState(null);
  const [importFiles, setImportFiles] = useState({
    demand: null,
    spaces: null,
  });
  const [simulationResult, setSimulationResult] = useState(null);
  const [sop1Images, setSop1Images] = useState([]);
  const [sop2Images, setSop2Images] = useState([]);
  const [sop3Images, setSop3Images] = useState([]);

  const { mutate: simulate, isPending: isLoading } = useMutation({
    mutationFn: postSimulate,
    onSuccess: (data) => {
      console.log(data);
      setSimulationResult(data);
    },
  });

  const { mutate: simulateSop1, isPending: isSop1Loading } = useMutation({
    mutationFn: postSimulateSop1,
    onSuccess: (data) => {
      console.log(data);

      const { dcs, decsa } = data;

      setSop1Images([makeBlobImageUrl(dcs), makeBlobImageUrl(decsa)]);

      toast.success("SOP 1 simulation completed successfully!");
    },
  });

  const { mutate: simulateSop2, isPending: isSop2Loading } = useMutation({
    mutationFn: postSimulateSop2,
    onSuccess: (data) => {
      console.log(data);
      const { dcs, decsa } = data;

      setSop2Images([makeBlobImageUrl(dcs), makeBlobImageUrl(decsa)]);

      toast.success("SOP 2 simulation completed successfully!");
    },
  });

  const { mutate: simulateSop3, isPending: isSop3Loading } = useMutation({
    mutationFn: postSimulateSop3,
    onSuccess: (data) => {
      console.log(data);
      const { dcs, decsa } = data;

      setSop3Images([...dcs, ...decsa]);
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

        simulateSop1,
        isSop1Loading,
        sop1Images,

        simulateSop2,
        isSop2Loading,
        sop2Images,

        simulateSop3,
        isSop3Loading,
        sop3Images,

        simulationResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
