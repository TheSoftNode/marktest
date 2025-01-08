import React from 'react';
import { cn } from '@/lib/utils';

interface UserAvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'scrolled';
  className?: string;
  showHoverEffect?: boolean;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base'
};

const variantClasses = {
  default: 'text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]',
  scrolled: 'text-indigo-600'
};

export const UserAvatar = ({
  name,
  size = 'md',
  variant = 'default',
  className,
  showHoverEffect = true,
}: UserAvatarProps) => {
  const getInitials = (name?: string) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  return (
    <div
      className={cn(
        'relative z-10 flex items-center justify-center',
        'font-semibold rounded-full',
        'transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        showHoverEffect && 'group-hover:scale-110',
        'bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-600/10',
        'border border-indigo-800',
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};