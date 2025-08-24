import PropTypes from "prop-types";
import { createContext, useState, useContext } from 'react';
const SharedContext = createContext();

export function SharedProvider({ children }) {
  const [inputValue, setInputValue] = useState("");
  return (
    <SharedContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </SharedContext.Provider>
  );
}

export function useShared() {
  return useContext(SharedContext);
}

SharedProvider.propTypes = {
  children: PropTypes.any
}