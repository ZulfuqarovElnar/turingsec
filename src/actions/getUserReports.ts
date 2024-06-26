export async function getUserReports() {
  try {
    // Retrieve company data from localStorage
    const userDataString = localStorage.getItem("user");

    if (!userDataString) {
      throw new Error("User data not found in localStorage");
    }

    const userData = JSON.parse(userDataString);

    // Check if company data contains accessToken
    const accessToken = userData.accessToken;
 

    if (!accessToken) {
      throw new Error("Access token not found in company data");
    }

    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const res = await fetch(
      `${apiUrl}/api/bug-bounty-reports/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
   
    if (!res.ok) {
      throw new Error("Wrong response");
    }
    const data = await res.json();
    console.log(data.data)
    return data.data;
    // console.log(data)
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
