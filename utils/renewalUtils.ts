
import { ServiceEntry } from '../types';

export const daysUntil = (dateString: string): number => {
  const renewalDate = new Date(dateString);
  const today = new Date();
  // Set hours to 0 to compare dates only
  today.setHours(0, 0, 0, 0);
  renewalDate.setHours(0, 0, 0, 0);
  
  const diffTime = renewalDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getNextRenewalDate = (currentRenewal: string): string => {
  const date = new Date(currentRenewal);
  // A simple approach: add 30 days. Could be enhanced to add exactly one month.
  date.setDate(date.getDate() + 30);
  return date.toISOString();
};

export const checkAndResetRenewals = (services: ServiceEntry[]): ServiceEntry[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return services.map(service => {
    const renewalDate = new Date(service.renewalDate);
    renewalDate.setHours(0, 0, 0, 0);

    if (renewalDate.getTime() < today.getTime()) {
      return {
        ...service,
        isUsed: false,
        renewalDate: getNextRenewalDate(service.renewalDate),
        lastUpdated: new Date().toISOString(),
      };
    }
    return service;
  });
};
