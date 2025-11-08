import React, { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { ServiceEntry } from '../types';
import { daysUntil } from '../utils/renewalUtils';
import { TrashIcon, EditIcon, CalendarIcon, CreditCardIcon } from './icons';

interface ServiceItemProps {
  service: ServiceEntry;
  onToggleUsed: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (service: ServiceEntry) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onToggleUsed, onDelete, onEdit }) => {
  const [showActions, setShowActions] = useState(false);
  const timerRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | globalThis.TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showActions]);

  const daysLeft = daysUntil(service.renewalDate);

  const getRenewalPill = () => {
    if (daysLeft < 0) return { text: 'Expired', classes: 'bg-gray-400 dark:bg-gray-600 text-white' };
    if (daysLeft <= 3) return { text: `${daysLeft} days left`, classes: 'bg-red-500 text-white' };
    if (daysLeft <= 7) return { text: `${daysLeft} days left`, classes: 'bg-yellow-500 text-white' };
    return { text: `${daysLeft} days left`, classes: 'bg-green-500 text-white' };
  };

  const renewalPill = getRenewalPill();

  const handlePressStart = () => {
    if (timerRef.current) {
        clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setShowActions(true);
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const handlePressEnd = (e: MouseEvent | TouchEvent) => {
    if (showActions) {
      e.preventDefault();
      return;
    }
    clearTimer();
  };

  const handleClick = () => {
    if (!showActions) {
      onToggleUsed(service.id);
    }
  };

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${service.serviceName}"?`)) {
      onDelete(service.id);
    }
    setShowActions(false);
  };

  const handleEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(service);
    setShowActions(false);
  };
  
  const cardClasses = `
    relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between 
    transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden
    ${service.isUsed ? 'opacity-50' : 'opacity-100'}
  `;

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onClick={handleClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={clearTimer}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <div className={`flex flex-col h-full justify-between transition-filter duration-300 ${showActions ? 'blur-sm' : ''}`}>
        <div>
          <div className="flex justify-between items-start">
            <div className="flex-grow mr-4 overflow-hidden">
                <h3 className={`font-bold text-lg truncate ${service.isUsed ? 'line-through' : ''}`}>{service.serviceName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{service.email}</p>
            </div>

            <div className="flex-shrink-0 text-sm text-right">
              <div className="flex items-center justify-end text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-primary dark:text-indigo-400 mr-1.5">{service.freeCredits}</span>
                <CreditCardIcon />
              </div>
              <div className="flex items-center justify-end text-gray-700 dark:text-gray-300 mt-1">
                <span className="font-semibold mr-1.5">{new Date(service.renewalDate).toLocaleDateString(undefined, { year: '2-digit', month: 'numeric', day: 'numeric' })}</span>
                <CalendarIcon />
              </div>
            </div>
          </div>
        </div>

        {!service.isUsed && (
          <div className="mt-4 text-center">
            <span className={`px-3 py-1 text-xs font-bold rounded-full ${renewalPill.classes}`}>
              {renewalPill.text}
            </span>
          </div>
        )}
      </div>

      {showActions && (
        <div 
          className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-6 z-10"
          onClick={(e) => e.stopPropagation()} // Prevents card's main click while overlay is open
        >
          <button 
            onClick={handleEdit} 
            className="flex flex-col items-center text-white hover:text-blue-300 transition-colors"
            aria-label="Edit service"
          >
            <div className="bg-blue-500 rounded-full p-4 transform hover:scale-110 transition-transform">
              <EditIcon />
            </div>
            <span className="mt-1 text-sm font-semibold">Edit</span>
          </button>
          <button 
            onClick={handleDelete} 
            className="flex flex-col items-center text-white hover:text-red-300 transition-colors"
            aria-label="Delete service"
          >
            <div className="bg-red-500 rounded-full p-4 transform hover:scale-110 transition-transform">
              <TrashIcon />
            </div>
            <span className="mt-1 text-sm font-semibold">Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ServiceItem;