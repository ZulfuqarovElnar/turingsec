import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrentUser {
  email?: string;
  id?: string;
  activated?: boolean;
  username?: string;
  city?: string;
  bio?: string;
}

// Create the context
const CurrentUserContext = createContext<CurrentUser | undefined>(undefined);

// Custom hook to use the current user context
const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used within a CurrentUserProvider");
  }
  return context;
};

// Context provider component
const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the current user
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userr = JSON.parse(userString);
          console.log(userr);

          const res = await fetch(
            `https://turingsec-production-de02.up.railway.app/api/auth/current-user`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${userr.accessToken}`,
              },
            }
          );

          if (res.ok) {
            const updatedUser = await res.json();
            console.log(updatedUser);

            setCurrentUser(updatedUser);
          } else {
            // Handle error if the fetch fails
            setCurrentUser(undefined);
            console.error("Error fetching user data:", res.statusText);
          }
        }
      } catch (error) {
        setCurrentUser(undefined);
        console.error("Error parsing user data from localStorage:", error);
      }
    }

    fetchUser();
  }, []); // Only run the effect once on component mount

  // Value object for the context provider
  const contextValue = {
    currentUser,
  };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { useCurrentUser, CurrentUserProvider };
