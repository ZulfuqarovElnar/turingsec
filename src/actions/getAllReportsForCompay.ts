export async function getAllReportsForCompany() {
  try {
    const res = await fetch(
      `https://turingsec-production-de02.up.railway.app/api/bug-bounty-reports/reports/company`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("company")).accessToken
          }`,
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
