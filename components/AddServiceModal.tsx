
import React, { useState, useEffect } from 'react';
import { ServiceEntry } from '../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: Omit<ServiceEntry, 'id' | 'lastUpdated'>) => void;
  serviceToEdit: ServiceEntry | null;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose, onSave, serviceToEdit }) => {
  const [serviceName, setServiceName] = useState('');
  const [email, setEmail] = useState('');
  const [freeCredits, setFreeCredits] = useState<number | ''>('');
  const [renewalDate, setRenewalDate] = useState('');
  const [isUsed, setIsUsed] = useState(false);

  useEffect(() => {
    if (serviceToEdit) {
      setServiceName(serviceToEdit.serviceName);
      setEmail(serviceToEdit.email);
      setFreeCredits(serviceToEdit.freeCredits);
      // Format date for input type="date" which requires YYYY-MM-DD
      setRenewalDate(new Date(serviceToEdit.renewalDate).toISOString().split('T')[0]);
      setIsUsed(serviceToEdit.isUsed);
    } else {
      setServiceName('');
      setEmail('');
      setFreeCredits('');
      setRenewalDate('');
      setIsUsed(false);
    }
  }, [serviceToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName || !email || freeCredits === '' || !renewalDate) {
      alert('Please fill out all fields.');
      return;
    }
    onSave({
      serviceName,
      email,
      freeCredits: Number(freeCredits),
      renewalDate: new Date(renewalDate).toISOString(),
      isUsed,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">{serviceToEdit ? 'Edit Service' : 'Add New Service'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service Name</label>
            <input
              type="text"
              value={serviceName}
              onChange={e => setServiceName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Free Credits/Units</label>
            <input
              type="number"
              value={freeCredits}
              onChange={e => setFreeCredits(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              required
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Renewal Date</label>
            <input
              type="date"
              value={renewalDate}
              onChange={e => setRenewalDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              id="isUsed"
              type="checkbox"
              checked={isUsed}
              onChange={e => setIsUsed(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isUsed" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Mark as used</label>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceModal;
