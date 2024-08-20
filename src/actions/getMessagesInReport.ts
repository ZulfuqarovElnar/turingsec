export async function getMessagesInReport(reportId: string) {
    try {
        const adminToken = localStorage.getItem('adminAccessToken');
        const accessToken = adminToken || '';
  
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(`${apiUrl}/api/messagesInReport/report/${reportId}/admin`, {
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
