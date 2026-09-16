import type { Option } from "../../types/decisions";


interface OptionItemProps {
  option: Option;
  isSelected: boolean;
  isDecisionMade: boolean;
  onSelect: (optionId: string) => void;
}

export default function OptionItem({ option, isSelected, isDecisionMade, onSelect }: OptionItemProps) {
  let baseClasses = "group relative flex items-center gap-4 w-full p-4 sm:p-5 text-left border rounded-2xl transition-all duration-300 ease-out outline-none";
  let stateClasses = "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400 hover:shadow-sm hover:-translate-y-[1px] cursor-pointer";
  let circleClasses = "border-zinc-300 group-hover:border-zinc-500 bg-zinc-50";

  if (isSelected) {
    stateClasses = "border-zinc-900 bg-zinc-50 text-zinc-900 ring-1 ring-zinc-900 shadow-md font-medium z-10 scale-[1.01]";
    circleClasses = "border-zinc-900 bg-zinc-900";
  } else if (isDecisionMade) {
    stateClasses = "border-zinc-100 bg-zinc-50/50 text-zinc-400 cursor-not-allowed opacity-60";
    circleClasses = "border-zinc-200 bg-zinc-100";
  }

  return (
    <button
      type="button"
      disabled={isDecisionMade}
      onClick={() => onSelect(option.id)}
      className={`${baseClasses} ${stateClasses}`}
    >
      {/* Seçim Dairəsi (Radio Button efekti) */}
      <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center transition-colors duration-300 ${circleClasses}`}>
        {isSelected && <div className="w-2 h-2 bg-white rounded-full scale-in-center animate-[popIn_0.2s_ease-out]" />}
      </div>
      
      <span className="text-[15px] leading-relaxed">{option.label}</span>
    </button>
  );
}