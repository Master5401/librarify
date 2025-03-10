
import { useState } from 'react';
import { BookMarked, Clock, RotateCcw, CheckCircle2, AlertCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { loans, books, members, getBookById, getMemberById } from '@/lib/data';
import { cn } from '@/lib/utils';

const LoansPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'borrowed' | 'returned' | 'overdue'>('all');
  
  // Enrich loan data with book and member information
  const enrichedLoans = loans.map(loan => {
    const book = getBookById(loan.bookId);
    const member = getMemberById(loan.memberId);
    
    return {
      ...loan,
      book,
      member
    };
  });
  
  // Filter loans based on search query and status
  const filteredLoans = enrichedLoans.filter(loan => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      loan.book?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loan.member?.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort loans by checkout date (newest first)
  const sortedLoans = [...filteredLoans].sort((a, b) => {
    return new Date(b.checkoutDate).getTime() - new Date(a.checkoutDate).getTime();
  });
  
  const getLoanStatusBadge = (status: string) => {
    switch (status) {
      case 'borrowed':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            Borrowed
          </Badge>
        );
      case 'returned':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Returned
          </Badge>
        );
      case 'overdue':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar />
      
      <main className="flex-1 ml-[70px] md:ml-[240px] pt-24 pb-12 px-6 animate-fade-in">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Loans & Returns</h1>
              <p className="text-muted-foreground">
                Track and manage book loans, returns, and overdue items
              </p>
            </div>
            <Button>
              <BookMarked className="h-4 w-4 mr-2" />
              Create New Loan
            </Button>
          </div>
          
          {/* Filters Section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by book title or member name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select 
              value={statusFilter} 
              onValueChange={(value: 'all' | 'borrowed' | 'returned' | 'overdue') => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Loans</SelectItem>
                <SelectItem value="borrowed">Borrowed</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Loans Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Checkout Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLoans.map((loan) => (
                  <TableRow key={loan.id} className="animate-fade-in">
                    <TableCell className="font-medium">{loan.book?.title}</TableCell>
                    <TableCell>{loan.member?.name}</TableCell>
                    <TableCell>{loan.checkoutDate}</TableCell>
                    <TableCell>{loan.dueDate}</TableCell>
                    <TableCell>{loan.returnDate || '-'}</TableCell>
                    <TableCell>{getLoanStatusBadge(loan.status)}</TableCell>
                    <TableCell>
                      {loan.status === 'borrowed' || loan.status === 'overdue' ? (
                        <Button variant="ghost" size="sm">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Return
                        </Button>
                      ) : (
                        <Button variant="ghost" size="sm" disabled>
                          Processed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredLoans.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No loans found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Results Count */}
          {filteredLoans.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredLoans.length} of {loans.length} loans
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer className="ml-[70px] md:ml-[240px]" />
    </div>
  );
};

export default LoansPage;
