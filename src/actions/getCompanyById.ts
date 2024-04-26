export async function getCompanyById(id: string) {
  try {
    console.log(id);
    const res = await fetch(
      `https://turingsec-production-de02.up.railway.app/api/companies/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
