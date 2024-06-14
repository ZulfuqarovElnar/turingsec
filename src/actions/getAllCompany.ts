export async function getAllCompany() {
  try {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      throw new Error("User data not found in localStorage");
    }

    const userData = JSON.parse(userDataString);
   
    // Check if user data contains accessToken
    const accessToken = userData.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found in user data");
    }
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const res = await fetch(`${apiUrl}/api/auth/programs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });


    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Failed to fetch programs: ${errorText}`);
    }

    const data = await res.json();
    console.log("Response Data:", data);

    return data.data; // Assuming your data structure is { data: [...] }
  } catch (err: any) {
    console.error("Fetch Error:", err);
    throw new Error(err.message);
  }
}
