
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Books, Users, Bookmark, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import BookCard from '@/components/ui/book-card';
import StatsCard from '@/components/ui/stats-card';
import { books, members, getLibraryStats } from '@/lib/data';

const Dashboard = () => {
  const [stats, setStats] = useState(getLibraryStats());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      
      <main className="flex-1 ml-[70px] md:ml-[240px] pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-10 animate-fade-in">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Librarify</h1>
            <p className="text-muted-foreground">
              A modern approach to library management
            </p>
          </section>
          
          {/* Stats Section */}
          <section className="mb-12 animate-slide-in" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-medium mb-4">Library Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Books"
                value={isLoading ? '...' : stats.totalBooks}
                icon={Books}
                className={isLoading ? 'animate-pulse' : ''}
              />
              <StatsCard
                title="Available Books"
                value={isLoading ? '...' : stats.availableBooks}
                icon={BookOpen}
                className={isLoading ? 'animate-pulse' : ''}
              />
              <StatsCard
                title="Active Members"
                value={isLoading ? '...' : stats.activeMembers}
                icon={Users}
                className={isLoading ? 'animate-pulse' : ''}
              />
              <StatsCard
                title="Active Loans"
                value={isLoading ? '...' : stats.activeLoans}
                icon={Bookmark}
                className={isLoading ? 'animate-pulse' : ''}
              />
            </div>
          </section>
          
          {/* Recent Books Section */}
          <section className="mb-12 animate-slide-in" style={{ animationDelay: '200ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recent Books</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/books" className="flex items-center text-sm">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {books.slice(0, 6).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
          
          {/* Recent Activity Section */}
          <section className="mb-12 animate-slide-in" style={{ animationDelay: '300ms' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Recent Activity</h2>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-4 flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 p-2 rounded-full">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Book Added</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Atomic Habits" by James Clear has been added to the library
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-2 rounded-full">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New Member Registered</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Olivia Patel has joined the library
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">5 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start space-x-4">
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-2 rounded-full">
                      <Bookmark className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Book Borrowed</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Thinking, Fast and Slow" has been borrowed by Emma Thompson
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-start space-x-4">
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Overdue Return</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        "Sapiens: A Brief History of Humankind" is overdue from Sophia Rodriguez
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Quick Access Section */}
          <section className="animate-slide-in" style={{ animationDelay: '400ms' }}>
            <h2 className="text-xl font-medium mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 mb-4">
                      <Books className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Manage Books</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Add, edit, or remove books from your collection
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/books">Go to Books</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 mb-4">
                      <Users className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Manage Members</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Add members, update profiles, and manage memberships
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/members">Go to Members</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mb-4">
                      <Bookmark className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium">Manage Loans</h3>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      Track borrowed books, returns, and overdue items
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link to="/loans">Go to Loans</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
      
      <Footer className="ml-[70px] md:ml-[240px]" />
    </div>
  );
};

export default Dashboard;
