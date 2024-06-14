export async function getAllUsers() {
  try {
    const res = await fetch(
      "https://turingsec-production-2363.up.railway.app/api/auth/allUsers",
      {
        method: "GET",
      }
    );

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