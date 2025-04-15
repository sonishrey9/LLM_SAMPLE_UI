import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Copy, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isCopied?: boolean;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m D-Lite Nexus, your AI assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand what you're asking about. Let me help you with that.",
        "That's an interesting question. Here's what I found.",
        "I can certainly help with that. Here's what you need to know.",
        "Based on my knowledge, here's what I can tell you.",
        "I've analyzed your question and here's my response."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyMessage = (messageId: string) => {
    const messageToCopy = messages.find(msg => msg.id === messageId);
    if (messageToCopy) {
      navigator.clipboard.writeText(messageToCopy.content)
        .then(() => {
          setMessages(messages.map(msg => 
            msg.id === messageId ? { ...msg, isCopied: true } : msg
          ));
          
          toast({
            title: "Copied to clipboard",
            description: "Message content copied successfully",
          });
          
          // Reset the copy icon after 2 seconds
          setTimeout(() => {
            setMessages(messages.map(msg => 
              msg.id === messageId ? { ...msg, isCopied: false } : msg
            ));
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast({
            title: "Failed to copy",
            description: "Couldn't copy to clipboard",
            variant: "destructive"
          });
        });
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[75vh]">
      <div className="flex-1 overflow-y-auto px-2 py-4 mb-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={message.role === 'user' ? 'dlite-user-message' : 'dlite-ai-message'}>
                <div className="flex items-center mb-1 gap-1">
                  {message.role === 'assistant' ? (
                    <Bot size={14} className="text-dlite-600" />
                  ) : (
                    <User size={14} className="text-gray-600" />
                  )}
                  <span className="text-xs font-medium">
                    {message.role === 'assistant' ? 'D-Lite' : 'You'}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
                    <Clock size={12} />
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
                <div className="text-sm">{message.content}</div>
                
                {message.role === 'assistant' && (
                  <div className="flex justify-end mt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-6 w-6"
                            onClick={() => handleCopyMessage(message.id)}
                          >
                            {message.isCopied ? <Check size={14} /> : <Copy size={14} />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy message</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="dlite-ai-message">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-dlite-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-dlite-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-dlite-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-auto">
        <div className="relative">
          <Input
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="pr-20 py-6 bg-background border-dlite-200 focus-visible:ring-dlite-500"
            disabled={isLoading}
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-dlite-600 hover:bg-dlite-700"
            disabled={!inputMessage.trim() || isLoading}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
