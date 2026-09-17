import { useState, useCallback, useMemo } from 'react';
import { useDecisions } from '../../hooks/useDecisions';
import { useMobileSidebar } from '../../../../shared/hooks/useMobileSidebar';
import { Modal, Button, EmptyState } from '../../../../shared/ui';
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


  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = useCallback((title: string, options: string[]) => {
    const newId = createDecision(title, options);
    setActiveView(newId);
    closeSidebar(); 
  }, [createDecision, closeSidebar]);

  const handleOpenDeleteModal = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!deletingId) return;
    deleteDecision(deletingId);
    if (activeView === deletingId) {
      setActiveView(decisions.length > 1 ? decisions.find(d => d.id !== deletingId)?.id || 'create' : 'create');
    }
    setDeletingId(null);
  }, [deletingId, deleteDecision, activeView, decisions]);

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
        onDeleteDecision={handleOpenDeleteModal}
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
            <EmptyState 
              title="Decision Seçilməyib"
              description="Menyudan bir mövzu seçin və ya yeni decision yaradın."
              action={
                <Button size="sm" onClick={handleSetCreateView}>
                  + Yeni Decision
                </Button>
              }
            />
          )}
        </div>
      </div>

      <Modal
        isOpen={deletingId !== null}
        onClose={() => setDeletingId(null)}
        title="Qərarı Sil"
      >
        <p className="text-sm text-zinc-600 mb-6">
          Bu qərarı silmək istədiyinizə əminsiniz? Bu əməliyyatı geri qaytarmaq mümkün olmayacaq.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setDeletingId(null)}>
            Ləğv et
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
            Bəli, Sil
          </Button>
        </div>
      </Modal>

    </div>
  );
}