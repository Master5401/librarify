
// Mock data for the library management system

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publicationYear: number;
  genres: string[];
  description: string;
  coverImage: string;
  pageCount: number;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
  location: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  membershipNumber: string;
  joinDate: string;
  membershipType: string;
  status: string;
  phoneNumber: string;
  address: string;
  borrowedBooks: number;
  avatar?: string;
}

export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  checkoutDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'borrowed' | 'returned' | 'overdue';
}

// Books mock data
export const books: Book[] = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "978-0465050659",
    publisher: "Basic Books",
    publicationYear: 2013,
    genres: ["Design", "Psychology", "Technology"],
    description: "A powerful primer on how—and why—some products satisfy customers while others only frustrate them. This book is a powerful primer on how—and why—some products satisfy customers while others only frustrate them.",
    coverImage: "https://m.media-amazon.com/images/I/416Hql52NCL._SY445_SX342_.jpg",
    pageCount: 368,
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    location: "Section A, Shelf 2"
  },
  {
    id: "2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "978-0374533557",
    publisher: "Farrar, Straus and Giroux",
    publicationYear: 2013,
    genres: ["Psychology", "Economics", "Decision Making"],
    description: "The renowned psychologist and winner of the Nobel Prize in Economics takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    coverImage: "https://m.media-amazon.com/images/I/415LTwFlUAL._SY445_SX342_.jpg",
    pageCount: 499,
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    location: "Section B, Shelf 1"
  },
  {
    id: "3",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    isbn: "978-1451648539",
    publisher: "Simon & Schuster",
    publicationYear: 2011,
    genres: ["Biography", "Business", "Technology"],
    description: "Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than 100 family members, friends, adversaries, competitors, and colleagues—this is the definitive portrait of the greatest business icon of our generation.",
    coverImage: "https://m.media-amazon.com/images/I/41n1edvVlLL._SY445_SX342_.jpg",
    pageCount: 656,
    available: true,
    totalCopies: 4,
    availableCopies: 4,
    location: "Section A, Shelf 3"
  },
  {
    id: "4",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    publisher: "Harper",
    publicationYear: 2015,
    genres: ["History", "Anthropology", "Science"],
    description: "Bold, wide-ranging and provocative, Sapiens challenges everything we thought we knew about being human: our thoughts, our actions, our power...and our future.",
    coverImage: "https://m.media-amazon.com/images/I/41yu2qXhTXL._SY445_SX342_.jpg",
    pageCount: 464,
    available: true,
    totalCopies: 6,
    availableCopies: 2,
    location: "Section C, Shelf 1"
  },
  {
    id: "5",
    title: "The Lean Startup",
    author: "Eric Ries",
    isbn: "978-0307887894",
    publisher: "Currency",
    publicationYear: 2011,
    genres: ["Business", "Entrepreneurship", "Technology"],
    description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.",
    coverImage: "https://m.media-amazon.com/images/I/51T-sMqSMiL._SY445_SX342_.jpg",
    pageCount: 336,
    available: false,
    totalCopies: 3,
    availableCopies: 0,
    location: "Section B, Shelf 3"
  },
  {
    id: "6",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    publisher: "Avery",
    publicationYear: 2018,
    genres: ["Self-Help", "Psychology", "Productivity"],
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    coverImage: "https://m.media-amazon.com/images/I/51-nXsSRfZL._SY445_SX342_.jpg",
    pageCount: 320,
    available: true,
    totalCopies: 5,
    availableCopies: 3,
    location: "Section D, Shelf 2"
  },
  {
    id: "7",
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    publisher: "Ace",
    publicationYear: 1990,
    genres: ["Science Fiction", "Fantasy", "Classic"],
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange.",
    coverImage: "https://m.media-amazon.com/images/I/41zGPvIvW6L._SY445_SX342_.jpg",
    pageCount: 896,
    available: true,
    totalCopies: 4,
    availableCopies: 4,
    location: "Section E, Shelf 1"
  },
  {
    id: "8",
    title: "The Innovators",
    author: "Walter Isaacson",
    isbn: "978-1476708706",
    publisher: "Simon & Schuster",
    publicationYear: 2014,
    genres: ["History", "Technology", "Business"],
    description: "How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution.",
    coverImage: "https://m.media-amazon.com/images/I/51fWvcQCAeL._SY445_SX342_.jpg",
    pageCount: 560,
    available: true,
    totalCopies: 3,
    availableCopies: 1,
    location: "Section A, Shelf 1"
  }
];

// Members mock data
export const members: Member[] = [
  {
    id: "1",
    name: "Emma Thompson",
    email: "emma.thompson@example.com",
    membershipNumber: "MEM00001",
    joinDate: "2021-02-15",
    membershipType: "Premium",
    status: "Active",
    phoneNumber: "555-123-4567",
    address: "123 Oak Street, Springfield, IL",
    borrowedBooks: 2,
    avatar: "https://i.pravatar.cc/150?u=emma"
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james.wilson@example.com",
    membershipNumber: "MEM00002",
    joinDate: "2021-03-22",
    membershipType: "Standard",
    status: "Active",
    phoneNumber: "555-234-5678",
    address: "456 Elm Avenue, Riverside, CA",
    borrowedBooks: 1,
    avatar: "https://i.pravatar.cc/150?u=james"
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@example.com",
    membershipNumber: "MEM00003",
    joinDate: "2021-05-10",
    membershipType: "Premium",
    status: "Active",
    phoneNumber: "555-345-6789",
    address: "789 Maple Drive, Lakeview, NY",
    borrowedBooks: 3,
    avatar: "https://i.pravatar.cc/150?u=sophia"
  },
  {
    id: "4",
    name: "William Chen",
    email: "william.chen@example.com",
    membershipNumber: "MEM00004",
    joinDate: "2021-07-05",
    membershipType: "Standard",
    status: "Inactive",
    phoneNumber: "555-456-7890",
    address: "101 Pine Court, Hillside, TX",
    borrowedBooks: 0,
    avatar: "https://i.pravatar.cc/150?u=william"
  },
  {
    id: "5",
    name: "Olivia Patel",
    email: "olivia.patel@example.com",
    membershipNumber: "MEM00005",
    joinDate: "2021-08-18",
    membershipType: "Premium",
    status: "Active",
    phoneNumber: "555-567-8901",
    address: "222 Cedar Lane, Mountainview, WA",
    borrowedBooks: 2,
    avatar: "https://i.pravatar.cc/150?u=olivia"
  }
];

// Loans mock data
export const loans: Loan[] = [
  {
    id: "1",
    bookId: "2",
    memberId: "1",
    checkoutDate: "2023-08-01",
    dueDate: "2023-08-15",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: "2",
    bookId: "5",
    memberId: "1",
    checkoutDate: "2023-08-05",
    dueDate: "2023-08-19",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: "3",
    bookId: "8",
    memberId: "2",
    checkoutDate: "2023-08-07",
    dueDate: "2023-08-21",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: "4",
    bookId: "4",
    memberId: "3",
    checkoutDate: "2023-07-25",
    dueDate: "2023-08-08",
    returnDate: null,
    status: "overdue"
  },
  {
    id: "5",
    bookId: "6",
    memberId: "3",
    checkoutDate: "2023-08-02",
    dueDate: "2023-08-16",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: "6",
    bookId: "5",
    memberId: "3",
    checkoutDate: "2023-08-10",
    dueDate: "2023-08-24",
    returnDate: null,
    status: "borrowed"
  },
  {
    id: "7",
    bookId: "1",
    memberId: "5",
    checkoutDate: "2023-07-20",
    dueDate: "2023-08-03",
    returnDate: "2023-08-02",
    status: "returned"
  },
  {
    id: "8",
    bookId: "3",
    memberId: "5",
    checkoutDate: "2023-08-04",
    dueDate: "2023-08-18",
    returnDate: null,
    status: "borrowed"
  }
];

// Get book by ID
export const getBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

// Get member by ID
export const getMemberById = (id: string): Member | undefined => {
  return members.find(member => member.id === id);
};

// Get loans by member ID
export const getLoansByMemberId = (memberId: string): Loan[] => {
  return loans.filter(loan => loan.memberId === memberId);
};

// Get loans by book ID
export const getLoansByBookId = (bookId: string): Loan[] => {
  return loans.filter(loan => loan.bookId === bookId);
};

// Calculate library statistics
export const getLibraryStats = () => {
  const totalBooks = books.reduce((sum, book) => sum + book.totalCopies, 0);
  const availableBooks = books.reduce((sum, book) => sum + book.availableCopies, 0);
  const borrowedBooks = totalBooks - availableBooks;
  const activeMembers = members.filter(member => member.status === "Active").length;
  const overdueLoans = loans.filter(loan => loan.status === "overdue").length;

  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    totalMembers: members.length,
    activeMembers,
    totalLoans: loans.length,
    activeLoans: loans.filter(loan => loan.status === "borrowed").length,
    overdueLoans
  };
};
