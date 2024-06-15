export async function GetCompanyProgram() {
  try {
    // Retrieve company data from localStorage
    const companyDataString = localStorage.getItem("company");

    if (!companyDataString) {
      throw new Error("Company data not found in localStorage");
    }

    const companyData = JSON.parse(companyDataString);

    // Check if company data contains accessToken
    const accessToken = companyData.accessToken;

    if (!accessToken) {
      throw new Error("Access token not found in company data");
    }

    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const res = await fetch(
      `${apiUrl}/api/bug-bounty-programs`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(res);

    if (res.ok) {
      const companyProgram = await res.json();
      console.log(companyProgram);
      return companyProgram;
    } else {
      // Handle error if the fetch fails
      console.error("Error fetching company program data:", res.statusText);
    }
  } catch (error) {
    console.error("Error parsing company data from localStorage:", error);
  }
}
