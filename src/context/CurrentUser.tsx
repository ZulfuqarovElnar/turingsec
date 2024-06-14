  import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";

  interface UserInfo {
    username: string;
    first_name: string;
    last_name: string;
    country: string;
    website: string;
    has_background_pic: boolean;
    has_profile_pic: boolean;
    bio: string;
    linkedin: string;
    twitter: string;
    github: string;
    city: string;
    userId: number;
    hackerId: number;
  }
  
  interface CurrentUser {
    accessToken?: string;
    userInfo?: UserInfo;
    currentUser?: any; 
    isAuthenticated?: any;
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
    const [currentUser, setCurrentUser] = useState<
     CurrentUser | undefined
    >(undefined);

    useEffect(() => {
      async function fetchUser() {
        try {
          const userString = localStorage.getItem("userId");
          if (userString) {
            const userId = JSON.parse(userString);
       
            console.log("id:" + userId);
      
            const apiUrl = process.env.REACT_APP_API_BASE_URL;
            const res = await fetch(
              `${apiUrl}/api/auth/current-user`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${userId.accessToken}`,
                },
              }
            );
      
            if (res.ok) {
              const updatedUser = await res.json();
              console.log(updatedUser);
      
              setCurrentUser(updatedUser.data);
            } else {
              // Handle error if the fetch fails
              setCurrentUser(undefined);
              console.error("Error fetching user data:", res.statusText);
      
              // Save the error message to localStorage for debugging
              localStorage.setItem("fetchUserError", res.statusText);
            }
          }
        } catch (error: any) {
          setCurrentUser(undefined);
          console.error("Error parsing user data from localStorage:", error);
      
          // Save the error message to localStorage for debugging
          localStorage.setItem("fetchUserError", error.message);
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
  export type { CurrentUser };
  export { useCurrentUser, CurrentUserProvider};
