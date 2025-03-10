
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Book } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard = ({ book, className }: BookCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg bg-card border border-border/40",
        className
      )}
    >
      <Link to={`/books/${book.id}`} className="block h-full">
        <div className="aspect-[2/3] relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <BookOpen className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          <img 
            src={book.coverImage} 
            alt={book.title}
            className={cn(
              "h-full w-full object-cover transition-all duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Availability Badge */}
          <div className="absolute top-2 right-2">
            {book.available ? (
              <Badge className="bg-green-500/90 hover:bg-green-500 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                Available
              </Badge>
            ) : (
              <Badge variant="destructive" className="bg-destructive/90 hover:bg-destructive text-white">
                <XCircle className="h-3 w-3 mr-1" />
                Unavailable
              </Badge>
            )}
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-sm line-clamp-1">{book.title}</h3>
          <p className="text-muted-foreground text-xs mt-1">{book.author}</p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {book.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-[10px] bg-secondary/50 border-0">
                {genre}
              </Badge>
            ))}
            {book.genres.length > 2 && (
              <Badge variant="outline" className="text-[10px] bg-secondary/50 border-0">
                +{book.genres.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
