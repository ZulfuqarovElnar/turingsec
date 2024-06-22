import { Report } from "../types";
 

export async function sendReport(report: Report, id: string) {

  const userDataString = localStorage.getItem("user");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const accessToken = userData?.accessToken;
  try {
    console.log("sending report...");
    
    
    //Manual
    if(report.methodName === 'manual'){
      const formData = new FormData();
      // Append attachments

      for (let i = 0; i < report.attachments.length; i++) {
        formData.append("files", report.attachments[i]);
      }
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
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const res = await fetch(
        `${apiUrl}/api/bug-bounty-reports/manualReport?bugBountyProgramId=${id}`,
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
    }


    //End of Manual
    else{
      const formData = new FormData();
      // Append attachments

      for (let i = 0; i < report.attachments.length; i++) {
        formData.append("files", report.attachments[i]);
      }
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
        attackVector: report.attackVector,
        attackComplexity: report.attackComplexity,
        privilegesRequired: report.privilegesRequired,
        userInteractions: report.userInteractions,
        scope: report.scope,
        confidentiality: report.confidentiality,
        integrity: report.integrity,
        availability: report.availability,
      };

      // reportPayload
      const jsonBlob = new Blob([JSON.stringify(reportPayload)], { type: 'application/json' });
      formData.append('reportPayload', jsonBlob);
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const res = await fetch(
        `${apiUrl}/api/bug-bounty-reports/CVSSReport?bugBountyProgramId=${id}`,
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

    }


    
    
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message);
  }



}

 