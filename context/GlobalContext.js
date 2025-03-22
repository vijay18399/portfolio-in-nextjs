import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
export const globalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const editParam = router.query.edit;
    setIsEditMode(editParam === "true");
  }, [router.query]);

  return (
    <globalContext.Provider 
    value={{ 
      isEditMode,
      portfolio,
      setPortfolio 
      }}>
      {children}
    </globalContext.Provider>
  );
};
