import { json } from "stream/consumers";
import { Report } from "../types";

export async function sendReport(report: Report, id: string) {

  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const accessToken = userData?.accessToken;
   
  try {
    console.log("sending report...");
    console.log(report.attachments)
    const formData = new FormData();
    // Append attachments
    
    report.attachments.forEach((attachment, index) => {
      formData.append(`files[${index}]`, attachment);
    });
    
    const reportPayload = {
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
        timeSpend: report.discoveryDetails.timeSpend,
      },

      methodName: report.methodName,
      severity: report.severity,
    };
    // reportPayload
    const jsonBlob = new Blob([JSON.stringify(reportPayload)], { type: 'application/json' });
    formData.append('reportPayload', jsonBlob);
 


    const res = await fetch(
      `http://localhost:5000/api/bug-bounty-reports/manualReport?bugBountyProgramId=${id}`,
      {
        method: "POST",
        headers: {
       
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );
     
    if (!res.ok) {
      console.log(formData);
      throw new Error("Wrong response");
    }
    return res;
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }



}





