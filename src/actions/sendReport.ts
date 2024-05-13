import { Report } from "../types";

export async function sendReport(report: Report, id: string) {
  console.log(report);
  console.log("id: " + id);
  
  // User bilgilerini localStorage'dan al
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  // AccessToken ve id'yi al
  const accessToken = userData?.accessToken;
  const userId = userData?.id;

  try {
    console.log("sending report...");
    const res = await fetch(
      `http://localhost:5000/api/bug-bounty-reports/submit?bugBountyProgramId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          asset: report.asset,
          weakness: report.weakness,
          severity: report.severity,
          proofOfConcept: report.proofOfConcept,
          discoveryDetails: report.discoveryDetails,
          lastActivity: report.lastActivity,
          reportTitle: report.reportTitle,
          rewardsStatus: report.rewardsStatus,
          vulnerabilityUrl: report.vulnerabilityUrl,
          methodName: report.methodName,
          ownPercentage: 100, 
          collaboratorDTO: report.collaboratorDTO
        }),
      }
    );

    if (!res.ok) {
      console.log(
        {
          asset: report.asset,
          weakness: report.weakness,
          severity: report.severity,
          proofOfConcept: report.proofOfConcept,
          discoveryDetails: report.discoveryDetails,
          lastActivity: report.lastActivity,
          reportTitle: report.reportTitle,
          rewardsStatus: report.rewardsStatus,
          vulnerabilityUrl: report.vulnerabilityUrl,
          methodName: report.methodName,
          ownPercentage: 100, 
          collaboratorDTO: report.collaboratorDTO
        }
      );
      throw new Error("Wrong response");
    }

    return res;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }


  
}