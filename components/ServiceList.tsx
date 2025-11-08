
import React from 'react';
import { ServiceEntry } from '../types';
import ServiceItem from './ServiceItem';

interface ServiceListProps {
  services: ServiceEntry[];
  onToggleUsed: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (service: ServiceEntry) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onToggleUsed, onDelete, onEdit }) => {
  const activeServices = services.filter(s => !s.isUsed);
  const usedServices = services.filter(s => s.isUsed);

  if (services.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold mb-2">No services yet!</h2>
        <p className="text-gray-500 dark:text-gray-400">Click the '+' button to add your first service.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4 border-b-2 border-primary dark:border-indigo-400 pb-2">Active ({activeServices.length})</h2>
        {activeServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeServices.map(service => (
              <ServiceItem key={service.id} service={service} onToggleUsed={onToggleUsed} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">No active services.</p>
        )}
      </div>

      {usedServices.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-400 dark:border-gray-600 pb-2">Used ({usedServices.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usedServices.map(service => (
              <ServiceItem key={service.id} service={service} onToggleUsed={onToggleUsed} onDelete={onDelete} onEdit={onEdit} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceList;