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
        w-[85%] max-w-[320px] md:w-72 bg-white border-r border-zinc-200/80 flex flex-col h-full flex-shrink-0
        transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
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
          
          <button 
            onClick={closeSidebar} 
            className="md:hidden flex items-center justify-center w-8 h-8 text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
            aria-label="Sidebarı bağla"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
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