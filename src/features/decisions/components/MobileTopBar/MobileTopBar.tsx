import { memo } from 'react';
import type { MobileTopBarProps } from '../../types/decisions';

function MobileTopBar({ toggleSidebar, title }: MobileTopBarProps) {
  return (
    <div className="md:hidden h-14 px-4 border-b border-zinc-200 bg-white flex items-center gap-3 flex-shrink-0">
      <button 
        type="button"
        onClick={toggleSidebar} 
        className="p-2 -ml-2 text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"
        aria-label="Menyunu aç"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span className="font-semibold text-sm text-zinc-900 truncate">
        {title}
      </span>
    </div>
  );
}

export default memo(MobileTopBar);