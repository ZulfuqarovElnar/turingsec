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


    const res = await fetch(
      `http://localhost:5000/api/bug-bounty-reports/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res);
    if (!res.ok) {
      throw new Error("Wrong response");
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
