import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import PrivacyPolicy from './components/PrivacyPolicy';
import { LogoIcon, SunIcon, MoonIcon } from './components/icons';

const PrivacyPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
        <PrivacyPolicy onBack={() => { window.location.href = '/'; }} />
      </main>

      <footer className="w-full text-center p-4 text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} FreebieFlow
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <PrivacyPage />
  </React.StrictMode>
);
