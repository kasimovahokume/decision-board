import { useState, useCallback, useMemo } from 'react';
import { useDecisions } from '../../hooks/useDecisions';
import { useMobileSidebar } from '../../../../shared/hooks/useMobileSidebar';
import Sidebar from '../Sidebar/Sidebar';
import MobileTopBar from '../MobileTopBar/MobileTopBar';
import DecisionForm from '../DecisionForm/DecisionForm';
import DecisionDetail from '../DecisionDetail/DecisionDetail';

export default function DecisionBoardPage() {
  const { decisions, createDecision, selectOption, deleteDecision } = useDecisions();
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useMobileSidebar();
  
  const [activeView, setActiveView] = useState<string | 'create' | null>(
    decisions.length > 0 ? decisions[0].id : 'create'
  );

  const handleCreate = useCallback((title: string, options: string[]) => {
    const newId = createDecision(title, options);
    setActiveView(newId);
    closeSidebar(); 
  }, [createDecision, closeSidebar]);

  const handleDelete = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteDecision(id);
    if (activeView === id) {
      setActiveView(decisions.length > 1 ? decisions.find(d => d.id !== id)?.id || 'create' : 'create');
    }
  }, [deleteDecision, activeView, decisions]);

  const handleSelectDecision = useCallback((id: string) => {
    setActiveView(id);
    closeSidebar(); 
  }, [closeSidebar]);

  const handleSetCreateView = useCallback(() => {
    setActiveView('create');
    closeSidebar();
  }, [closeSidebar]);

  const activeDecision = useMemo(() => 
    decisions.find((d) => d.id === activeView), 
  [decisions, activeView]);

  const mobileTitle = activeView === 'create' 
    ? 'Yeni Decision' 
    : activeDecision?.title || 'Decision Board';

  return (
    <div className="flex h-screen bg-zinc-50/50 overflow-hidden text-zinc-900 antialiased relative">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        activeView={activeView}
        decisions={decisions}
        onSetCreateView={handleSetCreateView}
        onSelectDecision={handleSelectDecision}
        onDeleteDecision={handleDelete}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full">
        <MobileTopBar toggleSidebar={toggleSidebar} title={mobileTitle} />
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 flex flex-col">
          {activeView === 'create' ? (
            <DecisionForm 
              onCreate={handleCreate} 
              onCancel={() => setActiveView(decisions.length > 0 ? decisions[0].id : null)} 
            />
          ) : activeDecision ? (
            <DecisionDetail 
              decision={activeDecision} 
              onSelectOption={selectOption} 
            />
          ) : (
            <div className="m-auto text-center px-4">
              <h3 className="text-sm font-semibold text-zinc-900">Decision Seçilməyib</h3>
              <p className="text-xs text-zinc-500 mt-1.5">Menyudan bir mövzu seçin və ya yeni decision yaradın.</p>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}