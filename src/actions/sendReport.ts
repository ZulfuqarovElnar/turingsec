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
          asset: "string",
          weakness: "string",
          severity: "string",
          methodName: "string",
          proofOfConcept: "string",
          discoveryDetails: "string",
          lastActivity: "2024-05-02T10:08:14.830Z",
          reportTitle: "string",
          rewardsStatus: "string",
          vulnerabilityUrl: "string",
          userId: userId, 
          collaboratorDTO: [
            {
              hackerUsername: "string",
              collaborationPercentage: 0
            }
          ]
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