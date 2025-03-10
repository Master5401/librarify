
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className
}: StatsCardProps) => {
  return (
    <Card className={cn("overflow-hidden bg-card transition-all duration-300 hover:shadow-md", className)}>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold tracking-tight">{value}</h3>
            
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
            
            {trend && trendValue && (
              <div className="mt-2 flex items-center">
                <div 
                  className={cn(
                    'h-6 px-2 rounded-full text-xs font-medium flex items-center',
                    trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  )}
                >
                  {trendValue}
                </div>
              </div>
            )}
          </div>
          
          {Icon && (
            <div className="rounded-full p-3 bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
