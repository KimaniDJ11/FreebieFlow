import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ServiceEntry } from './types';
import { getServices, saveServices } from './services/storageService';
import { checkAndResetRenewals } from './utils/renewalUtils';
import ServiceList from './components/ServiceList';
import AddServiceModal from './components/AddServiceModal';
import { PlusIcon, SunIcon, MoonIcon, LogoIcon } from './components/icons';
import PrivacyPolicy from './components/PrivacyPolicy';

const App: React.FC = () => {
  const [services, setServices] = useState<ServiceEntry[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceEntry | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState<'main' | 'privacy'>('main');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };
  
  useEffect(() => {
    const initialServices = getServices();
    const updatedServices = checkAndResetRenewals(initialServices);
    setServices(updatedServices);
    saveServices(updatedServices);
  }, []);

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      if (a.isUsed !== b.isUsed) {
        return a.isUsed ? 1 : -1;
      }
      return new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime();
    });
  }, [services]);

  const handleToggleUsed = useCallback((id: string) => {
    const updatedServices = services.map(s =>
      s.id === id ? { ...s, isUsed: !s.isUsed, lastUpdated: new Date().toISOString() } : s
    );
    setServices(updatedServices);
    saveServices(updatedServices);
  }, [services]);

  const handleDeleteService = useCallback((id: string) => {
    const updatedServices = services.filter(s => s.id !== id);
    setServices(updatedServices);
    saveServices(updatedServices);
  }, [services]);

  const handleEditService = useCallback((service: ServiceEntry) => {
    setEditingService(service);
    setIsModalOpen(true);
  }, []);

  const handleSaveService = useCallback((service: Omit<ServiceEntry, 'id' | 'lastUpdated'>) => {
    let updatedServices: ServiceEntry[];
    if (editingService) {
      updatedServices = services.map(s =>
        s.id === editingService.id ? { ...editingService, ...service, lastUpdated: new Date().toISOString() } : s
      );
    } else {
      const newService: ServiceEntry = {
        ...service,
        id: new Date().getTime().toString(),
        lastUpdated: new Date().toISOString(),
      };
      updatedServices = [...services, newService];
    }
    setServices(updatedServices);
    saveServices(updatedServices);
    setEditingService(null);
  }, [services, editingService]);

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300 flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LogoIcon className="h-8 w-8" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-indigo-400 tracking-tight">
              FreebieFlow
            </h1>
          </div>
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 flex-grow">
        {view === 'main' && (
          <ServiceList 
            services={sortedServices} 
            onToggleUsed={handleToggleUsed} 
            onDelete={handleDeleteService} 
            onEdit={handleEditService}
          />
        )}
        {view === 'privacy' && (
          <PrivacyPolicy onBack={() => setView('main')} />
        )}
      </main>

      {view === 'main' && (
        <button
          onClick={openAddModal}
          className="fixed bottom-20 right-8 bg-primary hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg transform hover:scale-110 transition-transform duration-200 z-20"
          aria-label="Add new service"
        >
          <PlusIcon />
        </button>
      )}


      <AddServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveService}
        serviceToEdit={editingService}
      />

      <footer className="w-full text-center p-4 text-sm text-gray-500 dark:text-gray-400">
        <button onClick={() => setView('privacy')} className="hover:underline">
          Privacy Policy
        </button>
      </footer>
    </div>
  );
};

export default App;