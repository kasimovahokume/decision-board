import type { EmptyStateProps } from '../types/ui';

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="m-auto text-center px-4 py-8">
      <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-zinc-200 text-zinc-400 font-bold text-lg">
        ?
      </div>
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      {description && <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto leading-relaxed">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}