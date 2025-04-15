
import React from 'react';
import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  return (
    <header className="border-b">
      <div className="dlite-container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-dlite-600" />
          <h1 className="text-xl font-semibold text-dlite-900">D-Lite Nexus</h1>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          <a 
            href="https://github.com/your-repo/d-lite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-dlite-600 transition-colors"
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="text-sm font-medium text-gray-600 hover:text-dlite-600 transition-colors"
          >
            Documentation
          </a>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
