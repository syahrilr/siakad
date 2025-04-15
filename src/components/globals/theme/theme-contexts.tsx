"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

interface ColorSchemeContextProps {
  colorScheme: string;
  setColorScheme: (colorScheme: string) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextProps>({
  colorScheme: "blue",
  setColorScheme: () => {},
});

export const ColorSchemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colorScheme, setColorScheme] = useState("blue");

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => useContext(ColorSchemeContext);
