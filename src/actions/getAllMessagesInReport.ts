export async function getAllMessagesInReport(room: string) {
    try {
        // console.log(room)
        const userDataString = localStorage.getItem("user");
        if (!userDataString) {
            throw new Error("User data not found in localStorage");
        }

        const userData = JSON.parse(userDataString);
        const accessToken = userData.accessToken;
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
