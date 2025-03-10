
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  User, 
  Tag, 
  Bookmark, 
  MapPin, 
  Info,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { getBookById, getLoansByBookId, getMemberById } from '@/lib/data';
import { cn } from '@/lib/utils';

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState(id ? getBookById(id) : undefined);
  const [loans, setLoans] = useState(id ? getLoansByBookId(id) : []);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Sidebar />
        <main className="flex-1 ml-[70px] md:ml-[240px] pt-24 pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
            <p className="text-muted-foreground mb-8">
              We couldn't find the book you're looking for.
            </p>
            <Button asChild>
              <Link to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Link>
            </Button>
          </div>
        </main>
        <Footer className="ml-[70px] md:ml-[240px]" />
      </div>
    );
  }

  // Format loan information
  const activeLoan = loans.find(loan => loan.status === 'borrowed' || loan.status === 'overdue');
  const borrowedBy = activeLoan ? getMemberById(activeLoan.memberId) : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      
      <main className="flex-1 ml-[70px] md:ml-[240px] pt-24 pb-12 px-6 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/books" className="inline-flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Link>
            </Button>
          </div>
          
          {/* Book Details */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-md border border-border relative bg-card">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                    <BookOpen className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
                <img 
                  src={book.coverImage} 
                  alt={book.title} 
                  className={cn(
                    "h-full w-full object-cover",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              
              {/* Availability Status */}
              <div className="mt-4">
                {book.available ? (
                  <div className="flex items-center p-3 rounded-md bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Available</p>
                      <p className="text-sm">{book.availableCopies} of {book.totalCopies} copies available</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center p-3 rounded-md bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Unavailable</p>
                      <p className="text-sm">All copies are currently borrowed</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="mt-4 space-y-2">
                <Button className="w-full">
                  <Bookmark className="h-4 w-4 mr-2" />
                  {book.available ? 'Borrow this Book' : 'Join Waitlist'}
                </Button>
              </div>
            </div>
            
            {/* Book Information */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {book.genres.map(genre => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-xl text-muted-foreground mt-1">by {book.author}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Published: {book.publicationYear}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Publisher: {book.publisher}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Pages: {book.pageCount}</span>
                </div>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>ISBN: {book.isbn}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
                  <span>Location: {book.location}</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-medium mb-3">Description</h2>
                <p className="text-muted-foreground">{book.description}</p>
              </div>
              
              {activeLoan && borrowedBy && (
                <>
                  <Separator className="my-6" />
                  
                  <div>
                    <h2 className="text-xl font-medium mb-3">Current Loan Status</h2>
                    <div className={cn(
                      "p-4 rounded-md",
                      activeLoan.status === 'overdue' 
                        ? "bg-red-50 dark:bg-red-900/20" 
                        : "bg-blue-50 dark:bg-blue-900/20"
                    )}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            Currently borrowed by {borrowedBy.name}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Due date: {activeLoan.dueDate}
                          </p>
                        </div>
                        {activeLoan.status === 'overdue' && (
                          <Badge variant="destructive">Overdue</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer className="ml-[70px] md:ml-[240px]" />
    </div>
  );
};

export default BookDetailPage;
