
import React from 'react';
import AppLayout from '@/components/dlite/layout/AppLayout';
import TabNavigation from '@/components/dlite/navigation/TabNavigation';
import ChatSection from '@/components/dlite/sections/ChatSection';
import AnalysisSection from '@/components/dlite/sections/AnalysisSection';
import SearchSection from '@/components/dlite/sections/SearchSection';

const Index = () => {
  return (
    <AppLayout>
      <TabNavigation defaultTab="chat">
        <ChatSection />
        <AnalysisSection />
        <SearchSection />
      </TabNavigation>
    </AppLayout>
  );
};

export default Index;
