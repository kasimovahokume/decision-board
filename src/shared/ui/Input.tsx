import type { InputProps } from '../types/ui';

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-zinc-700 uppercase tracking-wider mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-zinc-50/50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all ${className}`}
        {...props}
      />
    </div>
  );
}