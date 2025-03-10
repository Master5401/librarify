
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  initialValue?: string;
}

const SearchBar = ({ 
  placeholder = 'Search...',
  onSearch,
  className,
  initialValue = ''
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Delay the first search to avoid searching on initial render
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [query, onSearch]);
  
  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };
  
  return (
    <div 
      className={cn(
        "relative flex items-center transition-all duration-300 ease-in-out",
        focused ? 'ring-2 ring-primary/20 rounded-lg' : '',
        className
      )}
    >
      <div className="absolute left-3 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={cn(
          "pl-9 pr-9 py-5 h-10 transition-all duration-300 border border-input/50",
          "placeholder:text-muted-foreground/60 focus-visible:ring-1 bg-background"
        )}
      />
      
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 h-6 w-6 text-muted-foreground hover:text-foreground transition-colors"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
