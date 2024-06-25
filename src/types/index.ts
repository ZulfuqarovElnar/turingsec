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
  ownPercentage: number;
  score: number;
  collaboratorDTO: {
      hackerUsername: string;
      collaborationPercentage: number;
  }[];
}
