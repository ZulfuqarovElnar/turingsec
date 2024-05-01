export async function getReportById(id: string) {
    try {
        const userDataString = localStorage.getItem("user")
        if (!userDataString) {
            throw new Error("Company user not found in localStorage");
        }

        const userData = JSON.parse(userDataString);

        // Check if user data contains accessToken
        const accessToken = userData.accessToken;
        
        const res = await fetch(
            `http://localhost:5000/api/bug-bounty-reports/${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
           
        );

    
        if (!res.ok) {
            throw new Error("Wrong response");
        }

        const data = await res.json();
        // console.log(data.data)
        return data.data;
    } catch (err: any) {
        console.log(err);
        throw new Error(err.message);
    }
}
