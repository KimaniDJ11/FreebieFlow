
import { ServiceEntry } from '../types';

const STORAGE_KEY = 'trialTrackerServices';

export const getServices = (): ServiceEntry[] => {
  try {
    const servicesJson = localStorage.getItem(STORAGE_KEY);
    return servicesJson ? JSON.parse(servicesJson) : [];
  } catch (error) {
    console.error('Failed to parse services from localStorage', error);
    return [];
  }
};

export const saveServices = (services: ServiceEntry[]): void => {
  try {
    const servicesJson = JSON.stringify(services);
    localStorage.setItem(STORAGE_KEY, servicesJson);
  } catch (error) {
    console.error('Failed to save services to localStorage', error);
  }
};
