import { Report } from "../types";

export async function sendReport(report: Report, id: string) {
  // console.log(report);
  // console.log("id: " + id);
  
  // User bilgilerini localStorage'dan al
  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  // AccessToken ve id'yi al
  const accessToken = userData?.accessToken;
  // const userId = userData?.id;

  try {
    console.log("sending report...");
    const res = await fetch(
      `http://localhost:5000/api/bug-bounty-reports/manualReport?bugBountyProgramId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          lastActivity: report.lastActivity,
          rewardsStatus: report.rewardsStatus,
          reportTemplate: report.reportTemplate,
          ownPercentage: 100,
          collaboratorPayload: report.collaboratorPayload.map(collaborator => ({
            hackerUsername: collaborator.hackerUsername,
            collaborationPercentage: collaborator.collaborationPercentage
          })),

          reportAssetPayload: {
            assetName: report.reportAssetPayload.assetName,
            assetType: report.reportAssetPayload.assetType
          },

          weakness: {
            type: report.weakness.type,
            name: report.weakness.name
          },
          proofOfConcept: {
            title: report.proofOfConcept.title,
            vulnerabilityUrl: report.proofOfConcept.vulnerabilityUrl,
            description: report.proofOfConcept.description
          },

          discoveryDetails: {
            timeSpend: report.discoDetails.timeSpend,
          },

          methodName: report.methodName,
          severity: report.severity,
     
        }),
        
      }
    );

    if (!res.ok) {
      console.log(
        {
          lastActivity: report.lastActivity,
          rewardsStatus: report.rewardsStatus,
          reportTemplate: report.reportTemplate,
          ownPercentage: 100,
          collaboratorPayload: report.collaboratorPayload.map(collaborator => ({
            hackerUsername: collaborator.hackerUsername,
            collaborationPercentage: collaborator.collaborationPercentage
          })),

          reportAssetPayload: {
            assetName: report.reportAssetPayload.assetName,
            assetType: report.reportAssetPayload.assetType
          },

          weakness: {
            type: report.weakness.type,
            name: report.weakness.name
          },
          proofOfConcept: {
            title: report.proofOfConcept.title,
            vulnerabilityUrl: report.proofOfConcept.vulnerabilityUrl,
            description: report.proofOfConcept.description
          },

          discoveryDetails: {
            timeSpend: report.discoDetails.timeSpend,
          },

          methodName: report.methodName,
          severity: report.severity,
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