// features/decisions/components/DecisionListItem/DecisionListItem.tsx

import type { Decision } from "../../types/decisions";


interface DecisionListItemProps {
  decision: Decision;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DecisionListItem({ decision, onSelect, onDelete }: DecisionListItemProps) {
  function handleDeleteClick(e: React.MouseEvent) {
    e.stopPropagation();
    onDelete(decision.id);
  }

  return (
    <div
      onClick={() => onSelect(decision.id)}
      className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
    >
      <div>
        <p className="text-sm font-medium text-gray-900">{decision.title}</p>
        <p className="text-xs text-gray-500">{decision.options.length} options</p>
      </div>
      <button
        type="button"
        onClick={handleDeleteClick}
        className="text-xs text-gray-400 hover:text-red-500 px-2 py-1"
      >
        Delete
      </button>
    </div>
  );
}