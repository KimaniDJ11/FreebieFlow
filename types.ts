
export interface ServiceEntry {
  id: string;
  serviceName: string;
  email: string;
  freeCredits: number;
  renewalDate: string; // ISO string format
  isUsed: boolean;
  lastUpdated: string; // ISO string format
}
