import React from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps
{
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'scrolled';
  className?: string;
  showHoverEffect?: boolean;
}

const sizeClasses = {
  sm: 'w-full h-8 text-xs',
  md: 'w-full h-8 text-sm',
  lg: 'w-full h-6 text-xs'
};
// const sizeClasses = {
//   sm: 'w-8 h-8 text-xs',
//   md: 'w-8 h-8 text-sm',
//   lg: 'w-6 h-6 text-xs'
// };

const variantClasses = {
  default: 'text-indigo-600 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]',
  scrolled: 'text-indigo-600'
};

export const UserDisplay = ({
  name,
  size = 'md',
  variant = 'default',
  className,
  showHoverEffect = true,
}: UserAvatarProps) =>
{
  const getInitials = (name?: string) =>
  {
    return name
      ?.split(' ')[0]
      // .map(word => word[0])
      // .join('')
      .toUpperCase()
      // .slice(0, 2) || '??';
  };

  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-center',
        'font-semibold rounded-full',
        'transition-all duration-300 p-3',
        sizeClasses[size],
        variantClasses[variant],
        showHoverEffect && 'group-hover:scale-110',
        'bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10',
        'border border-indigo-800',
        className
      )}
    >
      <span className='text-teal-700 mr-3'>Hi</span> {getInitials(name)}
    </div>
  );
};