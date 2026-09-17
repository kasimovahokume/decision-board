import  { useEffect } from 'react';
import type { ModalProps } from '../types/ui';

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white border border-zinc-200/80 rounded-2xl shadow-xl p-6 z-10 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4 border-b border-zinc-100 pb-3">
          {title && <h3 className="text-base font-semibold text-zinc-900">{title}</h3>}
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg hover:bg-zinc-100 transition-colors ml-auto"
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}