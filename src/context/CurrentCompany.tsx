import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrentCompany {
  email?: string;
  id?: string;
  name?: string;
}

// Create the context
const CurrentCompanyContext = createContext<CurrentCompany | undefined>(
  undefined
);

// Custom hook to use the current user context
const useCurrentCompany = () => {
  const context = useContext(CurrentCompanyContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }

  return context;
};

// Context provider component
const CurrentCompanyProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the current user
  const [currentCompany, setCurrentCompany] = useState<
    CurrentCompany | undefined
  >(undefined);

  useEffect(() => {
    async function fetchUser() {
      try {
        const companyString = localStorage.getItem("company");
        if (companyString) {
          const companyy = JSON.parse(companyString);

          const res = await fetch(
            `https://turingsec-production-de02.up.railway.app/api/companies/current-user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${companyy.accessToken}`,
              },
            }
          );

          if (res.ok) {
            const updatedUser = await res.json();

            const { email, id, company_name } = updatedUser;

            setCurrentCompany({
              email,
              id,
              name: company_name,
            });
          } else {
            // Handle error if the fetch fails
            setCurrentCompany(undefined);
            console.error("Error fetching user data:", res.statusText);
          }
        }
      } catch (error) {
        setCurrentCompany(undefined);
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    fetchUser();
  }, []); // Only run the effect once on component mount

  // Value object for the context provider
  const contextValue = {
    currentCompany,
  };

  return (
    <CurrentCompanyContext.Provider value={contextValue}>
      {children}
    </CurrentCompanyContext.Provider>
  );
};

export { useCurrentCompany, CurrentCompanyProvider };
