export async function getAllUsers() {
  try {
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const res = await fetch(
      `${apiUrl}/api/auth/allUsers`,
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