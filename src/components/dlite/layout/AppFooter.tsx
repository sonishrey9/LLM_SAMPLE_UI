
import React from 'react';

const AppFooter = () => {
  return (
    <footer className="border-t mt-auto">
      <div className="dlite-container py-4">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} D-Lite Nexus. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a 
              href="#" 
              className="text-xs text-gray-500 hover:text-dlite-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              className="text-xs text-gray-500 hover:text-dlite-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
