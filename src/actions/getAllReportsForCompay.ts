export async function getAllReportsForCompany() {
  try {
    const companyDataString=localStorage.getItem("company")
    if (!companyDataString) {
      throw new Error("Company data not found in localStorage");
    }

    const companyData = JSON.parse(companyDataString);

    // Check if company data contains accessToken
    const accessToken = companyData.accessToken;

    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const res = await fetch(
      `${apiUrl}/api/bug-bounty-reports/reports/company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}}`,
        },
      }
    );
   console.log(res)
    if (!res.ok) {
      throw new Error("Wrong response");
    }
    const data = await res.json();
    console.log(data.data)
    return data.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}
