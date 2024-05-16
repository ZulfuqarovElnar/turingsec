export async function getAllCompany() {
  try {
    // Retrieve user data from localStorage
    const userDataString = localStorage.getItem("user");
    // console.log(userDataString)
    if (!userDataString) {
      throw new Error("User data not found in localStorage");
    }

    const userData = JSON.parse(userDataString);
   
    // Check if user data contains accessToken
    const accessToken = userData.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found in user data");
    }

    const res = await fetch(
      "http://localhost:5000/api/auth/programs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res)
    if (!res.ok) {
      throw new Error("Wrong response");
    }
    const data = await res.json();
  
    return data.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
