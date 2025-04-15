
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const models = [
  { id: 'gpt-4o', name: 'GPT-4o', description: 'Most capable model for complex tasks' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', description: 'Balanced performance and speed' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', description: 'Fast responses for simple tasks' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', description: 'Advanced reasoning and comprehension' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', description: 'Balanced performance model' },
  { id: 'llama-3', name: 'Llama 3', description: 'Open-source alternative model' },
];

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  selectedModel, 
  onModelChange 
}) => {
  const currentModel = models.find(model => model.id === selectedModel) || models[0];
  
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-3 bg-accent/30 rounded-lg mb-4">
      <div className="flex items-center gap-2">
        <Bot size={20} className="text-dlite-600" />
        <span className="text-sm font-medium">Active Model:</span>
        <Badge variant="secondary" className="bg-dlite-100 text-dlite-800 hover:bg-dlite-200">
          {currentModel.name}
        </Badge>
      </div>
      
      <Select
        value={selectedModel}
        onValueChange={onModelChange}
      >
        <SelectTrigger className="w-full md:w-[220px] h-9 text-sm">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id} className="py-2 px-3">
              <div className="flex flex-col">
                <span>{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
