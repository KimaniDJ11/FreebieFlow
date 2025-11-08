import React from 'react';
import { ChevronLeftIcon } from './icons';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 md:p-8 animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center mb-6 text-primary dark:text-indigo-400 hover:underline"
        aria-label="Back to services"
      >
        <ChevronLeftIcon />
        <span className="ml-2">Back to Services</span>
      </button>

      <h2 className="text-3xl font-bold mb-4 text-dark dark:text-light">Privacy Policy for FreebieFlow</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-4 text-gray-700 dark:text-gray-300">
        <p>
          Welcome to FreebieFlow. This Privacy Policy explains how we handle your information when you use our web application. Your privacy is critically important to us.
        </p>

        <h3 className="text-xl font-semibold pt-4">1. No Data Collection</h3>
        <p>
          FreebieFlow is designed with privacy as a core principle. We do not collect, store, or transmit any of your personal information. The application does not have a backend server, and we do not have access to any data you enter.
        </p>

        <h3 className="text-xl font-semibold pt-4">2. Local Data Storage</h3>
        <p>
          All the data you enter into FreebieFlow, including service names, email addresses, credit amounts, and renewal dates, is stored exclusively on your own device within your web browser's local storage. This data never leaves your computer or mobile device. If you clear your browser's cache or data, all your FreebieFlow entries will be permanently deleted.
        </p>

        <h3 className="text-xl font-semibold pt-4">3. Use of Information</h3>
        <p>
          Since we do not collect any information, we do not use it for any purpose. The data you enter is used only by the application on your device to provide you with the service tracking functionality.
        </p>

        <h3 className="text-xl font-semibold pt-4">4. Third-Party Services</h3>
        <p>
          FreebieFlow does not integrate with any third-party services for analytics, advertising, or any other purpose.
        </p>
        
        <h3 className="text-xl font-semibold pt-4">5. Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h3 className="text-xl font-semibold pt-4">6. Contact Us</h3>
        <p>
          As we do not collect any personal data, privacy-related inquiries are limited. However, if you have any questions about this Privacy Policy, please know that your data remains solely on your device.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
