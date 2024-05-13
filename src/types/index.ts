export interface Report {
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
  collaboratorDTO: {
      hackerUsername: string;
      collaborationPercentage: number;
  }[];
}
