export async function getAllMessagesInReport(room: string) {
    try {
        const userDataString = localStorage.getItem("user");
        
        const companyDataString = localStorage.getItem("company");

        let accessToken = "";
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            accessToken = userData.accessToken;
            console.log("userrrrrrrrrrrrrr")
        } else if (companyDataString) {
            const userData = JSON.parse(companyDataString);
            accessToken = userData.accessToken;
            console.log("companyyyyyyyyyyyyyyy")
        } else {
            throw new Error("LocalStoragedə keçərli admin və ya user tapılmadı");
        }
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(`${apiUrl}/api/messagesInReport?room=${room}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Request failed');
        }

        const data = await res.json();
        return data.data;
    } catch (err: any) {
        console.error(err);
        throw new Error(err.message || "An unexpected error occurred");
    }
}
