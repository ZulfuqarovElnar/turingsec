import { Report } from "../types";

export async function sendReport(report: Report, id: string) {
  console.log(report);
  console.log(id);
  
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
          methodName: report.methodName,
          proofOfConcept: report.proofOfConcept,
          discoveryDetails: report.discoveryDetails,
          lastActivity: report.lastActivity,
          reportTitle: report.reportTitle,
          rewardsStatus: report.rewardsStatus,
          vulnerabilityUrl: report.vulnerabilityUrl,
          userId: report.userId, 
          collaboratorDTO: report.collaboratorDTO
        }),
      }
    );

    console.log(res);
    if (!res.ok) {
      console.log(res);
      throw new Error("Wrong response");
    }

    return res;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }
}