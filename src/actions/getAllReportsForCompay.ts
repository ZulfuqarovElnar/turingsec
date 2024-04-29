export async function getAllReportsForCompany() {
  try {
    const companyDataString=localStorage.getItem("company")
    if (!companyDataString) {
      throw new Error("Company data not found in localStorage");
    }

    const companyData = JSON.parse(companyDataString);

    // Check if company data contains accessToken
    const accessToken = companyData.accessToken;
    const res = await fetch(
      `https://turingsec-production-de02.up.railway.app/api/bug-bounty-reports/reports/company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}}`,
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
