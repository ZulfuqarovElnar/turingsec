export async function getReportById(id: string) {
    try {
        const userDataString = localStorage.getItem("user");
        const adminToken = localStorage.getItem("adminAccessToken"); 
        const companyDataString = localStorage.getItem("company");

        let accessToken = "";
        if (adminToken) {
            accessToken = adminToken;
            console.log("admin")
            
        } else if (userDataString) {
            const userData = JSON.parse(userDataString);
            accessToken = userData.accessToken;
            console.log("user")
        } else if (companyDataString) {
            const userData = JSON.parse(companyDataString);
            accessToken = userData.accessToken;
            console.log("company")
        } else {
            throw new Error("LocalStoragedə keçərli admin və ya user tapılmadı");
        }

        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(`${apiUrl}/api/bug-bounty-reports/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Sorğu səhv oldu");
        }

        const data = await res.json();
        return data.data;
    } catch (err: any) {
        console.error(err);
        throw new Error(err.message || "An unexpected error occurred");
    }
}
