
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, FileAnalytics, Search } from 'lucide-react';

// Custom icons with better matches
const FileAnalytics = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M4 7V5a1 1 0 0 1 1-1h9l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2" />
    <path d="M5 22h9" />
    <path d="M8 12v4" />
    <path d="M12 12v4" />
    <path d="M16 12v4" />
    <path d="M3 18h18" />
  </svg>
);

interface TabNavigationProps {
  children: React.ReactNode[];
  defaultTab?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ 
  children, 
  defaultTab = 'chat' 
}) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <div className="border-b sticky top-0 bg-background z-10">
        <div className="dlite-container">
          <TabsList className="w-full my-4 h-12 bg-muted/50">
            <TabsTrigger value="chat" className="flex-1 data-[state=active]:bg-dlite-500">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex-1 data-[state=active]:bg-dlite-500">
              <div className="flex items-center space-x-2">
                <FileAnalytics className="h-4 w-4" />
                <span>Analysis</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex-1 data-[state=active]:bg-dlite-500">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4" />
                <span>Search</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
      </div>
      
      <div className="dlite-container py-6">
        <TabsContent value="chat" className="mt-0">
          {children[0]}
        </TabsContent>
        <TabsContent value="analysis" className="mt-0">
          {children[1]}
        </TabsContent>
        <TabsContent value="search" className="mt-0">
          {children[2]}
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default TabNavigation;
