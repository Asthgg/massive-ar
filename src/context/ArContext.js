import { createContext, useContext, useState } from "react";

export const ArContext = createContext();

export const ArContextProvider = ({children}) => {

    const [rotationAngle, setRotationAngle] = useState(0);

    const value = {
      rotationAngle,
      setRotationAngle,
    };
    
      return (
        <ArContext.Provider value={value}>
          {children}
        </ArContext.Provider>
      );

}

// export default ArContextProvider;