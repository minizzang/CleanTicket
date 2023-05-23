"use client";

import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export function useStateContext() {
  return useContext(StateContext);
}

export default function StateProvider({ children }) {
  const categoryState = useState("musical");

  return (
    <StateContext.Provider value={categoryState}>
      {children}
    </StateContext.Provider>
  );
}
