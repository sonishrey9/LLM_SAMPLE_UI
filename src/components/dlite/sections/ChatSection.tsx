
import React, { useState } from 'react';
import ModelSelector from '../chat/ModelSelector';
import ChatInterface from '../chat/ChatInterface';

const ChatSection: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4o');

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  return (
    <section className="flex flex-col">
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      <ChatInterface />
    </section>
  );
};

export default ChatSection;
