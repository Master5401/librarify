
import { useState } from 'react';
import { UserPlus, MoreHorizontal, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/search-bar';
import { members } from '@/lib/data';
import { cn } from '@/lib/utils';

const MembersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  const filteredMembers = members.filter(member => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.membershipNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && member.status === 'Active') ||
      (statusFilter === 'inactive' && member.status === 'Inactive');
    
    return matchesSearch && matchesStatus;
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const getMemberInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
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
              <h1 className="text-3xl font-bold tracking-tight mb-2">Members</h1>
              <p className="text-muted-foreground">
                Manage library members and membership information
              </p>
            </div>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Member
            </Button>
          </div>
          
          {/* Filters Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar 
                  placeholder="Search members by name, email, or ID..."
                  onSearch={handleSearch}
                  initialValue={searchQuery}
                />
              </div>
              <Tabs 
                defaultValue="all" 
                value={statusFilter}
                onValueChange={(value: 'all' | 'active' | 'inactive') => setStatusFilter(value)}
                className="w-full lg:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full lg:w-[400px]">
                  <TabsTrigger value="all">All Members</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden animate-scale-in">
                <CardHeader className="p-0">
                  <div className="h-12 bg-primary/10" />
                </CardHeader>
                <CardContent className="pt-0 p-6">
                  <div className="flex justify-between -mt-8">
                    <Avatar className="h-16 w-16 border-4 border-background">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-lg">{getMemberInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="-mt-2">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem>View Loans</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium text-lg">{member.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">Member #{member.membershipNumber}</p>
                    
                    <div className="mt-2">
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                      <Badge variant="outline" className="ml-2 bg-primary/5">
                        {member.membershipType}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">{member.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 px-6 py-3">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm text-muted-foreground">Joined: {member.joinDate}</span>
                    <span className="text-sm font-medium">
                      {member.borrowedBooks} {member.borrowedBooks === 1 ? 'book' : 'books'} borrowed
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <Card className="p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No members found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}>
                Clear Filters
              </Button>
            </Card>
          )}
          
          {/* Results Count */}
          {filteredMembers.length > 0 && (
            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredMembers.length} of {members.length} members
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer className="ml-[70px] md:ml-[240px]" />
    </div>
  );
};

export default MembersPage;
