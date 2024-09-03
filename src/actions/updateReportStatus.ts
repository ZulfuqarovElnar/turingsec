// Review
import toast from "react-hot-toast";

export async function updateReportReview(reportId: number): Promise<void> {
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const companyToken = localStorage.getItem('company');
    if (!companyToken) {
        throw new Error("Company data not found in localStorage");
      }
    const companyData = JSON.parse(companyToken);
    

    // Check if company data contains accessToken
    const accessToken = companyData.accessToken;
  
    try {
      const response = await fetch(`${apiUrl}/api/bug-bounty-reports/${reportId}/company/review`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update the report status: ${response.status} - ${errorText}`);
      } else {
        toast.success("Report status updated successfully")
        console.log('Report status updated successfully');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
  
  // Accept
  export async function updateReportAccept(reportId: number): Promise<void> {
    if (typeof reportId !== 'number' || isNaN(reportId)) {
      throw new Error("Invalid reportId");
    }
  
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const companyToken = localStorage.getItem('company');
    if (!companyToken) {
      throw new Error("Company data not found in localStorage");
    }
  
    const companyData = JSON.parse(companyToken);
    const accessToken = companyData.accessToken;
  
    try {
      const response = await fetch(`${apiUrl}/api/bug-bounty-reports/${reportId}/company/accept`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update the report status: ${response.status} - ${errorText}`);
      } else {
        toast.success("Report status updated successfully")
        console.log('Report status updated successfully');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
  
  export async function updateReportReject(reportId: number): Promise<void> {
    if (typeof reportId !== 'number' || isNaN(reportId)) {
      throw new Error("Invalid reportId");
    }
  
    const apiUrl = import.meta.env.VITE_APP_BASE_URL;
    const companyToken = localStorage.getItem('company');
    if (!companyToken) {
      throw new Error("Company data not found in localStorage");
    }
  
    const companyData = JSON.parse(companyToken);
    const accessToken = companyData.accessToken;
  
    try {
      const response = await fetch(`${apiUrl}/api/bug-bounty-reports/${reportId}/company/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to update the report status: ${response.status} - ${errorText}`);
      } else {
        toast.success("Report status updated successfully")
        console.log('Report status updated successfully');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
  