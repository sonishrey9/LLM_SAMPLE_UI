
import React, { useState } from 'react';
import { Search, ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
}

const SearchInterface: React.FC = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchResults([]);
    setAiResponse(null);

    // Simulate search delay
    setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: `Results for: ${query} - Official Documentation`,
          url: 'https://example.com/docs',
          snippet: `Comprehensive information about ${query} including usage guidelines, examples and best practices for implementation in various scenarios.`,
        },
        {
          id: '2',
          title: `Understanding ${query} - A Complete Guide`,
          url: 'https://example.com/guide',
          snippet: `This guide explains the core concepts of ${query} with practical examples and step-by-step tutorials for beginners and advanced users.`,
        },
        {
          id: '3',
          title: `Latest Research on ${query} - Journal Publication`,
          url: 'https://example.com/research',
          snippet: `Recent academic research and findings related to ${query}, including methodologies, experimental results and conclusions from leading experts.`,
        },
        {
          id: '4',
          title: `${query} vs. Alternatives - Comparison Analysis`,
          url: 'https://example.com/comparison',
          snippet: `A detailed comparison between ${query} and similar alternatives, highlighting strengths, weaknesses and ideal use cases for each option.`,
        },
      ];
      
      setSearchResults(mockResults);
      
      // Simulate AI processing the results
      setTimeout(() => {
        setAiResponse(`Based on the search results, I can provide you with the following information about "${query}":

1. ${query} appears to be well-documented with official guidelines and best practices available.

2. There are comprehensive guides explaining core concepts with practical examples suitable for both beginners and advanced users.

3. Recent academic research has been conducted on ${query}, suggesting it's a topic of current interest in the scientific community.

4. There are alternatives to ${query} with different strengths and weaknesses depending on the specific use case.

Would you like me to elaborate on any particular aspect of ${query}?`);
        
        setIsSearching(false);
      }, 1500);
    }, 1500);
  };

  const handleCopyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "AI response copied successfully",
          });
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

  return (
    <div className="flex flex-col space-y-6">
      {/* Search input */}
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <Input
            value={query}
            onChange={handleInputChange}
            placeholder="Search the web..."
            className="pr-20 py-6 pl-12 border-dlite-200 focus-visible:ring-dlite-500"
            disabled={isSearching}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dlite-500" />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-3 bg-dlite-600 hover:bg-dlite-700"
            disabled={!query.trim() || isSearching}
          >
            Search
          </Button>
        </div>
      </form>

      {/* Loading state */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="w-10 h-10 border-4 border-dlite-200 border-t-dlite-600 rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground">Searching the web...</p>
        </div>
      )}

      {/* Results container */}
      {!isSearching && searchResults.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Web search results */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Search size={16} className="text-dlite-600" />
                Web Search Results
              </h3>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <div key={result.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <h4 className="text-sm font-medium mb-1 hover:text-dlite-600 hover:underline">
                      <a href={result.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                        {result.title}
                        <ExternalLink size={12} />
                      </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">{result.snippet}</p>
                    <p className="text-xs text-dlite-500 mt-1">{result.url}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* AI response */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <svg width="16" height="16" className="text-dlite-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.75L19.25 9L12 13.25L4.75 9L12 4.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M9.25 11.5L4.75 14L12 18.25L19.25 14L14.75 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                  AI-Enhanced Response
                </h3>
                {aiResponse && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={handleCopyResponse}
                  >
                    <Check size={14} className="mr-1" /> Copy
                  </Button>
                )}
              </div>
              
              {aiResponse ? (
                <div className="bg-dlite-50 p-4 rounded-md text-sm whitespace-pre-line">
                  {aiResponse}
                </div>
              ) : (
                <div className="bg-muted/30 p-4 rounded-md text-sm text-center text-muted-foreground">
                  Search results will be processed here
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isSearching && searchResults.length === 0 && !query && (
        <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
          <Search size={48} className="text-dlite-200 mb-4" />
          <h3 className="text-lg font-medium mb-2">Search the Web</h3>
          <p className="text-center text-muted-foreground mb-6">
            Enter a query to search for information across the web
          </p>
          <p className="text-xs text-center text-muted-foreground max-w-md">
            D-Lite will search the web in real-time and provide an AI-enhanced response
            based on the most relevant information found.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;
