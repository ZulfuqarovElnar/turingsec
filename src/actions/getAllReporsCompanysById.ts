export async function getAllReportsCompanysById(id: string) {
  try {
      const adminToken = localStorage.getItem('adminAccessToken');
      const accessToken = adminToken || '';

      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const res = await fetch(`${apiUrl}/api/bug-bounty-reports/company/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
          },
      });

      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Request failed");
      }

      const data = await res.json();
      return data.data;
  } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred";
      throw new Error(errorMessage);
  }
}