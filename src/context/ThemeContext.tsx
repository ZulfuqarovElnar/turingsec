import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const initialThemeContext: ThemeContextProps = {
  darkMode: false,
  toggleDarkMode: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(initialThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  const element = document.getElementsByTagName("html")[0];
  useEffect(() => {
    element.classList.toggle("dark", darkMode);
  }, [darkMode, element]);

  const contextValue: ThemeContextProps = {
    darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
const useTheme = () => useContext(ThemeContext);

export { ThemeContext, ThemeProvider, useTheme };
