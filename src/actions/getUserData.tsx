export async function getUserData() {
    try {

        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            throw new Error("User data not found in localStorage");
        }

        const userData = JSON.parse(userDataString);
        const accessToken = userData.accessToken;
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(
            `${apiUrl}/api/auth/current-user`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // console.log(res);

        if (res.ok) {
            const currentUser = await res.json();
         
            return currentUser.data;

        } else {
            // Handle error if the fetch fails
            console.error("Error fetching user program data:", res.statusText);
        }
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
    }
}
