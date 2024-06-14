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
  accessToken?: string;
  currentCompany?: any;
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
          const company = JSON.parse(companyString);

          const res = await fetch(
            `https://turingsec-production-2363.up.railway.app/api/companies/current-user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${company.accessToken}`,
              },
            }
          );
          // console.log(res)
          if (res.ok) {
            const updatedUser = await res.json();
            // console.log("Response Data:", updatedUser)

            const { email, id, company_name } = updatedUser.data;


            setCurrentCompany({
              email,
              id,
              name: company_name,
            });
          } else if (res.status === 401) {
            // Handle unauthorized error (token expired or invalid)
            console.error("Unauthorized: Token expired or invalid");
            // Potential solution: Redirect to login page or refresh token
          }
           else {
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



