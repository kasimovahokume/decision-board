import { useMemo } from 'react';
import type { DecisionDetailProps } from '../../types/decisions';
import OptionItem from '../OptionItem/OptionItem';

export default function DecisionDetail({ decision, onSelectOption }: DecisionDetailProps) {
  const isDecisionMade = decision.selectedOptionId !== null;
  const selectedOption = useMemo(() => {
    if (!decision.selectedOptionId) return null;
    return decision.options.find((opt) => opt.id === decision.selectedOptionId) || null;
  }, [decision.options, decision.selectedOptionId]);

  return (
    <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 px-1">
      
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-[11px] font-semibold text-zinc-500 tracking-widest uppercase mb-4">
          <span className={`w-1.5 h-1.5 rounded-full ${isDecisionMade ? 'bg-zinc-800' : 'bg-green-500 animate-pulse'}`} />
          {isDecisionMade ? 'Qərar Verildi' : 'Seçim Gözlənilir'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
          {decision.title}
        </h2>
        <p className="text-zinc-500 mt-3 text-sm sm:text-base">
          {isDecisionMade 
            ? "Artıq bu mövzu üzrə qərarınızı vermisiniz. Seçiminizi aşağıda görə bilərsiniz." 
            : "Diqqətlə düşünün və aşağıdakı variantlardan birini seçərək qərarınızı təsdiqləyin."}
        </p>
      </div>

      <div className="space-y-3.5 relative">
        {decision.options.map((option) => (
          <OptionItem
            key={option.id}
            option={option}
            isSelected={option.id === decision.selectedOptionId}
            isDecisionMade={isDecisionMade}
            onSelect={(optionId) => onSelectOption(decision.id, optionId)}
          />
        ))}
      </div>

      {isDecisionMade && selectedOption && (
        <div className="mt-10 p-1 bg-gradient-to-b from-zinc-200 to-zinc-100 rounded-2xl animate-in zoom-in-95 duration-500">
          <div className="bg-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center gap-5 sm:gap-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-zinc-900 flex flex-shrink-0 items-center justify-center shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Yekun Qərarınız</p>
              <p className="text-xl sm:text-2xl font-bold text-zinc-900">{selectedOption.label}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}