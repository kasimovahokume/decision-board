import type { CardProps } from '../types/ui';

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white border border-zinc-200/80 rounded-xl shadow-sm p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
}