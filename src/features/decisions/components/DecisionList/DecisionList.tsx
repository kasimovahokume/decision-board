import type { Decision } from '../../types/decisions'; // Tiplər ancaq types papkasından gəlir!

interface DecisionListProps {
  decisions: Decision[];
  activeView: string | 'create' | null;
  onSelect: (id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
}

export default function DecisionList({ decisions, activeView, onSelect, onDelete }: DecisionListProps) {
  if (decisions.length === 0) {
    return (
      <div className="px-2 py-4 text-xs text-zinc-400 text-center">
        Hələ heç bir decision yoxdur.
      </div>
    );
  }

  return (
    <>
      {decisions.map((decision) => {
        const isActive = activeView === decision.id;
        return (
          <div 
            key={decision.id}
            onClick={() => onSelect(decision.id)}
            className={`group flex items-center justify-between px-2.5 py-2.5 rounded-lg cursor-pointer text-xs font-medium transition-all ${
              isActive 
                ? 'bg-zinc-100/80 text-zinc-900 shadow-sm border border-zinc-200/60' 
                : 'border border-transparent text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate pr-2">
              <svg className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-zinc-900' : 'text-zinc-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">{decision.title}</span>
            </div>
            <button 
              onClick={(e) => onDelete(e, decision.id)}
              className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 p-1 transition-opacity"
              title="Sil"
            >
              ✕
            </button>
          </div>
        );
      })}
    </>
  );
}