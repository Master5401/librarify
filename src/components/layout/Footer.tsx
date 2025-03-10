
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn("px-6 py-4 text-sm text-muted-foreground", className)}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>© 2023 Librarify. All rights reserved.</span>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a 
            href="#" 
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 inline-flex items-center"
          >
            <Github className="h-4 w-4 mr-1" />
            <span>Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
