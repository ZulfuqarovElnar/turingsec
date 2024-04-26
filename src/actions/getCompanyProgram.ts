export async function GetCompanyProgram() {
  try {
    console.log(JSON.parse(localStorage.getItem("company")));
    const res = await fetch(
      `https://turingsec-production-de02.up.railway.app/api/bug-bounty-programs`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("company")).accessToken
          }`,
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
      console.error("Error fetching user data:", res.statusText);
    }
  } catch (error) {
    console.error("Error parsing user data from localStorage:", error);
  }
}
