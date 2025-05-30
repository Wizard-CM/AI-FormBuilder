"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type contextType = {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
};

const contextInitialValue = {
  isCollapsed: false,
  setIsCollapsed: () => {},
};

const context = createContext<contextType>(contextInitialValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <context.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(context);
};
