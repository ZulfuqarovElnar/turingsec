export interface Report {
  id: number;
  asset: string;
  weakness: string;
  severity: string;
  methodName: string;
  proofOfConcept: string;
  discoveryDetails: string;
  lastActivity: string;
  reportTitle: string;
  rewardsStatus: string;
  vulnerabilityUrl: string;
  userId: number;
  bugBountyProgramId: number;
  ownPercentage: number;
  collaborators: {
    id: number;
    hackerUsername: string;
    collaborationPercentage: number;
  }[];
}
