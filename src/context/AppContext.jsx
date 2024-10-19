import { createContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [demandGeoJson, setDemandGeoJson] = useState(null);
  const [spacesGeoJson, setSpacesGeoJson] = useState(null);

  return (
    <AppContext.Provider
      value={{
        demandGeoJson,
        setDemandGeoJson,
        spacesGeoJson,
        setSpacesGeoJson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
