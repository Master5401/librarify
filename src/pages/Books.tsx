
import { useState } from 'react';
import { BookPlus, FilterX, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/search-bar';
import BookCard from '@/components/ui/book-card';
import { books } from '@/lib/data';
import { cn } from '@/lib/utils';

// Extract all unique genres from books
const allGenres = Array.from(new Set(books.flatMap(book => book.genres))).sort();

const BooksPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'all' | 'available' | 'unavailable'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'author' | 'year'>('title');
  
  // Filter books based on search query and filters
  const filteredBooks = books.filter(book => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Genre filter
    const matchesGenre = selectedGenres.length === 0 || 
      selectedGenres.some(genre => book.genres.includes(genre));
    
    // Availability filter
    const matchesAvailability = 
      availability === 'all' || 
      (availability === 'available' && book.available) ||
      (availability === 'unavailable' && !book.available);
    
    return matchesSearch && matchesGenre && matchesAvailability;
  });
  
  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return b.publicationYear - a.publicationYear;
      default:
        return 0;
    }
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const toggleGenreFilter = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };
  
  const clearFilters = () => {
    setSelectedGenres([]);
    setAvailability('all');
    setSortBy('title');
  };
  
  const hasActiveFilters = selectedGenres.length > 0 || availability !== 'all';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      
      <main className="flex-1 ml-[70px] md:ml-[240px] pt-24 pb-12 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Book Collection</h1>
              <p className="text-muted-foreground">
                Browse and manage your library's book collection
              </p>
            </div>
            <Button>
              <BookPlus className="h-4 w-4 mr-2" />
              Add New Book
            </Button>
          </div>
          
          {/* Filters Section */}
          <div className="mb-8 bg-card border border-border/40 rounded-lg p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar 
                  placeholder="Search by title or author..."
                  onSearch={handleSearch}
                  initialValue={searchQuery}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={sortBy} onValueChange={(value: 'title' | 'author' | 'year') => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">Sort by Title</SelectItem>
                    <SelectItem value="author">Sort by Author</SelectItem>
                    <SelectItem value="year">Sort by Year</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={availability} onValueChange={(value: 'all' | 'available' | 'unavailable') => setAvailability(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Books</SelectItem>
                    <SelectItem value="available">Available Only</SelectItem>
                    <SelectItem value="unavailable">Unavailable Only</SelectItem>
                  </SelectContent>
                </Select>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter by Genre
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filter Books</SheetTitle>
                      <SheetDescription>
                        Select genres to filter the book collection
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Genres</h3>
                      <div className="flex flex-wrap gap-2">
                        {allGenres.map(genre => (
                          <Badge
                            key={genre}
                            variant={selectedGenres.includes(genre) ? "default" : "outline"}
                            className={cn(
                              "cursor-pointer transition-all",
                              selectedGenres.includes(genre) 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-primary/10"
                            )}
                            onClick={() => toggleGenreFilter(genre)}
                          >
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                
                {selectedGenres.map(genre => (
                  <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                    {genre}
                    <button 
                      onClick={() => toggleGenreFilter(genre)}
                      className="ml-1 h-3 w-3 rounded-full text-muted-foreground/70 hover:text-muted-foreground"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                
                {availability !== 'all' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {availability === 'available' ? 'Available' : 'Unavailable'}
                    <button 
                      onClick={() => setAvailability('all')}
                      className="ml-1 h-3 w-3 rounded-full text-muted-foreground/70 hover:text-muted-foreground"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-7 text-xs"
                >
                  <FilterX className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>
          
          {/* Books Grid */}
          <div className="mb-8">
            {sortedBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {sortedBooks.map((book) => (
                  <BookCard key={book.id} book={book} className="animate-scale-in" />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No books found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
          
          {/* Results Count */}
          <div>
            <p className="text-sm text-muted-foreground">
              Showing {sortedBooks.length} of {books.length} books
            </p>
          </div>
        </div>
      </main>
      
      <Footer className="ml-[70px] md:ml-[240px]" />
    </div>
  );
};

export default BooksPage;
