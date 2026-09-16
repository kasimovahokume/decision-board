import type { SidebarProps } from '../../types/decisions';
import DecisionList from '../DecisionList/DecisionList';

export default function Sidebar({
  isSidebarOpen,
  closeSidebar,
  activeView,
  decisions,
  onSetCreateView,
  onSelectDecision,
  onDeleteDecision,
}: SidebarProps) {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        />
      )}
      <div
        className={`
        fixed md:static inset-y-0 left-0 z-50
        w-72 bg-white border-r border-zinc-200/80 flex flex-col h-full flex-shrink-0
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      >
        <div className="h-14 px-5 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-zinc-900 rounded flex items-center justify-center text-white text-xs font-bold">
              D
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-900">Decision Board</span>
          </div>
          <button onClick={closeSidebar} className="md:hidden p-1.5 text-zinc-400 hover:text-zinc-900 rounded-lg">
            ✕
          </button>
        </div>

        <div className="p-3">
          <button
            onClick={onSetCreateView}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium py-2.5 px-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span className="text-base leading-none">+</span> Yeni Decision Yarat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-2 py-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            My Decisions ({decisions.length})
          </div>
          <DecisionList
            decisions={decisions}
            activeView={activeView}
            onSelect={onSelectDecision}
            onDelete={onDeleteDecision}
          />
        </div>
      </div>
    </>
  );
}